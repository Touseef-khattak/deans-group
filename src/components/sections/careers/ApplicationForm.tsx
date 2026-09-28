"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import FormSuccess from "@/components/FormSuccess";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { submitForm } from "@/lib/submitForm";

const positions = [
  "Senior Civil Engineer",
  "Project Architect",
  "MEP Engineer",
  "Real Estate Analyst",
  "Other",
];

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { getToken } = useRecaptcha();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitted || submitting) return;
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    try {
      const token = await getToken("application");
      const formData = new FormData(form);
      formData.set("formType", "application");
      formData.set("recaptchaToken", token);
      const result = await submitForm(formData);
      if (result.ok) {
        setSubmitted(true);
        setFileName(null);
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
      id="apply"
      className="flex flex-col gap-10 p-4 sm:px-6 sm:py-10 md:p-10 lg:flex-row lg:items-center lg:gap-16 lg:p-20"
    >
      <div className="flex w-full flex-col gap-6 lg:w-[450px] lg:shrink-0">
        <h2 className="font-heading text-h1 text-text-primary">
          Apply for any open position
        </h2>
        <p className="text-body-md text-text-secondary">
          Tell us what drives you, the strengths you bring, and where you
          hope to grow. We&rsquo;ll connect you with the right opportunities
          at Deans.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-6">
        {submitted ? (
          <FormSuccess
            message="Thank you. Your application has reached the team — expect a reply within one working day."
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
              <div className="relative flex h-14 w-full items-center gap-2.5 border border-border px-4 sm:w-[375px]">
                <Image
                  src="/images/icons/briefcase.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="pointer-events-none"
                />
                <select
                  name="position"
                  defaultValue=""
                  className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent pl-[42px] pr-8 text-body-sm text-text-muted outline-none"
                >
                  <option value="" disabled>
                    Select Position
                  </option>
                  {positions.map((p) => (
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
              <label className="flex h-14 w-full cursor-pointer items-center justify-between gap-2.5 border border-border px-4 sm:w-[375px]">
                <div className="flex flex-1 items-center gap-2.5 overflow-hidden">
                  <Image src="/images/icons/file.svg" alt="" width={16} height={16} />
                  <span className="truncate text-body-sm text-text-muted">
                    {fileName ?? "Your CV / Resume"}
                  </span>
                </div>
                <Image src="/images/icons/upload.svg" alt="" width={14} height={12} />
                <input
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                />
              </label>
              <textarea
                name="message"
                placeholder="Type your message here..."
                className="h-[112px] w-full border border-border px-4 py-2.5 text-body-sm text-text-muted placeholder:text-text-muted outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex h-14 w-[200px] items-center justify-center border border-primary bg-primary text-button text-text-on-dark transition-colors duration-300 hover:bg-background hover:text-primary disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Apply Now"}
            </button>
            {error && (
              <p role="alert" className="text-body-sm text-red-600">
                {error}
              </p>
            )}
          </>
        )}
      </form>
    </Reveal>
  );
}
