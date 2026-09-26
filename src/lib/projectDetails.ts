export type ProjectDetail = {
  slug: string;
  name: string;
  city: "Peshawar" | "Islamabad" | "Karachi";
  location: string;
  status: string;
  description: string;
  stats: { label: string; value: string }[];
  heroImage: string;
  gallery: { src: string; alt: string }[];
  story: { paragraph: string; image: string; imageAlt: string };
};

function gallery(slug: string, files: string[], name: string) {
  return files.map((file, i) => ({
    src: `/images/developments/gallery/${slug}/${file}`,
    alt: `${name} — photo ${i + 1}`,
  }));
}

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    slug: "heights",
    name: "Deans Heights",
    city: "Peshawar",
    location: "Hayatabad, Peshawar",
    status: "In hand",
    description:
      "Five blocks on 33 kanals in Hayatabad. 350 apartments, 13 lifts, 935,000 sq ft of elevated living.",
    stats: [
      { label: "Location", value: "Hayatabad, Peshawar" },
      { label: "Status", value: "In hand" },
      { label: "Size", value: "935,000 sq ft" },
      { label: "Units", value: "350 apartments · 5 blocks" },
    ],
    heroImage: "/images/developments/2d/heights.png",
    gallery: gallery(
      "heights",
      ["01.png", "02.png", "03.jpg", "04.jpg", "05.jpg", "06.jpg"],
      "Deans Heights",
    ),
    story: {
      paragraph:
        "Five blocks arranged around shared gardens in Hayatabad, with 13 lifts serving 350 apartments — and Fitzone's indoor pool and gymnasium built into the complex, rather than added after the fact.",
      image: "/images/developments/gallery/heights/04.jpg",
      imageAlt: "Deans Heights",
    },
  },
  {
    slug: "complex",
    name: "Deans Complex",
    city: "Peshawar",
    location: "University Road, Peshawar",
    status: "In hand",
    description:
      "Three blocks on University Road. 216 apartments across 700,000 sq ft, with the Fitzone indoor pool and gymnasium on site.",
    stats: [
      { label: "Location", value: "University Road, Peshawar" },
      { label: "Status", value: "In hand" },
      { label: "Size", value: "700,000 sq ft" },
      { label: "Units", value: "216 apartments · 3 blocks" },
    ],
    heroImage: "/images/developments/2d/complex.jpg",
    gallery: gallery(
      "complex",
      ["01.png", "02.jpg", "03.png", "04.jpg", "05.jpg", "06.jpg", "07.jpg"],
      "Deans Complex",
    ),
    story: {
      paragraph:
        "Three residential blocks on University Road wrap around a landscaped rooftop terrace — the same deck that houses Fitzone's semi-Olympic pool and fitness club, open to residents above the street rather than tucked in a basement.",
      image: "/images/developments/gallery/complex/07.jpg",
      imageAlt: "Deans Complex rooftop terrace",
    },
  },
  {
    slug: "apartments",
    name: "Deans Apartments",
    city: "Peshawar",
    location: "Old Bara Road, University Town, Peshawar",
    status: "In hand",
    description:
      "Residential apartments on Old Bara Road, University Town — established Peshawar residential, in the same premium corridor as Deans Complex.",
    stats: [
      { label: "Location", value: "Old Bara Road, University Town" },
      { label: "Status", value: "In hand" },
      { label: "Type", value: "Residential apartments" },
    ],
    heroImage: "/images/developments/2d/apartments.png",
    gallery: gallery(
      "apartments",
      ["01.jpg", "02.jpg", "03.png", "04.png", "05.png"],
      "Deans Apartments",
    ),
    story: {
      paragraph:
        "Established residential apartments on Old Bara Road, in the same University Town corridor the group has built in for two decades.",
      image: "/images/developments/gallery/apartments/01.jpg",
      imageAlt: "Deans Apartments",
    },
  },
  {
    slug: "apartments-one",
    name: "Deans Apartments One",
    city: "Islamabad",
    location: "Sector G-11/3, Islamabad",
    status: "In hand",
    description:
      "97 apartments and 2 penthouses across 215,505 sq ft in Sector G-11/3 — the group's first Islamabad residential address.",
    stats: [
      { label: "Location", value: "Sector G-11/3, Islamabad" },
      { label: "Status", value: "In hand" },
      { label: "Size", value: "215,505 sq ft" },
      { label: "Units", value: "97 apartments + 2 penthouses" },
    ],
    heroImage: "/images/developments/2d/apartments-one.jpg",
    gallery: gallery(
      "apartments-one",
      [
        "01.jpg",
        "02.jpg",
        "03.jpg",
        "04.jpg",
        "05.jpg",
        "06.jpg",
        "07.jpg",
        "08.jpg",
        "09.jpg",
        "10.jpg",
      ],
      "Deans Apartments One",
    ),
    story: {
      paragraph:
        "The group's first Islamabad residential address in Sector G-11/3 — 97 apartments and 2 penthouses, built to the same standard as the Peshawar portfolio.",
      image: "/images/developments/gallery/apartments-one/07.jpg",
      imageAlt: "Deans Apartments One",
    },
  },
  {
    slug: "medicine-center",
    name: "Deans Medicine Center",
    city: "Peshawar",
    location: "Phase 4, Hayatabad, Peshawar",
    status: "In hand",
    description:
      "24 shops and 18 clinics across ground, lower ground and two floors — a dedicated medical retail address in Hayatabad.",
    stats: [
      { label: "Location", value: "Phase 4, Hayatabad, Peshawar" },
      { label: "Status", value: "In hand" },
      { label: "Units", value: "24 shops · 18 clinics" },
    ],
    heroImage: "/images/developments/2d/medicine-center.jpg",
    gallery: gallery(
      "medicine-center",
      ["01.jpg", "02.jpg", "03.jpg"],
      "Deans Medicine Center",
    ),
    story: {
      paragraph:
        "A dedicated medical retail address in Hayatabad — 24 shops and 18 clinics across four levels, giving pharmacies, labs and specialists one address instead of a scattered strip.",
      image: "/images/developments/gallery/medicine-center/03.jpg",
      imageAlt: "Deans Medicine Center",
    },
  },
  {
    slug: "commercial-center",
    name: "Deans Commercial Center",
    city: "Peshawar",
    location: "Ashraf Road, Peshawar",
    status: "In hand · 2026",
    description:
      "110 offices across 8 floors, plus 49 ground and lower-ground shops on Ashraf Road, Peshawar.",
    stats: [
      { label: "Location", value: "Ashraf Road, Peshawar" },
      { label: "Status", value: "In hand · 2026" },
      { label: "Units", value: "110 offices · 49 shops" },
      { label: "Floors", value: "8" },
    ],
    heroImage: "/images/developments/2d/commercial-center.png",
    gallery: gallery(
      "commercial-center",
      [
        "01.jpg",
        "02.jpg",
        "03.jpg",
        "04.jpg",
        "05.jpg",
        "06.jpg",
        "07.jpg",
      ],
      "Deans Commercial Center",
    ),
    story: {
      paragraph:
        "Eight floors of offices over 49 ground and lower-ground shops on Ashraf Road — built as a single address for Peshawar's professional and retail tenants alike.",
      image: "/images/developments/gallery/commercial-center/01.jpg",
      imageAlt: "Deans Commercial Center",
    },
  },
  {
    slug: "arcade",
    name: "Deans Arcade",
    city: "Islamabad",
    location: "Sector I-16, Islamabad",
    status: "In hand · 2026",
    description:
      "Retail and residential development in Sector I-16, Islamabad — the group's newest Islamabad address.",
    stats: [
      { label: "Location", value: "Sector I-16, Islamabad" },
      { label: "Status", value: "In hand · 2026" },
      { label: "Type", value: "Retail + residential" },
    ],
    heroImage: "/images/developments/2d/arcade.jpg",
    gallery: gallery(
      "arcade",
      [
        "01.jpg",
        "02.jpg",
        "03.jpg",
        "04.jpg",
        "05.jpg",
        "06.jpg",
        "07.jpg",
      ],
      "Deans Arcade",
    ),
    story: {
      paragraph:
        "A retail-and-residential address in Sector I-16, Islamabad — the group's newest addition outside Peshawar.",
      image: "/images/developments/gallery/arcade/01.jpg",
      imageAlt: "Deans Arcade",
    },
  },
  {
    slug: "trade-centre",
    name: "Deans Trade Centre",
    city: "Peshawar",
    location: "Peshawar Cantt",
    status: "Completed",
    description:
      "57 kanals. 1.8 million square feet. 3,200 shops and offices under one roof — Peshawar's commercial centre of gravity since the auction of 1998.",
    stats: [
      { label: "Location", value: "Peshawar Cantt" },
      { label: "Status", value: "Completed · 1998" },
      { label: "Size", value: "1.8 million sq ft" },
      { label: "Units", value: "3,200 shops & offices" },
    ],
    heroImage: "/images/developments/2d/trade-centre.jpg",
    gallery: gallery(
      "trade-centre",
      [
        "01.png",
        "02.png",
        "03.jpg",
        "04.jpg",
        "05.png",
        "06.jpg",
        "07.png",
      ],
      "Deans Trade Centre",
    ),
    story: {
      paragraph:
        "3,200 shops and offices arranged around galleried atriums and escalator courts — won at public auction in 1998 and still Peshawar's commercial centre of gravity today.",
      image: "/images/developments/gallery/trade-centre/07.png",
      imageAlt: "Deans Trade Centre interior atrium",
    },
  },
  {
    slug: "shopping-mall",
    name: "Deans Shopping Mall",
    city: "Karachi",
    location: "Main Tariq Road, Karachi",
    status: "Completed · 2004",
    description:
      "350 premium retail units opposite Rabi Centre, in Karachi's commercial heartland — the group's national footprint.",
    stats: [
      { label: "Location", value: "Main Tariq Road, Karachi" },
      { label: "Status", value: "Completed · 2004" },
      { label: "Units", value: "350 retail units" },
    ],
    heroImage: "/images/developments/2d/shopping-mall.jpg",
    gallery: gallery(
      "shopping-mall",
      ["01.jpg", "02.jpg", "03.webp"],
      "Deans Shopping Mall",
    ),
    story: {
      paragraph:
        "350 retail units opposite Rabi Centre on Tariq Road — the group's first move into Karachi, and still its only address outside Khyber Pakhtunkhwa and Islamabad.",
      image: "/images/developments/gallery/shopping-mall/01.jpg",
      imageAlt: "Deans Shopping Mall",
    },
  },
  {
    slug: "nasir-mansion",
    name: "Nasir Mansion",
    city: "Peshawar",
    location: "Railway Road No. 2, Peshawar Cantt",
    status: "Completed · 1971",
    description:
      "60,000 sq ft on Railway Road No. 2 — 48 shops, 43 offices, and the group's first name on a façade.",
    stats: [
      { label: "Location", value: "Railway Road No. 2, Peshawar Cantt" },
      { label: "Status", value: "Completed · 1971" },
      { label: "Size", value: "60,000 sq ft" },
      { label: "Units", value: "48 shops · 43 offices" },
    ],
    heroImage: "/images/developments/2d/nasir-mansion.jpg",
    gallery: gallery(
      "nasir-mansion",
      ["01.jpg", "02.png", "03.png", "04.jpg", "05.jpg", "06.jpg"],
      "Nasir Mansion",
    ),
    story: {
      paragraph:
        "Where it started: 48 shops and 43 offices on Railway Road, built in 1971 and named after the son of the man who built it. The name has stayed on every building since.",
      image: "/images/developments/gallery/nasir-mansion/04.jpg",
      imageAlt: "Nasir Mansion",
    },
  },
  {
    slug: "shahab-flats",
    name: "Shahab Flats",
    city: "Peshawar",
    location: "Kohat Road, Peshawar",
    status: "Completed · 1982",
    description:
      "42 apartments across a multi-tower residential complex on Kohat Road — the group's move into housing.",
    stats: [
      { label: "Location", value: "Kohat Road, Peshawar" },
      { label: "Status", value: "Completed · 1982" },
      { label: "Units", value: "42 apartments" },
    ],
    heroImage: "/images/developments/2d/shahab-flats.png",
    gallery: gallery("shahab-flats", ["01.png"], "Shahab Flats"),
    story: {
      paragraph:
        "42 apartments across a multi-tower residential complex on Kohat Road, raised a decade after Nasir Mansion — the group's first move from commercial into housing.",
      image: "/images/developments/gallery/shahab-flats/01.png",
      imageAlt: "Shahab Flats",
    },
  },
];

export function getProjectDetail(slug: string) {
  return PROJECT_DETAILS.find((p) => p.slug === slug);
}
