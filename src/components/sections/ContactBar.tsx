import Image from "next/image";
import Reveal from "@/components/Reveal";

const contacts = [
  { label: "Whatsapp", value: "+92 316 363 27 38" },
  { label: "Direct Line", value: "091 362 37 27" },
  { label: "Direct Email", value: "contact@deans.com" },
];

export default function ContactBar() {
  return (
    <div className="border-t border-border bg-background">
      <Reveal className="flex items-center justify-between px-20 py-10">
        <h2 className="font-heading text-h3 text-primary-hover">
          Speak to a person, not a portal.
        </h2>

        <div className="flex gap-6">
          {contacts.map((contact) => (
            <div
              key={contact.label}
              className="flex w-[220px] flex-col gap-1 border border-border px-4 py-3"
            >
              <p className="text-caption text-text-secondary">
                {contact.label}
              </p>
              <p className="text-body-lg text-text-primary">
                {contact.value}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="relative h-[133px] w-full">
        <Image
          src="/images/misc/skyline-strip.png"
          alt="Deans Group projects skyline"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
