// Procedural Voronoi & Delaunay Jittered Papad Fracture Engine
// Generates authentic jagged, organic shards and realistic crumb physics

export interface Point {
  x: number;
  y: number;
}

export interface Crumb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  isMari: boolean; // Dark pepper speck
}

export interface Shard {
  id: number;
  site: Point;
  polygon: Point[];       // Outer boundary polygon (jagged on internal edges)
  originalPolygon: Point[];
  neighbors: number[];    // Neighbor shard IDs
  isRim: boolean;         // Touches the outer papad rim
  state: 'intact' | 'cracking' | 'flying' | 'eaten';
  crackProgress: number;  // 0 to 1
  flyProgress: number;    // 0 to 1
  flyDx: number;
  flyDy: number;
  flyRot: number;
  flyScale: number;
  flyAlpha: number;
  subSplit?: {
    splitLine: [Point, Point];
    polyA: Point[];
    polyB: Point[];
    eatenPart: 'A' | 'B';
  };
}

export interface FractureMesh {
  shards: Shard[];
  center: Point;
  radius: number;
}

// Deterministic Mulberry32 PRNG
export function createRNG(seed: number) {
  let s = (seed >>> 0) || 123456789;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Sutherland-Hodgman Polygon Clipping by half-plane
// Keeps points where dot(pt - mid, dir) <= 0
function clipPolygonByHalfPlane(
  polygon: Point[],
  pSite: Point,
  pOther: Point
): Point[] {
  if (polygon.length < 3) return polygon;

  // Midpoint between pSite and pOther
  const mx = (pSite.x + pOther.x) * 0.5;
  const my = (pSite.y + pOther.y) * 0.5;

  // Normal pointing from pSite to pOther
  const nx = pOther.x - pSite.x;
  const ny = pOther.y - pSite.y;

  const isInside = (pt: Point) => {
    return (pt.x - mx) * nx + (pt.y - my) * ny <= 0.0001;
  };

  const lineIntersection = (a: Point, b: Point): Point => {
    const dax = a.x - mx;
    const day = a.y - my;
    const dbx = b.x - mx;
    const dby = b.y - my;
    const da = dax * nx + day * ny;
    const db = dbx * nx + dby * ny;
    const t = da / (da - db);
    return {
      x: a.x + t * (b.x - a.x),
      y: a.y + t * (b.y - a.y),
    };
  };

  const outputList: Point[] = [];
  let s = polygon[polygon.length - 1];

  for (let i = 0; i < polygon.length; i++) {
    const e = polygon[i];
    if (isInside(e)) {
      if (isInside(s)) {
        outputList.push(e);
      } else {
        outputList.push(lineIntersection(s, e));
        outputList.push(e);
      }
    } else if (isInside(s)) {
      outputList.push(lineIntersection(s, e));
    }
    s = e;
  }

  return outputList;
}

// Subdivide a straight line segment with organic noise-displaced jagged edges
export function makeJaggedSegment(
  p1: Point,
  p2: Point,
  seedKey: number,
  intensity: number = 3.5
): Point[] {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.hypot(dx, dy);
  if (len < 10) return [p1, p2];

  // Perpendicular unit vector
  const px = -dy / len;
  const py = dx / len;

  // Simple pseudo-random hash for this segment
  let h = (seedKey ^ 0x9e3779b9) >>> 0;
  const rand = () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507) >>> 0;
    return (h / 4294967296) * 2 - 1;
  };

  const numSub = Math.min(4, Math.max(2, Math.floor(len / 18)));
  const result: Point[] = [p1];

  for (let i = 1; i < numSub; i++) {
    const t = i / numSub;
    const jitter = rand() * intensity * Math.sin(t * Math.PI);
    result.push({
      x: p1.x + dx * t + px * jitter,
      y: p1.y + dy * t + py * jitter,
    });
  }
  result.push(p2);
  return result;
}

