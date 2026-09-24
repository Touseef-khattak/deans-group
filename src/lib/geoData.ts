export type GeoLocation = {
  id: string;
  name: string;
  city: "Peshawar" | "Islamabad" | "Karachi";
  status: string;
  kind: string;
  lat: number;
  lng: number;
};

// Ported from the interactivity reference build (Deliverables/mockups/deans-group-design).
// Coordinates are locality-level (named road/sector), not surveyed building pins.
export const GEO_LOCATIONS: GeoLocation[] = [
  { id: "heights", name: "Deans Heights", city: "Peshawar", status: "In hand", kind: "Hayatabad, Peshawar", lat: 33.995, lng: 71.455 },
  { id: "complex", name: "Deans Complex", city: "Peshawar", status: "In hand", kind: "University Road, Peshawar", lat: 34.0075, lng: 71.54 },
  { id: "apartments", name: "Deans Apartments", city: "Peshawar", status: "In hand", kind: "Old Bara Road, University Town, Peshawar", lat: 34.0125, lng: 71.521 },
  { id: "apartments-one", name: "Deans Apartments One", city: "Islamabad", status: "In hand", kind: "Sector G-11/3, Islamabad", lat: 33.6742, lng: 73.0032 },
  { id: "medicine-center", name: "Deans Medicine Center", city: "Peshawar", status: "In hand", kind: "Phase 4, Hayatabad, Peshawar", lat: 33.988, lng: 71.47 },
  { id: "commercial-center", name: "Deans Commercial Center", city: "Peshawar", status: "In hand · 2026", kind: "Ashraf Road, Peshawar", lat: 34.0125, lng: 71.578 },
  { id: "arcade", name: "Deans Arcade", city: "Islamabad", status: "In hand · 2026", kind: "Sector I-16, Islamabad", lat: 33.5922, lng: 72.9338 },
  { id: "trade-centre", name: "Deans Trade Centre", city: "Peshawar", status: "Completed", kind: "Peshawar Cantt", lat: 34.0067, lng: 71.5498 },
  { id: "shopping-mall", name: "Deans Shopping Mall", city: "Karachi", status: "Completed · 2004", kind: "Main Tariq Road, Karachi", lat: 24.871, lng: 67.053 },
  { id: "nasir-mansion", name: "Nasir Mansion", city: "Peshawar", status: "Completed · 1971", kind: "Railway Road No. 2, Peshawar Cantt", lat: 34.004, lng: 71.552 },
  { id: "shahab-flats", name: "Shahab Flats", city: "Peshawar", status: "Completed · 1982", kind: "Kohat Road, Peshawar", lat: 33.993, lng: 71.546 },
];

export const EXPANSION_CITIES = [
  { name: "Lahore", note: "Expansion" },
  { name: "Quetta", note: "Expansion" },
];

export const PK_PATH =
  "M337.2,69.1 L353.4,81 L359.9,100.5 L396,110.8 L374.8,132.2 L350.4,135.9 " +
  "L317.1,129.7 L306.4,140.7 L314.1,163 L321.7,180.2 L339.4,192.7 L320.7,207.4 " +
  "L321.1,225.6 L299.8,251.1 L286.1,276.9 L263.1,303.6 L237.6,301.6 L213.5,328.3 " +
  "L227.8,339.7 L230.3,359.3 L242.7,372.2 L247,394 L198.7,393.9 L184.1,410.9 " +
  "L168.1,404.5 L161.5,386.2 L144.6,366.8 L104.2,371.6 L68.5,372.1 L37.7,375.6 " +
  "L45.9,346.1 L77.6,333 L75.7,321.3 L65.3,317.1 L64.6,294.7 L43.7,283.6 " +
  "L34.9,268.2 L24,254.8 L60.7,267.8 L82.7,264 L95.8,267.3 L100.2,261.7 " +
  "L115.5,263.9 L144,253.3 L144.8,231.7 L157,217.3 L173.3,217.4 L175.7,210.2 " +
  "L192.5,206.9 L200.6,209.3 L209.2,202.1 L208,186.9 L217.3,171.5 L231.2,165.1 " +
  "L222.6,148.3 L243.5,149.1 L249.5,139.9 L248.6,130.1 L259.5,119.4 L257,106.8 " +
  "L251.8,96 L264.6,84.9 L288.2,79.6 L313.3,76.7 L324.5,72 L337.2,69.1 Z";

export const FALLBACK_CITY_PINS: Record<string, { x: number; y: number }> = {
  Peshawar: { x: 257.6, y: 148.4 },
  Islamabad: { x: 291, y: 156.8 },
  Lahore: { x: 319.4, y: 211.1 },
  Quetta: { x: 157.8, y: 245.9 },
  Karachi: { x: 158.4, y: 381.2 },
};

export function groupByCity(locations: GeoLocation[]) {
  const byCity = new Map<string, GeoLocation[]>();
  locations.forEach((loc) => {
    const list = byCity.get(loc.city) ?? [];
    list.push(loc);
    byCity.set(loc.city, list);
  });
  return byCity;
}
