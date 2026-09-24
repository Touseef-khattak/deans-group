"use client";

import { useRef, useState } from "react";
import { FALLBACK_CITY_PINS, PK_PATH } from "@/lib/geoData";

export default function FallbackMap({
  highlightCity,
}: {
  highlightCity: string | null;
}) {
  const [yaw, setYaw] = useState(-6);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const TILT = 42;

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    lastX.current = e.clientX;
    (e.target as Element).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    setYaw((y) => y + (e.clientX - lastX.current) * 0.3);
    lastX.current = e.clientX;
  }
  function endDrag() {
    dragging.current = false;
  }

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="relative h-full w-full touch-none overflow-hidden bg-surface-warm"
      style={{ cursor: dragging.current ? "grabbing" : "grab" }}
    >
      <div
        className="absolute inset-0"
        style={{ perspective: 1400, perspectiveOrigin: "50% 40%" }}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: 420,
            height: 480,
            marginLeft: -210,
            marginTop: -240,
            transformStyle: "preserve-3d",
            transform: `rotateX(${TILT}deg) rotateZ(${yaw}deg)`,
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 420 480"
              className="absolute inset-0"
              style={{ transform: `translateZ(${-(10 - i) * 2}px)` }}
            >
              <path d={PK_PATH} fill="var(--color-primary-hover)" opacity={0.06} />
            </svg>
          ))}
          <svg viewBox="0 0 420 480" className="absolute inset-0">
            <path d={PK_PATH} fill="var(--color-green-100)" stroke="var(--color-primary)" strokeWidth={1.6} />
            <g stroke="var(--color-status-warning)" strokeOpacity={0.55} strokeWidth={1} fill="none">
              <path d="M257.6,148.4 L291,156.8 L319.4,211.1" />
              <path d="M291,156.8 L158.4,381.2" />
              <path d="M257.6,148.4 L157.8,245.9 L158.4,381.2" />
            </g>
          </svg>

          {Object.entries(FALLBACK_CITY_PINS).map(([name, pos]) => {
            const isHighlighted = name === highlightCity;
            return (
              <div
                key={name}
                className="absolute flex flex-col items-center"
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: `translateZ(4px) rotateZ(${-yaw}deg) rotateX(${-TILT}deg)`,
                }}
              >
                <span
                  className={
                    isHighlighted
                      ? "h-3 w-3 rounded-full bg-status-warning ring-4 ring-status-warning/30"
                      : "h-2.5 w-2.5 rounded-full bg-primary"
                  }
                />
                <span className="mt-1 whitespace-nowrap bg-primary-active px-2 py-0.5 font-cascadia text-caption text-text-on-dark">
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-3 left-3 bg-primary-active px-3 py-1.5 font-cascadia text-caption text-text-on-dark/80">
        Drag to rotate · offline map view
      </div>
    </div>
  );
}
