import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const cards = [
  {
    image: "/images/deans-universe/sector-developers.png",
    eyebrow: "Real estate & construction",
    name: "Deans Developers",
    description:
      "Commercial, residential and mixed-use development, end to end — from feasibility and financing to handover and asset management.",
    href: "/developments",
  },
  {
    image: "/images/deans-universe/sector-industries.png",
    eyebrow: "Industries Holding",
    name: "Deans Industries",
    description:
      "Manufacturing and supply for construction and industry, with an established international supplier network.",
    href: "/industries#deans-industries",
  },
  {
    image: "/images/deans-universe/sector-electrify.png",
    eyebrow: "Renewable Energy",
    name: "Electrify Solutions",
    description:
      "Batteries, circuit breakers and electrical distribution equipment — now framed by the client as a renewable-energy line, not only electrical goods.",
    href: "/industries#electrify-solutions",
  },
  {
    image: "/images/deans-universe/sector-fitzone.png",
    eyebrow: "Health Fitness & Lifestyle",
    name: "Fitzone Gym",
    description:
      "Fitzone clubs sit inside Deans residential — the semi-Olympic pool & fitness club at Deans Complex, the indoor pool and gymnasium at Deans Heights",
    href: "#fitzone",
  },
  {
    image: "/images/deans-universe/sector-aurora.png",
    eyebrow: "Industrial Holdings",
    name: "Aroura Industries",
    description:
      "Industrial holdings operating alongside Deans Industries. A dedicated company profile follows.",
    href: "/industries#aurora-industries",
  },
  {
    image: "/images/deans-universe/sector-hospitality.png",
    eyebrow: "Hotels, resorts & hospitality",
    name: "Deans Hospitality",
    description:
      "Hotels and resorts with an online booking flow, from enquiry through to reservation.",
    href: "/hospitality",
  },
];

export default function SolutionCards() {
  return (
    <Reveal
      stagger
      className="grid grid-cols-1 gap-6 border-t border-border bg-background p-4 sm:px-6 sm:py-10 md:grid-cols-2 md:p-10 lg:p-20 xl:grid-cols-3"
    >
      {cards.map((card) => (
        <div
          key={card.name}
          className="group flex h-full flex-col gap-6 border border-border p-6 transition-colors hover:border-primary hover:bg-primary hover:shadow-xl"
        >
          <div className="relative h-[400px] w-full 2xl:h-[280px]">
            <Image
              src={card.image}
              alt={card.name}
              fill
              className="object-cover"
            />
          </div>
          <p className="font-cascadia text-body-sm text-text-muted transition-colors group-hover:text-text-on-dark">
            {card.eyebrow}
          </p>
          <p className="font-heading text-h3 text-text-primary transition-colors group-hover:text-text-on-dark">
            {card.name}
          </p>
          <p className="text-body-md text-text-secondary transition-colors group-hover:text-text-on-dark">
            {card.description}
          </p>
          <Link
            href={card.href}
            className="mt-auto flex h-14 w-[200px] items-center justify-center bg-secondary text-button text-primary-active transition-colors group-hover:bg-primary-hover group-hover:text-surface-warm"
          >
            Overview
          </Link>
        </div>
      ))}
    </Reveal>
  );
}
