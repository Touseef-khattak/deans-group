"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function ConsultationForm({
  heading = "Not sure which company you need? Ask us.",
  id,
}: {
  heading?: string;
  id?: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitted) return;
    setSubmitted(true);
  }

  return (
    <Reveal id={id} className="flex items-center gap-16 p-20">
      <div className="flex w-[450px] shrink-0 flex-col gap-6">
        <h2 className="font-heading text-h1 text-text-primary">
          {heading}
        </h2>
        <p className="text-body-md text-text-secondary">
          Tell us what you&rsquo;re sourcing, supplying, or hoping to build
          together. We&rsquo;ll connect you with the right people—without
          pressure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex h-14 items-center gap-2.5 border border-border px-4">
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
          <div className="flex h-14 items-center gap-2.5 border border-border px-4">
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
          <textarea
            placeholder="Type your message here..."
            className="col-span-2 h-[112px] border border-border px-4 py-2.5 text-body-sm text-text-muted placeholder:text-text-muted outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitted}
          className="flex h-14 w-[200px] items-center justify-center bg-primary text-button text-text-on-dark disabled:opacity-50"
        >
          {submitted ? "Sent" : "Request Consultation"}
        </button>
        {submitted && (
          <p role="status" className="text-body-sm text-primary">
            Thank you. Your message has reached the team — expect a reply
            within one working day.
          </p>
        )}
      </form>
    </Reveal>
  );
}
