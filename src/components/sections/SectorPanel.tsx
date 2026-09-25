import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export default function SectorPanel({
  id,
  number,
  tag,
  title,
  description,
  detail,
  image,
  imageAlt,
  imageCaption,
  buttonLabel,
  buttonHref,
  reverse = false,
  tone = "light",
}: {
  id?: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  detail?: ReactNode;
  image: string;
  imageAlt: string;
  imageCaption?: string;
  buttonLabel?: string;
  buttonHref?: string;
  reverse?: boolean;
  tone?: "light" | "warm";
}) {
  const content = (
    <div className="flex flex-1 flex-col items-start gap-6">
      <div className="flex w-full items-center gap-4">
        <p className="font-cascadia text-body-md text-primary">{number}</p>
        <div className="h-px w-12 bg-border" />
        <p className="text-caption text-text-muted">{tag}</p>
      </div>
      <h3 className="w-full font-heading text-h1 text-text-primary">
        {title}
      </h3>
      <p className="w-full text-body-lg text-text-secondary">
        {description}
      </p>
      <div className="h-px w-full bg-border" />
      {detail && (
        <p className="w-full text-body-md text-text-muted">{detail}</p>
      )}
      {buttonLabel && buttonHref && (
        <Link
          href={buttonHref}
          className={
            tone === "warm"
              ? "flex h-14 w-[200px] items-center justify-center bg-background text-button text-primary-active"
              : "flex h-14 w-[200px] items-center justify-center bg-surface-warm text-button text-primary-active"
          }
        >
          {buttonLabel}
        </Link>
      )}
    </div>
  );

  const media = (
    <div className="flex w-full shrink-0 flex-col gap-3 lg:w-[600px]">
      <div className="relative h-[260px] w-full sm:h-[320px] lg:h-[400px]">
        <Image src={image} alt={imageAlt} fill className="object-cover" />
      </div>
      {imageCaption && (
        <p className="font-cascadia text-caption text-text-muted">
          {imageCaption}
        </p>
      )}
    </div>
  );

  return (
    <Reveal
      id={id}
      className={
        tone === "warm"
          ? "flex flex-col gap-10 border-t border-border bg-surface-warm p-4 sm:px-6 sm:py-10 md:p-10 lg:flex-row lg:items-center lg:gap-20 lg:p-20"
          : "flex flex-col gap-10 border-t border-border bg-background p-4 sm:px-6 sm:py-10 md:p-10 lg:flex-row lg:items-center lg:gap-20 lg:p-20"
      }
    >
      {reverse ? (
        <>
          {media}
          {content}
        </>
      ) : (
        <>
          {content}
          {media}
        </>
      )}
    </Reveal>
  );
}
