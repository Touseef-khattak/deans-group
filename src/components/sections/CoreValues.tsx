import Image from "next/image";
import Reveal from "@/components/Reveal";

const values = [
  {
    icon: "evidence",
    title: "Delivered, not promised",
    description:
      "Two million square feet already standing and occupied. The portfolio is the argument.",
    tag: "Evidence",
  },
  {
    icon: "self-performed",
    title: "Built in-house",
    description:
      "Engineering, architecture, civil and MEP teams under one roof — most of them a decade or more with the group.",
    tag: "Self-performed",
  },
  {
    icon: "capitalized",
    title: "Financed properly",
    description:
      "Institutional relationships with premier lenders and a consortium of financial partners behind every project.",
    tag: "Capitalized",
  },
  {
    icon: "accountable",
    title: "Answerable",
    description:
      "Named people, direct lines, & construction progress published monthly especially for buyers who cannot visit the site.",
    tag: "Accountable",
  },
];

export default function CoreValues({
  heading = "Our Core Values",
}: {
  heading?: string;
}) {
  return (
    <div className="flex flex-col gap-10 bg-background px-20 py-16">
      <Reveal>
        <h2 className="font-heading text-h1 text-text-primary">
          {heading}
        </h2>
      </Reveal>

      <Reveal stagger className="grid grid-cols-4 gap-0 border border-border">
        {values.map((value) => (
          <div
            key={value.title}
            className="flex flex-col gap-6 border border-border p-8"
          >
            <Image
              src={`/images/values/${value.icon}.svg`}
              alt=""
              width={56}
              height={56}
            />
            <h3 className="text-h4 font-heading text-text-primary">
              {value.title}
            </h3>
            <p className="flex-1 text-body-md text-text-secondary">
              {value.description}
            </p>
            <p className="font-cascadia text-caption text-text-secondary">
              {value.tag}
            </p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
