"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const AUTOPLAY_MS = 3000;

const slides = [
  {
    image: "/images/hero/hero-bg-2.png",
    alt: "Aerial view of Deans Trade Centre",
  },
  {
    image: "/images/hero/hero-bg-3.png",
    alt: "Aerial view of Deans Complex",
  },
  {
    image: "/images/hero/hero-bg.png",
    alt: "Aerial view of Deans Heights",
  },
];

export default function Hero() {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // no pause-on-hover here: the hero fills most of the viewport, so a hover
  // pause (fine for the smaller ShowcaseCarousel) would freeze this on the
  // first slide the visitor's cursor happens to rest over
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduced]);

  // Ken-Burns drift on the active slide: 1.02 -> 1.06, resets each slide change
  useEffect(() => {
    setZoomed(false);
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setZoomed(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [index]);

  return (
    <div className="relative flex h-[520px] items-center gap-11 overflow-hidden bg-primary p-4 sm:h-[600px] sm:px-6 sm:py-10 md:h-[680px] md:p-10 lg:h-[765px] lg:p-20">
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
                  : `scale(${zoomed ? 1.06 : 1.02})`,
              transition: reduced
                ? undefined
                : `transform ${AUTOPLAY_MS}ms linear`,
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
