"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import Reveal from "@/components/Reveal";
import { T } from "@/components/LanguageProvider";
import { boxMaterials } from "./buildingTextures";

/**
 * One massing box. x/z = centre of footprint, w/d/h = size (scene units),
 * m = wall material (see buildingTextures.ts), y = base elevation (0 = on the ground),
 * r = roof material (defaults to "bld-roof").
 */
type Box = {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  m: string;
  y?: number;
  r?: string;
};
type Project = {
  no: string;
  name: string;
  /** slug of the matching /developments/[slug] page */
  slug: string;
  kind: string;
  status: "run" | "done";
  statusLabel: string;
  dim: string;
  specs: [string, string][];
  boxes: Box[];
  /** optional zoom so small buildings fill the stage */
  scale?: number;
};

function B(
  x: number,
  z: number,
  w: number,
  d: number,
  h: number,
  m: string,
  y = 0,
  r?: string,
): Box {
  return { x, z, w, d, h, m, y, r };
}

/* ---------- Deans Heights: peach blocks, terracotta cornice, green stair glazing ---------- */
const DH_H = 171; // ground + 8 floors @ 19px
function dhBlock(x: number, z: number, w: number, d: number, glassAt = -0.22): Box[] {
  const top = DH_H + 8;
  const cx = x - w / 2 + 12;
  const cz = z + d / 2 - 12;
  return [
    B(x, z, w, d, DH_H, "bld-dh"),
    // full-height green glazed stair / lift shaft on the front elevation
    B(x + w * glassAt, z + d / 2 + 2, 12, 4, DH_H + 6, "bld-dh-glass"),
    // terracotta cornice band + solar roof
    B(x, z, w + 6, d + 6, 8, "bld-dh-trim", DH_H, "bld-dh-roof"),
    // corner tower cap with its own hat
    B(cx, cz, 24, 24, 14, "bld-dh", top, "bld-dh-trim"),
    B(cx, cz, 30, 30, 5, "bld-dh-trim", top + 14, "bld-dh-trim"),
    // lift machine room
    B(x + w * 0.22, z - d * 0.18, 26, 20, 14, "bld-dh", top, "bld-roof-concrete"),
  ];
}

/* ---------- Deans Complex: three cream towers with stacked balcony bays ---------- */
const DC_H = 176; // ground + 10 floors @ 16px
function dcTower(x: number, z: number, w: number, d: number): Box[] {
  return [
    B(x, z, w, d, DC_H, "bld-dc"),
    // stacked balcony bays — front, and the rounded corner bays on each side
    B(x - w * 0.27, z + d / 2 + 4, 24, 8, DC_H - 16, "bld-dc-bay", 16),
    B(x + w * 0.27, z + d / 2 + 4, 24, 8, DC_H - 16, "bld-dc-bay", 16),
    B(x - w / 2 - 4, z + d * 0.18, 8, 24, DC_H - 16, "bld-dc-bay", 16),
    B(x + w / 2 + 4, z + d * 0.18, 8, 24, DC_H - 16, "bld-dc-bay", 16),
    // parapet + lift room
    B(x, z, w + 4, d + 4, 6, "bld-dc-trim", DC_H, "bld-roof-concrete"),
    B(x, z - d * 0.2, 28, 22, 14, "bld-dc", DC_H + 6, "bld-roof-concrete"),
  ];
}

/* ---------- Deans Trade Center: low mall, gold wave cladding, solar + chillers on roof ---------- */
const DTC_H = 92;
function dtcRoof(): Box[] {
  const out: Box[] = [];
  // solar canopies over the rooftop car park (west half)
  for (let i = 0; i < 5; i++) {
    out.push(B(-88, -92 + i * 36, 196, 24, 3, "bld-solar", DTC_H + 16, "bld-solar"));
    out.push(B(-170, -92 + i * 36, 4, 4, 16, "bld-dtc-white", DTC_H));
    out.push(B(-6, -92 + i * 36, 4, 4, 16, "bld-dtc-white", DTC_H));
  }
  // chiller units (east half)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      out.push(B(60 + j * 46, -86 + i * 40, 38, 28, 14, "bld-hvac", DTC_H, "bld-hvac-top"));
    }
  }
  return out;
}

