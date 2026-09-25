import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import HospitalityHero from "@/components/sections/hospitality/HospitalityHero";
import HospitalityIntro from "@/components/sections/hospitality/HospitalityIntro";
import SectorPanel from "@/components/sections/SectorPanel";
import BookingForm from "@/components/sections/hospitality/BookingForm";
import ContactStrip from "@/components/sections/ContactStrip";
import SkylineStrip from "@/components/sections/SkylineStrip";
import Footer from "@/components/sections/Footer";

export default function HospitalityPage() {
  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <HospitalityHero />
      <HospitalityIntro />
      <SectorPanel
        number="01"
        tag="Hotel"
        title="Deans Hospitality property"
        description="Rooms, amenities, gallery and location, on the same page template as a Deans development."
        image="/images/hospitality/sector-hotel.png"
        imageAlt="A Deans Hospitality hotel room"
        buttonLabel="View & Book"
        buttonHref="#booking"
      />
      <SectorPanel
        number="02"
        tag="Resort"
        title="Deans Hospitality resort"
        description="Full property page with gallery, amenities, location and a direct booking panel."
        image="/images/hospitality/sector-resort.png"
        imageAlt="A Deans Hospitality resort pool"
        buttonLabel="View & Book"
        buttonHref="#booking"
        reverse
        tone="warm"
      />
      <BookingForm />
      <ContactStrip />
      <SkylineStrip />
      <Footer />
    </main>
  );
}
