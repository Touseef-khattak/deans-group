"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { T } from "@/components/LanguageProvider";

type Box = { x: number; z: number; w: number; d: number; h: number; m: string };
type Project = {
  no: string;
  name: string;
  kind: string;
  status: "run" | "done";
  statusLabel: string;
  dim: string;
  specs: [string, string][];
  boxes: Box[];
};

function B(x: number, z: number, w: number, d: number, h: number, m: string): Box {
  return { x, z, w, d, h, m };
}

const PROJECTS: Project[] = [
  {
    no: "PRJ · 01",
    name: "Deans Heights",
    kind: "Five residential blocks · Hayatabad, Peshawar",
    status: "run",
    statusLabel: "In hand",
    dim: "≈ 33 M",
    specs: [
      ["Plot area", "33 Kanals"],
      ["Covered area", "935,000 sq ft"],
      ["Blocks", "5 (A–E)"],
      ["Apartments", "350"],
      ["Unit types", "2-bed & 3-bed"],
      ["Lifts", "13"],
    ],
    boxes: [
      B(0, 0, 380, 220, 18, "bld-podium"),
      B(-140, -50, 84, 76, 186, "bld-flats"),
      B(-40, -50, 84, 76, 186, "bld-flats"),
      B(60, -50, 84, 76, 186, "bld-flats"),
      B(160, -50, 84, 76, 186, "bld-flats"),
      B(10, 55, 84, 76, 172, "bld-flats"),
      B(-40, -50, 34, 28, 200, "bld-core"),
      B(10, 55, 34, 28, 186, "bld-core"),
    ],
  },
  {
    no: "PRJ · 02",
    name: "Deans Complex",
    kind: "Three-block residential complex · University Road, Peshawar",
    status: "run",
    statusLabel: "In hand",
    dim: "≈ 31 M",
    specs: [
      ["Plot area", "9 Kanals"],
      ["Covered area", "700,000 sq ft"],
      ["Blocks", "3 (A, B, C)"],
      ["Apartments", "216"],
      ["Unit types", "3-bed 1,750 / 1,550 sq ft"],
      ["Lifts", "6"],
    ],
    boxes: [
      B(0, 0, 300, 200, 22, "bld-podium"),
      B(-95, -50, 92, 84, 176, "bld-flats"),
      B(10, -50, 92, 84, 176, "bld-flats"),
      B(95, 55, 92, 84, 170, "bld-flats"),
      B(-95, -50, 36, 30, 190, "bld-core"),
      B(95, 55, 36, 30, 184, "bld-core"),
      B(0, 0, 270, 6, 26, "bld-gold"),
    ],
  },
  {
    no: "PRJ · 03",
    name: "Deans Trade Center",
    kind: "Retail & corporate landmark · Peshawar Cantt",
    status: "done",
    statusLabel: "Delivered",
    dim: "≈ 60 M",
    specs: [
      ["Plot area", "57 Kanals"],
      ["Covered area", "1.80 M sq ft"],
      ["Retail & offices", "3,200"],
      ["Built", "2001–2007"],
      ["Escalators / lifts", "42 / 7"],
      ["Solar", "1 MW rooftop"],
    ],
    boxes: [
      B(0, 0, 400, 240, 110, "bld-podium"),
      B(-40, -10, 260, 170, 168, "bld-flats"),
      B(130, 20, 120, 110, 214, "bld-glass"),
      B(-40, -10, 240, 6, 176, "bld-gold"),
      B(-150, 60, 90, 80, 128, "bld-flats"),
    ],
  },
  {
    no: "PRJ · 04",
    name: "Deans Apartment One",
    kind: "Premium residences · Sector G-11/3, Islamabad",
    status: "run",
    statusLabel: "In hand",
    dim: "≈ 28 M",
    specs: [
      ["Plot area", "8 Kanals"],
      ["Total covered", "215,505 sq ft"],
      ["Apartments", "97 + 2 penthouses"],
      ["Unit types", "2-bed 1,935 / 3-bed 2,200–2,400 sq ft"],
      ["Lifts", "2 passenger + 1 cargo"],
    ],
    boxes: [
      B(0, 0, 250, 180, 16, "bld-podium"),
      B(0, 0, 190, 140, 150, "bld-flats"),
      B(-40, 0, 74, 62, 182, "bld-glass"),
      B(66, 0, 40, 34, 166, "bld-core"),
      B(0, 0, 170, 6, 156, "bld-gold"),
    ],
  },
  {
    no: "PRJ · 05",
    name: "Deans Medicine Center",
    kind: "Medical & commercial plaza · Phase 4, Hayatabad",
    status: "run",
    statusLabel: "In hand",
    dim: "≈ 22 M",
    specs: [
      ["Plot area", "1 Kanal"],
      ["Shops", "24 · ground & lower ground"],
      ["Clinics", "18 · 1st & 2nd floor"],
      ["Lifts", "1 passenger + 1 car"],
      ["Opposite", "Hayatabad Medical Complex"],
    ],
    boxes: [
      B(0, 0, 270, 200, 62, "bld-podium"),
      B(0, -10, 200, 150, 140, "bld-glass"),
      B(-78, 46, 74, 64, 100, "bld-flats"),
      B(0, -10, 182, 6, 146, "bld-gold"),
    ],
  },
];

const HIGHLIGHT_VALUE = /sq ft|M sq|Kanal/;

type Face = { className: string; style: React.CSSProperties };

function faceStyle(
  w: number,
  h: number,
  cx: number,
  cy: number,
  cz: number,
  rot: string,
): React.CSSProperties {
  return {
    width: w,
    height: h,
    transform: `translate3d(${cx - w / 2}px, ${cy - h / 2}px, ${cz}px) ${rot}`,
  };
}

