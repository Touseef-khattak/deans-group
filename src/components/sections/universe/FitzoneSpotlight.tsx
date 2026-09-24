import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function FitzoneSpotlight() {
  return (
    <Reveal className="flex flex-col gap-10 bg-secondary p-20">
      <div className="flex flex-col gap-10">
        <h2 className="font-heading text-h1 text-text-primary">
          Fitzone Gym
        </h2>
        <p className="w-[1200px] text-body-md text-text-secondary">
          Fitzone clubs sit inside Deans residential developments — the
          semi-Olympic pool and fitness club at Deans Complex, the indoor
          pool and gymnasium at Deans Heights. As a standalone brand it is
          the amenity that makes a Deans building a place to live, not just
          to own. A dedicated Fitzone site follows in a later phase; this
          profile is the group directory&rsquo;s route to the brand today.
        </p>
      </div>
      <div className="relative h-[469px] w-full">
        <Image
          src="/images/deans-universe/fitzone-gym.png"
          alt="Fitzone Gym interior"
          fill
          className="object-contain"
        />
      </div>
    </Reveal>
  );
}
