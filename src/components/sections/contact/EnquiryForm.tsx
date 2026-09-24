"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const projects = [
  "Deans Heights",
  "Deans Complex",
  "Deans Shopping Mall",
  "Deans Commercial Center",
  "Deans Trade Centre",
  "Deans Apartments One",
  "Deans Medicine Center",
  "Deans Apartments",
  "Deans Arcade",
  "Nasir Mansion",
  "Shahab Flats",
];

export default function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitted) return;
    setSubmitted(true);
  }

  return (
    <Reveal className="flex items-center justify-center gap-10 p-20">
      <div className="flex flex-col items-start gap-6">
        <div className="flex w-[554px] flex-col gap-6">
          <h2 className="font-heading text-h1 text-text-primary">
            Send us an enquiry &amp; Tell us what you need
          </h2>
          <p className="text-body-md text-text-secondary">
            Tell us what you&rsquo;re sourcing, supplying, or hoping to build
            together. We&rsquo;ll connect you with the right people—without
            pressure.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-[766px] flex-col gap-6"
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex h-14 w-[375px] items-center gap-2.5 border border-border px-4">
              <Image
                src="/images/icons/user-circle.svg"
                alt=""
                width={16}
                height={16}
              />
              <input
                type="text"
                placeholder="Your Full Name"
                required
                className="w-full text-body-sm text-text-muted placeholder:text-text-muted outline-none"
              />
            </div>
            <div className="flex h-14 w-[375px] items-center gap-2.5 border border-border px-4">
              <Image
                src="/images/icons/phone-outline.svg"
                alt=""
                width={16}
                height={16}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full text-body-sm text-text-muted placeholder:text-text-muted outline-none"
              />
            </div>
            <div className="flex h-14 w-[375px] items-center gap-2.5 border border-border px-4">
              <Image
                src="/images/icons/mail.svg"
                alt=""
                width={16}
                height={16}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full text-body-sm text-text-muted placeholder:text-text-muted outline-none"
              />
            </div>
            <div className="relative flex h-14 w-[375px] items-center gap-2.5 border border-border px-4">
              <Image
                src="/images/icons/click.svg"
                alt=""
                width={16}
                height={16}
                className="pointer-events-none"
              />
              <select
                defaultValue=""
                className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent pl-[42px] pr-8 text-body-sm text-text-muted outline-none"
              >
                <option value="" disabled>
                  Select Country
                </option>
                <option value="pk">Pakistan</option>
                <option value="ae">UAE</option>
                <option value="sa">Saudi Arabia</option>
                <option value="uk">UK</option>
                <option value="us">USA</option>
                <option value="other">Other</option>
              </select>
              <Image
                src="/images/icons/chevron-down.svg"
                alt=""
                width={12}
                height={6}
                className="pointer-events-none ml-auto"
              />
            </div>
            <div className="relative flex h-14 w-[375px] items-center gap-2.5 border border-border px-4">
              <Image
                src="/images/icons/click.svg"
                alt=""
                width={16}
                height={16}
                className="pointer-events-none"
              />
              <select
                defaultValue=""
                className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent pl-[42px] pr-8 text-body-sm text-text-muted outline-none"
              >
                <option value="" disabled>
                  Enquiring about
                </option>
                <option value="investor">An investor in Pakistan</option>
                <option value="overseas">
                  An overseas Pakistani investor
                </option>
                <option value="home">Looking for a home</option>
                <option value="tenant">A commercial tenant</option>
                <option value="partner">A supplier or partner</option>
              </select>
              <Image
                src="/images/icons/chevron-down.svg"
                alt=""
                width={12}
                height={6}
                className="pointer-events-none ml-auto"
              />
            </div>
            <div className="relative flex h-14 w-[375px] items-center gap-2.5 border border-border px-4">
              <Image
                src="/images/icons/click.svg"
                alt=""
                width={16}
                height={16}
                className="pointer-events-none"
              />
              <select
                defaultValue=""
                className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent pl-[42px] pr-8 text-body-sm text-text-muted outline-none"
              >
                <option value="" disabled>
                  Select Project
                </option>
                {projects.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <Image
                src="/images/icons/chevron-down.svg"
                alt=""
                width={12}
                height={6}
                className="pointer-events-none ml-auto"
              />
            </div>
            <textarea
              placeholder="Type your message here..."
              className="h-[112px] w-full border border-border px-4 py-2.5 text-body-sm text-text-muted placeholder:text-text-muted outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="flex h-14 w-[200px] items-center justify-center bg-primary text-button text-text-on-dark disabled:opacity-50"
          >
            {submitted ? "Sent" : "Send Enquiry"}
          </button>
          {submitted && (
            <p role="status" className="text-body-sm text-primary">
              Thank you. Your enquiry has reached the team — expect a reply
              within one working day.
            </p>
          )}
        </form>
      </div>

      <div className="flex h-[636px] flex-1 flex-col items-end justify-center gap-4 border border-primary bg-primary-active p-10">
        <p className="w-full font-cascadia text-body-sm text-text-on-dark">
          Fastest route
        </p>
        <p className="w-full font-heading text-h3 text-text-on-dark">
          WhatsApp
        </p>
        <p className="w-full text-body-sm text-text-on-dark">
          Simple questions — availability, brochures, directions, progress —
          are answered instantly by an automated assistant. Anything it
          cannot answer is handed to a live agent, with the conversation
          history intact.
        </p>
        <div className="relative w-full flex-1">
          <Image
            src="/images/contact/whatsapp.png"
            alt="WhatsApp"
            fill
            className="object-cover"
          />
        </div>
        <a
          href="https://wa.me/923163632738?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Deans%20Group%20of%20Companies."
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-full items-center justify-center bg-primary text-button text-text-on-dark"
        >
          Open WhatsApp Chat
        </a>
      </div>
    </Reveal>
  );
}
