import Reveal from "@/components/Reveal";

const contacts = [
  {
    label: "Whatsapp",
    value: "+92 316 363 27 38",
    href: "https://wa.me/923163632738",
    external: true,
  },
  {
    label: "Direct Line",
    value: "091 362 37 27",
    href: "tel:0913623727",
  },
  {
    label: "Direct Email",
    value: "contact@deansgroupofcompanies.com",
    href: "mailto:contact@deansgroupofcompanies.com",
  },
];

function ContactCard({
  contact,
  className = "",
}: {
  contact: (typeof contacts)[number];
  className?: string;
}) {
  return (
    <a
      href={contact.href}
      target={contact.external ? "_blank" : undefined}
      rel={contact.external ? "noopener noreferrer" : undefined}
      className={`flex w-[220px] flex-col gap-1 border border-border px-4 py-3 transition-colors hover:border-primary ${className}`}
    >
      <p className="text-caption text-text-secondary">{contact.label}</p>
      <p className="text-body-lg text-text-primary break-words">
        {contact.value}
      </p>
    </a>
  );
}

export default function ContactStrip() {
  const [whatsapp, directLine, directEmail] = contacts;

  return (
    <div className="border-t border-border bg-background">
      <Reveal className="flex flex-wrap items-center justify-between gap-6 px-4 py-8 sm:px-6 md:px-10 lg:px-20 lg:py-10">
        <h2 className="font-heading text-h3 text-primary-hover">
          Speak to a person, not a portal.
        </h2>

        {/*
          Fixed-width grid tracks (not fr/auto) so the email card's
          sm:w-full has a mathematically definite width to fill: exactly
          the combined width of the two 220px cards above it plus the gap
          between them, not just "similar-looking".
        */}
        <div className="grid grid-cols-1 justify-items-start gap-4 sm:grid-cols-[220px_220px] sm:gap-6">
          <ContactCard contact={whatsapp} />
          <ContactCard contact={directLine} />
          <ContactCard
            contact={directEmail}
            className="sm:col-span-2 sm:w-full"
          />
        </div>
      </Reveal>
    </div>
  );
}
