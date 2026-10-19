import React, { useRef, useEffect, useState, useCallback } from 'react';
import { sound } from '../utils/audioSynth';

export interface PapadCrunchProps {
  speed?: number;
  sound?: boolean;
  soundType?: 'cartoon' | 'realistic';
  className?: string;
  onBite?: (biteIndex: number, remainingBites: number) => void;
  onCycleComplete?: () => void;
}

interface CrumbParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  isMari: boolean;
  frame: number; // 0: burst, 1: drop, 2: settled
  opacity: number;
}

export const PapadCrunch: React.FC<PapadCrunchProps> = ({
  speed = 1.0,
  sound: initialSound = true,
  soundType = 'cartoon',
  className = '',
  onBite,
  onCycleComplete,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  // Stop-motion state machine
  const stateRef = useRef({
    // Assets
    papadImg: null as HTMLImageElement | null,
    handBangleImg: null as HTMLImageElement | null,
    handPinchImg: null as HTMLImageElement | null,

    // Dimensions
    cssSize: 420,
    cx: 210,
    cy: 210,
    radius: 165,

    // Bites state: 0 (whole) to 9 (completely eaten with small final morsel)
    biteCount: 0,
    maxBites: 9,

    // Stop-motion phase
    phase: 'rest' as 'rest' | 'hand_reach' | 'snap' | 'hand_retreat' | 'chew_pause' | 'empty_pause' | 'fresh_pop',
    phaseTicks: 0,
    totalTicks: 0,

    // Stop-motion tactile micro-wobble
    jiggleX: 0,
    jiggleY: 0,
    jiggleRot: 0,
    papadScale: 1.0,
    papadAlpha: 1.0,

    // Active hand state for current stop-motion frame
    hand: null as {
      type: 'bangle' | 'pinch';
      x: number;
      y: number;
      rot: number;
      holdingPiece: boolean;
    } | null,

    // Crumbs on platter produced by cracking
    crumbs: [] as CrumbParticle[],

    // Loop & visibility
    isVisible: true,
    isTabActive: true,
    isReducedMotion: false,
    lastTickTime: 0,
    rafId: 0,
  });

  const speedRef = useRef(speed);
  speedRef.current = speed;

  const soundRef = useRef(initialSound);
  soundRef.current = initialSound;

  const soundTypeRef = useRef(soundType);
  soundTypeRef.current = soundType;

  // 9 Progressive natural bites: Gradual shrinking with uneven, organic fractures
  // The final bite (bite 8) is a small, delicate crispy morsel, NOT a huge chunk!
  const getBitePolygon = useCallback((biteIndex: number, cx: number, cy: number, radius: number) => {
    const biteConfigs = [
      // 0: Small top-right snack (angle: -25 deg, depth: 0.28)
      { center: -Math.PI * 0.14, span: 0.78, depth: 0.28, hand: 'bangle' as const, asym: 0.85 },
      // 1: Right rim snap (angle: +14 deg, depth: 0.35)
      { center: Math.PI * 0.08,  span: 0.82, depth: 0.35, hand: 'pinch' as const, asym: 1.20 },
      // 2: Bottom-right rim bite (angle: +57 deg, depth: 0.38)
      { center: Math.PI * 0.32,  span: 0.85, depth: 0.38, hand: 'bangle' as const, asym: 0.90 },
      // 3: Bottom rim bite (angle: +104 deg, depth: 0.42)
      { center: Math.PI * 0.58,  span: 0.88, depth: 0.42, hand: 'pinch' as const, asym: 1.15 },
      // 4: Bottom-left rim bite (angle: +153 deg, depth: 0.46)
      { center: Math.PI * 0.85,  span: 0.90, depth: 0.46, hand: 'bangle' as const, asym: 0.88 },
      // 5: Left rim bite (angle: -147 deg, depth: 0.50)
      { center: -Math.PI * 0.82, span: 0.92, depth: 0.50, hand: 'pinch' as const, asym: 1.12 },
      // 6: Top-left rim bite (angle: -94 deg, depth: 0.55)
      { center: -Math.PI * 0.52, span: 0.95, depth: 0.55, hand: 'bangle' as const, asym: 0.92 },
      // 7: Core bite: Bites deep into center, leaving ONLY a small ~20px crispy morsel!
      { center: -Math.PI * 0.18, span: 1.30, depth: 0.84, hand: 'pinch' as const, asym: 1.05 },
      // 8: Final bite: The tiny remaining morsel is snapped up!
      { center: 0.1,             span: Math.PI * 2, depth: 1.0, hand: 'bangle' as const, asym: 1.0 },
    ];

    const cfg = biteConfigs[Math.min(biteIndex, biteConfigs.length - 1)];
    const isFinal = biteIndex >= biteConfigs.length - 1;

    if (isFinal) {
      // Cleanly consumes the remaining tiny morsel
      const bigBox = [
        { x: cx - radius * 2, y: cy - radius * 2 },
        { x: cx + radius * 2, y: cy - radius * 2 },
        { x: cx + radius * 2, y: cy + radius * 2 },
        { x: cx - radius * 2, y: cy + radius * 2 },
      ];
      return {
        maskPoly: bigBox,
        handTarget: { x: cx + 4, y: cy + 4 },
        handAngle: Math.PI * 0.22,
        handType: cfg.hand,
        apex: { x: cx + 4, y: cy + 4 },
      };
    }

    const a1 = cfg.center - cfg.span * 0.5;
    const a2 = cfg.center + cfg.span * 0.5;

    // Rim start & end points
    const pRim1 = { x: cx + Math.cos(a1) * (radius * 1.05), y: cy + Math.sin(a1) * (radius * 1.05) };
    const pRim2 = { x: cx + Math.cos(a2) * (radius * 1.05), y: cy + Math.sin(a2) * (radius * 1.05) };

    // Asymmetric apex of bite (where crack originates with uneven depth)
    const innerDist = radius * (1.0 - cfg.depth);
    const apexAngle = cfg.center + (cfg.asym - 1.0) * 0.15; // natural angular skew
    const pApex = { x: cx + Math.cos(apexAngle) * innerDist, y: cy + Math.sin(apexAngle) * innerDist };

    // Highly irregular, jagged, uneven fracture curve with multi-harmonic wafer roughness
    const edgeLine: { x: number; y: number }[] = [];
    const segments = 16;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      let bx: number, by: number;
      if (t <= 0.5) {
        const u = t * 2;
        bx = pRim1.x + (pApex.x - pRim1.x) * u;
        by = pRim1.y + (pApex.y - pRim1.y) * u;
      } else {
        const u = (t - 0.5) * 2;
        bx = pApex.x + (pRim2.x - pApex.x) * u;
        by = pApex.y + (pRim2.y - pApex.y) * u;
      }

      // Multi-frequency organic fracture roughness (coarse break + sharp jagged teeth)
      const coarseWobble = Math.sin(t * Math.PI * 2.5 + biteIndex * 7) * 7.0;
      const mediumWobble = Math.sin(t * Math.PI * 6.0 + biteIndex * 13) * 4.5;
      const fineRoughness = Math.cos(t * Math.PI * 12.0 + biteIndex * 23) * 2.5;
      const totalWobble = coarseWobble + mediumWobble + fineRoughness;

      const nx = -Math.sin(cfg.center) * totalWobble;
      const ny = Math.cos(cfg.center) * totalWobble;
      edgeLine.push({ x: bx + nx, y: by + ny });
    }

    // Outer polygon for destination-out mask: connects outside the papad boundary to cleanly cut the piece
    const maskPoly = [...edgeLine];
    const outerR = radius * 1.7;
    const arcSteps = 6;
    for (let i = 0; i <= arcSteps; i++) {
      const theta = a2 + ((a1 - a2) * (i / arcSteps));
      maskPoly.push({ x: cx + Math.cos(theta) * outerR, y: cy + Math.sin(theta) * outerR });
    }

    return {
      maskPoly,
      handTarget: pApex,
      handAngle: cfg.center,
      handType: cfg.hand,
      apex: pApex,
    };
  }, []);

  // Generates a UNIQUE, RANDOM, UNEVEN polygon shard for the piece held by the hand
  // The final piece (bite 8) is a tiny, delicate morsel (~10-12px)!
  const getHandPiecePolygon = useCallback((biteIndex: number, isFinal: boolean) => {
    const seed = (biteIndex * 41 + 17) % 100;
    // Final morsel is tiny and bite-sized, earlier pieces are naturally proportioned shards
    const baseR = isFinal ? 11 : 16 + (biteIndex % 3) * 3;
    const numVerts = isFinal ? 6 : 8;
    const pts: { x: number; y: number }[] = [];

    for (let i = 0; i < numVerts; i++) {
      const angle = (i / numVerts) * Math.PI * 2;
      // Multi-frequency jagged irregularity
      const rJitter =
        Math.sin(angle * 3 + seed) * (baseR * 0.38) +
        Math.cos(angle * 5 + seed * 2) * (baseR * 0.22);
      const r = Math.max(baseR * 0.5, baseR + rJitter);
      pts.push({
        x: Math.cos(angle) * r * (1 + (i % 2 === 0 ? 0.25 : -0.2)), // uneven anisotropic stretch
        y: Math.sin(angle) * r,
      });
    }
    return pts;
  }, []);

  // Spawn stop-motion crispy crumbs PRODUCED EXCLUSIVELY BY THE CRACKING FRACTURE
  // Sprays OUTWARD away from the papad body onto the empty platter surface (never overlaps with intact papad!)
  const spawnCrackingCrumbs = useCallback(
    (fractureX: number, fractureY: number, outwardAngle: number, isFinal: boolean = false) => {
      const s = stateRef.current;
      const count = isFinal ? 12 : 9;
      const colors = ['#f5e6ba', '#edd48d', '#d9b35e', '#2c221a'];

      const newCrumbs: CrumbParticle[] = [];
      for (let i = 0; i < count; i++) {
        const isMari = Math.random() > 0.65;
        // Direct outward spray strictly into the fracture gap and onto the platter
        const sprayAngle = outwardAngle + (Math.random() - 0.5) * 1.0;
        const initialOffset = 12 + Math.random() * 20;
        const speed = 14 + Math.random() * 22;

        newCrumbs.push({
          x: fractureX + Math.cos(sprayAngle) * initialOffset,
          y: fractureY + Math.sin(sprayAngle) * initialOffset,
          vx: Math.cos(sprayAngle) * speed,
          vy: Math.sin(sprayAngle) * speed + (4 + Math.random() * 5), // gravity downward
          size: isMari ? 1.5 + Math.random() * 1.5 : 2.5 + Math.random() * 3.5,
          color: isMari ? '#2c221a' : colors[Math.floor(Math.random() * 3)],
          isMari,
          frame: 0,
          opacity: 1.0,
        });
      }

      // Retain up to 25 settled crumbs on the platter
      s.crumbs = [...s.crumbs.slice(-18), ...newCrumbs];
    },
    []
  );

  // Trigger bite immediately (on user tap/click)
  const handleUserTap = useCallback(() => {
    const s = stateRef.current;
    sound.unlockContext();

    if (s.phase === 'fresh_pop') return;

    if (s.biteCount >= s.maxBites) {
      s.phase = 'fresh_pop';
      s.phaseTicks = 0;
      return;
    }

    s.phase = 'hand_reach';
    s.phaseTicks = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let offscreen = offscreenCanvasRef.current;
    if (!offscreen) {
      offscreen = document.createElement('canvas');
      offscreenCanvasRef.current = offscreen;
    }
    const offCtx = offscreen.getContext('2d', { alpha: true });
    if (!offCtx) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    stateRef.current.isReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      stateRef.current.isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    let loaded = 0;
    const onLoaded = () => {
      loaded++;
      if (loaded >= 3) {
        setIsLoaded(true);
        resizeCanvas();
        startLoop();
      }
    };

    const papadImg = new Image();
    papadImg.src = '/assets/papad.png';
    papadImg.onload = () => {
      stateRef.current.papadImg = papadImg;
      onLoaded();
    };
    papadImg.onerror = () => { console.warn('Papad image failed to load'); };

    const handBangleImg = new Image();
    handBangleImg.src = '/assets/hand-bangle-clean.png';
    handBangleImg.onload = () => {
      stateRef.current.handBangleImg = handBangleImg;
      onLoaded();
    };

    const handPinchImg = new Image();
    handPinchImg.src = '/assets/hand-pinch-clean.png';
    handPinchImg.onload = () => {
      stateRef.current.handPinchImg = handPinchImg;
      onLoaded();
    };

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container || !canvas || !offscreen) return;

      const rect = container.getBoundingClientRect();
      const css = Math.max(260, Math.min(rect.width || 420, 440));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(css * dpr);
      canvas.height = Math.round(css * dpr);

      offscreen.width = canvas.width;
      offscreen.height = canvas.height;

      const s = stateRef.current;
      s.cssSize = css;
      s.cx = canvas.width * 0.5;
      s.cy = canvas.height * 0.5;
      s.radius = s.cx * 0.81;
    };

    window.addEventListener('resize', resizeCanvas);

    const observer = new IntersectionObserver((entries) => {
      stateRef.current.isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);

    const handleVisibility = () => {
      stateRef.current.isTabActive = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // ========================================================
    // RENDER FUNCTION (Clean, High-End Stop Motion with NO Outlines)
    // ========================================================
    const renderFrame = () => {
      const s = stateRef.current;
      if (!ctx || !offCtx || !s.papadImg) return;

      const w = canvas.width;
      const h = canvas.height;
      const cx = s.cx;
      const cy = s.cy;
      const radius = s.radius;

      ctx.clearRect(0, 0, w, h);

      // 1. SOFT CONTACT SHADOW (Intact, never erased!)
      if (s.papadAlpha > 0.05) {
        ctx.save();
        const remainingRatio = Math.max(0, 1 - s.biteCount / s.maxBites);
        const shadowScale = s.papadScale * (0.35 + 0.65 * remainingRatio);

        ctx.translate(cx + s.jiggleX * 0.5, cy + radius * 0.88 + 8);
        ctx.scale(shadowScale, shadowScale * 0.22);

        const shadowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.88);
        shadowGrad.addColorStop(0, 'rgba(45, 25, 10, 0.40)');
        shadowGrad.addColorStop(0.5, 'rgba(75, 45, 15, 0.18)');
        shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = shadowGrad;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.88, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. RENDER PAPAD ON OFFSCREEN BUFFER (ZERO OUTLINES!)
      if (s.papadAlpha > 0.02) {
        offCtx.clearRect(0, 0, w, h);

        offCtx.save();
        const papadDiam = radius * 2.06;
        offCtx.drawImage(
          s.papadImg,
          cx - papadDiam * 0.5,
          cy - papadDiam * 0.5,
          papadDiam,
          papadDiam
        );

        // Subtractive masking for every bite taken so far (NO STROKES / NO OUTLINES)
        if (s.biteCount > 0) {
          offCtx.save();
          offCtx.globalCompositeOperation = 'destination-out';
          offCtx.fillStyle = '#000000';

          for (let b = 0; b < s.biteCount; b++) {
            const { maskPoly } = getBitePolygon(b, cx, cy, radius);
            if (maskPoly.length > 2) {
              offCtx.beginPath();
              offCtx.moveTo(maskPoly[0].x, maskPoly[0].y);
              for (let i = 1; i < maskPoly.length; i++) {
                offCtx.lineTo(maskPoly[i].x, maskPoly[i].y);
              }
              offCtx.closePath();
              offCtx.fill();
            }
          }
          offCtx.restore();
        }

        offCtx.restore();

        // Draw offscreen papad onto main canvas with stop-motion micro-shift
        ctx.save();
        ctx.translate(cx + s.jiggleX, cy + s.jiggleY);
        ctx.rotate(s.jiggleRot);
        ctx.scale(s.papadScale, s.papadScale);
        ctx.globalAlpha = s.papadAlpha;
        ctx.drawImage(offscreen, -cx, -cy);
        ctx.restore();
      }

      // 3. DRAW STOP-MOTION CRUMBS PRODUCED BY CRACKING
      if (s.crumbs.length > 0) {
        for (const c of s.crumbs) {
          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.globalAlpha = c.opacity;

          if (c.isMari) {
            ctx.fillStyle = c.color;
            ctx.beginPath();
            ctx.arc(0, 0, c.size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = c.color;
            ctx.beginPath();
            ctx.moveTo(-c.size, -c.size * 0.6);
            ctx.lineTo(c.size * 0.9, -c.size * 0.3);
            ctx.lineTo(c.size * 0.5, c.size * 0.8);
            ctx.lineTo(-c.size * 0.6, c.size * 0.5);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        }
      }

      // 4. DRAW STOP-MOTION HAND & SNAPPED PIECE (UNEVEN, RANDOM JAGGED SHARDS - NO OUTLINES!)
      if (s.hand) {
        const h = s.hand;
        const handImg = h.type === 'bangle' ? s.handBangleImg : s.handPinchImg;

        // Draw snapped piece held between fingertips
        if (h.holdingPiece) {
          ctx.save();
          ctx.translate(h.x, h.y);
          ctx.rotate(h.rot);

          // Get unique uneven, random jagged piece polygon for this specific bite
          const piecePts = getHandPiecePolygon(s.biteCount - 1, s.biteCount >= s.maxBites);

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(piecePts[0].x, piecePts[0].y);
          for (let p = 1; p < piecePts.length; p++) {
            ctx.lineTo(piecePts[p].x, piecePts[p].y);
          }
          ctx.closePath();
          ctx.clip();

          // Authentic photographic papad texture with zero stroke/outlines
          const pDiam = radius * 2.06;
          // Offset sample so each piece gets unique blister/pepper specks
          const sampleOffsetX = ((s.biteCount * 67) % 80) - 40;
          const sampleOffsetY = ((s.biteCount * 53) % 80) - 40;
          ctx.drawImage(
            s.papadImg,
            sampleOffsetX - pDiam * 0.5,
            sampleOffsetY - pDiam * 0.5,
            pDiam,
            pDiam
          );
          ctx.restore();

          ctx.restore();
        }

        // Draw Hand with exact anatomical orientation
        if (handImg) {
          ctx.save();
          ctx.translate(h.x, h.y);
          ctx.rotate(h.rot);

          if (h.type === 'bangle') {
            const hScale = (radius * 2) / 680;
            ctx.scale(hScale, hScale);

            ctx.shadowColor = 'rgba(25, 12, 4, 0.30)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 6;

            ctx.drawImage(handImg, -77, -659);
          } else {
            const hScale = (radius * 2) / 720;
            ctx.scale(hScale, hScale);

            ctx.shadowColor = 'rgba(25, 12, 4, 0.30)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 6;

            ctx.drawImage(handImg, -510, -10);
          }
          ctx.restore();
        }
      }
    };

    // ========================================================
    // STOP-MOTION DISCRETE TICK (120ms = ~8.3 FPS)
    // ========================================================
    const tick = () => {
      const s = stateRef.current;
      s.totalTicks++;
      s.phaseTicks++;

      if (s.isReducedMotion) {
        s.papadScale = 1.0;
        s.papadAlpha = 1.0;
        s.jiggleX = 0;
        s.jiggleY = 0;
        s.jiggleRot = 0;
        s.hand = null;
        renderFrame();
        return;
      }

      // Discrete stop-motion micro-jiggle
      s.jiggleX = (Math.random() - 0.5) * 1.4;
      s.jiggleY = (Math.random() - 0.5) * 1.4;
      s.jiggleRot = (Math.random() - 0.5) * 0.009;

      // Update crumb falling steps
      s.crumbs.forEach((c) => {
        if (c.frame === 0) {
          c.frame = 1;
          c.x += c.vx * 0.7;
          c.y += c.vy * 0.7;
        } else if (c.frame === 1) {
          c.frame = 2;
          c.x += c.vx * 0.3;
          c.y += c.vy * 0.3;
        }
      });

      // STOP MOTION TIMELINE
      if (s.phase === 'rest') {
        s.hand = null;
        s.papadScale = 1.0;

        // Rest for 3 ticks (~360ms) between bites
        if (s.phaseTicks >= 3) {
          if (s.biteCount < s.maxBites) {
            s.phase = 'hand_reach';
            s.phaseTicks = 0;
          } else {
            s.phase = 'empty_pause';
            s.phaseTicks = 0;
          }
        }
      } else if (s.phase === 'hand_reach') {
        // Frame 1: Hand snaps in, poised above the piece
        const { handTarget, handAngle, handType } = getBitePolygon(s.biteCount, s.cx, s.cy, s.radius);

        const reachDist = 40;
        const hx = handTarget.x + Math.cos(handAngle) * reachDist;
        const hy = handTarget.y + Math.sin(handAngle) * reachDist;

        const rot = handType === 'bangle' ? handAngle + 0.77 : handAngle - 2.13;

        s.hand = {
          type: handType,
          x: hx,
          y: hy,
          rot,
          holdingPiece: false,
        };

        s.papadScale = 0.99; // Anticipation
        s.phase = 'snap';
        s.phaseTicks = 0;
      } else if (s.phase === 'snap') {
        // Frame 2: SNAP! CRACK OCCURS HERE!
        const isFinal = s.biteCount >= s.maxBites - 1;
        const { handTarget, handAngle, handType, apex } = getBitePolygon(s.biteCount, s.cx, s.cy, s.radius);
        const rot = handType === 'bangle' ? handAngle + 0.77 : handAngle - 2.13;

        if (s.hand) {
          s.hand.x = handTarget.x;
          s.hand.y = handTarget.y;
          s.hand.rot = rot;
          s.hand.holdingPiece = true;
        }

        // Real satisfying Cartoon / ASMR Papad Crunch
        if (soundRef.current) {
          sound.playBiteCrunch(isFinal, s.biteCount, soundTypeRef.current);
        }

        // Tactile snap shake
        s.jiggleX = -Math.cos(handAngle) * 3.8;
        s.jiggleY = -Math.sin(handAngle) * 3.8;
        s.jiggleRot = (Math.random() - 0.5) * 0.03;
        s.papadScale = 1.02;

        // SPAWN CRUMBS FROM THE PHYSICAL CRACKING (Spraying outward away from papad)
        spawnCrackingCrumbs(apex.x, apex.y, handAngle, isFinal);

        // Commit bite!
        s.biteCount++;

        if (onBite) {
          onBite(s.biteCount, s.maxBites - s.biteCount);
        }

        s.phase = 'hand_retreat';
        s.phaseTicks = 0;
      } else if (s.phase === 'hand_retreat') {
        // Frame 3: Hand steps back outward holding the snapped piece
        const { handAngle } = getBitePolygon(s.biteCount - 1, s.cx, s.cy, s.radius);
        if (s.hand) {
          s.hand.x += Math.cos(handAngle) * 75;
          s.hand.y += Math.sin(handAngle) * 75;
          s.hand.holdingPiece = true;
        }

        s.papadScale = 1.0;
        s.phase = 'chew_pause';
        s.phaseTicks = 0;
      } else if (s.phase === 'chew_pause') {
        // Frame 4: Hand is gone, crumbs rest on platter
        s.hand = null;
        if (s.phaseTicks >= 2) {
          s.phase = 'rest';
          s.phaseTicks = 0;
        }
      } else if (s.phase === 'empty_pause') {
        s.hand = null;
        s.papadAlpha = 0;

        // Empty platter rests for 6 ticks (~720ms)
        if (s.phaseTicks >= 6) {
          if (onCycleComplete) onCycleComplete();
          s.phase = 'fresh_pop';
          s.phaseTicks = 0;
        }
      } else if (s.phase === 'fresh_pop') {
        // Fresh papad drops in with a 3-frame stop-motion bounce!
        if (s.phaseTicks === 1) {
          s.biteCount = 0;
          s.crumbs = [];
          s.papadAlpha = 1.0;
          s.papadScale = 0.85;
        } else if (s.phaseTicks === 2) {
          s.papadScale = 1.06; // Overshoot bounce
        } else if (s.phaseTicks >= 3) {
          s.papadScale = 1.0;
          s.phase = 'rest';
          s.phaseTicks = 0;
        }
      }

      renderFrame();
    };

    // Animation Loop
    const loop = (timestamp: number) => {
      const s = stateRef.current;
      if (!s.lastTickTime) s.lastTickTime = timestamp;

      const interval = 120 / speedRef.current;

      if (s.isVisible && s.isTabActive) {
        if (timestamp - s.lastTickTime >= interval) {
          s.lastTickTime = timestamp;
          tick();
        }
      }

      s.rafId = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!stateRef.current.rafId) {
        stateRef.current.lastTickTime = performance.now();
        stateRef.current.rafId = requestAnimationFrame(loop);
      }
    };

    return () => {
      if (stateRef.current.rafId) {
        cancelAnimationFrame(stateRef.current.rafId);
        stateRef.current.rafId = 0;
      }
      window.removeEventListener('resize', resizeCanvas);
      mediaQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [getBitePolygon, getHandPiecePolygon, spawnCrackingCrumbs, onBite, onCycleComplete]);

  return (
    <div
      ref={containerRef}
      onClick={handleUserTap}
      role="button"
      tabIndex={0}
      aria-label="Artisanal stop-motion animation of crisp Gujarati papad being eaten. Tap to take a bite!"
      className={`relative inline-flex flex-col items-center justify-center select-none cursor-pointer focus:outline-none transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {/* Platter Container with overflow-hidden so forearms naturally exit off-screen without cutoffs */}
      <div className="relative w-56 h-56 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] max-w-full flex items-center justify-center overflow-hidden rounded-full">
        {/* Warm Amber Glow Circle (#FFB400) */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-400/40 via-amber-300/30 to-yellow-200/40 blur-2xl -z-10 animate-pulse pointer-events-none" />

        {/* Authentic Brass Thali decorative ring */}
        <div className="absolute inset-2 -z-5 rounded-full border-4 border-amber-300/60 bg-amber-50/30 shadow-inner pointer-events-none" />

        {/* Stop-Motion Canvas */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-contain pointer-events-none transition-opacity duration-200 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
};
