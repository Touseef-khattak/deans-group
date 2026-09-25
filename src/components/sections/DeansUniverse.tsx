import Image from "next/image";
import Link from "next/link";
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
    <div className="relative flex min-h-[700px] items-center overflow-hidden px-4 py-10 sm:px-6 md:px-10 lg:h-[580px] lg:min-h-0 lg:px-20 lg:py-0">
      <Image
        src="/images/universe/deans-universe-bg.png"
        alt="Inside a Deans development"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <Reveal className="relative flex w-full flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full flex-col items-start gap-6 lg:w-[550px]">
          <p className="text-body-lg text-text-on-dark">Deans Universe</p>
          <h2 className="font-heading text-[36px] leading-[1.15] sm:text-[46px] md:text-[56px] lg:text-display-lg lg:leading-[72px]">
            <span className="text-primary">Six companies,</span>{" "}
            <span className="text-secondary">one directory.</span>
          </h2>
          <p className="text-body-md text-text-on-dark">
            Step into our development and experience the options of luxury
            form the moment you arrive.
          </p>
          <Link
            href="/deans-universe"
            className="flex h-14 w-[200px] items-center justify-center bg-secondary text-button text-primary-active"
          >
            Explore Deans Universe
          </Link>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[739px]">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={
                i === 3
                  ? "flex flex-col items-center justify-center gap-2 bg-[rgba(235,235,235,0.15)] p-6 text-center sm:col-start-2"
                  : "flex flex-col items-center justify-center gap-2 bg-[rgba(235,235,235,0.15)] p-6 text-center"
              }
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
