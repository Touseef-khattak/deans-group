"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const partners = [
  { name: "Pearl-Continental", file: "pearl-continental" },
  { name: "City Malls", file: "city-malls" },
  { name: "Cardiff Bay Luxury Apartments", file: "cardiff-bay" },
  { name: "National Bank of Pakistan", file: "nbp" },
  { name: "Astra International", file: "astra" },
  { name: "Memorial Houston Medical Center", file: "mhmc" },
];

// Doubled so translateX(-50%) loops seamlessly back to the start.
const loop = [...partners, ...partners];

export default function Partners() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    function tick() {
      const wrapRect = wrap!.getBoundingClientRect();
      const centerX = wrapRect.left + wrapRect.width / 2;
      const falloff = wrapRect.width * 0.16;

      for (const el of itemRefs.current) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - centerX);
        const closeness = Math.max(0, 1 - dist / falloff);
        el.style.transform = `scale(${1 + closeness * 0.2})`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 overflow-hidden bg-background py-10 lg:py-16">
      <Reveal className="px-4 sm:px-6 md:px-10 lg:px-20">
        <h2 className="font-heading text-h1 text-text-primary">
          Built with, &amp; for
        </h2>
      </Reveal>

      <div
        ref={wrapRef}
        className="partners-fade group relative w-full overflow-hidden"
      >
        <div className="partners-track flex w-max group-hover:[animation-play-state:paused]">
          {loop.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="relative h-[130px] w-[180px] shrink-0 transition-transform duration-150 ease-out sm:h-[150px] sm:w-[220px] lg:h-[175px] lg:w-[260px]"
            >
              <Image
                src={`/images/partners/${partner.file}.png`}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
