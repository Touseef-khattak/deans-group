"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setValue(target);
      setSettled(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(el);
          const duration = 1100;
          let start: number | null = null;
          function step(ts: number) {
            if (start === null) start = ts;
            const k = Math.min(1, (ts - start) / duration);
            const eased = 1 - Math.pow(1 - k, 3);
            setValue(target * eased);
            if (k < 1) requestAnimationFrame(step);
            else {
              setValue(target);
              setSettled(true);
            }
          }
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(settled ? target : value).toFixed(decimals)}
      {suffix}
    </span>
  );
}
