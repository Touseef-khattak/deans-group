import Reveal from "@/components/Reveal";

export default function HospitalityIntro() {
  return (
    <Reveal className="flex flex-col items-center justify-center gap-10 p-20 text-center">
      <div className="flex w-[763px] flex-col items-center justify-center gap-10">
        <h2 className="font-heading text-h1 text-text-primary">
          Hotel &amp; Resorts
        </h2>
        <p className="text-body-md text-text-secondary">
          Two properties, each with its own rooms, rates and direct booking.
        </p>
      </div>
    </Reveal>
  );
}
