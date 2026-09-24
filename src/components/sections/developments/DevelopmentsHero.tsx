import Image from "next/image";

export default function DevelopmentsHero() {
  return (
    <div className="relative flex h-[400px] items-center justify-center gap-11 overflow-hidden bg-primary p-20">
      <Image
        src="/images/developments-page/hero-bg.png"
        alt="Deans Group project under development"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative flex w-[1000px] flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <p className="font-cascadia text-body-sm tracking-wide text-surface-warm uppercase">
            Developments / Ventures · Portfolio
          </p>
          <Image
            src="/images/icons/hero-line.svg"
            alt=""
            width={135}
            height={1}
          />
        </div>

        <h1 className="w-full text-center font-heading text-[64px] leading-[1.02] font-medium text-text-on-dark">
          Eleven buildings.{" "}
          <span className="font-normal text-primary italic">
            Three cities. Fifty-five years.
          </span>
        </h1>

        <p className="w-full text-center text-body-lg text-text-on-dark">
          Four delivered landmarks and seven projects in hand. Every one of
          them will carry a 3D model, a floor-plan set and a progress
          record.
        </p>
      </div>
    </div>
  );
}
