import Image from "next/image";

export default function SkylineStrip() {
  return (
    <div className="relative h-[133px] w-full overflow-hidden">
      <Image
        src="/images/misc/skyline-strip-flat.png"
        alt="Deans Group buildings across Peshawar, Islamabad and Karachi"
        fill
        className="object-cover"
      />
    </div>
  );
}
