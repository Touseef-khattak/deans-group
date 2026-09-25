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
    value: "info@deansgroupofcompanies.com",
    href: "mailto:info@deansgroupofcompanies.com",
  },
];

export default function ContactStrip() {
  return (
    <div className="border-t border-border bg-background">
      <Reveal className="flex flex-wrap items-center justify-between gap-6 px-4 py-8 sm:px-6 md:px-10 lg:px-20 lg:py-10">
        <h2 className="font-heading text-h3 text-primary-hover">
          Speak to a person, not a portal.
        </h2>

        <div className="flex flex-wrap justify-end gap-6">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.external ? "_blank" : undefined}
              rel={contact.external ? "noopener noreferrer" : undefined}
              className="flex w-[220px] flex-col gap-1 border border-border px-4 py-3 transition-colors hover:border-primary"
            >
              <p className="text-caption text-text-secondary">
                {contact.label}
              </p>
              <p className="text-body-lg text-text-primary break-words">
                {contact.value}
              </p>
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
