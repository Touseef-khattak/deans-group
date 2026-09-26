"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import type { Map as MapLibreMap, Marker, Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { GEO_LOCATIONS, type GeoLocation } from "@/lib/geoData";
import { themeColors, themeMapStyle } from "@/lib/mapTheme";

const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}

function popupHtml(loc: GeoLocation) {
  return `
    <div class="geo-popup-card">
      <span class="geo-popup-eyebrow">${escapeHtml(loc.city)}</span>
      <h4 class="geo-popup-title">${escapeHtml(loc.name)}</h4>
      <p class="geo-popup-meta">${escapeHtml(loc.kind)} · ${escapeHtml(loc.status)}</p>
      <a class="geo-popup-link" href="/developments/${loc.id}">View project &rarr;</a>
    </div>
  `;
}

export type GeoMapHandle = {
  flyTo: (id: string) => void;
  reset: () => void;
};

const GeoMap = forwardRef<
  GeoMapHandle,
  {
    onResult: (ok: boolean) => void;
    onSelect: (id: string | null) => void;
  }
>(function GeoMap({ onResult, onSelect }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const popupRef = useRef<Popup | null>(null);
  const boundsRef = useRef<[number, number][]>([]);

  useImperativeHandle(ref, () => ({
    flyTo(id: string) {
      const map = mapRef.current;
      const loc = GEO_LOCATIONS.find((l) => l.id === id);
      if (!map || !loc) return;
      Object.entries(markersRef.current).forEach(([k, m]) =>
        m.getElement().classList.toggle("active", k === id),
      );
      map.flyTo({ center: [loc.lng, loc.lat], zoom: 14.5, curve: 1.4, speed: 0.8 });
      popupRef.current?.setLngLat([loc.lng, loc.lat]).setHTML(popupHtml(loc)).addTo(map);
      onSelect(id);
    },
    reset() {
      const map = mapRef.current;
      if (!map || !boundsRef.current.length) return;
      Object.values(markersRef.current).forEach((m) =>
        m.getElement().classList.remove("active"),
      );
      popupRef.current?.remove();
      import("maplibre-gl").then(({ LngLatBounds }) => {
        const bounds = boundsRef.current.reduce(
          (b, pt) => b.extend(pt),
          new LngLatBounds(boundsRef.current[0], boundsRef.current[0]),
        );
        map.fitBounds(bounds, {
          padding: { top: 60, bottom: 60, left: 60, right: 60 },
          maxZoom: 6,
          duration: 1200,
        });
      });
      onSelect(null);
    },
  }));

  useEffect(() => {
    let cancelled = false;

    async function start() {
      try {
        const maplibregl = await import("maplibre-gl");
        if (cancelled || !containerRef.current) return;

        // maplibre-gl derives its worker URL from import.meta.url by default,
        // which resolves to an internal Turbopack chunk URL (not a fetchable
        // file) and fails with "Worker failed to load". Point it at real
        // static copies instead: public/maplibre-gl-worker.mjs, which itself
        // imports public/maplibre-gl-shared.mjs as a sibling file — both
        // copied from node_modules/maplibre-gl/dist, re-copy both if the
        // package updates.
        maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");

        const res = await fetch(MAP_STYLE_URL);
        if (!res.ok) throw new Error("style fetch failed");
        const rawStyle = await res.json();
        if (cancelled) return;

        const map = new maplibregl.Map({
          container: containerRef.current,
          style: themeMapStyle(rawStyle),
          center: [69.5, 32.6],
          zoom: 4.8,
          attributionControl: false,
        });
        mapRef.current = map;
        map.addControl(new maplibregl.AttributionControl({ compact: true }));
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
        popupRef.current = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 20,
          className: "geo-popup",
        });

        map.on("load", () => {
          if (cancelled) return;
          try {
            const c = themeColors();
            const bounds: [number, number][] = [];
            GEO_LOCATIONS.forEach((loc) => {
              const el = document.createElement("button");
              el.type = "button";
              el.className = "geo-pin";
              el.setAttribute("aria-label", `Fly to ${loc.name}`);
              el.style.cssText = `
                width:14px;height:14px;border-radius:9999px;
                background:${c.primary};border:2px solid ${c.paper};
                box-shadow:0 1px 4px rgba(0,0,0,.35);cursor:pointer;padding:0;
              `;
              el.addEventListener("click", () => {
                Object.entries(markersRef.current).forEach(([k, m]) =>
                  m.getElement().classList.toggle("active", k === loc.id),
                );
                map.flyTo({
                  center: [loc.lng, loc.lat],
                  zoom: 14.5,
                  curve: 1.4,
                  speed: 0.8,
                });
                popupRef.current
                  ?.setLngLat([loc.lng, loc.lat])
                  .setHTML(popupHtml(loc))
                  .addTo(map);
                onSelect(loc.id);
              });
              const marker = new maplibregl.Marker({ element: el, anchor: "center" })
                .setLngLat([loc.lng, loc.lat])
                .addTo(map);
              markersRef.current[loc.id] = marker;
              bounds.push([loc.lng, loc.lat]);
            });
            boundsRef.current = bounds;
            const b = bounds.reduce(
              (acc, pt) => acc.extend(pt),
              new maplibregl.LngLatBounds(bounds[0], bounds[0]),
            );
            map.fitBounds(b, {
              padding: { top: 60, bottom: 60, left: 60, right: 60 },
              maxZoom: 6,
              duration: 0,
            });
            onResult(true);
          } catch {
            onResult(false);
          }
        });
        map.on("error", () => {
          /* isolated tile/glyph errors — keep the map alive */
        });
      } catch {
        if (!cancelled) onResult(false);
      }
    }

    const timer = setTimeout(() => {
      if (!mapRef.current) onResult(false);
    }, 8000);

    start();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full [&_.geo-pin.active]:!bg-[var(--color-status-warning)] [&_.geo-pin]:transition-colors"
    />
  );
});

export default GeoMap;
