"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const quickLinks: [string, string][] = [
  ["Deans Universe", "دینز یونیورس"],
  ["Developments / Ventures", "منصوبے"],
  ["Hospitality", "مہمان نوازی"],
  ["Solutions", "حل"],
  ["Industries", "صنعتیں"],
  ["Careers at Deans", "ملازمتیں"],
];

const contactLinks: [string, string][] = [
  ["About Us", "ہمارے بارے میں"],
  ["News", "خبریں"],
  ["Blogs", "بلاگ"],
  ["FAQs", "عام سوالات"],
];

const connectLinks = [
  "Contacts & offices",
  "WhatsApp",
  "LinkedIn",
  "Instagram",
  "YouTube",
];

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
    <footer className="bg-primary-active px-20 py-16">
      <div className="flex justify-between gap-16 pb-8">
        <div className="flex w-[400px] flex-col gap-4">
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
          {quickLinks.map(([en, ur]) => (
            <p key={en} className="text-body-md text-text-on-dark">
              {lang === "ur" ? ur : en}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-body-md text-primary">Contact</p>
          {contactLinks.map(([en, ur]) => (
            <p key={en} className="text-body-md text-text-on-dark">
              {lang === "ur" ? ur : en}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-body-md text-primary">Connect</p>
          {connectLinks.map((link) => (
            <p key={link} className="text-body-md text-text-on-dark">
              {link}
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-6">
        <p className="text-body-sm text-text-on-dark/70">Deans Group © 2026</p>
        <div className="flex gap-6">
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
