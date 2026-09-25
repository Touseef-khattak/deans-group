import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const downloads = [
  {
    label: "Group Profile",
    value: "PDF — request a copy",
    href: "mailto:info@deansgroupofcompanies.com?subject=Group%20Profile%20request",
  },
  { label: "Portfolio", value: "All 11 projects", href: "/developments" },
];

export default function ProfileCta() {
  return (
    <div className="relative flex flex-col gap-10 overflow-hidden bg-primary p-20">
      <Image
        src="/images/about/cta-texture.png"
        alt=""
        fill
        className="object-cover opacity-10 mix-blend-multiply"
      />
      <Reveal className="relative flex items-center gap-6">
        <p className="flex-1 font-heading text-[40px] leading-[50px] text-secondary">
          Want the full company profile, properly presented?
        </p>
        <div className="flex w-[600px] items-center justify-end gap-4">
          {downloads.map((d) => (
            <Link
              key={d.label}
              href={d.href}
              className="flex w-[272px] flex-col items-start justify-center gap-3 bg-primary-hover p-4 text-left"
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
