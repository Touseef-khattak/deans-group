import Image from "next/image";

export default function HospitalityHero() {
  return (
    <div className="relative flex h-[400px] items-center justify-center gap-11 overflow-hidden bg-primary p-20">
      <Image
        src="/images/hospitality/hero-bg.png"
        alt="A Deans Hospitality property"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative flex w-[1000px] flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <p className="font-cascadia text-body-sm tracking-wide text-surface-warm uppercase">
            Hospitality
          </p>
          <Image
            src="/images/icons/hero-line.svg"
            alt=""
            width={135}
            height={1}
          />
        </div>

        <h1 className="w-full text-center font-heading text-[64px] leading-[1.02] font-medium text-text-on-dark">
          Hotels and resorts,{" "}
          <span className="font-normal text-primary italic">
            booked in three steps.
          </span>
        </h1>

        <p className="w-full text-center text-body-lg text-text-on-dark">
          Deans Hospitality&rsquo;s stays, with dates, room type and rate
          shown up front — and a reservation that submits.
        </p>
      </div>
    </div>
  );
}
