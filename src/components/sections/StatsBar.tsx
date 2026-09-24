import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";

const stats = [
  { label: "Established", display: "1971", unit: "55 yrs" },
  { label: "Delivered", count: 2, decimals: 1, unit: "M sq ft" },
  { label: "In Development", count: 663, unit: "residences" },
  { label: "Group Companies", count: 6, prefix: "0", unit: "SBUs" },
];

export default function StatsBar() {
  return (
    <Reveal className="flex h-[240px] items-center justify-center border border-border bg-background px-20">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex h-full flex-1 flex-col items-center justify-center gap-4 border border-border px-4"
        >
          <p className="text-body-md text-text-primary">{stat.label}</p>
          <div className="text-center">
            {stat.count !== undefined ? (
              <Counter
                target={stat.count}
                decimals={stat.decimals ?? 0}
                prefix={stat.prefix ?? ""}
                className="font-heading text-h1 text-primary"
              />
            ) : (
              <p className="font-heading text-h1 text-primary">
                {stat.display}
              </p>
            )}
            <p className="text-body-lg text-primary">{stat.unit}</p>
          </div>
        </div>
      ))}
    </Reveal>
  );
}
