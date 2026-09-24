import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Culture() {
  return (
    <Reveal className="flex flex-col gap-6 bg-background p-20">
      <div className="flex w-[651px] flex-col gap-10">
        <h2 className="font-heading text-h1 text-text-primary">
          We build the places we work in. Then we run them.
        </h2>
        <p className="text-body-md text-text-secondary">
          A family business on its third generation. Small teams, long
          tenures, and a site you can walk to — the buildings on our books
          are the ones our own offices sit in.
        </p>
      </div>

      <div className="flex h-[805px] w-full gap-6">
        <div className="relative h-full w-[628px] shrink-0">
          <Image
            src="/images/careers/culture-team.png"
            alt="The Deans team"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex h-full flex-1 flex-col gap-6">
          <div className="relative flex-1 w-full">
            <Image
              src="/images/careers/culture-office.png"
              alt="A Deans office"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative flex-1 w-full">
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