/* ---------- Deans Apartment One: courtyard block, stone balconies, dark glass wing ---------- */
const AO_G = 22; // glazed ground floor
const AO_H = 102; // 6 floors @ 17px
const AO_TOP = AO_G + AO_H;

const PROJECTS: Project[] = [
  {
    no: "PRJ · 01",
    name: "Deans Heights",
    slug: "heights",
    kind: "Five residential blocks · Hayatabad, Peshawar",
    status: "run",
    statusLabel: "In hand",
    dim: "≈ 33 M",
    scale: 1.1,
    specs: [
      ["Plot area", "33 Kanals"],
      ["Covered area", "935,000 sq ft"],
      ["Blocks", "5 (A–E)"],
      ["Apartments", "350"],
      ["Unit types", "2-bed & 3-bed"],
      ["Lifts", "13"],
    ],
    // Blocks A–D staggered along the road, block E turning the corner.
    boxes: [
      ...dhBlock(-150, -18, 78, 70),
      ...dhBlock(-68, -30, 78, 70, 0.22),
      ...dhBlock(14, -18, 78, 70),
      ...dhBlock(96, -30, 78, 70, 0.22),
      ...dhBlock(172, 20, 70, 104, -0.2),
    ],
  },
  {
    no: "PRJ · 02",
    name: "Deans Complex",
    slug: "complex",
    kind: "Three-block residential complex · University Road, Peshawar",
    status: "run",
    statusLabel: "In hand",
    dim: "≈ 31 M",
    scale: 1.1,
    specs: [
      ["Plot area", "9 Kanals"],
      ["Covered area", "700,000 sq ft"],
      ["Blocks", "3 (A, B, C)"],
      ["Apartments", "216"],
      ["Unit types", "3-bed 1,750 / 1,550 sq ft"],
      ["Lifts", "6"],
    ],
    // Blocks A, B, C in a row; white arcaded hall in front; rooftop sign on B.
    boxes: [
      ...dcTower(-114, -20, 96, 84),
      ...dcTower(0, -20, 96, 84),
      ...dcTower(114, -20, 96, 84),
      // shared ground-floor podium linking the three blocks
      B(0, -20, 340, 80, 16, "bld-dc-shop", 0, "bld-roof-concrete"),
      // "DEANS / COMPLEX" roof sign
      B(0, 14, 58, 3, 9, "bld-sign-gold", DC_H + 6),
      B(0, 14, 50, 3, 12, "bld-sign-red", DC_H + 15),
      // arcaded banquet hall at the front
      B(0, 88, 330, 36, 28, "bld-dc-hall", 0, "bld-roof-concrete"),
    ],
  },
  {
    no: "PRJ · 03",
    name: "Deans Trade Center",
    slug: "trade-centre",
    kind: "Retail & corporate landmark · Peshawar Cantt",
    status: "done",
    statusLabel: "Delivered",
    dim: "≈ 60 M",
    scale: 1.15,
    specs: [
      ["Plot area", "57 Kanals"],
      ["Covered area", "1.80 M sq ft"],
      ["Retail & offices", "3,200"],
      ["Built", "2001–2007"],
      ["Escalators / lifts", "42 / 7"],
      ["Solar", "1 MW rooftop"],
    ],
    // Long mall block on the main road: gold wave panels at both ends,
    // louvred bands, dark-glass stair towers, white central entrance.
    boxes: [
      B(0, 0, 400, 240, DTC_H, "bld-dtc", 0, "bld-roof-concrete"),
      B(-138, 122, 116, 4, 62, "bld-dtc-gold", 20),
      B(138, 122, 116, 4, 62, "bld-dtc-gold", 20),
      B(-48, 122, 58, 4, 30, "bld-dtc-louver", 42),
      B(48, 122, 58, 4, 30, "bld-dtc-louver", 42),
      B(-80, 123, 12, 6, DTC_H + 8, "bld-dtc-glass"),
      B(80, 123, 12, 6, DTC_H + 8, "bld-dtc-glass"),
      B(0, 123, 34, 6, DTC_H + 4, "bld-dtc-white"),
      // side-elevation gold return
      B(202, 60, 4, 110, 62, "bld-dtc-gold", 20),
      // rooftop pavilion (Shiraz hall)
      B(40, 78, 150, 44, 24, "bld-dtc-white", DTC_H, "bld-roof-concrete"),
      ...dtcRoof(),
    ],
  },
  {
    no: "PRJ · 04",
    name: "Deans Apartment One",
    slug: "apartments-one",
    kind: "Premium residences · Sector G-11/3, Islamabad",
    status: "run",
    statusLabel: "In hand",
    dim: "≈ 28 M",
    scale: 1.5,
    specs: [
      ["Plot area", "8 Kanals"],
      ["Total covered", "215,505 sq ft"],
      ["Apartments", "97 + 2 penthouses"],
      ["Unit types", "2-bed 1,935 / 3-bed 2,200–2,400 sq ft"],
      ["Lifts", "2 passenger + 1 cargo"],
    ],
    // Corner block wrapped round an open atrium; glazed ground floor.
    boxes: [
      B(0, 0, 210, 150, AO_G, "bld-ao-shop", 0, "bld-lawn"),
      // four wings around the courtyard
      B(0, 48.5, 210, 53, AO_H, "bld-ao-white", AO_G, "bld-roof-concrete"),
      B(0, -48.5, 210, 53, AO_H, "bld-ao-white", AO_G, "bld-roof-concrete"),
      B(-67.5, 0, 75, 44, AO_H, "bld-ao-white", AO_G, "bld-roof-concrete"),
      B(67.5, 0, 75, 44, AO_H, "bld-ao-white", AO_G, "bld-roof-concrete"),
      // dark-framed curtain-wall wing on the west end
      B(-97, 0, 22, 158, AO_H + 6, "bld-ao-glass", AO_G - 2, "bld-ao-frame"),
      // sandstone balcony stacks (front + east side)
      B(-38, 78, 30, 6, AO_H, "bld-ao-stone", AO_G),
      B(22, 78, 30, 6, AO_H, "bld-ao-stone", AO_G),
      B(80, 78, 30, 6, AO_H, "bld-ao-stone", AO_G),
      B(108, -34, 6, 30, AO_H, "bld-ao-stone", AO_G),
      B(108, 34, 6, 30, AO_H, "bld-ao-stone", AO_G),
      // dark grey cornice
      B(10, 77, 194, 4, 8, "bld-ao-frame", AO_TOP - 4, "bld-ao-frame"),
      B(10, -77, 194, 4, 8, "bld-ao-frame", AO_TOP - 4, "bld-ao-frame"),
      B(107, 0, 4, 150, 8, "bld-ao-frame", AO_TOP - 4, "bld-ao-frame"),
      // stair / lift room + roof pergola
      B(50, -48, 44, 32, 14, "bld-ao-white", AO_TOP, "bld-roof-concrete"),
      B(-40, 48, 60, 34, 3, "bld-ao-frame", AO_TOP + 14, "bld-ao-frame"),
    ],
  },
  {
    no: "PRJ · 05",
    name: "Deans Medicine Center",
    slug: "medicine-center",
    kind: "Medical & commercial plaza · Phase 4, Hayatabad",
    status: "run",
    statusLabel: "In hand",
    dim: "≈ 22 M",
    scale: 1.6,
    specs: [
      ["Plot area", "1 Kanal"],
      ["Shops", "24 · ground & lower ground"],
      ["Clinics", "18 · 1st & 2nd floor"],
      ["Lifts", "1 passenger + 1 car"],
      ["Opposite", "Hayatabad Medical Complex"],
    ],
    // Shops on ground + lower ground, two clinic floors, rooftop annexe.
    boxes: [
      B(0, -5, 220, 160, 92, "bld-mc-white", 0, "bld-roof-concrete"),
      B(0, 77, 220, 4, 34, "bld-mc-shop"),
      B(0, 81, 226, 6, 12, "bld-mc-sign", 32, "bld-mc-sign"),
      B(0, 77, 150, 4, 48, "bld-mc-wood", 44),
      // white corner fins framing the wood cladding
      B(-88, 78, 26, 6, 48, "bld-mc-white", 44),
      B(88, 78, 26, 6, 48, "bld-mc-white", 44),
      // "DEANS MEDICINE" parapet sign
      B(0, 76, 104, 3, 12, "bld-mc-logo", 92),
      // front steps
      B(0, 94, 200, 22, 6, "bld-mc-step", 0, "bld-mc-step"),
      // rooftop annexe, glazed stair and water tanks
      B(0, -34, 124, 76, 28, "bld-mc-white", 92, "bld-roof-concrete"),
      B(-48, 5, 28, 4, 28, "bld-ao-glass", 92),
      B(78, -56, 22, 22, 12, "bld-hvac", 92, "bld-hvac-top"),
    ],
  },
];

