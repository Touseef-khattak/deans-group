import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const projects = [
  {
    slug: "heights",
    image: "/images/developments/2d/heights.png",
    location: "Hayatabad, Peshawar - In hand",
    name: "Deans Heights",
    description: "5 blocks · 350 apartments · 935,000 sq ft.",
  },
  {
    slug: "complex",
    image: "/images/developments/deans-complex.png",
    location: "University Road, Peshawar - In hand",
    name: "Deans Complex",
    description: "3 blocks · 216 apartments · 700,000 sq ft.",
  },
  {
    slug: "commercial-center",
    image: "/images/developments/deans-commercial-center.png",
    location: "Ashraf Road, Peshawar - In hand",
    name: "Deans Commercial Center",
    description: "110 offices across 8 floors, 49 ground/lower-ground shops.",
  },
];

export default function LatestDevelopments() {
  return (
    <div className="flex flex-col gap-10 bg-background px-4 py-10 sm:px-6 md:px-10 lg:px-20 lg:py-16">
      <Reveal>
        <h2 className="font-heading text-h1 text-text-primary">
          Latest developments
        </h2>
      </Reveal>

      <Reveal stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.name}
            className="group flex flex-col gap-6 border border-border p-4 transition-shadow hover:border-primary hover:shadow-lg"
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
            <Link
              href={`/developments/${project.slug}`}
              className="mt-auto flex h-14 w-[200px] items-center justify-center bg-secondary text-button text-primary-active transition-colors group-hover:bg-primary group-hover:text-text-on-dark"
            >
              View Project
            </Link>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
