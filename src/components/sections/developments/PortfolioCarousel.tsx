"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const projects = [
  {
    image: "/images/developments/deans-heights.png",
    location: "Hayatabad, Peshawar - In hand",
    name: "Deans Heights",
    description: "5 blocks · 350 apartments · 935,000 sq ft.",
  },
  {
    image: "/images/developments/deans-complex.png",
    location: "University Road, Peshawar - In hand",
    name: "Deans Complex",
    description: "3 blocks · 216 apartments · 700,000 sq ft.",
  },
  {
    image: "/images/developments/deans-shopping-mall.png",
    location: "Main Tariq Road, Karachi - Completed",
    name: "Deans Shopping Mall",
    description:
      "350 premium retail units opposite Rabi Centre, in Karachi's commercial heartland.",
  },
  {
    image: "/images/developments/deans-commercial-center.png",
    location: "Ashraf Road, Peshawar - In hand",
    name: "Deans Commercial Center",
    description: "110 offices across 8 floors, 49 ground/lower-ground shops.",
  },
  {
    image: "/images/showcase/deans-trade-centre.png",
    location: "Peshawar Cantt - Completed",
    name: "Deans Trade Centre",
    description:
      "57 kanals. 1.8 million square feet. 3,200 shops and offices under one roof.",
  },
  {
    image: "/images/skyline/apartments-one.png",
    location: "Sector G-11/3, Islamabad - In hand",
    name: "Deans Apartments One",
    description: "97 apartments + 2 penthouses across 215,505 sq ft.",
  },
  {
    image: "/images/skyline/medicine-centre.png",
    location: "Phase 4, Hayatabad, Peshawar - In hand",
    name: "Deans Medicine Center",
    description:
      "24 shops and 18 clinics across ground, lower ground and two floors.",
  },
  {
    image: "/images/skyline/apartments-one-alt.png",
    location: "Old Bara Road, University Town, Peshawar - In hand",
    name: "Deans Apartments",
    description: "Residential apartments on Old Bara Road, University Town.",
  },
  {
    image: "/images/skyline/arcade.png",
    location: "Sector I-16, Islamabad - In hand · 2026",
    name: "Deans Arcade",
    description: "Retail and residential development in Sector I-16.",
  },
  {
    image: "/images/skyline/nasir-mansion.png",
    location: "Railway Road No. 2, Peshawar Cantt - Completed 1971",
    name: "Nasir Mansion",
    description:
      "60,000 sq ft — 48 shops, 43 offices, and the group's first name on a façade.",
  },
  {
    // no dedicated photo exists for Shahab Flats in the source design —
    // reusing the Deans Heights photo as the closest same-era residential stand-in
    image: "/images/developments/deans-heights.png",
    location: "Kohat Road, Peshawar - Completed 1982",
    name: "Shahab Flats",
    description: "42 apartments across a multi-tower residential complex.",
  },
];

const PAGE_SIZE = 4;
const pages = Array.from({ length: Math.ceil(projects.length / PAGE_SIZE) }, (_, i) =>
  projects.slice(i * PAGE_SIZE, i * PAGE_SIZE + PAGE_SIZE),
);

export default function PortfolioCarousel() {
  const [page, setPage] = useState(0);

  function goTo(i: number) {
    setPage((i + pages.length) % pages.length);
  }

  return (
    <div className="flex flex-col gap-10 bg-secondary p-20">
      <h2 className="font-heading text-h1 text-text-primary">
        The full portfolio
      </h2>

      <Reveal stagger className="grid grid-cols-4 gap-6">
        {pages[page].map((project) => (
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
            <button
              type="button"
              className="mt-auto flex h-14 w-[200px] items-center justify-center bg-secondary text-button text-primary-active transition-colors group-hover:bg-primary group-hover:text-text-on-dark"
            >
              View Project
            </button>
          </div>
        ))}
      </Reveal>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show page ${i + 1} of ${pages.length}`}
              onClick={() => goTo(i)}
              className={
                i === page
                  ? "h-[5px] w-[68px] bg-primary transition-colors"
                  : "h-[5px] w-[68px] bg-border transition-colors"
              }
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(page - 1)}
            className="relative h-14 w-14 shrink-0"
          >
            <Image src="/images/icons/carousel-prev.svg" alt="" fill />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(page + 1)}
            className="relative h-14 w-14 shrink-0"
          >
            <Image src="/images/icons/carousel-next.svg" alt="" fill />
          </button>
        </div>
      </div>
    </div>
  );
}
