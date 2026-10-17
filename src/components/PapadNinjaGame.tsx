import React, { useRef, useEffect, useCallback } from 'react';
import { sound } from '../utils/audioSynth';
import { Language } from '../types';

interface Point {
  x: number;
  y: number;
  time: number;
}

interface CrumbParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  life: number;
  maxLife: number;
}

interface LoveHeart {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
}

interface BrokenFragment {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  radius: number;
  flavor: PapadFlavor;
  startAngle: number;
  endAngle: number;
  life: number;
  maxLife: number;
}

type PapadFlavor = 'moong_mari' | 'udad_jeera' | 'lasaniya_garlic' | 'rice_khichiya' | 'sindhi_masala';

interface FlyingPapad {
  id: number;
  flavor: PapadFlavor;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  vRot: number;
  wavyOffsets: number[]; // 16 offsets for authentic hand-rolled organic edge
  sliced: boolean;
}

interface PapadNinjaGameProps {
  currentLang?: Language;
}

export const PapadNinjaGame: React.FC<PapadNinjaGameProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // High-frequency refs for 60fps canvas loop
  const papadsRef = useRef<FlyingPapad[]>([]);
  const fragmentsRef = useRef<BrokenFragment[]>([]);
  const crumbsRef = useRef<CrumbParticle[]>([]);
  const loveHeartsRef = useRef<LoveHeart[]>([]);
  const trailRef = useRef<Point[]>([]);
  const isPointerDownRef = useRef<boolean>(false);
  const nextSpawnTimeRef = useRef<number>(Date.now() + 300);
  const nextIdRef = useRef<number>(1);
  const animFrameIdRef = useRef<number>(0);

  // Animated Baby Face Mascot Cursor state
  const cursorPosRef = useRef<{ x: number; y: number; isVisible: boolean }>({
    x: -200,
    y: -200,
    isVisible: false,
  });
  const lickUntilRef = useRef<number>(0);

  // Generate an authentic hand-rolled papad with mathematically controlled apex
  const spawnPapad = useCallback((width: number, height: number) => {
    const id = nextIdRef.current++;
    const flavors: PapadFlavor[] = ['moong_mari', 'udad_jeera', 'lasaniya_garlic', 'rice_khichiya', 'sindhi_masala'];
    const flavor = flavors[Math.floor(Math.random() * flavors.length)];

    // Papad radius: 44px to 54px (authentic plate-size proportion)
    const radius = 44 + Math.random() * 8;

    // Organic wavy edge offsets (16 control points around perimeter)
    const wavyOffsets: number[] = [];
    for (let i = 0; i < 16; i++) {
      wavyOffsets.push(1 + (Math.sin(i * 1.8) * 0.04 + (Math.random() - 0.5) * 0.03));
    }

    const safeW = Math.max(width, 320);
    const safeH = Math.max(height, 240);

    const spawnMargin = Math.min(100, safeW * 0.16);
    const x = spawnMargin + Math.random() * (safeW - spawnMargin * 2);
    const y = safeH + radius + 10;

    // Gentle velocity directed towards central third of arena
    const targetX = safeW * 0.3 + Math.random() * (safeW * 0.4);
    const vx = (targetX - x) / (52 + Math.random() * 20);

    // Physics: Restrained apex at 22% - 45% height of the game area
    const gravity = 0.22;
    const targetApexY = safeH * (0.22 + Math.random() * 0.22);
    const deltaY = Math.max(y - targetApexY, 80);
    const vy = -Math.sqrt(2 * gravity * deltaY);

    const newPapad: FlyingPapad = {
      id,
      flavor,
      x,
      y,
      vx,
      vy,
      radius,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.035,
      wavyOffsets,
      sliced: false,
    };

    papadsRef.current.push(newPapad);
  }, []);

  // Shatter the papad into 4 irregular jagged crispy fragments + crumbs & trigger mascot licking reaction
  const shatterPapad = (papad: FlyingPapad, swipeAngle: number) => {
    if (papad.sliced) return;
    papad.sliced = true;

    // Authentic crisp crunch sound
    sound.playPapadCrunch();

    // Trigger baby mascot cursor licking and loving it for 850ms
    lickUntilRef.current = Date.now() + 850;

    // Spawn floating love hearts from the crunch impact
    for (let i = 0; i < 4; i++) {
      loveHeartsRef.current.push({
        x: papad.x + (Math.random() - 0.5) * 20,
        y: papad.y + (Math.random() - 0.5) * 15,
        vx: (Math.random() - 0.5) * 2.2,
        vy: -2.0 - Math.random() * 2.0,
        size: 8 + Math.random() * 5,
        life: 0,
        maxLife: 38,
      });
    }

    // Create 4 textured irregular jagged fragments
    const numFragments = 4;
    const baseAngle = swipeAngle;
    const angleStep = (Math.PI * 2) / numFragments;

    for (let i = 0; i < numFragments; i++) {
      const fragStart = baseAngle + i * angleStep;
      const fragEnd = fragStart + angleStep;
      const midAngle = (fragStart + fragEnd) / 2;

      // Force outward perpendicular to cut
      const blastSpeed = 3.2 + Math.random() * 2.5;
      const fvx = papad.vx * 0.4 + Math.cos(midAngle) * blastSpeed;
      const fvy = papad.vy * 0.5 + Math.sin(midAngle) * blastSpeed - 1.5;

      fragmentsRef.current.push({
        x: papad.x + Math.cos(midAngle) * 8,
        y: papad.y + Math.sin(midAngle) * 8,
        vx: fvx,
        vy: fvy,
        rotation: papad.rotation,
        vRot: (Math.random() - 0.5) * 0.18,
        radius: papad.radius,
        flavor: papad.flavor,
        startAngle: fragStart,
        endAngle: fragEnd,
        life: 0,
        maxLife: 45 + Math.random() * 15,
      });
    }

    // Spice & crumb burst colors
    const spiceColors = {
      moong_mari: ['#E6BD76', '#DFCA9D', '#1C1816', '#78350F'],
      udad_jeera: ['#DFC085', '#EAD8B2', '#573D1C', '#9E6728'],
      lasaniya_garlic: ['#D99460', '#F8D7B0', '#991B1B', '#B91C1C'],
      rice_khichiya: ['#FAF8F2', '#EBE6D8', '#16A34A', '#8C7D6B'],
      sindhi_masala: ['#D99460', '#F5D79E', '#991B1B', '#1C1816'],
    }[papad.flavor];

    // Spawn 20 crispy shards & crumb particles
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5.5;
      crumbsRef.current.push({
        x: papad.x,
        y: papad.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        size: 2 + Math.random() * 4.5,
        color: spiceColors[Math.floor(Math.random() * spiceColors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.25,
        life: 0,
        maxLife: 30 + Math.random() * 20,
      });
    }
  };

  // Line segment intersects circle hitbox check
  const lineIntersectsCircle = (x1: number, y1: number, x2: number, y2: number, cx: number, cy: number, r: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) {
      const distSq = (cx - x1) * (cx - x1) + (cy - y1) * (cy - y1);
      return distSq <= r * r;
    }

    const u = ((cx - x1) * dx + (cy - y1) * dy) / lenSq;
    const clampedU = Math.max(0, Math.min(1, u));

    const nearestX = x1 + clampedU * dx;
    const nearestY = y1 + clampedU * dy;

    const distSq = (cx - nearestX) * (cx - nearestX) + (cy - nearestY) * (cy - nearestY);
    return distSq <= r * r;
  };

  // Process pointer motion: supports tap/click, hold-and-drag slice, and swift hover slicing
  const processSwipePoint = (x: number, y: number, isDown: boolean) => {
    sound.unlockContext();
    const now = Date.now();
    const trail = trailRef.current;
    const prevPoint = trail[trail.length - 1];

    trail.push({ x, y, time: now });

    // 1. Direct point hit / tap (if clicked directly on a papad)
    if (isDown) {
      papadsRef.current.forEach((papad) => {
        if (!papad.sliced) {
          const dist = Math.hypot(x - papad.x, y - papad.y);
          if (dist <= papad.radius * 1.08) {
            shatterPapad(papad, Math.random() * Math.PI * 2);
          }
        }
      });
    }

    // 2. Swipe slicing (when dragging OR swift hover slicing)
    if (prevPoint) {
      const dist = Math.hypot(x - prevPoint.x, y - prevPoint.y);
      const dt = Math.max(now - prevPoint.time, 1);
      const speed = dist / dt; // px/ms

      // Active slice condition:
      // Either holding down (any movement > 3px)
      // OR quick swift hover flick without holding down (speed > 0.28 px/ms and dist > 6px)
      const isSlicing = (isDown && dist > 3) || (dist > 6 && speed > 0.28);

      if (isSlicing) {
        if (speed > 0.9 && dist > 14) {
          sound.playWhoosh();
        }

        const swipeAngle = Math.atan2(y - prevPoint.y, x - prevPoint.x);

        papadsRef.current.forEach((papad) => {
          if (!papad.sliced) {
            if (lineIntersectsCircle(prevPoint.x, prevPoint.y, x, y, papad.x, papad.y, papad.radius * 1.08)) {
              shatterPapad(papad, swipeAngle);
            }
          }
        });
      }
    }
  };

  // Draw an authentic Indian papad onto canvas with organic wavy edge, roasted blisters & spices
  const drawAuthenticPapad = (
    ctx: CanvasRenderingContext2D,
    flavor: PapadFlavor,
    radius: number,
    wavyOffsets: number[]
  ) => {
    ctx.save();

    // Subtle 3D lift shadow so papad floats crisply above clean white/cream background
    ctx.shadowColor = 'rgba(0, 0, 0, 0.12)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    // 1. Organic Hand-Rolled Papad Perimeter
    ctx.beginPath();
    const numPoints = wavyOffsets.length || 16;
    for (let i = 0; i <= numPoints; i++) {
      const idx = i % numPoints;
      const angle = (i / numPoints) * Math.PI * 2;
      const r = radius * wavyOffsets[idx];
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();

    // 2. Authentic Roasted Papad Base Shading
    const flavorPalettes = {
      moong_mari: {
        gradientStart: '#E8C582',
        gradientEnd: '#CF9C52',
        rimColor: '#A36F2B',
        bubbleDark: '#5E3812',
      },
      udad_jeera: {
        gradientStart: '#E2C288',
        gradientEnd: '#C79A50',
        rimColor: '#966929',
        bubbleDark: '#573D1C',
      },
      lasaniya_garlic: {
        gradientStart: '#E8A370',
        gradientEnd: '#C9733E',
        rimColor: '#8C3D18',
        bubbleDark: '#5C1D06',
      },
      rice_khichiya: {
        gradientStart: '#FBF9F2',
        gradientEnd: '#E6DECD',
        rimColor: '#B5A693',
        bubbleDark: '#6B5E4F',
      },
      sindhi_masala: {
        gradientStart: '#E09C62',
        gradientEnd: '#BD6C36',
        rimColor: '#7E3310',
        bubbleDark: '#4D1504',
      },
    }[flavor];

    const grad = ctx.createRadialGradient(
      -radius * 0.25,
      -radius * 0.25,
      radius * 0.1,
      0,
      0,
      radius
    );
    grad.addColorStop(0, flavorPalettes.gradientStart);
    grad.addColorStop(0.7, flavorPalettes.gradientEnd);
    grad.addColorStop(1, flavorPalettes.rimColor);

    ctx.fillStyle = grad;
    ctx.fill();

    // Crisp toasted rim
    ctx.strokeStyle = flavorPalettes.rimColor;
    ctx.lineWidth = 2.0;
    ctx.stroke();

    // 3. Puffed Blister Bubbles (Small irregular roasted pockets)
    const blisterPositions = [
      { x: -radius * 0.45, y: -radius * 0.25, r: 6.5 },
      { x: radius * 0.35, y: -radius * 0.4, r: 5.5 },
      { x: -radius * 0.2, y: radius * 0.45, r: 7.0 },
      { x: radius * 0.4, y: radius * 0.3, r: 5.0 },
      { x: radius * 0.1, y: -radius * 0.15, r: 4.5 },
      { x: -radius * 0.5, y: radius * 0.15, r: 5.0 },
      { x: radius * 0.2, y: radius * 0.5, r: 4.0 },
    ];

    blisterPositions.forEach((b) => {
      // Dark toasted shadow
      ctx.beginPath();
      ctx.ellipse(b.x, b.y, b.r, b.r * 0.8, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = flavorPalettes.bubbleDark;
      ctx.globalAlpha = 0.55;
      ctx.fill();

      // Specular highlight on blister peak
      ctx.beginPath();
      ctx.ellipse(b.x - 1.2, b.y - 1.2, b.r * 0.45, b.r * 0.35, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF8E7';
      ctx.globalAlpha = 0.65;
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // 4. Flavor-Specific Handcrafted Spices
    if (flavor === 'moong_mari') {
      // Coarse cracked black pepper (Mari)
      ctx.fillStyle = '#181412';
      [
        [-radius * 0.35, -radius * 0.1],
        [-radius * 0.1, radius * 0.2],
        [radius * 0.25, -radius * 0.3],
        [radius * 0.15, radius * 0.2],
        [-radius * 0.4, radius * 0.35],
        [radius * 0.45, -radius * 0.15],
        [-radius * 0.05, -radius * 0.35],
        [radius * 0.3, radius * 0.35],
      ].forEach(([px, py]) => {
        ctx.beginPath();
        ctx.arc(px, py, 2.2 + Math.random() * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    if (flavor === 'udad_jeera') {
      // Whole toasted cumin seeds (Jeera) - slender pointed oval
      ctx.fillStyle = '#42280E';
      [
        [-radius * 0.3, radius * 0.1, 0.5],
        [radius * 0.2, -radius * 0.25, -0.8],
        [-radius * 0.15, -radius * 0.3, 0.2],
        [radius * 0.35, radius * 0.15, 1.2],
        [0, radius * 0.35, -0.3],
      ].forEach(([jx, jy, rot]) => {
        ctx.save();
        ctx.translate(jx, jy);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, 4.5, 1.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    if (flavor === 'lasaniya_garlic' || flavor === 'sindhi_masala') {
      // Red chili flakes & toasted garlic bits
      ctx.fillStyle = '#991B1B';
      [
        [-radius * 0.3, -radius * 0.2],
        [radius * 0.3, radius * 0.2],
        [0, -radius * 0.25],
        [-radius * 0.15, radius * 0.3],
        [radius * 0.2, -radius * 0.05],
      ].forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.arc(cx, cy, 2.8, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    if (flavor === 'rice_khichiya') {
      // White sesame seeds & green chili specks
      ctx.fillStyle = '#A89F91';
      [
        [-radius * 0.25, -radius * 0.2, 0.3],
        [radius * 0.2, radius * 0.25, -0.5],
        [-radius * 0.1, radius * 0.25, 0.7],
      ].forEach(([sx, sy, rot]) => {
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(rot);
        ctx.fillRect(-3, -1.5, 6, 3);
        ctx.restore();
      });
      // Green chili speck
      ctx.fillStyle = '#16A34A';
      ctx.beginPath();
      ctx.arc(radius * 0.15, -radius * 0.2, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  // Draw an ultra-cute animated baby face mascot cursor with eye-tracking, chomping bite & licking mouth
  const drawBabyMascotCursor = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    nearestPapad: FlyingPapad | null,
    minDist: number,
    isLicking: boolean,
    now: number
  ) => {
    ctx.save();
    ctx.translate(x, y);

    // Direction vector towards nearest papad for eyes and dynamic head angle
    let angle = -Math.PI / 2; // Default looking slightly up
    let lookDist = 0;
    if (nearestPapad) {
      angle = Math.atan2(nearestPapad.y - y, nearestPapad.x - x);
      lookDist = Math.min(3.8, Math.max(1.2, 45 / Math.max(minDist, 10)));
    }

    // Hovering within biting distance of a papad
    const isBiting = !isLicking && nearestPapad !== null && minDist < (nearestPapad.radius + 65);

    // Slight playful head tilt towards look target
    const headTilt = nearestPapad ? Math.sin(angle) * 0.12 : Math.sin(now * 0.003) * 0.05;
    ctx.rotate(headTilt);

    // 1. Soft Ambient Drop Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    // 2. Round Golden Dough Baby Face Base (Radius 21px)
    const headGrad = ctx.createRadialGradient(-5, -6, 2, 0, 0, 21);
    headGrad.addColorStop(0, '#FFFBEB'); // Warm creamy highlight
    headGrad.addColorStop(0.45, '#FDE68A'); // Soft golden baby skin
    headGrad.addColorStop(0.85, '#F59E0B'); // Warm amber dough
    headGrad.addColorStop(1, '#D97706'); // Toasted golden outline

    ctx.beginPath();
    ctx.arc(0, 0, 21, 0, Math.PI * 2);
    ctx.fillStyle = headGrad;
    ctx.fill();
    ctx.restore();

    // Bold cartoon outline
    ctx.beginPath();
    ctx.arc(0, 0, 21, 0, Math.PI * 2);
    ctx.strokeStyle = '#1C1917';
    ctx.lineWidth = 2.4;
    ctx.stroke();

    // 3. Cute Mini Roasted Papad Bun on Top
    ctx.save();
    ctx.translate(0, -20);
    ctx.beginPath();
    ctx.ellipse(0, -2, 7, 5, 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
    ctx.strokeStyle = '#1C1917';
    ctx.lineWidth = 1.8;
    ctx.stroke();
    // Tiny red chili / paprika dot
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(0, -2, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Soft Rosy Blushed Cheeks
    const blushAlpha = isLicking ? 0.95 : isBiting ? 0.85 : 0.6;
    ctx.fillStyle = '#FB7185';
    ctx.globalAlpha = blushAlpha;
    ctx.beginPath();
    ctx.ellipse(-11, 5, 4.5, 3.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(11, 5, 4.5, 3.2, 0, 0, Math.PI * 2);
    ctx.globalAlpha = 1.0;

    // 5. Animated Eyes (Tracking papad / Wide excited / Joyful licking arcs)
    const leftEyeX = -7.5;
    const rightEyeX = 7.5;
    const eyeY = -3.5;

    if (isLicking) {
      // Joyful Happy Squeezed Arcs ( ^ ‿ ^ )
      ctx.strokeStyle = '#1C1917';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.arc(leftEyeX, eyeY + 1, 4.5, Math.PI * 1.15, Math.PI * 1.85, false);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(rightEyeX, eyeY + 1, 4.5, Math.PI * 1.15, Math.PI * 1.85, false);
      ctx.stroke();
    } else {
      // Sclera (White eye background)
      const eyeR = isBiting ? 5.8 : 5.0;

      [-1, 1].forEach((side) => {
        const ex = side * 7.5;
        ctx.beginPath();
        ctx.arc(ex, eyeY, eyeR, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#1C1917';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Pupil tracking nearest papad!
        const pdx = Math.cos(angle) * lookDist;
        const pdy = Math.sin(angle) * lookDist;
        const pupilR = isBiting ? 3.8 : 3.2;

        ctx.beginPath();
        ctx.arc(ex + pdx, eyeY + pdy, pupilR, 0, Math.PI * 2);
        ctx.fillStyle = '#1C1917';
        ctx.fill();

        // White specular reflections (Cute anime sparkles)
        ctx.beginPath();
        ctx.arc(ex + pdx - 1.2, eyeY + pdy - 1.2, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ex + pdx + 1.2, eyeY + pdy + 1.2, 0.7, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });
    }

    // 6. Animated Mouth (Licking lips / Biting chomps / Happy baby smile)
    if (isLicking) {
      // Animated licking tongue moving across lip!
      const lickOsc = Math.sin(now * 0.016);
      ctx.save();
      // Smiling mouth base
      ctx.beginPath();
      ctx.arc(0, 5, 5, 0.15, Math.PI - 0.15, false);
      ctx.strokeStyle = '#1C1917';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Pink tongue licking lips
      ctx.translate(lickOsc * 2.5, 4.5);
      ctx.beginPath();
      ctx.ellipse(0, -1.2, 3.6, 5.0, lickOsc * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = '#F43F5E';
      ctx.fill();
      ctx.strokeStyle = '#881337';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Tongue highlight
      ctx.beginPath();
      ctx.arc(-0.8, -2.2, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FDA4AF';
      ctx.fill();
      ctx.restore();
    } else if (isBiting) {
      // Biting animation: Rhythmic Chomping Mouth ("NOM NOM!")
      const chompProgress = (Math.sin(now * 0.022) + 1) * 0.5; // 0 to 1
      const openH = 4 + chompProgress * 7; // 4px to 11px mouth height

      ctx.save();
      ctx.translate(0, 6);
      // Dark red mouth cavity
      ctx.beginPath();
      ctx.ellipse(0, 0, 6, openH / 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#881337';
      ctx.fill();
      ctx.strokeStyle = '#1C1917';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Tiny cute top baby tooth
      ctx.beginPath();
      ctx.rect(-1.8, -openH / 2, 3.6, 2.5);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Pink tongue inside mouth
      ctx.beginPath();
      ctx.ellipse(0, openH / 2 - 1.5, 3.8, 2.2, 0, 0, Math.PI);
      ctx.fillStyle = '#F43F5E';
      ctx.fill();
      ctx.restore();
    } else {
      // Default / Watching: Sweet baby smile
      ctx.beginPath();
      ctx.arc(0, 5, 4.5, 0.18, Math.PI - 0.18, false);
      ctx.strokeStyle = '#1C1917';
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    ctx.restore();
  };

  // Main 60fps Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    const ro = new ResizeObserver(() => {
      resizeCanvas();
    });
    ro.observe(canvas);

    let isVisible = false;
    const io = new IntersectionObserver(
      (entries) => {
        const wasVisible = isVisible;
        isVisible = entries[0].isIntersecting;
        if (!wasVisible && isVisible && isRunning) {
          animFrameIdRef.current = requestAnimationFrame(render);
        }
      },
      { threshold: 0.01, rootMargin: '100px' }
    );
    io.observe(canvas);

    const render = () => {
      if (!isRunning || !isVisible) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clean transparent canvas clear, allowing white/cream footer background to shine through
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      // 1. Spawning papads with gentle cadence (1-2 papads max on screen)
      if (now > nextSpawnTimeRef.current && papadsRef.current.length < 2 && width > 50 && height > 50) {
        spawnPapad(width, height);
        // Next spawn in 1.4s to 2.4s
        nextSpawnTimeRef.current = now + 1400 + Math.random() * 1000;
      }

      // 2. Update & Draw Flying Papads (with gentle restrained gravity)
      const gravity = 0.22;
      papadsRef.current = papadsRef.current.filter((papad) => {
        if (papad.sliced) return false;

        papad.x += papad.vx;
        papad.y += papad.vy;
        papad.vy += gravity;
        papad.rotation += papad.vRot;

        ctx.save();
        ctx.translate(papad.x, papad.y);
        ctx.rotate(papad.rotation);
        drawAuthenticPapad(ctx, papad.flavor, papad.radius, papad.wavyOffsets);
        ctx.restore();

        // Keep papad while it is above bottom spawn line
        return papad.y < height + papad.radius + 20;
      });

      // 3. Update & Draw Broken Textured Fragments
      fragmentsRef.current = fragmentsRef.current.filter((frag) => {
        frag.life += 1;
        frag.x += frag.vx;
        frag.y += frag.vy;
        frag.vy += 0.24; // gravity
        frag.rotation += frag.vRot;

        const progress = frag.life / frag.maxLife;
        const alpha = Math.max(0, 1 - progress);

        ctx.save();
        ctx.translate(frag.x, frag.y);
        ctx.rotate(frag.rotation);
        ctx.globalAlpha = alpha;

        // Clip pie-slice jagged fragment from the authentic papad
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, frag.radius, frag.startAngle, frag.endAngle, false);
        ctx.closePath();
        ctx.clip();

        // Draw papad artwork inside the fragment
        drawAuthenticPapad(ctx, frag.flavor, frag.radius, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

        // Draw crispy golden fracture line along edges
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.7)';
        ctx.lineWidth = 2.0;
        ctx.stroke();

        ctx.restore();

        return frag.life < frag.maxLife && frag.y < height + 80;
      });

      // 4. Update & Draw Crumb Particles
      crumbsRef.current = crumbsRef.current.filter((crumb) => {
        crumb.life += 1;
        crumb.x += crumb.vx;
        crumb.y += crumb.vy;
        crumb.vy += 0.2;
        crumb.rotation += crumb.vRot;

        const progress = crumb.life / crumb.maxLife;
        const alpha = Math.max(0, 1 - progress);

        ctx.save();
        ctx.translate(crumb.x, crumb.y);
        ctx.rotate(crumb.rotation);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = crumb.color;
        ctx.fillRect(-crumb.size / 2, -crumb.size / 2, crumb.size, crumb.size);
        ctx.restore();

        return crumb.life < crumb.maxLife;
      });

      // 5. Draw Glowing Fiery Blade Swipe Trail (Rich Saffron-Amber on White)
      const trail = trailRef.current;
      while (trail.length > 0 && now - trail[0].time > 150) {
        trail.shift();
      }

      if (trail.length > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Outer Saffron-Orange Flame Glow
        ctx.shadowColor = 'rgba(234, 88, 12, 0.45)';
        ctx.shadowBlur = 12;

        for (let i = 1; i < trail.length; i++) {
          const p1 = trail[i - 1];
          const p2 = trail[i];
          const progress = i / trail.length;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          ctx.strokeStyle = `rgba(217, 119, 6, ${progress * 0.9})`;
          ctx.lineWidth = progress * 7 + 2;
          ctx.stroke();

          ctx.strokeStyle = `rgba(245, 158, 11, ${progress * 0.95})`;
          ctx.lineWidth = progress * 3.5 + 1;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 6. Draw Animated Baby Face Mascot Cursor (Replaces default pointer)
      const cursor = cursorPosRef.current;
      if (cursor.isVisible && cursor.x > 0 && cursor.y > 0) {
        // Find nearest flying papad to track with eyes
        let nearestPapad: FlyingPapad | null = null;
        let minDist = Infinity;
        papadsRef.current.forEach((papad) => {
          if (!papad.sliced) {
            const d = Math.hypot(papad.x - cursor.x, papad.y - cursor.y);
            if (d < minDist) {
              minDist = d;
              nearestPapad = papad;
            }
          }
        });

        const isLicking = now < lickUntilRef.current;

        // Periodic love heart floaters when actively licking and loving it
        if (isLicking && Math.random() > 0.75) {
          loveHeartsRef.current.push({
            x: cursor.x + (Math.random() - 0.5) * 24,
            y: cursor.y - 18,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -1.4 - Math.random() * 1.5,
            size: 6 + Math.random() * 5,
            life: 0,
            maxLife: 32,
          });
        }

        // Draw and update love hearts
        loveHeartsRef.current = loveHeartsRef.current.filter((heart) => {
          heart.life++;
          heart.x += heart.vx;
          heart.y += heart.vy;
          const progress = heart.life / heart.maxLife;

          ctx.save();
          ctx.translate(heart.x, heart.y);
          ctx.globalAlpha = Math.max(0, 1 - progress);
          ctx.fillStyle = '#F43F5E';

          // Clean heart shape
          ctx.beginPath();
          const s = heart.size / 2;
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.2, s * 0.4, 0, s * 1.3);
          ctx.bezierCurveTo(s * 1.2, s * 0.4, s, -s * 0.6, 0, s * 0.3);
          ctx.fill();
          ctx.restore();

          return heart.life < heart.maxLife;
        });

        // Draw the Animated Baby Mascot Cursor
        drawBabyMascotCursor(ctx, cursor.x, cursor.y, nearestPapad, minDist, isLicking, now);
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animFrameIdRef.current);
      ro.disconnect();
      io.disconnect();
    };
  }, [spawnPapad]);

  // Pointer Press / Drag Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isPointerDownRef.current = true;
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cursorPosRef.current = { x, y, isVisible: true };
    trailRef.current = [];
    processSwipePoint(x, y, true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cursorPosRef.current = { x, y, isVisible: true };
    processSwipePoint(x, y, isPointerDownRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isPointerDownRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerLeave = () => {
    isPointerDownRef.current = false;
    cursorPosRef.current.isVisible = false;
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cursorPosRef.current = { x, y, isVisible: true };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden"
    >
      {/* Slicing Canvas covers entire arena as a full-bleed interactive background with animated baby mascot cursor */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="absolute inset-0 w-full h-full block touch-none cursor-none z-0"
      />
    </div>
  );
};
