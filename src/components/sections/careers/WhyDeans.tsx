import Reveal from "@/components/Reveal";

const points = [
  {
    title: "Small teams, whole jobs",
    description:
      "You see a building from drawing to handover to the day-to-day running of it. Nobody here owns one slice of a process.",
  },
  {
    title: "Learn on live work",
    description:
      "Apprenticeships and trade tickets funded in full, taught against real sites rather than a training suite.",
  },
  {
    title: "People stay",
    description:
      "Average tenure is over nine years. Half the site managers started as apprentices with us.",
  },
];

export default function WhyDeans() {
  return (
    <Reveal
      stagger
      className="flex items-stretch border border-border bg-background p-20"
    >
      {points.map((point) => (
        <div
          key={point.title}
          className="flex flex-1 flex-col gap-4 border border-border p-6"
        >
          <p className="font-heading text-h3 text-primary-hover">
            {point.title}
          </p>
          <p className="text-body-md text-text-secondary">
            {point.description}
          </p>
        </div>
      ))}
    </Reveal>
  );
}
