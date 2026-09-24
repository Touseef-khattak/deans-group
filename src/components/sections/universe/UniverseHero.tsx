import Image from "next/image";

export default function UniverseHero() {
  return (
    <div className="relative flex h-[400px] items-center justify-center gap-11 overflow-hidden bg-primary p-20">
      <Image
        src="/images/deans-universe/hero-bg.png"
        alt="Inside a Deans development"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative flex w-[1000px] flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <p className="font-cascadia text-body-sm tracking-wide text-surface-warm uppercase">
            Deans Universe
          </p>
          <Image
            src="/images/icons/hero-line.svg"
            alt=""
            width={135}
            height={1}
          />
        </div>

        <h1 className="w-full text-center font-heading text-[64px] leading-[1.02] font-medium text-text-on-dark">
          Six companies.{" "}
          <span className="font-normal text-primary italic">
            One name behind them.
          </span>
        </h1>

        <p className="w-full text-center text-body-lg text-text-on-dark">
          Every operating company inside Deans Group, in one directory. Each
          card routes straight into that company&rsquo;s own space — a full
          microsite where one exists, a profile page where it doesn&rsquo;t
          yet.
        </p>
      </div>
    </div>
  );
}
