import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function SectorPanel({
  number,
  tag,
  title,
  description,
  image,
  imageAlt,
  reverse = false,
  tone = "light",
}: {
  number: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
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
      <button
        type="button"
        className={
          tone === "warm"
            ? "flex h-14 w-[200px] items-center justify-center bg-background text-button text-primary-active"
            : "flex h-14 w-[200px] items-center justify-center bg-surface-warm text-button text-primary-active"
        }
      >
        View &amp; Book
      </button>
    </div>
  );

  const media = (
    <div className="relative h-[400px] w-[600px] shrink-0">
      <Image src={image} alt={imageAlt} fill className="object-cover" />
    </div>
  );

  return (
    <Reveal
      className={
        tone === "warm"
          ? "flex items-center gap-20 border-t border-border bg-surface-warm p-20"
          : "flex items-center gap-20 border-t border-border bg-background p-20"
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
