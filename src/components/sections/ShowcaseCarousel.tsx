"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AUTOPLAY_MS = 6500;

const slides = [
  {
    image: "/images/showcase/deans-trade-centre.png",
    alt: "Deans Trade Centre",
    title: "Deans Trade Centre",
    description:
      "57 kanals. 1.8 million square feet. 3,200 shops and offices under one roof — Peshawar's commercial centre of gravity since the auction of 1998.",
  },
  {
    image: "/images/developments/deans-heights.png",
    alt: "Deans Heights",
    title: "Deans Heights",
    description:
      "Five blocks on 33 kanals in Hayatabad. 350 apartments, 13 lifts, 935,000 sq ft of elevated living.",
  },
  {
    image: "/images/developments/deans-commercial-center.png",
    alt: "Deans Commercial Center",
    title: "Deans Commercial Center",
    description:
      "110 offices across 8 floors, 49 ground/lower-ground shops on Ashraf Road, Peshawar.",
  },
];

export default function ShowcaseCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // autoplay — pauses on hover, restarts its countdown on manual navigation
  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduced, tick]);

  // slow Ken-Burns drift on the active slide: 1.02 -> 1.09 over 7s, resets each slide change
  useEffect(() => {
    setZoomed(false);
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setZoomed(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [index]);

  function goTo(i: number) {
    setIndex((i + slides.length) % slides.length);
    setTick((t) => t + 1);
  }

  const slide = slides[index];

  return (
    <div
      className="flex flex-col items-center gap-6 bg-background px-20 py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[498px] w-full max-w-[1280px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: reduced
              ? undefined
              : `scale(${zoomed ? 1.09 : 1.02})`,
            transition: reduced ? undefined : "transform 7s linear",
          }}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 from-38% to-black to-[138%]" />
        <div className="absolute bottom-0 left-0 flex w-[565px] flex-col gap-4 p-10">
          <h3 className="font-heading text-h3 text-secondary">
            {slide.title}
          </h3>
          <p className="text-body-md text-background">{slide.description}</p>
        </div>
      </div>

      <div className="flex w-full max-w-[1280px] items-center justify-between">
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Show slide ${i + 1} of ${slides.length}`}
              onClick={() => goTo(i)}
              className={
                i === index
                  ? "h-[5px] w-[68px] bg-primary transition-colors"
                  : "h-[5px] w-[68px] bg-border transition-colors"
              }
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-cascadia text-body-sm text-text-secondary">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(index - 1)}
            className="relative h-14 w-14 shrink-0"
          >
            <Image src="/images/icons/carousel-prev.svg" alt="" fill />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(index + 1)}
            className="relative h-14 w-14 shrink-0"
          >
            <Image src="/images/icons/carousel-next.svg" alt="" fill />
          </button>
        </div>
      </div>
    </div>
  );
}
