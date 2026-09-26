import Reveal from "@/components/Reveal";
import type { ProjectDetail } from "@/lib/projectDetails";

export default function ProjectStats({ project }: { project: ProjectDetail }) {
  return (
    <Reveal
      stagger
      className="grid grid-cols-2 border border-border bg-background px-4 sm:px-6 md:px-10 lg:grid-cols-4 lg:px-20"
    >
      {project.stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center gap-3 border border-border px-4 py-8 text-center lg:h-[200px]"
        >
          <p className="text-body-md text-text-secondary">{stat.label}</p>
          <p className="font-heading text-h3 text-primary">{stat.value}</p>
        </div>
      ))}
    </Reveal>
  );
}
