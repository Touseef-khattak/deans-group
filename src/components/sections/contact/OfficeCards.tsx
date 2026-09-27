import Image from "next/image";
import Reveal from "@/components/Reveal";

function mapsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

const offices = [
  {
    tag: "Head office - Peshawar",
    image: "/images/contact/office-peshawar.png",
    city: "Peshawar",
    address: "Deans Trade Centre, Peshawar Cantt",
    phone: "091 46 374 38",
    sales: "samee@deans.com",
    leasing: "shahid@deans.com",
  },
  {
    tag: "Regional - Islamabad",
    image: "/images/contact/office-islamabad.png",
    city: "Islamabad",
    address: "Serving Deans Apartments One (G-11/3) and Deans Arcade (I-16)",
    phone: "051 46 374 38",
    sales: "isb-sales@deans.com",
    leasing: "isb-lease@deans.com",
  },
  {
    tag: "Regional - Karachi",
    image: "/images/contact/office-karachi.png",
    city: "Karachi",
    address: "Deans Shopping Mall, Main Tariq Road (opposite Rabi Centre)",
    phone: "041 46 374 38",
    sales: "khi-sales@deans.com",
    leasing: "khi-lease@deans.com",
  },
];

export default function OfficeCards() {
  return (
    <div className="flex flex-col items-center gap-6 p-4 sm:px-6 sm:py-10 md:p-10 lg:p-20">
      <div className="flex w-full flex-col gap-6">
        <h2 className="font-heading text-h1 text-text-primary">
          Our Offices
        </h2>
        <p className="text-body-lg text-text-secondary">
          Currently we have offices in three major cities
        </p>
      </div>

      <Reveal
        stagger
        className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {offices.map((office) => (
          <div
            key={office.city}
            className="flex flex-col items-start gap-3 border border-border p-6"
          >
            <p className="font-cascadia text-body-sm text-text-muted">
              {office.tag}
            </p>
            <div className="relative h-[250px] w-full">
              <Image
                src={office.image}
                alt={office.city}
                fill
                className="object-cover object-bottom"
              />
            </div>
            <h3 className="font-heading text-h3 text-text-primary">
              {office.city}
            </h3>
            <p className="h-12 text-body-md text-text-secondary">
              {office.address}
            </p>
            <div className="w-full border-t border-border" />
            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center justify-between text-body-sm">
                <p className="text-text-muted">Phone</p>
                <p className="text-text-primary">{office.phone}</p>
              </div>
              {/* Hidden per request — re-enable if/when each location gets its
                  own real sales/leasing contact instead of the current
                  @deans.com placeholders.
              <div className="flex items-center justify-between text-body-sm">
                <p className="text-text-muted">Sales</p>
                <p className="text-text-primary">{office.sales}</p>
              </div>
              <div className="flex items-center justify-between text-body-sm">
                <p className="text-text-muted">Leasing</p>
                <p className="text-text-primary">{office.leasing}</p>
              </div>
              */}
            </div>
            <a
              href={mapsHref(office.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-full items-center justify-center bg-surface-warm text-button text-primary-active"
            >
              Get Directions
            </a>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
