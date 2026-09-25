import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function CompanyOverview() {
  return (
    <Reveal className="flex flex-col gap-10 border-t border-border bg-background p-4 sm:px-6 sm:py-10 md:p-10 lg:flex-row lg:items-center lg:gap-20 lg:p-20">
      <div className="flex flex-1 flex-col gap-6">
        <h2 className="w-full font-heading text-h1 text-text-primary">
          Anchored in Peshawar. Building nationally.
        </h2>
        <div className="flex flex-col gap-2.5">
          <p className="text-body-lg text-text-secondary">
            Deans Developers is a premier real-estate development and
            construction enterprise: experienced industry professionals,
            project managers, and a robust consortium of financial partners,
            specialising in the end-to-end execution of large-scale
            commercial, residential and mixed-use developments. The
            portfolio runs from luxury high-rise apartments to landmark
            commercial trade centres with corporate offices, retail malls,
            hospitality units and entertainment facilities.
          </p>
          <p className="text-body-lg text-text-secondary">
            We hold a market-leading position in Peshawar and are expanding
            across Pakistan on a growing national network of clients,
            financial institutions and top-tier supply chains.
          </p>
        </div>
      </div>
      <div className="relative h-[260px] w-full shrink-0 sm:h-[320px] lg:h-[400px] lg:w-[600px]">
        <Image
          src="/images/about/overview.png"
          alt="Deans Complex"
          fill
          className="object-cover"
        />
      </div>
    </Reveal>
  );
}
