"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const AUTOPLAY_MS = 3000;
const SLIDE_MS = 900;
const EASE = "cubic-bezier(.22,1,.36,1)";

const slides = [
  {
    image: "/images/showcase/deans-trade-centre.jpg",
    alt: "Deans Trade Centre",
    title: "Deans Trade Centre",
    description:
      "57 kanals. 1.8 million square feet. 3,200 shops and offices under one roof — Peshawar's commercial centre of gravity since the auction of 1998.",
  },
  {
    image: "/images/developments/2d/heights.png",
    alt: "Deans Heights",
    title: "Deans Heights",
    description:
      "Five blocks on 33 kanals in Hayatabad. 350 apartments, 13 lifts, 935,000 sq ft of elevated living.",
  },
  {
    image: "/images/developments/deans-commercial-center.jpg",
    alt: "Deans Commercial Center",
    title: "Deans Commercial Center",
    description:
      "110 offices across 8 floors, 49 ground/lower-ground shops on Ashraf Road, Peshawar.",
  },
];

export default function ShowcaseCarousel() {
  const [index, setIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [entering, setEntering] = useState(false);
  const [incomingTransition, setIncomingTransition] = useState(false);
  const [contentShown, setContentShown] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomTransition, setZoomTransition] = useState(false);
  const [tick, setTick] = useState(0);

  const indexRef = useRef(0);
  const busyRef = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  function goTo(target: number) {
    const next = (target + slides.length) % slides.length;
    if (next === indexRef.current || busyRef.current) return;
    busyRef.current = true;
    setContentShown(false);

    if (reduced) {
      setIndex(next);
      setContentShown(true);
      busyRef.current = false;
      return;
    }

    setIncomingIndex(next);
    setIncomingTransition(true);
    // double rAF: let the incoming layer paint at its off-screen start
    // position with the transition already enabled, then move it
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntering(true));
    });
  }

  // autoplay — reads the latest index via ref so the interval never goes
  // stale, and restarts its countdown whenever the visitor navigates manually
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      goTo(indexRef.current + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, tick]);

  // once the incoming image finishes sliding fully into view, settle it —
  // swap the settled slide, snap the incoming layer away untransitioned, and
  // reset the zoom in the SAME batch/render as the image swap (not a tick
  // later in a separate effect) so the new image's first paint is a clean
  // unzoomed baseline instead of inheriting the outgoing slide's end-of-zoom
  // scale
  useEffect(() => {
    if (!entering) return;
    const settle = setTimeout(() => {
      if (incomingIndex !== null) setIndex(incomingIndex);
      setIncomingTransition(false);
      setEntering(false);
      setIncomingIndex(null);
      busyRef.current = false;
      setZoomed(false);
      setZoomTransition(false);
    }, SLIDE_MS);
    return () => clearTimeout(settle);
  }, [entering, incomingIndex]);

  // caption slides up ~150ms after the image settles — sequential, not
  // simultaneous
  useEffect(() => {
    if (contentShown) return;
    const reveal = setTimeout(() => setContentShown(true), SLIDE_MS + 150);
    return () => clearTimeout(reveal);
  }, [contentShown]);

  // Ken-Burns drift on the settled slide: 1.02 -> 1.06, freshly every cycle.
  // The transition is explicitly toggled off then on (rather than left
  // always-on) so re-enabling it and moving the target happen as two
  // distinct steps — leaving it always-on caused the reset-to-1.02 step
  // itself to animate and immediately get "retargeted" back toward 1.06,
  // which CSS resolves by keeping the full nominal duration for the
  // remaining (now tiny) distance — net effect: the image looked stuck
  // near its fully-zoomed, more-cropped scale for the whole cycle.
  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      setZoomTransition(true);
      const raf2 = requestAnimationFrame(() => setZoomed(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [index]);

  function manualGoTo(i: number) {
    goTo(i);
    setTick((t) => t + 1);
  }

  const slide = slides[index];
  const incoming = incomingIndex !== null ? slides[incomingIndex] : null;

  return (
    <div className="flex flex-col items-center gap-6 bg-background px-4 py-10 sm:px-6 md:px-10 lg:px-20 lg:py-16">
      <div className="relative h-[260px] w-full overflow-hidden sm:h-[340px] md:h-[420px] lg:h-[498px]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              transform: reduced
                ? undefined
                : `scale(${zoomed ? 1.06 : 1.02})`,
              transition:
                reduced || !zoomTransition
                  ? "none"
                  : `transform ${AUTOPLAY_MS}ms linear`,
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
        </div>

        {incoming && (
          <div
            className="absolute inset-0"
            style={{
              transform: `translateX(${entering ? "0" : "100%"})`,
              transition: incomingTransition
                ? `transform ${SLIDE_MS}ms ${EASE}`
                : "none",
            }}
          >
            <Image src={incoming.image} alt={incoming.alt} fill className="object-cover" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/0 from-38% to-black to-[138%]" />
        <div
          className="absolute bottom-0 left-0 flex w-full max-w-[565px] flex-col gap-2 p-4 sm:gap-4 sm:p-6 md:p-10"
          style={{
            opacity: contentShown ? 1 : 0,
            transform: contentShown ? "translateY(0)" : "translateY(20px)",
            transition: `opacity .5s ${EASE}, transform .5s ${EASE}`,
          }}
        >
          <h3 className="font-heading text-h4 text-secondary sm:text-h3">
            {slide.title}
          </h3>
          <p className="text-body-sm text-background sm:text-body-md">
            {slide.description}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Show slide ${i + 1} of ${slides.length}`}
              onClick={() => manualGoTo(i)}
              className={
                i === index
                  ? "h-[5px] w-10 bg-primary transition-colors sm:w-[68px]"
                  : "h-[5px] w-10 bg-border transition-colors sm:w-[68px]"
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
            onClick={() => manualGoTo(index - 1)}
            className="flex h-14 w-14 shrink-0 items-center justify-center border border-border bg-background text-primary-active transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31 22L25 28L31 34"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => manualGoTo(index + 1)}
            className="flex h-14 w-14 shrink-0 items-center justify-center border border-border bg-background text-primary-active transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 22L31 28L25 34"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
