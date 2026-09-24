import Image from "next/image";

export default function CareersHero() {
  return (
    <div className="relative flex h-[400px] items-center justify-center gap-11 overflow-hidden bg-primary p-20">
      <Image
        src="/images/careers/hero-bg.png"
        alt="A Deans Group boardroom"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative flex w-[1000px] flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <p className="font-cascadia text-body-sm tracking-wide text-surface-warm uppercase">
            Career At Deans
          </p>
          <Image
            src="/images/icons/hero-line.svg"
            alt=""
            width={135}
            height={1}
          />
        </div>

        <h1 className="w-full text-center font-heading text-[64px] leading-[1.02] font-medium text-text-on-dark">
          Most of our team has been here{" "}
          <span className="font-normal text-primary italic">
            a decade or more.
          </span>
        </h1>

        <p className="w-full text-center text-body-lg text-text-on-dark">
          Exceptionally low staff turnover isn&rsquo;t an accident —
          it&rsquo;s how a group with in-house engineering, design and
          finance actually works.
        </p>
      </div>
    </div>
  );
}
