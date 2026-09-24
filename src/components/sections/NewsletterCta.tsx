"use client";

import { useState } from "react";
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
      <div className="flex w-[480px] shrink-0 flex-col gap-4">
        <h2 className="font-heading text-h1 text-text-primary">
          Get the progress report before the market does.
        </h2>
        <p className="text-body-md text-text-secondary">
          Construction updates, new launches, and plain-language notes on the
          rules that affect overseas buyers. Monthly. No pricing, no
          pressure.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex h-12 items-center gap-2 border border-border px-4">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" className="text-primary" />
              <path d="M2.5 14C2.5 11 5 9.5 8 9.5C11 9.5 13.5 11 13.5 14" stroke="currentColor" className="text-primary" />
            </svg>
            <input
              type="text"
              placeholder="Your Full Name"
              required
              className="w-full text-body-md text-text-secondary placeholder:text-text-secondary outline-none"
            />
          </div>
          <div className="flex h-12 items-center gap-2 border border-border px-4">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="3.5" width="12" height="9" rx="1" stroke="currentColor" className="text-primary" />
              <path d="M2.5 4L8 8.5L13.5 4" stroke="currentColor" className="text-primary" />
            </svg>
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full text-body-md text-text-secondary placeholder:text-text-secondary outline-none"
            />
          </div>
          <div className="flex h-12 items-center gap-2 border border-border px-4">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 2.5C3 2.5 3.5 2.5 4.5 2.5C5 4 5.5 5 5 5.5C4 6.5 4.5 7.5 5.5 8.5C6.5 9.5 7.5 10 8.5 9C9 8.5 10 9 11.5 9.5C11.5 10.5 11.5 11 11.5 11C11.5 12 10.5 13 9 13C5.5 13 3 10.5 3 7C3 5 3 2.5 3 2.5Z"
                stroke="currentColor"
                className="text-primary"
              />
            </svg>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full text-body-md text-text-secondary placeholder:text-text-secondary outline-none"
            />
          </div>
          <label className="flex h-12 items-center justify-between gap-2 border border-border px-4">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L9 6L13 7L9 8L8 12L7 8L3 7L7 6L8 2Z" stroke="currentColor" className="text-primary" />
              </svg>
              <select
                defaultValue=""
                className="w-full bg-transparent text-body-md text-text-secondary outline-none"
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
          </label>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="submit"
            disabled={submitted}
            className="flex h-12 items-center justify-center bg-primary px-6 text-body-sm text-text-on-dark disabled:opacity-50"
          >
            {submitted ? "Subscribed" : "Subscribe"}
          </button>
          {submitted ? (
            <p role="status" className="text-body-sm text-primary">
              Thank you. Your message has reached the team — expect a reply
              within one working day.
            </p>
          ) : (
            <p className="text-body-sm text-text-secondary">
              You can unsubscribe from either channel at any time.
            </p>
          )}
        </div>
      </form>
    </Reveal>
  );
}
