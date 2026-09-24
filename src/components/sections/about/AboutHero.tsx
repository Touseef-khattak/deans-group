import Image from "next/image";

export default function AboutHero() {
  return (
    <div className="relative flex h-[400px] items-center justify-center gap-11 overflow-hidden bg-primary p-20">
      <Image
        src="/images/about/hero-bg.png"
        alt="A Deans Group development at dusk"
        fill
        priority
        className="object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative flex w-[1000px] flex-col items-center justify-center gap-8">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <p className="font-cascadia text-body-sm tracking-wide text-surface-warm uppercase">
            About Deans
          </p>
          <Image
            src="/images/icons/hero-line.svg"
            alt=""
            width={135}
            height={1}
          />
        </div>

        <h1 className="w-full text-center font-heading text-[64px] leading-[1.02] font-medium text-text-on-dark">
          Fifty-five years of putting{" "}
          <span className="font-normal text-primary italic">
            the family name on the facade.
          </span>
        </h1>

        <p className="w-full text-center text-body-lg text-text-on-dark">
          Deans Group of Companies is a Peshawar-rooted, nationally active
          group built on generations of craftsmanship, integrity and
          real-estate acumen — today six companies spanning development,
          industry, energy, fitness and hospitality.
        </p>
      </div>
    </div>
  );
}
