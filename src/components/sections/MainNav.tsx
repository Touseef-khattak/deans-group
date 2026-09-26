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
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function NavLink({
    en,
    ur,
    href,
    onClick,
    stretch = false,
  }: {
    en: string;
    ur: string;
    href: string;
    onClick?: () => void;
    stretch?: boolean;
  }) {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    const stretchClass = stretch ? " lg:flex-1" : "";
    return (
      <Link
        href={href}
        onClick={onClick}
        className={
          (active
            ? "flex h-10 items-center justify-center border-b border-primary px-4"
            : "flex h-10 items-center justify-center px-4") + stretchClass
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
  }

  return (
    <div
      className={
        scrolled
          ? "sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-4 py-3 shadow-lg backdrop-blur-sm transition-[padding,box-shadow,background-color] duration-300 ease-out sm:px-6 md:px-10 lg:px-20"
          : "sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-sm transition-[padding,box-shadow,background-color] duration-300 ease-out sm:px-6 md:px-10 lg:px-20 lg:py-6"
      }
    >
      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
        className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 lg:hidden"
      >
        <span
          className={
            menuOpen
              ? "h-0.5 w-6 translate-y-2 rotate-45 bg-text-primary transition-transform"
              : "h-0.5 w-6 bg-text-primary transition-transform"
          }
        />
        <span
          className={
            menuOpen
              ? "h-0.5 w-6 opacity-0 transition-opacity"
              : "h-0.5 w-6 bg-text-primary transition-opacity"
          }
        />
        <span
          className={
            menuOpen
              ? "h-0.5 w-6 -translate-y-2 -rotate-45 bg-text-primary transition-transform"
              : "h-0.5 w-6 bg-text-primary transition-transform"
          }
        />
      </button>

      <div className="hidden h-12 w-[500px] items-center gap-2 lg:flex">
        {leftLinks.map(([en, ur, href]) => (
          <NavLink key={en} en={en} ur={ur} href={href} />
        ))}
      </div>

      <a
        href="/"
        className={
          scrolled
            ? "relative h-[40px] w-[71px] shrink-0 transition-[height,width] duration-300 ease-out lg:h-[52px] lg:w-[92px]"
            : "relative h-[40px] w-[71px] shrink-0 transition-[height,width] duration-300 ease-out lg:h-[70px] lg:w-[124px]"
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

      <div className="hidden h-12 w-[500px] items-center justify-end gap-2 lg:flex">
        {rightLinks.map(([en, ur, href]) => (
          <NavLink key={en} en={en} ur={ur} href={href} stretch />
        ))}

        <a
          href="/contact"
          className="group flex h-10 w-[140px] shrink-0 items-center justify-center gap-1.5 border border-primary bg-primary px-4 transition-colors duration-300 hover:bg-background"
        >
          <Image
            src="/images/icons/phone.svg"
            alt=""
            width={20}
            height={20}
          />
          <p className="whitespace-nowrap text-body-sm text-surface-warm transition-colors duration-300 group-hover:text-primary">
            {lang === "ur" ? "رابطہ" : "Contact"}
          </p>
        </a>
      </div>

      <a
        href="/contact"
        className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary bg-primary transition-colors duration-300 hover:bg-background lg:hidden"
        aria-label="Contact"
      >
        <Image src="/images/icons/phone.svg" alt="" width={18} height={18} />
      </a>

      {menuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col gap-1 overflow-y-auto bg-background px-4 py-6 lg:hidden">
          {[...leftLinks, ...rightLinks].map(([en, ur, href]) => (
            <NavLink
              key={en}
              en={en}
              ur={ur}
              href={href}
              onClick={() => setMenuOpen(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
