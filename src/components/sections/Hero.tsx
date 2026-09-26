"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const AUTOPLAY_MS = 6500;

const slides = [
  {
    image: "/images/hero/hero-bg-2.jpg",
    alt: "Aerial view of Deans Trade Centre",
  },
  {
    image: "/images/hero/hero-bg-3.jpg",
    alt: "Aerial view of Deans Complex",
  },
  {
    image: "/images/hero/hero-bg.jpg",
    alt: "Aerial view of Deans Heights",
  },
];

export default function Hero() {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomTransition, setZoomTransition] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => {
      // reset the zoom in the same batch as the slide change, not a tick
      // later, so the incoming slide's first paint is a clean unzoomed
      // baseline instead of inheriting the outgoing slide's end-of-zoom
      // scale (see ShowcaseCarousel for the full writeup of this bug)
      setZoomed(false);
      setZoomTransition(false);
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduced]);

  // slow Ken-Burns drift on the active slide: 1.02 -> 1.09 over 7s, freshly
  // every cycle — transition is explicitly toggled off then on rather than
  // left always-on, so re-enabling it and moving the target are two
  // distinct steps
  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      setZoomTransition(true);
      const raf2 = requestAnimationFrame(() => setZoomed(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [index]);

  return (
    <div
      className="relative flex h-[520px] items-center gap-11 overflow-hidden bg-primary p-4 sm:h-[600px] sm:px-6 sm:py-10 md:h-[680px] md:p-10 lg:h-[765px] lg:p-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform:
                reduced || i !== index
                  ? undefined
                  : `scale(${zoomed ? 1.09 : 1.02})`,
              transition:
                reduced || !zoomTransition ? undefined : "transform 7s linear",
            }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover object-bottom"
              sizes="100vw"
            />
          </div>
        </div>
      ))}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative flex w-full max-w-[847px] flex-col items-start justify-center gap-6 sm:gap-8">
        <p className="w-full text-body-lg text-text-on-dark">
          Deans built for more
        </p>

        <h1 className="w-full font-heading text-[40px] leading-[1.05] font-medium text-text-on-dark sm:text-[54px] md:text-[66px] lg:text-[82px] lg:leading-none">
          {lang === "ur" ? (
            "۱۹۷۱ سے تعمیر، اعتماد کے ساتھ"
          ) : (
            <>
              Landmarks that outlive{" "}
              <span className="font-normal text-primary italic">
                the men who build them.
              </span>
            </>
          )}
        </h1>

        <p className="w-full text-body-lg text-text-on-dark">
          Six companies. Three cities. Fifty-five years of construction that
          Peshawar, Islamabad and Karachi still stand on. Deans Group builds
          — and holds — the addresses Pakistan invests in.
        </p>

        <div className="flex w-full items-center justify-center gap-4">
          <div className="h-0 w-[135px] shrink-0 border-t border-primary" />
          <p className="flex-1 font-cascadia text-body-sm leading-6 text-primary uppercase">
            Since Nasir Mansion, 1971
          </p>
        </div>
      </div>
    </div>
  );
}
