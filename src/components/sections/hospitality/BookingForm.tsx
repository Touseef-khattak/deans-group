"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitted) return;
    setSubmitted(true);
  }

  return (
    <Reveal className="flex items-center gap-16 p-20">
      <div className="flex w-[450px] shrink-0 flex-col gap-6">
        <h2 className="font-heading text-h1 text-text-primary">
          Book a stay
        </h2>
        <p className="text-body-md text-text-secondary">
          Tell us what you&rsquo;re sourcing, supplying, or hoping to build
          together. We&rsquo;ll connect you with the right people—without
          pressure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
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
          <div className="relative flex h-14 w-[375px] items-center gap-2.5 border border-border px-4">
            <Image
              src="/images/icons/calendar.svg"
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
                Select Stays Duration
              </option>
              <option value="1">1 night</option>
              <option value="2-3">2–3 nights</option>
              <option value="4-7">4–7 nights</option>
              <option value="7+">7+ nights</option>
            </select>
            <Image
              src="/images/icons/chevron-down.svg"
              alt=""
              width={12}
              height={6}
              className="pointer-events-none ml-auto"
            />
          </div>
          <div className="flex h-14 w-[375px] items-center gap-2.5 border border-border px-4">
            <Image src="/images/icons/bed.svg" alt="" width={16} height={16} />
            <input
              type="number"
              min={1}
              placeholder="Number Of Rooms"
              className="w-full text-body-sm text-text-muted placeholder:text-text-muted outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="submit"
            disabled={submitted}
            className="flex h-14 w-[200px] items-center justify-center bg-primary text-button text-text-on-dark disabled:opacity-50"
          >
            {submitted ? "Sent" : "Check Availability"}
          </button>
          {submitted && (
            <p role="status" className="w-64 text-body-sm text-primary">
              Thank you. Your enquiry has reached the team — expect a reply
              within one working day.
            </p>
          )}
        </div>
      </form>
    </Reveal>
  );
}
