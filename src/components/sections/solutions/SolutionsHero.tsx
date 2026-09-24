import Image from "next/image";

export default function SolutionsHero() {
  return (
    <div className="relative flex h-[400px] items-center justify-center gap-11 overflow-hidden bg-primary p-20">
      <Image
        src="/images/solutions/hero-bg.png"
        alt="A Deans Group development at dusk"
        fill
        priority
        className="object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative flex w-[1000px] flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <p className="font-cascadia text-body-sm tracking-wide text-surface-warm uppercase">
            Engineered Into The Building
          </p>
          <Image
            src="/images/icons/hero-line.svg"
            alt=""
            width={135}
            height={1}
          />
        </div>

        <h1 className="w-full text-center font-heading text-[64px] leading-[1.02] font-medium text-text-on-dark">
          Buildings that{" "}
          <span className="font-normal text-primary italic">
            manage themselves.
          </span>
        </h1>

        <p className="w-full text-center text-body-lg text-text-on-dark">
          The technology and building-services layer behind a Deans
          development — automation, security, and the metering data that
          makes a building efficient to run.
        </p>
      </div>
    </div>
  );
}