const HIGHLIGHT_VALUE = /sq ft|M sq|Kanal/;

function BuildingBlock({ box }: { box: Box }) {
  const materials = useMemo(() => boxMaterials(box), [box]);
  const base = box.y ?? 0;
  return (
    <mesh
      position={[box.x, base + box.h / 2, box.z]}
      material={materials}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[box.w, box.h, box.d]} />
    </mesh>
  );
}

// polls the live camera azimuth so the on-screen compass needle tracks orbit,
// same idea as the old CSS build's yaw-driven needle
function CompassTracker({ onChange }: { onChange: (deg: number) => void }) {
  const last = useRef(0);
  useFrame(({ camera }) => {
    const deg = (Math.atan2(camera.position.x, camera.position.z) * 180) / Math.PI;
    if (Math.abs(deg - last.current) > 0.5) {
      last.current = deg;
      onChange(deg);
    }
  });
  return null;
}

function Scene({
  project,
  reduced,
  interacted,
  onInteract,
  onAzimuthChange,
}: {
  project: Project;
  reduced: boolean;
  interacted: boolean;
  onInteract: () => void;
  onAzimuthChange: (deg: number) => void;
}) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <>
      <PerspectiveCamera makeDefault position={[420, 340, 560]} fov={32} />
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#ffffff", "#0a2415", 0.4]} />
      <directionalLight
        position={[260, 420, 200]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <group key={project.name}>
        <group scale={project.scale ?? 1}>
          {project.boxes.map((box, i) => (
            <BuildingBlock key={i} box={box} />
          ))}
        </group>
        <Grid
          position={[0, 0, 0]}
          args={[1400, 1400]}
          cellColor="#d6d7d9"
          sectionColor="#00a650"
          cellSize={40}
          sectionSize={200}
          fadeDistance={1400}
          infiniteGrid
        />
        <CompassTracker onChange={onAzimuthChange} />
        <OrbitControls
          ref={controlsRef}
          target={[0, 90, 0]}
          enableDamping
          dampingFactor={0.08}
          minDistance={220}
          maxDistance={1300}
          minPolarAngle={0.15}
          maxPolarAngle={1.45}
          autoRotate={!interacted && !reduced}
          autoRotateSpeed={0.6}
          onStart={onInteract}
        />
      </group>
    </>
  );
}

