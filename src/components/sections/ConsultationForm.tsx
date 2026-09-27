"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { submitForm } from "@/lib/submitForm";

export default function ConsultationForm({
  heading = "Not sure which company you need? Ask us.",
  id,
}: {
  heading?: string;
  id?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useRecaptcha();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitted || submitting) return;
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    try {
      const token = await getToken("consultation");
      const formData = new FormData(form);
      formData.set("formType", "consultation");
      formData.set("recaptchaToken", token);
      const result = await submitForm(formData);
      if (result.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setError(result.error);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Reveal
      id={id}
      className="flex flex-col items-stretch gap-10 p-4 sm:px-6 sm:py-10 md:p-10 lg:flex-row lg:items-center lg:gap-16 lg:p-20"
    >
      <div className="flex w-full flex-col gap-6 lg:w-[450px] lg:shrink-0">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex h-14 items-center gap-2.5 border border-border px-4">
            <Image
              src="/images/icons/user-circle.svg"
              alt=""
              width={16}
              height={16}
            />
            <input
              type="text"
              name="name"
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
              name="email"
              placeholder="Your Email"
              required
              className="w-full text-body-sm text-text-muted placeholder:text-text-muted outline-none"
            />
          </div>
          <textarea
            name="message"
            placeholder="Type your message here..."
            className="h-[112px] border border-border px-4 py-2.5 text-body-sm text-text-muted placeholder:text-text-muted outline-none sm:col-span-2"
          />
        </div>

        <button
          type="submit"
          disabled={submitted || submitting}
          className="flex h-14 w-[200px] items-center justify-center border border-primary bg-primary text-button text-text-on-dark transition-colors duration-300 hover:bg-background hover:text-primary disabled:opacity-50"
        >
          {submitted ? "Sent" : submitting ? "Sending…" : "Request Consultation"}
        </button>
        {submitted && (
          <p role="status" className="text-body-sm text-primary">
            Thank you. Your message has reached the team — expect a reply
            within one working day.
          </p>
        )}
        {error && (
          <p role="alert" className="text-body-sm text-red-600">
            {error}
          </p>
        )}
      </form>
    </Reveal>
  );
}
