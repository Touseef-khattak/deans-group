import Reveal from "@/components/Reveal";

type Section = { heading: string; paragraphs: string[] };

export default function LegalContent({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: Section[];
}) {
  return (
    <div className="flex flex-col gap-10 bg-background p-4 sm:px-6 sm:py-10 md:p-10 lg:p-20">
      <Reveal className="flex flex-col gap-4">
        <h1 className="font-heading text-h1 text-text-primary">{title}</h1>
        <p className="font-cascadia text-body-sm text-text-muted uppercase">
          Last updated: {lastUpdated}
        </p>
        {intro && (
          <p className="max-w-3xl text-body-lg text-text-secondary">
            {intro}
          </p>
        )}
      </Reveal>

      <Reveal stagger className="flex flex-col gap-10">
        {sections.map((section) => (
          <div
            key={section.heading}
            className="flex flex-col gap-4 border-t border-border pt-8"
          >
            <h2 className="font-heading text-h3 text-text-primary">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph, i) => (
              <p key={i} className="max-w-3xl text-body-md text-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </Reveal>
    </div>
  );
}
