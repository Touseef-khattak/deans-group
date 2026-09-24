"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function NewsletterCta() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitted) return;
    setSubmitted(true);
  }

  return (
    <Reveal className="flex items-center justify-between gap-16 bg-background px-20 py-16">
      <div className="flex w-[450px] shrink-0 flex-col gap-6">
        <h2 className="font-heading text-h1 text-text-primary">
          Get the progress report before the market does.
        </h2>
        <p className="text-body-md text-text-secondary">
          Construction updates, new launches, and plain-language notes on the
          rules that affect overseas buyers. Monthly. No pricing, no
          pressure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-8">
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
          <label className="flex h-14 w-[375px] items-center justify-between gap-2.5 border border-border px-4">
            <div className="flex flex-1 items-center gap-2.5">
              <Image
                src="/images/icons/click.svg"
                alt=""
                width={16}
                height={16}
              />
              <select
                defaultValue=""
                className="w-full bg-transparent text-body-sm text-text-muted outline-none"
              >
                <option value="" disabled>
                  Select, Who are you?
                </option>
                <option value="investor">An investor in Pakistan</option>
                <option value="overseas">An overseas Pakistani investor</option>
                <option value="home">Looking for a home</option>
                <option value="tenant">A commercial tenant</option>
                <option value="partner">A supplier or partner</option>
              </select>
            </div>
            <Image
              src="/images/icons/chevron-down.svg"
              alt=""
              width={12}
              height={6}
            />
          </label>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="submit"
            disabled={submitted}
            className="flex h-14 w-[200px] items-center justify-center bg-primary text-button text-text-on-dark disabled:opacity-50"
          >
            {submitted ? "Subscribed" : "Subscribe"}
          </button>
          {submitted ? (
            <p role="status" className="w-64 text-body-sm text-primary">
              Thank you. Your message has reached the team — expect a reply
              within one working day.
            </p>
          ) : (
            <p className="w-64 text-body-sm text-text-muted">
              You can unsubscribe from either channel at any time.
            </p>
          )}
        </div>
      </form>
    </Reveal>
  );
}
