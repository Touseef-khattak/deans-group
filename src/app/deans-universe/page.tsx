import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import UniverseHero from "@/components/sections/universe/UniverseHero";
import SolutionCards from "@/components/sections/universe/SolutionCards";
import FitzoneSpotlight from "@/components/sections/universe/FitzoneSpotlight";
import ConsultationForm from "@/components/sections/universe/ConsultationForm";
import ContactStrip from "@/components/sections/ContactStrip";
import SkylineStrip from "@/components/sections/SkylineStrip";
import Footer from "@/components/sections/Footer";

export default function DeansUniversePage() {
  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <UniverseHero />
      <SolutionCards />
      <FitzoneSpotlight />
      <ConsultationForm />
      <ContactStrip />
      <SkylineStrip />
      <Footer />
    </main>
  );
}
