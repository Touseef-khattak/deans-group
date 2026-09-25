"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

export default function Hero() {
  const { lang } = useLanguage();

  return (
    <div className="relative flex h-[520px] items-center gap-11 overflow-hidden bg-primary p-4 sm:h-[600px] sm:px-6 sm:py-10 md:h-[680px] md:p-10 lg:h-[765px] lg:p-20">
      <Image
        src="/images/hero/hero-bg.png"
        alt="Aerial view of a Deans development"
        fill
        priority
        className="object-cover object-bottom"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative flex w-full max-w-[847px] flex-col items-start justify-center gap-6 sm:gap-8">
        <p className="w-full text-body-lg text-text-on-dark">
          Deans built for more
        </p>

        <h1 className="w-full font-heading text-[40px] leading-[1.05] font-medium text-text-on-dark sm:text-[54px] md:text-[66px] lg:text-[82px] lg:leading-none">
          {lang === "ur" ? (
            "۱۹۷۱ سے تعمیر، اعتماد کے ساتھ"
          ) : (
            <>
              Landmarks that outlive{" "}
              <span className="font-normal text-primary italic">
                the men who build them.
              </span>
            </>
          )}
        </h1>

        <p className="w-full text-body-lg text-text-on-dark">
          Six companies. Three cities. Fifty-five years of construction that
          Peshawar, Islamabad and Karachi still stand on. Deans Group builds
          — and holds — the addresses Pakistan invests in.
        </p>

        <div className="flex w-full items-center justify-center gap-4">
          <div className="h-0 w-[135px] shrink-0 border-t border-primary" />
          <p className="flex-1 font-cascadia text-body-sm leading-6 text-primary uppercase">
            Since Nasir Mansion, 1971
          </p>
        </div>
      </div>
    </div>
  );
}
