import * as THREE from "three";

/**
 * Procedural facade textures for the Building Explorer.
 *
 * Every box face gets a canvas painted at its real size (1 model unit = 1 px,
 * drawn at PX_SCALE for crispness), so floor lines, windows and balconies stay
 * at a constant real-world rhythm no matter how wide or tall the box is.
 *
 * Floor pitches: Heights 19 · Complex 16 · Trade Center 18 · Apartment One 17 · Medicine 26
 */

const PX_SCALE = 3;
const MAX_CANVAS = 2048;

type Painter = (p: Paint) => void;

class Paint {
  constructor(
    public ctx: CanvasRenderingContext2D,
    public W: number,
    public H: number,
  ) {}

  fill(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.W, this.H);
  }

  /** horizontal stripes repeating from the BOTTOM edge (CSS `to top`) */
  hBands(period: number, from: number, to: number, color: string, yMin = 0, yMax = this.H) {
    this.ctx.fillStyle = color;
    for (let y0 = 0; y0 < this.H; y0 += period) {
      const a = Math.max(y0 + from, yMin);
      const b = Math.min(y0 + to, yMax);
      if (b > a) this.ctx.fillRect(0, this.H - b, this.W, b - a);
    }
  }

  /** vertical stripes repeating from the LEFT edge (CSS `to right`) */
  vBands(period: number, from: number, to: number, color: string, yMin = 0, yMax = this.H) {
    this.ctx.fillStyle = color;
    const top = this.H - Math.min(yMax, this.H);
    const h = Math.min(yMax, this.H) - yMin;
    for (let x0 = 0; x0 < this.W; x0 += period) {
      this.ctx.fillRect(x0 + from, top, to - from, h);
    }
  }

  bottom(h: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, this.H - h, this.W, h);
  }

  top(h: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.W, h);
  }

  border(t: number, color: string) {
    const { ctx, W, H } = this;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, t);
    ctx.fillRect(0, H - t, W, t);
    ctx.fillRect(0, 0, t, H);
    ctx.fillRect(W - t, 0, t, H);
  }
}

