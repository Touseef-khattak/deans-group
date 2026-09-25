import Image from "next/image";
import Reveal from "@/components/Reveal";

const team = [
  {
    image: "/images/about/zainab-khan.png",
    name: "Zainab Khan",
    role: "Project Management & Execution",
    bio: "Chartered engineers and certified PM professionals running delivery across every active site.",
  },
  {
    image: "/images/about/omar-farooq.png",
    name: "Omar Farooq",
    role: "Civil & MEP Wings",
    bio: "Structural engineers, QA/QC inspectors, and specialist MEP teams for power, HVAC and high-capacity vertical transport.",
  },
  {
    image: "/images/about/zahid-khan.png",
    name: "Zahid Khan",
    role: "Finance & Customer Care",
    bio: "Corporate accounting, procurement, legal advisory, and post-handover customer relations.",
  },
];

export default function Leadership() {
  return (
    <div className="flex flex-col items-end gap-14 bg-background px-4 py-10 sm:px-6 md:px-10 lg:gap-20 lg:px-20 lg:py-16">
      <Reveal className="flex w-full items-center justify-end">
        <div className="flex w-full flex-col items-start gap-6 sm:w-[400px] lg:w-[543px]">
          <div className="relative h-[380px] w-full sm:h-[420px] lg:h-[550px]">
            <div className="absolute top-5 left-[3.58%] h-full w-[96.42%] bg-primary" />
            <div className="relative h-full w-[96.42%]">
              <Image
                src="/images/about/nasir-jamal.png"
                alt="Mr. Nasir Jamal"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-6">
            <h3 className="font-heading text-h3 text-text-primary">
              Mr. Nasir Jamal
            </h3>
            <p className="font-cascadia text-body-sm text-text-muted">
              Chairman &amp; CEO
            </p>
            <p className="text-body-lg text-text-secondary">
              Led the 1998 acquisition of the Deans Hotel site and the
              group&rsquo;s expansion from a Peshawar builder into a
              national developer.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal
        stagger
        className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {team.map((person) => (
          <div key={person.name} className="flex flex-col gap-6">
            <div className="relative h-[416px] w-full">
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-heading text-h3 text-text-primary">
              {person.name}
            </h3>
            <p className="font-cascadia text-body-sm text-text-muted">
              {person.role}
            </p>
            <p className="text-body-lg text-text-secondary">{person.bio}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