// Generate organic Voronoi fracture shards
export function generatePapadFracture(
  width: number,
  height: number,
  seed: number,
  shardCountTarget: number = 18
): FractureMesh {
  const rng = createRNG(seed);
  const cx = width * 0.5;
  const cy = height * 0.5;
  const radius = Math.min(width, height) * 0.44;

  // 1. Generate jittered polar sites: center, inner ring, outer rim
  const sites: Point[] = [];

  // Center/core sites (1-2)
  sites.push({
    x: cx + (rng() - 0.5) * radius * 0.2,
    y: cy + (rng() - 0.5) * radius * 0.2,
  });

  // Inner ring (5-6 sites)
  const innerCount = 5 + Math.floor(rng() * 2);
  for (let i = 0; i < innerCount; i++) {
    const angle = ((i + (rng() - 0.5) * 0.5) / innerCount) * Math.PI * 2;
    const r = radius * (0.35 + rng() * 0.2);
    sites.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    });
  }

  // Outer ring (10-14 sites)
  const outerTarget = Math.max(8, shardCountTarget - sites.length);
  for (let i = 0; i < outerTarget; i++) {
    const angle = ((i + (rng() - 0.5) * 0.4) / outerTarget) * Math.PI * 2;
    const r = radius * (0.74 + rng() * 0.22);
    sites.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    });
  }

  // 2. Base circular boundary polygon (40 segments with subtle natural wavy papad edge)
  const baseDiscSegments = 40;
  const baseCirclePoly: Point[] = [];
  for (let i = 0; i < baseDiscSegments; i++) {
    const angle = (i / baseDiscSegments) * Math.PI * 2;
    // Tiny natural organic rim wobble
    const wobble = Math.sin(angle * 5 + seed) * 2.5 + Math.cos(angle * 3) * 1.5;
    const r = radius + wobble;
    baseCirclePoly.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    });
  }

  // 3. Clip each site against every other site using Sutherland-Hodgman
  const rawCells: Point[][] = [];
  const neighborSets: Set<number>[] = [];

  for (let i = 0; i < sites.length; i++) {
    neighborSets.push(new Set<number>());
    let poly = [...baseCirclePoly];

    for (let j = 0; j < sites.length; j++) {
      if (i === j) continue;
      const prevLen = poly.length;
      poly = clipPolygonByHalfPlane(poly, sites[i], sites[j]);
      // If clipping changed the polygon or vertices lie on boundary, they might be neighbors
      if (poly.length !== prevLen || poly.length >= 3) {
        // We'll verify actual distance between sites
        const d = Math.hypot(sites[i].x - sites[j].x, sites[i].y - sites[j].y);
        if (d < radius * 0.95) {
          neighborSets[i].add(j);
        }
      }
    }
    rawCells.push(poly);
  }

  // 4. Refine polygon edges with jagged noise displacements
  const shards: Shard[] = [];

  for (let i = 0; i < sites.length; i++) {
    const poly = rawCells[i];
    if (poly.length < 3) continue;

    // Determine if touching the outer rim
    let touchesRim = false;
    for (const pt of poly) {
      const d = Math.hypot(pt.x - cx, pt.y - cy);
      if (d >= radius * 0.88) {
        touchesRim = true;
        break;
      }
    }

    // Jagged internal edges
    const jaggedPoly: Point[] = [];
    for (let k = 0; k < poly.length; k++) {
      const p1 = poly[k];
      const p2 = poly[(k + 1) % poly.length];

      // Check if this segment is on the outer circle boundary
      const midX = (p1.x + p2.x) * 0.5;
      const midY = (p1.y + p2.y) * 0.5;
      const distFromCenter = Math.hypot(midX - cx, midY - cy);
      const isOuterEdge = distFromCenter >= radius * 0.94;

      if (isOuterEdge) {
        jaggedPoly.push(p1);
      } else {
        // Internal fracture line: make it realistically jagged
        // Seed key from integer coordinates of endpoints
        const seedKey =
          (Math.round(p1.x * 10) ^ Math.round(p2.y * 10) ^ (seed * 31)) >>> 0;
        const sub = makeJaggedSegment(p1, p2, seedKey, 3.2);
        for (let s = 0; s < sub.length - 1; s++) {
          jaggedPoly.push(sub[s]);
        }
      }
    }

    // Pre-calculate flight direction toward mouth (upper right: angles -30deg to -75deg)
    const flyAngle = -Math.PI * (0.18 + rng() * 0.22); // ~32 to ~72 degrees into upper right
    const flySpeed = 100 + rng() * 90;

    shards.push({
      id: shards.length,
      site: sites[i],
      polygon: jaggedPoly,
      originalPolygon: [...jaggedPoly],
      neighbors: Array.from(neighborSets[i]),
      isRim: touchesRim,
      state: 'intact',
      crackProgress: 0,
      flyProgress: 0,
      flyDx: Math.cos(flyAngle) * flySpeed,
      flyDy: Math.sin(flyAngle) * flySpeed,
      flyRot: (rng() - 0.3) * 0.6, // Slight clockwise bias
      flyScale: 0.45 + rng() * 0.2,
      flyAlpha: 1.0,
    });
  }

  return {
    shards,
    center: { x: cx, y: cy },
    radius,
  };
}

// Generate explosive crunchy crumb particles
export function generateCrumbs(
  originX: number,
  originY: number,
  count: number,
  isBigCrunch: boolean = false
): Crumb[] {
  const crumbs: Crumb[] = [];
  const crumbColors = [
    '#f5e5b8', // light sun-dried lentil dough
    '#ecd28c', // golden wafer
    '#d6b05e', // toasted amber
    '#c89b42', // crispy brown ridge
    '#2c241b', // Mari (black pepper speck)
    '#3e3123', // roasted pepper speck
  ];

  for (let i = 0; i < count; i++) {
    // Bias towards upper-right quadrant with explosive spread
    const angle =
      -Math.PI * 0.25 + (Math.random() - 0.5) * Math.PI * (isBigCrunch ? 1.8 : 1.3);
    const speed = (isBigCrunch ? 140 : 90) + Math.random() * (isBigCrunch ? 280 : 180);
    const isMari = Math.random() > 0.72;
    const color = isMari ? (Math.random() > 0.5 ? '#2c241b' : '#3e3123') : crumbColors[Math.floor(Math.random() * 4)];
    const size = isMari ? 1.5 + Math.random() * 1.5 : 2.0 + Math.random() * (isBigCrunch ? 3.5 : 2.5);
    const maxLife = 0.6 + Math.random() * (isBigCrunch ? 0.9 : 0.6);

    crumbs.push({
      x: originX + (Math.random() - 0.5) * 16,
      y: originY + (Math.random() - 0.5) * 16,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (isBigCrunch ? 80 : 40),
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 18,
      size,
      color,
      alpha: 1.0,
      life: maxLife,
      maxLife,
      isMari,
    });
  }

  return crumbs;
}

// Update particle physics: parabolic gravity, air resistance, rotation
export function updateCrumbs(crumbs: Crumb[], dt: number): Crumb[] {
  const gravity = 580; // px/s^2 downwards
  const drag = 0.97;   // air resistance

  return crumbs
    .map((c) => {
      c.x += c.vx * dt;
      c.y += c.vy * dt;
      c.vy += gravity * dt;
      c.vx *= drag;
      c.vy *= drag;
      c.rotation += c.vRot * dt;
      c.life -= dt;
      c.alpha = Math.max(0, c.life / c.maxLife);
      return c;
    })
    .filter((c) => c.life > 0 && c.alpha > 0.02);
}