function buildFaces(project: Project): Face[] {
  const faces: Face[] = [];
  project.boxes.forEach((b) => {
    faces.push({
      className: `${b.m} brightness-100`,
      style: faceStyle(b.w, b.h, b.x, -b.h / 2, b.z + b.d / 2, ""),
    });
    faces.push({
      className: `${b.m} brightness-90`,
      style: faceStyle(b.w, b.h, b.x, -b.h / 2, b.z - b.d / 2, "rotateY(180deg)"),
    });
    faces.push({
      className: `${b.m} brightness-75`,
      style: faceStyle(b.d, b.h, b.x - b.w / 2, -b.h / 2, b.z, "rotateY(-90deg)"),
    });
    faces.push({
      className: `${b.m} brightness-85`,
      style: faceStyle(b.d, b.h, b.x + b.w / 2, -b.h / 2, b.z, "rotateY(90deg)"),
    });
    faces.push({
      className: "bld-roof brightness-105",
      style: faceStyle(b.w, b.d, b.x, -b.h, b.z, "rotateX(90deg)"),
    });
  });
  return faces;
}

export default function BuildingExplorer() {
  const [active, setActive] = useState(0);
  const [yaw, setYaw] = useState(-24);
  const [tilt, setTilt] = useState(12);
  const [interacted, setInteracted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  const project = PROJECTS[active];
  const faces = useMemo(() => buildFaces(project), [project]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // idle sway while untouched
  useEffect(() => {
    if (reduced) return;
    let raf: number;
    function sway(t: number) {
      if (!interacted) setYaw(-24 + Math.sin(t / 2400) * 14);
      raf = requestAnimationFrame(sway);
    }
    raf = requestAnimationFrame(sway);
    return () => cancelAnimationFrame(raf);
  }, [interacted, reduced]);

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    setInteracted(true);
    last.current = { x: e.clientX, y: e.clientY };
    stageRef.current?.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    setYaw((y) => y + dx * 0.35);
    setTilt((t) => Math.max(4, Math.min(26, t - dy * 0.12)));
    last.current = { x: e.clientX, y: e.clientY };
  }
  function endDrag() {
    dragging.current = false;
  }

  function selectProject(i: number) {
    setActive(i);
    setYaw(-24);
    setInteracted(false);
  }

  return (
    <div className="flex flex-col gap-10 bg-background px-20 py-16">
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
        <div className="flex">
          {PROJECTS.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => selectProject(i)}
              className={
                i === active
                  ? "flex flex-1 flex-col gap-1 bg-primary-hover px-6 py-4 text-left"
                  : "flex flex-1 flex-col gap-1 border-r border-b border-border px-6 py-4 text-left transition-colors hover:bg-surface-warm"
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

        <div className="flex">
          <div
            ref={stageRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="bld-stage relative h-[634px] flex-1 touch-none overflow-hidden"
            style={{ cursor: dragging.current ? "grabbing" : "grab" }}
          >
            <div
              className="absolute inset-0"
              style={{ perspective: 1500, perspectiveOrigin: "50% 34%" }}
            >
              <div
                className="absolute"
                style={{
                  left: "50%",
                  top: "72%",
                  transformStyle: "preserve-3d",
                  transform: `translate(-50%,0) rotateX(${tilt}deg) rotateY(${yaw}deg)`,
                  transition: dragging.current ? "none" : "transform .1s linear",
                }}
              >
                <div
                  className="bld-floorplane absolute"
                  style={{
                    width: 760,
                    height: 560,
                    transform: "translate3d(-380px,-280px,0) rotateX(90deg)",
                  }}
                />
                {faces.map((f, i) => (
                  <div
                    key={i}
                    className={`absolute top-0 left-0 origin-center ${f.className}`}
                    style={{ ...f.style, backfaceVisibility: "hidden" }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 bg-primary-active px-4 py-2 font-cascadia text-caption tracking-wide text-text-on-dark uppercase">
              <span className="text-status-warning">◉</span> Drag to orbit ·
              full 360° · every elevation
            </div>

            <div className="absolute bottom-4 left-4 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-border bg-background/70 font-cascadia text-caption text-text-secondary">
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
                  transform: `translateX(-50%) rotate(${-yaw}deg)`,
                }}
              />
            </div>

            <div
              className="absolute top-[12%] bottom-[30%] right-6 w-px bg-text-primary/50"
              aria-hidden
            />
            <div className="absolute top-1/2 right-8 -translate-y-1/2 rotate-90 font-cascadia text-caption whitespace-nowrap text-text-secondary">
              {project.dim}
            </div>
          </div>

          <aside className="flex w-[420px] shrink-0 flex-col gap-6 border-l border-border bg-surface-warm/40 p-10">
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
                className="flex h-12 flex-1 items-center justify-center bg-surface-warm px-4 text-body-sm text-text-primary"
              >
                Download Boucher
              </button>
              <button
                type="button"
                className="flex h-12 flex-1 items-center justify-center bg-primary px-4 text-body-sm text-text-on-dark"
              >
                Project Details
              </button>
            </div>
          </aside>
        </div>
      </Reveal>

      <div className="flex gap-3">
        <button
          type="button"
          className="flex h-12 items-center justify-center bg-surface-warm px-6 text-body-sm text-text-primary"
        >
          Contact Us
        </button>
        <button
          type="button"
          className="flex h-12 items-center justify-center bg-primary px-6 text-body-sm text-text-on-dark"
        >
          View All Projects
        </button>
      </div>
    </div>
  );
}
