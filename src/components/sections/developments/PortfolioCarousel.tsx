"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const projects = [
  {
    slug: "heights",
    image: "/images/developments/deans-heights.png",
    location: "Hayatabad, Peshawar - In hand",
    name: "Deans Heights",
    description: "5 blocks · 350 apartments · 935,000 sq ft.",
  },
  {
    slug: "complex",
    image: "/images/developments/deans-complex.png",
    location: "University Road, Peshawar - In hand",
    name: "Deans Complex",
    description: "3 blocks · 216 apartments · 700,000 sq ft.",
  },
  {
    slug: "shopping-mall",
    image: "/images/developments/deans-shopping-mall.png",
    location: "Main Tariq Road, Karachi - Completed",
    name: "Deans Shopping Mall",
    description:
      "350 premium retail units opposite Rabi Centre, in Karachi's commercial heartland.",
  },
  {
    slug: "commercial-center",
    image: "/images/developments/deans-commercial-center.png",
    location: "Ashraf Road, Peshawar - In hand",
    name: "Deans Commercial Center",
    description: "110 offices across 8 floors, 49 ground/lower-ground shops.",
  },
  {
    slug: "trade-centre",
    image: "/images/showcase/deans-trade-centre.png",
    location: "Peshawar Cantt - Completed",
    name: "Deans Trade Centre",
    description:
      "57 kanals. 1.8 million square feet. 3,200 shops and offices under one roof.",
  },
  {
    slug: "apartments-one",
    image: "/images/skyline/apartments-one.png",
    location: "Sector G-11/3, Islamabad - In hand",
    name: "Deans Apartments One",
    description: "97 apartments + 2 penthouses across 215,505 sq ft.",
  },
  {
    slug: "medicine-center",
    image: "/images/skyline/medicine-centre.png",
    location: "Phase 4, Hayatabad, Peshawar - In hand",
    name: "Deans Medicine Center",
    description:
      "24 shops and 18 clinics across ground, lower ground and two floors.",
  },
  {
    slug: "apartments",
    image: "/images/skyline/apartments-one-alt.png",
    location: "Old Bara Road, University Town, Peshawar - In hand",
    name: "Deans Apartments",
    description: "Residential apartments on Old Bara Road, University Town.",
  },
  {
    slug: "arcade",
    image: "/images/skyline/arcade.png",
    location: "Sector I-16, Islamabad - In hand · 2026",
    name: "Deans Arcade",
    description: "Retail and residential development in Sector I-16.",
  },
  {
    slug: "nasir-mansion",
    image: "/images/skyline/nasir-mansion.png",
    location: "Railway Road No. 2, Peshawar Cantt - Completed 1971",
    name: "Nasir Mansion",
    description:
      "60,000 sq ft — 48 shops, 43 offices, and the group's first name on a façade.",
  },
  {
    slug: "shahab-flats",
    // no dedicated photo exists for Shahab Flats in the source design —
    // reusing the Deans Heights photo as the closest same-era residential stand-in
    image: "/images/developments/deans-heights.png",
    location: "Kohat Road, Peshawar - Completed 1982",
    name: "Shahab Flats",
    description: "42 apartments across a multi-tower residential complex.",
  },
];

const VISIBLE = 4;
const AUTOPLAY_MS = 4500;

export default function PortfolioCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // autoplay — advances one tile at a time, loops infinitely, pauses on hover
  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduced, tick]);

  function goTo(i: number) {
    setIndex((i + projects.length) % projects.length);
    setTick((t) => t + 1);
  }

  const visible = Array.from(
    { length: VISIBLE },
    (_, i) => projects[(index + i) % projects.length],
  );

  return (
    <div
      className="flex flex-col gap-10 bg-secondary p-4 sm:px-6 sm:py-10 md:p-10 lg:p-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 className="font-heading text-h1 text-text-primary">
        The full portfolio
      </h2>

      <Reveal
        stagger
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {visible.map((project) => (
          <div
            key={project.name}
            className="group flex h-full flex-col gap-6 border border-border bg-background p-4 transition-shadow hover:border-primary hover:shadow-lg"
          >
            <div className="relative h-[280px] w-full">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-cascadia text-body-sm text-text-muted">
                {project.location}
              </p>
              <h3 className="font-heading text-h3 text-text-primary">
                {project.name}
              </h3>
              <p className="text-body-md text-text-secondary">
                {project.description}
              </p>
            </div>
            <Link
              href={`/developments/${project.slug}`}
              className="mt-auto flex h-14 w-[200px] items-center justify-center bg-secondary text-button text-primary-active transition-colors group-hover:bg-primary group-hover:text-text-on-dark"
            >
              View Project
            </Link>
          </div>
        ))}
      </Reveal>

      <div className="flex items-center justify-end gap-3">
        <span className="font-cascadia text-body-sm text-text-secondary">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
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
  );
}
