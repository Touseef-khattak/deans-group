import Link from "next/link";
import Reveal from "@/components/Reveal";

const openings = [
  {
    no: "Opening 01",
    title: "Senior Civil Engineer",
    description:
      "Lead technical design for mixed-use developments, coordinate utility and drainage systems, and guide project delivery from concept through construction.",
    experience: "5+ Years",
    qualification: "BS Civil Engineering",
  },
  {
    no: "Opening 02",
    title: "Project Architect",
    description:
      "Shape architecture and interiors for premium residential and workplace projects, manage design reviews, and ensure high-quality delivery across multidisciplinary teams.",
    experience: "6+ Years",
    qualification: "M.Arch / B.Arch",
  },
  {
    no: "Opening 03",
    title: "MEP Engineer",
    description:
      "Design HVAC, electrical, plumbing, and fire protection systems for commercial projects while supporting coordination, compliance, and value engineering.",
    experience: "4+ Years",
    qualification: "BS Mechanical / Electrical",
  },
  {
    no: "Opening 04",
    title: "Real Estate Analyst",
    description:
      "Support investment reviews, market research, and financial modeling for acquisitions, asset management, and portfolio strategy across key business lines.",
    experience: "2+ Years",
    qualification: "Finance / MBA / Economics",
  },
];

export default function OpenPositions() {
  return (
    <div className="flex flex-col gap-6 bg-secondary p-4 sm:px-6 sm:py-10 md:p-10 lg:p-20">
      <h2 className="font-heading text-h1 text-text-primary">
        Open Positions At Deans
      </h2>
      <p className="text-body-md text-text-secondary">
        We&rsquo;re hiring thoughtful, driven professionals to help design,
        deliver, and operate thoughtful spaces across our growing portfolio.
        Explore our current openings and find a role where your expertise can
        make a lasting impact.
      </p>

      <Reveal stagger className="flex flex-wrap gap-6">
        {openings.map((job) => (
          <div
            key={job.no}
            className="flex w-full flex-col gap-6 border border-border bg-background p-6 sm:w-[628px]"
          >
            <p className="font-cascadia text-body-sm text-text-muted">
              {job.no}
            </p>
            <h3 className="font-heading text-h3 text-text-primary">
              {job.title}
            </h3>
            <p className="text-body-md text-text-secondary">
              {job.description}
            </p>
            <div className="w-full border-t border-border" />
            <div className="flex w-full items-center justify-between text-body-sm">
              <p className="text-text-muted">Required Experience</p>
              <p className="text-text-primary">{job.experience}</p>
            </div>
            <div className="flex w-full items-center justify-between text-body-sm">
              <p className="text-text-muted">Qualification</p>
              <p className="text-text-primary">{job.qualification}</p>
            </div>
            <Link
              href="#apply"
              className="mt-auto flex h-14 w-[200px] items-center justify-center bg-primary text-button text-text-on-dark"
            >
              Apply Now
            </Link>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
