import Image from "next/image";
import Reveal from "@/components/Reveal";
import { T } from "@/components/LanguageProvider";

const milestones = [
  {
    year: "1971",
    title: "Nasir Mansion",
    description:
      "60,000 sq ft on Railway Road No. 2 — 48 shops, 43 offices, and the group's first name on a façade",
    filled: false,
  },
  {
    year: "1982",
    title: "Shahab Flats",
    description:
      "Kohat Road. 42 apartments across a multi-tower residential complex — the move into housing.",
    filled: true,
  },
  {
    year: "1998",
    title: "The Deans Hotel Site",
    description:
      "Mr. Nasir Jamal brings together family capital and an investor network to win the historic 57-kanal site at public auction.",
    filled: false,
  },
  {
    year: "2004",
    title: "Karachi",
    description:
      "Deans Shopping Mall opens on Tariq Road — 350 retail units, and a national footprint.",
    filled: true,
  },
  {
    year: "2006-07",
    title: "University Road",
    description:
      "Deans Apartments and Deans Complex establish the group in premium Peshawar residential.",
    filled: false,
  },
  {
    year: "Today",
    title: "Six Companies",
    description:
      "Development, industry, fitness, energy and — new as of Aug 2026 — hospitality, led by Chairman & Chief Executive Mr. Nasir Jamal.",
    filled: true,
  },
];

export default function StoryTimeline() {
  return (
    <div className="flex flex-col gap-10 bg-surface-warm px-20 py-16">
      <Reveal>
        <T
          as="h2"
          en="The story starts on Railway Road"
          ur="ہماری کہانی"
          className="font-heading text-h1 text-text-primary"
        />
      </Reveal>

      <Reveal className="flex items-start gap-16">
        <div className="flex w-[630px] shrink-0 flex-col gap-6">
          <p className="text-body-lg text-text-secondary">
            In 1971 Mr. Jamal ud Din Khan built Nasir Mansion on Railway
            Road, Peshawar Cantt, and named it after his son. Fifty-five
            years later the family is still building on the same principle:
            put the name on the building, then live up to it.
          </p>
          <div className="relative h-[390px] w-full">
            <Image
              src="/images/story/railway-road.png"
              alt="Aerial view of Railway Road, Peshawar"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            className="flex h-14 w-[200px] items-center justify-center bg-primary text-button text-text-on-dark"
          >
            The Full Story
          </button>
        </div>

        <div className="relative flex flex-1 flex-col gap-8">
          <div className="absolute top-2 bottom-2 left-2 w-px bg-border" />
          {milestones.map((milestone) => (
            <div key={milestone.title} className="relative flex gap-6">
              <Image
                src={
                  milestone.filled
                    ? "/images/icons/timeline-dot-filled.svg"
                    : "/images/icons/timeline-dot-outline.svg"
                }
                alt=""
                width={16}
                height={16}
                className="relative z-10 mt-1.5 shrink-0"
              />
              <div className="flex flex-col gap-1">
                <p className="font-heading text-h3 text-text-primary">
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
