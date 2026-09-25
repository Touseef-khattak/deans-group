import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const solutions = [
  {
    no: "Solution - 01",
    image: "/images/solutions/smart-building.png",
    title: "Smart Building Systems",
    description:
      "Automation, security and centralised HVAC engineered in from the design stage — not retrofitted.",
    scope: "Automation · security · HVAC",
    runningAt: "Deans Trade Center",
  },
  {
    no: "Solution - 04",
    image: "/images/solutions/smart-metering.png",
    title: "Smart Metering",
    description:
      "Multi-meter utility technology, live in one building and extended as a standard across the portfolio.",
    scope: "Utility metering",
    runningAt: "Deans Trade Center",
  },
  {
    no: "Solution - 02",
    image: "/images/solutions/facility-management.png",
    title: "Facility Management",
    description:
      "Day-to-day operation of a finished building, run by the same group that developed it.",
    scope: "Operations · Maintenance",
    runningAt: "Across the portfolio",
  },
  {
    no: "Solution - 03",
    image: "/images/solutions/energy-audit.png",
    title: "Energy Audit",
    description:
      "Metering data read back as consumption findings, so a building's running cost is a number, not a guess.",
    scope: "Consumption · Reporting",
    runningAt: "Across the portfolio",
  },
];

export default function SolutionsGrid() {
  return (
    <div className="flex flex-col gap-14 border-t border-border bg-background p-4 sm:px-6 sm:py-10 md:p-10 lg:gap-20 lg:p-20">
      <h2 className="w-full max-w-[654px] font-heading text-h1 text-text-primary">
        A building-services layer, designed as one system.
      </h2>

      <Reveal stagger className="flex flex-wrap gap-6">
        {solutions.map((s) => (
          <div
            key={s.no}
            className="group flex w-full flex-col gap-6 border border-border p-6 transition-colors hover:border-primary hover:bg-primary hover:shadow-xl sm:w-[628px]"
          >
            <p className="font-cascadia text-body-sm text-text-muted transition-colors group-hover:text-text-on-dark">
              {s.no}
            </p>
            <div className="relative h-[400px] w-full">
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-heading text-h3 text-text-primary transition-colors group-hover:text-text-on-dark">
              {s.title}
            </p>
            <p className="text-body-md text-text-secondary transition-colors group-hover:text-text-on-dark">
              {s.description}
            </p>
            <div className="w-full border-t border-border" />
            <div className="flex w-full items-center justify-between text-body-sm">
              <p className="text-text-muted transition-colors group-hover:text-text-on-dark/70">
                Scope
              </p>
              <p className="text-text-primary transition-colors group-hover:text-text-on-dark">
                {s.scope}
              </p>
            </div>
            <div className="flex w-full items-center justify-between text-body-sm">
              <p className="text-text-muted transition-colors group-hover:text-text-on-dark/70">
                Running At
              </p>
              <p className="text-text-primary transition-colors group-hover:text-text-on-dark">
                {s.runningAt}
              </p>
            </div>
            <Link
              href="#consultation"
              className="mt-auto flex h-14 w-[200px] items-center justify-center bg-surface-warm text-button text-primary-active transition-colors group-hover:bg-primary-hover group-hover:text-surface-warm"
            >
              Request This
            </Link>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