const PAINTERS: Record<string, Painter> = {
  /* ---- shared ---- */
  "bld-roof": (p) => p.fill("#fff6e8"),
  "bld-roof-concrete": (p) => {
    p.fill("#dcd6cb");
    p.hBands(18, 0, 1, "rgba(0,0,0,0.06)");
    p.vBands(18, 0, 1, "rgba(0,0,0,0.06)");
    p.border(2, "rgba(0,0,0,0.08)");
  },
  "bld-lawn": (p) => {
    p.fill("#5f9a4a");
    p.vBands(12, 0, 6, "rgba(255,255,255,0.07)");
  },
  "bld-solar": (p) => {
    p.fill("#2c4868");
    p.vBands(12, 11, 12, "rgba(255,255,255,0.35)");
    p.hBands(8, 7, 8, "rgba(255,255,255,0.35)");
  },
  "bld-hvac": (p) => {
    p.fill("#ece8dd");
    p.vBands(4, 0, 1, "rgba(60,60,60,0.35)");
  },
  "bld-hvac-top": (p) => {
    p.fill("#e4e0d4");
    p.ctx.fillStyle = "#6b6f73";
    for (let x = 6; x < p.W; x += 12)
      for (let y = 6; y < p.H; y += 12) {
        p.ctx.beginPath();
        p.ctx.arc(x, y, 3.6, 0, Math.PI * 2);
        p.ctx.fill();
      }
  },

  /* ---- Deans Heights ---- */
  "bld-dh": (p) => {
    p.fill("#f1bf87");
    p.vBands(19, 6, 13, "rgba(96,62,38,0.5)");
    p.hBands(19, 16, 19, "#fbeee0");
    p.bottom(17, "rgba(70,48,30,0.55)");
  },
  "bld-dh-trim": (p) => {
    p.fill("#b5603a");
    p.top(2, "rgba(255,255,255,0.25)");
  },
  "bld-dh-glass": (p) => {
    p.fill("#3f8d69");
    p.hBands(19, 0, 2, "rgba(10,40,25,0.55)");
  },
  "bld-dh-roof": (p) => {
    p.fill("#e8d7c2");
    p.vBands(14, 0, 12, "#34506f");
    p.hBands(13, 9, 13, "#e8d7c2");
    p.border(7, "#e8d7c2");
  },

  /* ---- Deans Complex ---- */
  "bld-dc": (p) => {
    p.fill("#ece2cf");
    p.vBands(20, 7, 13, "rgba(70,76,72,0.45)");
    p.hBands(16, 14, 16, "#f8f4ec");
    p.bottom(14, "rgba(40,40,36,0.6)");
  },
  "bld-dc-bay": (p) => {
    p.fill("#f6f1e7");
    p.hBands(16, 7, 16, "rgba(90,100,96,0.35)");
    p.hBands(16, 2, 3, "rgba(70,70,66,0.55)");
    p.hBands(16, 0, 2, "#fffdf8");
  },
  "bld-dc-trim": (p) => p.fill("#f7f3ea"),
  "bld-dc-shop": (p) => {
    p.fill("#3d3d38");
    p.vBands(24, 0, 3, "#d8d0bf");
  },
  "bld-dc-hall": (p) => {
    p.fill("#fbfaf6");
    const archTop = p.H * 0.72;
    p.vBands(30, 10, 20, "rgba(55,66,64,0.6)", 0, archTop);
    // round arch heads
    p.ctx.fillStyle = "rgba(55,66,64,0.6)";
    for (let x = 15; x < p.W; x += 30) {
      p.ctx.beginPath();
      p.ctx.arc(x, p.H - archTop, 5, Math.PI, 0);
      p.ctx.fill();
    }
    p.top(5, "#ffffff");
    p.ctx.fillStyle = "rgba(0,0,0,0.1)";
    p.ctx.fillRect(0, 5, p.W, 1);
  },
  "bld-sign-red": (p) => p.fill("#d4232b"),
  "bld-sign-gold": (p) => p.fill("#e8ab22"),

  /* ---- Deans Trade Center ---- */
  "bld-dtc": (p) => {
    p.fill("#eee1c9");
    p.hBands(18, 17, 18, "rgba(120,100,70,0.18)");
    p.bottom(18, "rgba(30,36,34,0.6)");
  },
  "bld-dtc-gold": (p) => {
    const g = p.ctx.createLinearGradient(0, 0, p.W, p.H);
    g.addColorStop(0, "#b8862a");
    g.addColorStop(0.5, "#e8c164");
    g.addColorStop(1, "#c9982f");
    p.ctx.fillStyle = g;
    p.ctx.fillRect(0, 0, p.W, p.H);
    // the flowing wave pattern of the real cladding
    p.ctx.strokeStyle = "rgba(120,80,20,0.35)";
    p.ctx.lineWidth = 1.2;
    for (let k = -2; k < p.H / 8 + 2; k++) {
      p.ctx.beginPath();
      for (let x = 0; x <= p.W; x += 2) {
        const y = k * 8 + Math.sin((x / p.W) * Math.PI * 2) * p.H * 0.18;
        if (x === 0) p.ctx.moveTo(x, y);
        else p.ctx.lineTo(x, y);
      }
      p.ctx.stroke();
    }
  },
  "bld-dtc-louver": (p) => {
    p.fill("#d9ccb4");
    p.hBands(4, 0, 2, "#8b6a45");
    p.border(2, "#f2e9d8");
  },
  "bld-dtc-glass": (p) => {
    p.fill("#1f4739");
    p.hBands(9, 0, 1, "rgba(255,255,255,0.2)");
  },
  "bld-dtc-white": (p) => {
    p.fill("#f8f6f0");
    p.bottom(24, "rgba(40,60,64,0.6)");
  },

  /* ---- Deans Apartment One ---- */
  "bld-ao-white": (p) => {
    p.fill("#f0ede7");
    p.hBands(17, 5, 12, "rgba(80,86,92,0.45)");
    p.vBands(16, 0, 8, "#f0ede7");
  },
  "bld-ao-stone": (p) => {
    p.fill("#d8b788");
    p.hBands(17, 6, 15, "rgba(60,64,70,0.4)");
    p.hBands(17, 2, 3, "rgba(50,50,50,0.6)");
    p.hBands(17, 0, 2, "#f4efe6");
  },
  "bld-ao-glass": (p) => {
    p.fill("#3b4652");
    p.hBands(17, 0, 1, "rgba(210,220,228,0.35)");
    p.vBands(11, 0, 1, "rgba(210,220,228,0.35)");
    p.border(3, "#4a4e54");
  },
  "bld-ao-frame": (p) => p.fill("#4a4e54"),
  "bld-ao-shop": (p) => {
    p.fill("#a9bcc6");
    p.vBands(34, 0, 4, "#f0ede7");
    p.top(3, "#f0ede7");
  },

  /* ---- Deans Medicine Center ---- */
  "bld-mc-white": (p) => {
    p.fill("#f5f4f0");
    p.hBands(26, 8, 20, "rgba(70,78,86,0.45)");
    p.vBands(28, 0, 14, "#f5f4f0");
  },
  "bld-mc-wood": (p) => {
    p.fill("#8b6849");
    p.hBands(5, 0, 1, "rgba(255,235,210,0.16)");
    p.vBands(38, 14, 26, "rgba(40,46,52,0.7)");
  },
  "bld-mc-shop": (p) => {
    p.fill("#35393e");
    p.vBands(36, 0, 4, "#e7e3dc");
  },
  "bld-mc-sign": (p) => {
    p.fill("#d8262e");
    p.vBands(150, 44, 82, "#1e9a4a");
    p.vBands(150, 82, 84, "#ffffff");
    p.vBands(150, 84, 104, "#1c7fc0");
  },
  "bld-mc-logo": (p) => p.fill("#cf2027"),
  "bld-mc-step": (p) => {
    p.fill("#cfc9bf");
    p.hBands(4, 0, 1, "rgba(0,0,0,0.12)");
  },

  /* ---- legacy flat materials ---- */
  "bld-podium": (p) => p.fill("#d6d7d9"),
  "bld-flats": (p) => p.fill("#fff6e8"),
  "bld-glass": (p) => p.fill("#9cc9b1"),
  "bld-core": (p) => p.fill("#054725"),
  "bld-gold": (p) => p.fill("#ffd748"),
};

