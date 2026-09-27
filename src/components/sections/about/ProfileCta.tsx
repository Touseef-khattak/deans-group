import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const downloads = [
  {
    label: "Group Profile",
    value: "PDF — request a copy",
    href: "mailto:contact@deansgroupofcompanies.com?subject=Group%20Profile%20request",
  },
  { label: "Portfolio", value: "All 11 projects", href: "/developments" },
];

export default function ProfileCta() {
  return (
    <div className="relative flex flex-col gap-10 overflow-hidden bg-primary p-4 sm:px-6 sm:py-10 md:p-10 lg:p-20">
      <Image
        src="/images/about/cta-texture.png"
        alt=""
        fill
        className="object-cover opacity-10 mix-blend-multiply"
      />
      <Reveal className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center">
        <p className="flex-1 font-heading text-[26px] leading-[1.3] text-secondary sm:text-[32px] lg:text-[40px] lg:leading-[50px]">
          Want the full company profile, properly presented?
        </p>
        <div className="flex w-full flex-wrap items-center gap-4 lg:w-[600px] lg:flex-nowrap lg:justify-end">
          {downloads.map((d) => (
            <Link
              key={d.label}
              href={d.href}
              className="flex w-full flex-col items-start justify-center gap-3 bg-primary-hover p-4 text-left sm:w-[272px]"
            >
              <p className="font-cascadia text-caption text-secondary">
                {d.label}
              </p>
              <div className="flex w-full items-center justify-center gap-2.5">
                <p className="flex-1 truncate text-body-lg text-text-on-dark">
                  {d.value}
                </p>
                <Image
                  src="/images/icons/cloud-down.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
