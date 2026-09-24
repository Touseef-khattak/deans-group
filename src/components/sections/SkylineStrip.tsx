import Image from "next/image";

const photos = [
  { src: "/images/skyline/apartments-one-alt.png", alt: "Deans Apartments One", left: 857, top: 13.18, width: 154, height: 116 },
  { src: "/images/skyline/arcade.png", alt: "Deans Arcade", left: 563, top: 9.18, width: 159, height: 119 },
  { src: "/images/skyline/medicine-centre.png", alt: "Deans Medicine Centre", left: 197, top: 3.18, width: 168, height: 125 },
  { src: "/images/skyline/complex.png", alt: "Deans Complex", left: 338, top: 3.18, width: 161, height: 125 },
  { src: "/images/skyline/commercial-centre.png", alt: "Deans Commercial Centre", left: 488, top: 3.18, width: 94, height: 125 },
  { src: "/images/skyline/shopping-mall.png", alt: "Deans Shopping Mall", left: 706, top: 9.18, width: 158.711, height: 119 },
  { src: "/images/skyline/apartments-one.png", alt: "Deans Apartments One", left: 1159, top: 6.18, width: 163, height: 122 },
  { src: "/images/skyline/trade-centre.png", alt: "Deans Trade Centre", left: 1307, top: -2.82, width: 164, height: 131 },
];

export default function SkylineStrip() {
  return (
    <div className="relative h-[133px] w-full overflow-hidden">
      <div className="absolute top-[-3.01px] left-0 h-[136px] w-[1440px] overflow-hidden">
        {/* Nasir Mansion — masked into a rooftop silhouette */}
        <div
          className="absolute top-[-0.21px] left-[999.2px] h-[136.024px] w-[181.416px]"
          style={{
            maskImage: "url(/images/skyline/nasir-mansion-mask.svg)",
            maskRepeat: "no-repeat",
            maskPosition: "-2.201px -5.467px",
            maskSize: "189.082px 146.347px",
            WebkitMaskImage: "url(/images/skyline/nasir-mansion-mask.svg)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "-2.201px -5.467px",
            WebkitMaskSize: "189.082px 146.347px",
          }}
        >
          <Image
            src="/images/skyline/nasir-mansion.png"
            alt="Nasir Mansion"
            fill
            className="object-cover"
          />
        </div>

        {/* Deans Heights — slightly oversized within its frame */}
        <div className="absolute top-[3.18px] left-0 h-[132px] w-[256px] overflow-hidden">
          <Image
            src="/images/skyline/heights.png"
            alt="Deans Heights"
            fill
            className="object-cover"
          />
        </div>

        {photos.map((p) => (
          <div
            key={p.alt + p.left}
            className="absolute"
            style={{ left: p.left, top: p.top, width: p.width, height: p.height }}
          >
            <Image src={p.src} alt={p.alt} fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute top-[-7.01px] left-1/2 h-[140px] w-[1440px] -translate-x-1/2">
        <Image
          src="/images/skyline/fade-overlay.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
