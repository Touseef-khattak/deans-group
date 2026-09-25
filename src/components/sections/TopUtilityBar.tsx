"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const cities = ["Islamabad", "Peshawar", "Karachi"];
const links: [string, string, string][] = [
  ["About", "ہمارے بارے میں", "/about"],
  ["Blogs", "بلاگ", "/blogs"],
  ["FAQs", "عام سوالات", "/faqs"],
  ["News", "خبریں", "/news"],
];

export default function TopUtilityBar() {
  const { lang, toggle } = useLanguage();

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 bg-primary px-4 py-2 sm:px-6 md:px-10 lg:px-20">
      <div className="hidden items-center gap-4 sm:flex">
        {cities.map((city, i) => (
          <div key={city} className="flex items-center gap-4">
            <p className="whitespace-nowrap text-caption text-text-on-dark">
              {city}
            </p>
            {i < cities.length - 1 && (
              <Image
                src="/images/icons/dot-divider.svg"
                alt=""
                width={4}
                height={4}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        {links.map(([en, ur, href]) => (
          <Link
            key={en}
            href={href}
            className="whitespace-nowrap text-caption text-text-on-dark"
          >
            {lang === "ur" ? ur : en}
          </Link>
        ))}

        <button
          type="button"
          onClick={toggle}
          aria-pressed={lang === "ur"}
          title="Switch the site between English and Urdu"
          className="flex h-6 items-center justify-center gap-0.5 rounded-3xl bg-primary-hover p-0.5"
        >
          <div
            className={
              lang === "en"
                ? "flex h-full items-center justify-center rounded-2xl bg-primary px-3"
                : "flex h-full items-center justify-center px-3"
            }
          >
            <p className="whitespace-nowrap text-caption text-text-on-dark">
              ENG
            </p>
          </div>
          <div
            className={
              lang === "ur"
                ? "flex h-full items-center justify-center rounded-2xl bg-primary px-3"
                : "flex h-full items-center justify-center px-3"
            }
          >
            <p
              className="whitespace-nowrap text-caption text-text-on-dark"
              dir="ltr"
            >
              اردو
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
