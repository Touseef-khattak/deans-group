"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const leftLinks: [string, string, string][] = [
  ["Deans Universe", "دینز یونیورس", "/deans-universe"],
  ["Developments", "منصوبے", "/developments"],
  ["Hospitality", "مہمان نوازی", "/hospitality"],
];
const rightLinks: [string, string, string][] = [
  ["Solutions", "حل", "/solutions"],
  ["Industries", "صنعتیں", "/industries"],
  ["Career", "ملازمتیں", "/careers"],
];

export default function MainNav() {
  const [scrolled, setScrolled] = useState(false);
  const { lang } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    function update() {
      setScrolled(window.scrollY > 24);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={
        scrolled
          ? "sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/95 px-20 py-3 shadow-lg backdrop-blur-sm transition-[padding,box-shadow,background-color] duration-300 ease-out"
          : "sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/90 px-20 py-20 backdrop-blur-sm transition-[padding,box-shadow,background-color] duration-300 ease-out"
      }
    >
      <div className="flex h-12 w-[500px] items-center gap-2">
        {leftLinks.map(([en, ur, href]) => {
          const active = pathname === href;
          return (
            <Link
              key={en}
              href={href}
              className={
                active
                  ? "flex h-10 items-center justify-center border-b border-primary px-4"
                  : "flex h-10 items-center justify-center px-4"
              }
            >
              <p
                className={
                  active
                    ? "whitespace-nowrap text-body-sm text-text-primary"
                    : "whitespace-nowrap text-body-sm text-text-secondary"
                }
              >
                {lang === "ur" ? ur : en}
              </p>
            </Link>
          );
        })}
      </div>

      <a
        href="/"
        className="relative shrink-0 transition-[height,width] duration-300 ease-out"
        style={
          scrolled
            ? { height: 52, width: 92 }
            : { height: 70, width: 124 }
        }
      >
        <Image
          src="/images/brand/deans-logo.png"
          alt="Deans Group of Companies"
          fill
          className="object-cover"
          priority
        />
      </a>

      <div className="flex h-12 w-[500px] items-center justify-end gap-2">
        {rightLinks.map(([en, ur, href]) => {
          const active = pathname === href;
          return (
            <Link
              key={en}
              href={href}
              className={
                active
                  ? "flex h-10 flex-1 items-center justify-center border-b border-primary px-4"
                  : "flex h-10 flex-1 items-center justify-center px-4"
              }
            >
              <p
                className={
                  active
                    ? "whitespace-nowrap text-body-sm text-text-primary"
                    : "whitespace-nowrap text-body-sm text-text-secondary"
                }
              >
                {lang === "ur" ? ur : en}
              </p>
            </Link>
          );
        })}

        <a
          href="/contact"
          className="flex h-10 w-[140px] shrink-0 items-center justify-center gap-1.5 bg-primary px-4"
        >
          <Image
            src="/images/icons/phone.svg"
            alt=""
            width={20}
            height={20}
          />
          <p className="whitespace-nowrap text-body-sm text-surface-warm">
            {lang === "ur" ? "رابطہ" : "Contact"}
          </p>
        </a>
      </div>
    </div>
  );
}
