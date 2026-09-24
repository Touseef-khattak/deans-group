"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const cities = ["Islamabad", "Peshawar", "Karachi"];
const links: [string, string][] = [
  ["About", "ہمارے بارے میں"],
  ["Blogs", "بلاگ"],
  ["FAQs", "عام سوالات"],
  ["News", "خبریں"],
];

export default function TopUtilityBar() {
  const { lang, toggle } = useLanguage();

  return (
    <div className="flex items-center justify-between bg-primary px-20 py-2">
      <div className="flex items-center gap-4">
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

      <div className="flex items-center gap-6">
        {links.map(([en, ur]) => (
          <p
            key={en}
            className="whitespace-nowrap text-caption text-text-on-dark"
          >
            {lang === "ur" ? ur : en}
          </p>
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
