"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { T } from "@/components/LanguageProvider";

const cities = [
  { name: "Peshawar", value: "7 Projects" },
  { name: "Islamabad", value: "2 Projects" },
  { name: "Lahore", value: "Expansion" },
  { name: "Karachi", value: "1 Project" },
  { name: "Quetta", value: "Expansion" },
];

export default function DeansLandscape() {
  const [active, setActive] = useState("Peshawar");

  return (
    <div className="flex flex-col gap-10 bg-background px-20 py-16">
      <Reveal>
        <T
          as="h2"
          en="The Deans Landscape"
          ur="مقامات"
          className="font-heading text-h1 text-text-primary"
        />
      </Reveal>

      <Reveal className="flex h-[534px] border border-border">
        <div className="relative h-full w-[839px] shrink-0">
          <Image
            src="/images/map/pakistan-map.png"
            alt="Map of Deans Group projects across Pakistan"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-8 p-10">
          <h3 className="font-heading text-h3 text-text-primary">
            Where Deans builds
          </h3>

          <div className="flex flex-col">
            {cities.map((city) => {
              const isActive = city.name === active;
              return (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => setActive(city.name)}
                  className={
                    isActive
                      ? "flex items-center justify-between bg-primary/10 px-4 py-4 text-left transition-colors"
                      : "flex items-center justify-between px-4 py-4 text-left transition-colors hover:bg-surface-warm"
                  }
                >
                  <p
                    className={
                      isActive
                        ? "text-body-lg text-primary"
                        : "text-body-lg text-text-primary"
                    }
                  >
                    {city.name}
                  </p>
                  <p
                    className={
                      isActive
                        ? "text-body-md text-primary"
                        : "text-body-md text-text-secondary"
                    }
                  >
                    {city.value}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
