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
    <>
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
          className="group flex h-10 w-[140px] shrink-0 items-center justify-center gap-1.5 border border-primary bg-primary px-4 text-surface-warm transition-colors duration-300 hover:bg-background hover:text-primary"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.17647 5H8.52941L9.70588 7.94118L8.23529 8.82353C8.86527 10.1009 9.8991 11.1347 11.1765 11.7647L12.0588 10.2941L15 11.4706V13.8235C15 14.1355 14.8761 14.4348 14.6554 14.6554C14.4348 14.8761 14.1355 15 13.8235 15C11.529 14.8606 9.3648 13.8862 7.73931 12.2607C6.11383 10.6352 5.13944 8.47102 5 6.17647C5 5.86445 5.12395 5.56521 5.34458 5.34458C5.56521 5.12395 5.86445 5 6.17647 5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="whitespace-nowrap text-body-sm">
            {lang === "ur" ? "رابطہ" : "Contact"}
          </p>
        </a>
      </div>

      <a
        href="/contact"
        className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary bg-primary text-surface-warm transition-colors duration-300 hover:bg-background hover:text-primary lg:hidden"
        aria-label="Contact"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.17647 5H8.52941L9.70588 7.94118L8.23529 8.82353C8.86527 10.1009 9.8991 11.1347 11.1765 11.7647L12.0588 10.2941L15 11.4706V13.8235C15 14.1355 14.8761 14.4348 14.6554 14.6554C14.4348 14.8761 14.1355 15 13.8235 15C11.529 14.8606 9.3648 13.8862 7.73931 12.2607C6.11383 10.6352 5.13944 8.47102 5 6.17647C5 5.86445 5.12395 5.56521 5.34458 5.34458C5.56521 5.12395 5.86445 5 6.17647 5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>

    <div
      aria-hidden={!menuOpen}
      className={
        (menuOpen
          ? "opacity-100 translate-x-0 pointer-events-auto"
          : "opacity-0 -translate-x-full pointer-events-none") +
        " fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col gap-1 overflow-y-auto bg-background px-4 pt-10 pb-6 transition-[opacity,transform] duration-300 ease-out lg:hidden"
      }
    >
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
    </>
  );
}
