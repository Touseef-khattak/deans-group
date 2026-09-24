import Image from "next/image";

const images = [
  { src: "/images/about/banner-1.png", alt: "Deans Shopping Mall" },
  { src: "/images/about/banner-2.png", alt: "Deans Apartments One" },
  { src: "/images/about/banner-3.png", alt: "A Deans commercial development" },
  { src: "/images/about/banner-4.png", alt: "A Deans commercial development" },
];

export default function BannerStrip() {
  return (
    <div className="flex h-[600px] w-full border-t border-border">
      {images.map((img) => (
        <div key={img.src} className="relative h-full flex-1">
          <Image src={img.src} alt={img.alt} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
