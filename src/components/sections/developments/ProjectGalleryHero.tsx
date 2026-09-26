"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ProjectDetail } from "@/lib/projectDetails";

export default function ProjectGalleryHero({
  project,
}: {
  project: ProjectDetail;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const count = project.gallery.length;

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, count]);

  return (
    <div className="flex flex-col gap-6 bg-background p-4 sm:px-6 sm:py-10 md:p-10 lg:gap-10 lg:p-20">
      <div className="flex flex-col gap-3">
        <p className="font-cascadia text-body-sm tracking-wide text-text-muted uppercase">
          {project.location} · {project.status}
        </p>
        <h1 className="font-heading text-h1 text-text-primary">
          {project.name}
        </h1>
        <p className="max-w-2xl text-body-lg text-text-secondary">
          {project.description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        aria-label={`View the ${count}-photo gallery for ${project.name}`}
        className="group relative h-[280px] w-full overflow-hidden sm:h-[380px] md:h-[460px] lg:h-[560px]"
      >
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          priority
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        <div className="absolute right-4 bottom-4 flex items-center gap-2 border border-background bg-background px-4 py-2 text-text-primary transition-colors duration-300 group-hover:border-primary group-hover:text-primary sm:right-6 sm:bottom-6">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
            <path
              d="M3 16l5-4 4 3 3-2 6 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-body-sm">
            {count} {count === 1 ? "photo" : "photos"} — View gallery
          </p>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 p-4 sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center justify-between text-text-on-dark">
            <p className="font-cascadia text-body-sm">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")} — {project.name}
            </p>
            <button
              type="button"
              aria-label="Close gallery"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="flex h-10 w-10 items-center justify-center border border-text-on-dark/40 text-text-on-dark transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div
            className="relative mt-4 flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={project.gallery[index].src}
              alt={project.gallery[index].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {count > 1 && (
            <div
              className="mt-4 flex items-center justify-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => setIndex((i) => (i - 1 + count) % count)}
                className="flex h-12 w-12 items-center justify-center border border-text-on-dark/40 text-text-on-dark transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => setIndex((i) => (i + 1) % count)}
                className="flex h-12 w-12 items-center justify-center border border-text-on-dark/40 text-text-on-dark transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
