"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { T } from "@/components/LanguageProvider";
import { EXPANSION_CITIES, GEO_LOCATIONS, groupByCity } from "@/lib/geoData";
import GeoMap, { type GeoMapHandle } from "./GeoMap";
import FallbackMap from "./FallbackMap";

const byCity = groupByCity(GEO_LOCATIONS);
const CITY_ORDER = ["Peshawar", "Islamabad", "Karachi"] as const;

export default function DeansLandscape() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<GeoMapHandle>(null);

  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [expandedCity, setExpandedCity] = useState<string | null>("Peshawar");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function toggleCity(city: string) {
    setExpandedCity((cur) => (cur === city ? null : city));
  }

  function selectLocation(id: string) {
    setSelectedId(id);
    mapRef.current?.flyTo(id);
  }

  function reset() {
    setSelectedId(null);
    mapRef.current?.reset();
  }

  return (
    <div ref={sectionRef} className="flex flex-col gap-10 bg-background px-20 py-16">
      <Reveal>
        <T
          as="h2"
          en="The Deans Landscape"
          ur="مقامات"
          className="font-heading text-h1 text-text-primary"
        />
      </Reveal>

      <Reveal className="flex h-[534px] border border-border">
        <div className="relative h-full w-[839px] shrink-0 bg-surface-warm">
          {!started && (
            <Image
              src="/images/map/pakistan-map.png"
              alt="Map of Deans Group projects across Pakistan"
              fill
              className="object-cover"
            />
          )}
          {started && !failed && (
            <GeoMap
              ref={mapRef}
              onResult={(ok) => setFailed(!ok)}
              onSelect={setSelectedId}
            />
          )}
          {started && failed && <FallbackMap highlightCity={expandedCity} />}
        </div>

        <div className="flex flex-1 flex-col gap-6 p-10">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-h3 text-text-primary">
              Where Deans builds
            </h3>
            {selectedId && (
              <button
                type="button"
                onClick={reset}
                className="font-cascadia text-caption text-primary underline-offset-2 hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto">
            {CITY_ORDER.map((city) => {
              const locations = byCity.get(city) ?? [];
              const isExpanded = expandedCity === city;
              return (
                <div key={city} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => toggleCity(city)}
                    aria-expanded={isExpanded}
                    className={
                      isExpanded
                        ? "flex w-full items-center justify-between bg-primary/10 px-4 py-4 text-left transition-colors"
                        : "flex w-full items-center justify-between px-4 py-4 text-left transition-colors hover:bg-surface-warm"
                    }
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        className={
                          isExpanded ? "rotate-90 transition-transform" : "transition-transform"
                        }
                      >
                        <path
                          d="M3 1.5L7 5L3 8.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={isExpanded ? "text-primary" : "text-text-secondary"}
                        />
                      </svg>
                      <span
                        className={
                          isExpanded
                            ? "text-body-lg text-primary"
                            : "text-body-lg text-text-primary"
                        }
                      >
                        {city}
                      </span>
                    </span>
                    <span
                      className={
                        isExpanded
                          ? "text-body-md text-primary"
                          : "text-body-md text-text-secondary"
                      }
                    >
                      {locations.length} {locations.length === 1 ? "Project" : "Projects"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="flex flex-col pb-2 pl-8">
                      {locations.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => selectLocation(loc.id)}
                          className={
                            loc.id === selectedId
                              ? "flex flex-col items-start gap-0.5 border-l-2 border-primary py-2 pl-3 text-left"
                              : "flex flex-col items-start gap-0.5 border-l-2 border-transparent py-2 pl-3 text-left transition-colors hover:border-border"
                          }
                        >
                          <span
                            className={
                              loc.id === selectedId
                                ? "text-body-md text-primary"
                                : "text-body-md text-text-primary"
                            }
                          >
                            {loc.name}
                          </span>
                          <span className="text-caption text-text-secondary">
                            {loc.kind} · {loc.status}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {EXPANSION_CITIES.map((city) => (
              <div
                key={city.name}
                className="flex items-center justify-between border-b border-border px-4 py-4"
              >
                <p className="text-body-lg text-text-primary">{city.name}</p>
                <p className="text-body-md text-text-secondary">{city.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
