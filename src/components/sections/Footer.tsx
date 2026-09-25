"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const quickLinks: [string, string, string][] = [
  ["Deans Universe", "دینز یونیورس", "/deans-universe"],
  ["Developments / Ventures", "منصوبے", "/developments"],
  ["Hospitality", "مہمان نوازی", "/hospitality"],
  ["Solutions", "حل", "/solutions"],
  ["Industries", "صنعتیں", "/industries"],
  ["Careers at Deans", "ملازمتیں", "/careers"],
];

const contactLinks: [string, string, string][] = [
  ["About Us", "ہمارے بارے میں", "/about"],
  ["News", "خبریں", "/news"],
  ["Blogs", "بلاگ", "/blogs"],
  ["FAQs", "عام سوالات", "/faqs"],
];

// WhatsApp number derived from the real contact number shown elsewhere on the
// site (+92 316 363 27 38). LinkedIn/Instagram/YouTube have no real URL
// anywhere in the design/data, so they stay as plain (non-linked) labels
// rather than pointing somewhere made up.
const connectLinks: { label: string; href?: string; external?: boolean }[] = [
  { label: "Contacts & offices", href: "/contact" },
  { label: "WhatsApp", href: "https://wa.me/923163632738", external: true },
  { label: "LinkedIn" },
  { label: "Instagram" },
  { label: "YouTube" },
];

// No pages exist yet for any of these — left as plain labels until they do.
const legalLinks = [
  "Company Profile",
  "Annual Report",
  "Client Names",
  "Privacy & Policy",
  "Site Project News",
];

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-primary-active px-4 py-10 sm:px-6 md:px-10 lg:px-20 lg:py-16">
      <div className="flex flex-col flex-wrap gap-10 pb-8 md:flex-row md:justify-between lg:gap-16">
        <div className="flex w-full flex-col gap-4 md:w-[220px] lg:w-[400px]">
          <div className="relative h-[95px] w-[145px]">
            <Image
              src="/images/misc/footer-logo.png"
              alt="Deans Group of Companies"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="text-body-md text-text-on-dark/70">
            Building landmarks across Peshawar, Islamabad and Karachi since
            Nasir Mansion, 1971.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-body-md text-primary">Quick Links</p>
          {quickLinks.map(([en, ur, href]) => (
            <Link
              key={en}
              href={href}
              className="text-body-md text-text-on-dark transition-colors hover:text-primary"
            >
              {lang === "ur" ? ur : en}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-body-md text-primary">Contact</p>
          {contactLinks.map(([en, ur, href]) => (
            <Link
              key={en}
              href={href}
              className="text-body-md text-text-on-dark transition-colors hover:text-primary"
            >
              {lang === "ur" ? ur : en}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-body-md text-primary">Connect</p>
          {connectLinks.map((link) =>
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-body-md text-text-on-dark transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ) : (
              <p key={link.label} className="text-body-md text-text-on-dark">
                {link.label}
              </p>
            ),
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-sm text-text-on-dark/70">Deans Group © 2026</p>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          {legalLinks.map((link) => (
            <p key={link} className="text-body-sm text-text-on-dark/70">
              {link}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
