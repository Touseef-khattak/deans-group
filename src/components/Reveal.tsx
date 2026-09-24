"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

const EASE = "cubic-bezier(.22,1,.36,1)";
const STAGGER_MS = 55;

type Phase = "plain" | "hidden" | "revealed";

function usePhase() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("plain");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    const vh = window.innerHeight || 800;
    if (el.getBoundingClientRect().top < vh * 0.92) return;

    setPhase("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPhase("revealed");
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, phase };
}

export default function Reveal({
  children,
  className,
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const { ref, phase } = usePhase();

  if (stagger) {
    const items = Children.toArray(children).filter(isValidElement) as
      ReactElement<{ style?: CSSProperties }>[];

    return (
      <div ref={ref} className={className}>
        {items.map((child, i) =>
          cloneElement(child, {
            key: child.key ?? i,
            style:
              phase === "plain"
                ? child.props.style
                : {
                    ...child.props.style,
                    opacity: phase === "revealed" ? 1 : 0,
                    transform:
                      phase === "revealed" ? "none" : "translateY(16px)",
                    transition: `opacity .6s ${EASE} ${i * STAGGER_MS}ms, transform .6s ${EASE} ${i * STAGGER_MS}ms`,
                  },
          }),
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={
        phase === "plain"
          ? undefined
          : {
              opacity: phase === "revealed" ? 1 : 0,
              transform: phase === "revealed" ? "none" : "translateY(20px)",
              transition: `opacity .8s ${EASE}, transform .8s ${EASE}`,
            }
      }
    >
      {children}
    </div>
  );
}
