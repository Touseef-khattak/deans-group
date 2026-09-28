import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Leadership() {
  return (
    <div className="flex flex-col items-center gap-14 bg-background px-4 py-10 sm:px-6 md:px-10 lg:gap-20 lg:px-20 lg:py-16">
      <Reveal className="flex w-full items-center justify-center">
        <div className="flex w-full flex-col items-start gap-6 sm:w-[400px] lg:w-[543px]">
          <div className="relative h-[380px] w-full sm:h-[420px] lg:h-[550px]">
            <div className="absolute top-5 left-[3.58%] h-full w-[96.42%] bg-primary" />
            <div className="relative h-full w-[96.42%]">
              <Image
                src="/images/about/placeholder-person.png"
                alt="Mr. Nasir Jamal"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-6">
            <h3 className="font-heading text-h3 text-text-primary">
              Mr. Nasir Jamal
            </h3>
            <p className="font-cascadia text-body-sm text-text-muted">
              Chairman &amp; CEO
            </p>
            <p className="text-body-lg text-text-secondary">
              Led the 1998 acquisition of the Deans Hotel site and the
              group&rsquo;s expansion from a Peshawar builder into a
              national developer.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
