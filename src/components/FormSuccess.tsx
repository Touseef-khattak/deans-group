"use client";

import { useEffect, useState } from "react";

const EASE = "cubic-bezier(.22,1,.36,1)";

/**
 * Replaces a form's fields once it has submitted successfully: an
 * animated checkmark, a confirmation message, and a button to reset
 * back to a blank form.
 */
export default function FormSuccess({
  message,
  onReset,
  resetLabel = "Fill the form again",
}: {
  message: string;
  onReset: () => void;
  resetLabel?: string;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setShown(true);
      return;
    }
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setShown(true));
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  return (
    <div
      role="status"
      className="flex flex-col items-start gap-5 border border-primary bg-surface-warm/40 p-6 sm:p-8"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(12px)",
        transition: `opacity .5s ${EASE}, transform .5s ${EASE}`,
      }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle
          cx="28"
          cy="28"
          r="26"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          style={{
            strokeDasharray: 164,
            strokeDashoffset: shown ? 0 : 164,
            transition: `stroke-dashoffset .7s ${EASE} .1s`,
          }}
        />
        <path
          d="M17 29L24.5 36.5L39.5 20.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
          style={{
            strokeDasharray: 40,
            strokeDashoffset: shown ? 0 : 40,
            transition: `stroke-dashoffset .5s ${EASE} .55s`,
          }}
        />
      </svg>

      <p className="text-body-md text-text-primary">{message}</p>

      <button
        type="button"
        onClick={onReset}
        className="flex h-14 w-[200px] items-center justify-center border border-primary bg-primary text-button text-text-on-dark transition-colors duration-300 hover:bg-background hover:text-primary"
      >
        {resetLabel}
      </button>
    </div>
  );
}
