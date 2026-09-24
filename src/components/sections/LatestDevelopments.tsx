import Image from "next/image";
import Reveal from "@/components/Reveal";

const projects = [
  {
    image: "/images/developments/deans-heights.png",
    location: "Hayatabad, Peshawar — In hand",
    name: "Deans Heights",
    description: "5 blocks · 350 apartments · 935,000 sq ft.",
    featured: true,
  },
  {
    image: "/images/developments/deans-complex.png",
    location: "University Road, Peshawar — In hand",
    name: "Deans Complex",
    description: "3 blocks · 216 apartments · 700,000 sq ft.",
    featured: false,
  },
  {
    image: "/images/developments/deans-commercial-center.png",
    location: "Ashraf Road, Peshawar — In hand",
    name: "Deans Commercial Center",
    description: "110 offices across 8 floors, 49 ground/lower-ground shops.",
    featured: false,
  },
];

export default function LatestDevelopments() {
  return (
    <div className="flex flex-col gap-10 bg-background px-20 py-16">
      <Reveal>
        <h2 className="font-heading text-h1 text-text-primary">
          Latest developments
        </h2>
      </Reveal>

      <Reveal stagger className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className={
              project.featured
                ? "flex flex-col gap-4 border border-primary p-4 shadow-lg"
                : "flex flex-col gap-4 border border-border p-4"
            }
          >
            <div className="relative h-[270px] w-full">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-cascadia text-caption text-text-secondary">
              {project.location}
            </p>
            <h3 className="font-heading text-h3 text-text-primary">
              {project.name}
            </h3>
            <p className="flex-1 text-body-md text-text-secondary">
              {project.description}
            </p>
            <button
              type="button"
              className={
                project.featured
                  ? "flex h-11 items-center justify-center bg-primary px-6 text-body-sm text-text-on-dark"
                  : "flex h-11 items-center justify-center bg-surface-warm px-6 text-body-sm text-text-primary"
              }
            >
              View Project
            </button>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
