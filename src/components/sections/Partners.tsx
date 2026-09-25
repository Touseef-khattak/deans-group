import Image from "next/image";
import Reveal from "@/components/Reveal";

const partners = [
  { name: "Pearl-Continental", file: "pearl-continental" },
  { name: "City Malls", file: "city-malls" },
  { name: "Cardiff Bay Luxury Apartments", file: "cardiff-bay" },
  { name: "National Bank of Pakistan", file: "nbp" },
  { name: "Astra International", file: "astra" },
  { name: "Memorial Houston Medical Center", file: "mhmc" },
];

export default function Partners() {
  return (
    <div className="flex flex-col items-center gap-10 bg-background px-4 py-10 sm:px-6 md:px-10 lg:px-20 lg:py-16">
      <Reveal>
        <h2 className="font-heading text-h1 text-text-primary">
          Built with, &amp; for
        </h2>
      </Reveal>

      <Reveal
        stagger
        className="grid w-full grid-cols-2 gap-0 sm:grid-cols-3 lg:grid-cols-6"
      >
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="relative h-[130px] w-full sm:h-[150px] lg:h-[175px]"
          >
            <Image
              src={`/images/partners/${partner.file}.png`}
              alt={partner.name}
              fill
            />
          </div>
        ))}
      </Reveal>
    </div>
  );
}
