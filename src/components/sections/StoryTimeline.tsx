"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { T } from "@/components/LanguageProvider";

const milestones = [
  {
    year: "1971",
    title: "Nasir Mansion",
    description:
      "60,000 sq ft on Railway Road No. 2 — 48 shops, 43 offices, and the group's first name on a façade",
    filled: false,
    image: "/images/story/railway-road.png",
  },
  {
    year: "1982",
    title: "Shahab Flats",
    description:
      "Kohat Road. 42 apartments across a multi-tower residential complex — the move into housing.",
    filled: true,
    image: "/images/story/shahab-flats.png",
  },
  {
    year: "1998",
    title: "The Deans Hotel Site",
    description:
      "Mr. Nasir Jamal brings together family capital and an investor network to win the historic 57-kanal site at public auction.",
    filled: false,
    image: "/images/showcase/deans-trade-centre.png",
  },
  {
    year: "2004",
    title: "Karachi",
    description:
      "Deans Shopping Mall opens on Tariq Road — 350 retail units, and a national footprint.",
    filled: true,
    image: "/images/developments/deans-shopping-mall.png",
  },
  {
    year: "2006-07",
    title: "University Road",
    description:
      "Deans Apartments and Deans Complex establish the group in premium Peshawar residential.",
    filled: false,
    image: "/images/developments/deans-complex.png",
  },
  {
    year: "Today",
    title: "Six Companies",
    description:
      "Development, industry, fitness, energy and — new as of Aug 2026 — hospitality, led by Chairman & Chief Executive Mr. Nasir Jamal.",
    filled: true,
    image: "/images/misc/skyline-strip-flat.png",
  },
];

export default function StoryTimeline({
  heading = "The story starts on Railway Road",
  headingUr = "ہماری کہانی",
  imageHeight = 390,
  showButton = true,
}: {
  heading?: string;
  headingUr?: string;
  imageHeight?: number;
  showButton?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const activeIndex = hovered ?? 0;

  return (
    <div className="flex flex-col gap-10 bg-surface-warm px-4 py-10 sm:px-6 md:px-10 lg:px-20 lg:py-16">
      <Reveal>
        <T
          as="h2"
          en={heading}
          ur={headingUr}
          className="font-heading text-h1 text-text-primary"
        />
      </Reveal>

      <Reveal className="flex flex-col items-start gap-10 lg:flex-row lg:gap-16">
        <div className="flex w-full flex-col gap-6 lg:w-[630px] lg:shrink-0">
          <p className="text-body-lg text-text-secondary">
            In 1971 Mr. Jamal ud Din Khan built Nasir Mansion on Railway
            Road, Peshawar Cantt, and named it after his son. Fifty-five
            years later the family is still building on the same principle:
            put the name on the building, then live up to it.
          </p>
          <div
            className="relative w-full"
            style={{ height: imageHeight }}
          >
            {milestones.map((milestone, i) => (
              <Image
                key={milestone.image}
                src={milestone.image}
                alt={milestone.title}
                fill
                priority={i === 0}
                className="object-cover transition-opacity duration-500 ease-in-out"
                style={{ opacity: i === activeIndex ? 1 : 0 }}
              />
            ))}
          </div>
          {showButton && (
            <Link
              href="/about"
              className="flex h-14 w-[200px] items-center justify-center bg-primary text-button text-text-on-dark"
            >
              The Full Story
            </Link>
          )}
        </div>

        <div className="relative flex flex-1 flex-col gap-8">
          <div className="absolute top-2 bottom-2 left-2 w-px bg-border" />
          {milestones.map((milestone, i) => (
            <div
              key={milestone.title}
              className="relative flex gap-6"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={
                  milestone.filled
                    ? "/images/icons/timeline-dot-filled.svg"
                    : "/images/icons/timeline-dot-outline.svg"
                }
                alt=""
                width={16}
                height={16}
                className="relative z-10 mt-1.5 h-4 w-4 shrink-0 self-start"
              />
              <div className="flex flex-col gap-1">
                <p
                  className={
                    "font-heading text-h3 transition-colors " +
                    (i === hovered ? "text-primary" : "text-text-primary")
                  }
                >
                  <span className="font-cascadia text-body-sm text-text-secondary">
                    {milestone.year}{" "}
                  </span>
                  {milestone.title}
                </p>
                <p className="max-w-xl text-body-md text-text-secondary">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