export default function BuildingExplorer() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [azimuth, setAzimuth] = useState(0);

  const project = PROJECTS[active];

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  function selectProject(i: number) {
    setActive(i);
    setInteracted(false);
  }

  return (
    <div className="flex flex-col gap-10 bg-background px-4 py-10 sm:px-6 md:px-10 lg:px-20 lg:py-16">
      <Reveal className="flex flex-col gap-4">
        <T
          as="h2"
          en="Take hold of the building"
          ur="منصوبے"
          className="font-heading text-h1 text-text-primary"
        />
        <p className="max-w-2xl text-body-lg text-text-secondary">
          Every Deans project is a 3D model on this site. Drag it, turn it,
          study each elevation the way its architects did — before it is in
          the ground, and long after it is finished.
        </p>
      </Reveal>

      <Reveal className="flex flex-col border border-border">
        <div className="no-scrollbar flex flex-nowrap overflow-x-auto sm:flex-wrap sm:overflow-visible">
          {PROJECTS.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => selectProject(i)}
              className={
                i === active
                  ? "flex min-w-[140px] shrink-0 flex-col gap-1 bg-primary-hover px-3 py-3 text-left sm:min-w-[110px] sm:flex-1 sm:shrink sm:px-6 sm:py-4"
                  : "flex min-w-[140px] shrink-0 flex-col gap-1 border-r border-b border-border px-3 py-3 text-left transition-colors hover:bg-surface-warm sm:min-w-[110px] sm:flex-1 sm:shrink sm:px-6 sm:py-4"
              }
            >
              <p
                className={
                  i === active
                    ? "text-body-md text-text-on-dark"
                    : "text-body-md text-text-primary"
                }
              >
                {p.name}
              </p>
              <p
                className={
                  i === active
                    ? "text-caption text-text-on-dark/70"
                    : "text-caption text-text-secondary"
                }
              >
                {p.kind.split(" · ")[0]}
              </p>
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="bld-stage relative h-[440px] flex-1 touch-none overflow-hidden sm:h-[460px] lg:h-[634px]">
            <Canvas shadows dpr={[1, 1.75]}>
              <Scene
                project={project}
                reduced={reduced}
                interacted={interacted}
                onInteract={() => setInteracted(true)}
                onAzimuthChange={setAzimuth}
              />
            </Canvas>

            <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 bg-primary-active px-4 py-2 font-cascadia text-caption tracking-wide text-text-on-dark uppercase sm:bottom-4">
              <span className="text-status-warning">◉</span> Drag to orbit ·
              full 360° · every elevation
            </div>

            <div className="pointer-events-none absolute bottom-4 left-4 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-border bg-background/70 font-cascadia text-caption text-text-secondary">
              <span
                className="absolute top-1 text-status-warning"
                style={{ fontSize: 10 }}
              >
                N
              </span>
              <span
                className="absolute top-[6px] left-1/2 h-4 w-px bg-primary"
                style={{
                  transformOrigin: "50% 100%",
                  transform: `translateX(-50%) rotate(${-azimuth}deg)`,
                }}
              />
            </div>

            <div
              className="pointer-events-none absolute top-[12%] bottom-[30%] right-6 w-px bg-text-primary/50"
              aria-hidden
            />
            <div className="pointer-events-none absolute top-1/2 right-8 -translate-y-1/2 rotate-90 font-cascadia text-caption whitespace-nowrap text-text-secondary">
              {project.dim}
            </div>
          </div>

          <aside className="flex w-full shrink-0 flex-col gap-6 border-t border-border bg-surface-warm/40 p-6 sm:p-10 lg:w-[420px] lg:border-t-0 lg:border-l">
            <p className="font-cascadia text-caption text-text-secondary">
              {project.no}
            </p>
            <h3 className="font-heading text-h3 text-text-primary">
              {project.name}
            </h3>
            <p className="text-body-md text-text-secondary">{project.kind}</p>
            <div
              className={
                project.status === "done"
                  ? "w-fit bg-primary px-4 py-2"
                  : "w-fit bg-status-warning px-4 py-2"
              }
            >
              <p
                className={
                  project.status === "done"
                    ? "text-body-sm text-text-on-dark"
                    : "text-body-sm text-text-primary"
                }
              >
                {project.statusLabel}
              </p>
            </div>

            <div className="flex flex-col">
              {project.specs.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-t border-border py-3"
                >
                  <p className="text-body-md text-text-primary">{label}</p>
                  <p
                    className={
                      HIGHLIGHT_VALUE.test(value)
                        ? "text-body-md text-primary"
                        : "text-body-md text-text-secondary"
                    }
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex h-12 flex-1 items-center justify-center border border-surface-warm bg-surface-warm px-4 text-body-sm text-text-primary transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                Download Boucher
              </button>
              <Link
                href={`/developments/${project.slug}`}
                className="flex h-12 flex-1 items-center justify-center border border-primary bg-primary px-4 text-body-sm text-text-on-dark transition-colors duration-300 hover:bg-background hover:text-primary"
              >
                Project Details
              </Link>
            </div>
          </aside>
        </div>
      </Reveal>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="flex h-12 items-center justify-center border border-surface-warm bg-surface-warm px-6 text-body-sm text-text-primary transition-colors duration-300 hover:border-primary hover:text-primary"
        >
          Contact Us
        </Link>
        <Link
          href="/developments"
          className="flex h-12 items-center justify-center border border-primary bg-primary px-6 text-body-sm text-text-on-dark transition-colors duration-300 hover:bg-background hover:text-primary"
        >
          View All Projects
        </Link>
      </div>
    </div>
  );
}
