import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Culture() {
  return (
    <Reveal className="flex flex-col gap-6 bg-background p-4 sm:px-6 sm:py-10 md:p-10 lg:p-20">
      <div className="flex w-full flex-col gap-10 lg:w-[651px]">
        <h2 className="font-heading text-h1 text-text-primary">
          We build the places we work in. Then we run them.
        </h2>
        <p className="text-body-md text-text-secondary">
          A family business on its third generation. Small teams, long
          tenures, and a site you can walk to — the buildings on our books
          are the ones our own offices sit in.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:h-[805px] lg:w-full lg:flex-row">
        <div className="relative h-[240px] w-full shrink-0 sm:h-[320px] lg:h-full lg:w-[628px]">
          <Image
            src="/images/careers/culture-team.png"
            alt="The Deans team"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 lg:h-full lg:flex-1">
          <div className="relative h-[200px] w-full sm:h-[260px] lg:h-auto lg:flex-1">
            <Image
              src="/images/careers/culture-office.png"
              alt="A Deans office"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[200px] w-full sm:h-[260px] lg:h-auto lg:flex-1">
            <Image
              src="/images/careers/culture-site.png"
              alt="A Deans construction site"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