/** materials that should read as glossy (glass, solar, metal cladding) */
const GLOSSY = new Set(["bld-dh-glass", "bld-dtc-glass", "bld-ao-glass", "bld-solar", "bld-dtc-gold"]);

const cache = new Map<string, THREE.MeshStandardMaterial>();

function faceMaterial(m: string, w: number, h: number): THREE.MeshStandardMaterial {
  const key = `${m}|${w}|${h}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const scale = Math.min(PX_SCALE, MAX_CANVAS / Math.max(w, h));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(2, Math.round(w * scale));
  canvas.height = Math.max(2, Math.round(h * scale));
  const ctx = canvas.getContext("2d")!;
  ctx.scale(canvas.width / w, canvas.height / h);
  (PAINTERS[m] ?? PAINTERS["bld-podium"])(new Paint(ctx, w, h));

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const glossy = GLOSSY.has(m);
  const mat = new THREE.MeshStandardMaterial({
    map: tex,
    roughness: glossy ? 0.35 : 0.85,
    metalness: glossy ? 0.25 : 0.05,
  });
  cache.set(key, mat);
  return mat;
}

/**
 * Six materials in BoxGeometry face order: +x, -x, +y (roof), -y, +z (front), -z.
 */
export function boxMaterials(b: {
  w: number;
  d: number;
  h: number;
  m: string;
  r?: string;
}): THREE.MeshStandardMaterial[] {
  const side = faceMaterial(b.m, b.d, b.h);
  const front = faceMaterial(b.m, b.w, b.h);
  const roof = faceMaterial(b.r ?? "bld-roof", b.w, b.d);
  const under = faceMaterial(b.m, b.w, b.d);
  return [side, side, roof, under, front, front];
}
