"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FormSuccess from "@/components/FormSuccess";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { submitForm } from "@/lib/submitForm";

export default function NewsletterCta() {
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
      const token = await getToken("newsletter");
      const formData = new FormData(form);
      formData.set("formType", "newsletter");
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
    <Reveal className="flex flex-col gap-10 bg-background p-4 sm:px-6 sm:py-10 md:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:p-20 lg:py-16">
      <div className="flex w-full flex-col gap-6 lg:w-[450px] lg:shrink-0">
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
        {submitted ? (
          <FormSuccess
            message="Thank you. Your message has reached the team — expect a reply within one working day."
            onReset={() => {
              setSubmitted(false);
              setError(null);
            }}
          />
        ) : (
          <>
            <div className="flex flex-wrap gap-4">
              <div className="flex h-14 w-full items-center gap-2.5 border border-border px-4 sm:w-[375px]">
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
              <div className="flex h-14 w-full items-center gap-2.5 border border-border px-4 sm:w-[375px]">
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
              <div className="flex h-14 w-full items-center gap-2.5 border border-border px-4 sm:w-[375px]">
                <Image
                  src="/images/icons/phone-outline.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full text-body-sm text-text-muted placeholder:text-text-muted outline-none"
                />
              </div>
              <div className="relative flex h-14 w-full items-center gap-2.5 border border-border px-4 sm:w-[375px]">
                <Image
                  src="/images/icons/click.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="pointer-events-none"
                />
                <select
                  name="whoAreYou"
                  defaultValue=""
                  className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent pl-[42px] pr-8 text-body-sm text-text-muted outline-none"
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
                <Image
                  src="/images/icons/chevron-down.svg"
                  alt=""
                  width={12}
                  height={6}
                  className="pointer-events-none ml-auto"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={submitting}
                className="flex h-14 w-[200px] items-center justify-center border border-primary bg-primary text-button text-text-on-dark transition-colors duration-300 hover:bg-background hover:text-primary disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Subscribe"}
              </button>
              {error ? (
                <p role="alert" className="w-full text-body-sm text-red-600 sm:w-64">
                  {error}
                </p>
              ) : (
                <p className="w-full text-body-sm text-text-muted sm:w-64">
                  You can unsubscribe from either channel at any time.
                </p>
              )}
            </div>
          </>
        )}
      </form>
    </Reveal>
  );
}
