import Image from "next/image";

const images = [
  { src: "/images/about/banner-1.png", alt: "Deans Shopping Mall" },
  { src: "/images/about/banner-2.png", alt: "Deans Apartments One" },
  { src: "/images/about/banner-3.png", alt: "A Deans commercial development" },
  { src: "/images/about/banner-4.png", alt: "A Deans commercial development" },
];

export default function BannerStrip() {
  return (
    <div className="grid grid-cols-2 border-t border-border sm:h-[400px] sm:grid-cols-4 lg:h-[600px]">
      {images.map((img) => (
        <div key={img.src} className="relative h-[220px] sm:h-full">
          <Image src={img.src} alt={img.alt} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
