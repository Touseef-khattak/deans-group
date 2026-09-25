"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const AUTOPLAY_MS = 3000;
const SLIDE_MS = 900;
const EASE = "cubic-bezier(.22,1,.36,1)";

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
  // incoming layer slides in over the settled one, then the settled layer
  // "catches up" to it in one instant, untransitioned reset — no wraparound
  // math, no visible jump, since the reset only ever happens once both
  // layers already show the same image
  const [entering, setEntering] = useState(false);
  const [incomingTransition, setIncomingTransition] = useState(false);
  const [contentShown, setContentShown] = useState(true);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // no pause-on-hover here: the hero fills most of the viewport, so a hover
  // pause (fine for the smaller ShowcaseCarousel) would freeze this on the
  // first slide the visitor's cursor happens to rest over
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setContentShown(false);
      setIncomingTransition(true);
      // double rAF: let the incoming layer paint at its off-screen start
      // position with the transition already enabled, then move it —
      // otherwise the browser can coalesce both changes into one paint
      // and skip the animation entirely
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEntering(true));
      });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduced]);

  // once the incoming image finishes sliding fully into view, settle it:
  // the bottom layer swaps to the same image and the top layer snaps back
  // off-screen untransitioned, in the same render — invisible, since both
  // layers agree on the image at that instant
  useEffect(() => {
    if (!entering) return;
    const settle = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
      setIncomingTransition(false);
      setEntering(false);
    }, SLIDE_MS);
    return () => clearTimeout(settle);
  }, [entering]);

  // content slides up ~150ms after the image settles — sequential, not
  // simultaneous, per the "image slides in, then content slides up" brief
  useEffect(() => {
    if (contentShown) return;
    const reveal = setTimeout(() => setContentShown(true), SLIDE_MS + 150);
    return () => clearTimeout(reveal);
  }, [contentShown]);

  // Ken-Burns drift on the settled slide: 1.02 -> 1.06, resets each change
  useEffect(() => {
    setZoomed(false);
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setZoomed(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [index]);

  const current = slides[index];
  const incoming = slides[(index + 1) % slides.length];

  return (
    <div className="relative flex h-[520px] items-center gap-11 overflow-hidden bg-primary p-4 sm:h-[600px] sm:px-6 sm:py-10 md:h-[680px] md:p-10 lg:h-[765px] lg:p-20">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            transform: reduced ? undefined : `scale(${zoomed ? 1.06 : 1.02})`,
            transition: reduced
              ? undefined
              : `transform ${AUTOPLAY_MS}ms linear`,
          }}
        >
          <Image
            src={current.image}
            alt={current.alt}
            fill
            priority
            className="object-cover object-bottom"
            sizes="100vw"
          />
        </div>
      </div>

      {!reduced && (
        <div
          className="absolute inset-0"
          style={{
            transform: `translateX(${entering ? "0" : "100%"})`,
            transition: incomingTransition
              ? `transform ${SLIDE_MS}ms ${EASE}`
              : "none",
          }}
        >
          <Image
            src={incoming.image}
            alt={incoming.alt}
            fill
            className="object-cover object-bottom"
            sizes="100vw"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-black/70" />

      <div
        className="relative flex w-full max-w-[847px] flex-col items-start justify-center gap-6 sm:gap-8"
        style={{
          opacity: contentShown ? 1 : 0,
          transform: contentShown ? "translateY(0)" : "translateY(28px)",
          transition: `opacity .6s ${EASE}, transform .6s ${EASE}`,
        }}
      >
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
