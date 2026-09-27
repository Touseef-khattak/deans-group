"use client";

import { useCallback, useEffect } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript(siteKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Loads Google reCAPTCHA v3 once per page and hands back a function that
 * mints a token for a named action right before a form submits. v3 is
 * invisible (no puzzle) - it just scores how bot-like the request looks.
 */
export function useRecaptcha() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (siteKey) loadScript(siteKey).catch(() => {});
  }, [siteKey]);

  const getToken = useCallback(
    async (action: string): Promise<string> => {
      if (!siteKey) {
        throw new Error(
          "reCAPTCHA is not configured (NEXT_PUBLIC_RECAPTCHA_SITE_KEY missing).",
        );
      }
      await loadScript(siteKey);
      return new Promise((resolve, reject) => {
        window.grecaptcha!.ready(() => {
          window
            .grecaptcha!.execute(siteKey, { action })
            .then(resolve)
            .catch(reject);
        });
      });
    },
    [siteKey],
  );

  return { getToken };
}
