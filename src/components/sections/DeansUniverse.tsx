import Image from "next/image";
import Reveal from "@/components/Reveal";

const stats = [
  { label: "Established", value: "Flagship" },
  { label: "Industries", value: "+Aurora" },
  { label: "Electricity", value: "Renewable" },
  { label: "Fit-zones", value: "Wellness" },
  { label: "Hospitality", value: "New" },
];

export default function DeansUniverse() {
  return (
    <div className="relative flex h-[580px] items-center overflow-hidden px-20">
      <Image
        src="/images/universe/deans-universe-bg.png"
        alt="Inside a Deans development"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <Reveal className="relative flex w-full items-center justify-between">
        <div className="flex w-[550px] flex-col items-start gap-6">
          <p className="text-body-lg text-text-on-dark">Deans Universe</p>
          <h2 className="font-heading text-display-lg leading-[72px]">
            <span className="text-primary">Six companies,</span>{" "}
            <span className="text-secondary">one directory.</span>
          </h2>
          <p className="text-body-md text-text-on-dark">
            Step into our development and experience the options of luxury
            form the moment you arrive.
          </p>
          <button
            type="button"
            className="flex h-14 w-[200px] items-center justify-center bg-secondary text-button text-primary-active"
          >
            Explore Deans Universe
          </button>
        </div>

        <div className="grid w-[739px] grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-2 bg-[rgba(235,235,235,0.15)] p-6 text-center"
              style={i === 3 ? { gridColumnStart: 2 } : undefined}
            >
              <p className="text-body-md text-text-on-dark">{stat.label}</p>
              <p className="font-heading text-h3 text-secondary">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
