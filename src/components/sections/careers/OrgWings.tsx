import Image from "next/image";
import Reveal from "@/components/Reveal";

const wings = [
  {
    no: "01",
    title: "Executive Leadership",
    description:
      "Chairman & Chief Executive Mr. Nasir Jamal, and the senior leadership team.",
  },
  {
    no: "02",
    title: "Project Management & Execution Wing",
    description:
      "Senior Project Directors, Chartered Engineers and Certified PM Professionals.",
  },
  {
    no: "03",
    title: "Civil Works Wing",
    description: "Structural Engineers, Site Supervisors and QA/QC Inspectors.",
  },
  {
    no: "04",
    title: "MEP Wing",
    description:
      "Mechanical, Electrical & Plumbing — power distribution, central HVAC, vertical transport.",
  },
  {
    no: "05",
    title: "Finance & Administration Wing",
    description:
      "Corporate Accountants, Procurement Specialists and Legal Advisory.",
  },
  {
    no: "06",
    title: "Marketing & Customer Care Wing",
    description:
      "Dedicated asset management and post-handover customer relations teams.",
  },
];

export default function OrgWings() {
  return (
    <div className="flex flex-col gap-20 border-t border-border bg-background p-20">
      <h2 className="w-full max-w-[654px] font-heading text-h1 text-text-primary">
        How the group is structured
      </h2>

      <div className="flex h-[811px] w-full items-center gap-10">
        <Reveal stagger className="flex flex-1 flex-col">
          {wings.map((wing) => (
            <div
              key={wing.no}
              className="flex items-center gap-6 border-b border-border py-6 first:pt-0 last:border-b-0"
            >
              <p className="w-20 shrink-0 font-heading text-h1 text-green-100">
                {wing.no}
              </p>
              <div className="flex flex-1 flex-col gap-2">
                <p className="font-heading text-h4 text-text-primary">
                  {wing.title}
                </p>
                <p className="text-body-md text-text-secondary">
                  {wing.description}
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        <div className="relative flex h-[771px] w-[575px] shrink-0 items-start justify-center overflow-hidden bg-primary-active pt-[120px]">
          <div className="relative h-[132px] w-[233px]">
            <Image
              src="/images/careers/deans-group-mark.png"
              alt="Deans Group of Companies"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-[277px] left-[-79px] h-[572px] w-[733px]">
            <Image
              src="/images/careers/wings-building.png"
              alt="A Deans Group development"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
