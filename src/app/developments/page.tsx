import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import DevelopmentsHero from "@/components/sections/developments/DevelopmentsHero";
import BuildingExplorer from "@/components/sections/BuildingExplorer";
import PortfolioCarousel from "@/components/sections/developments/PortfolioCarousel";
import ConsultationForm from "@/components/sections/ConsultationForm";
import ContactStrip from "@/components/sections/ContactStrip";
import SkylineStrip from "@/components/sections/SkylineStrip";
import Footer from "@/components/sections/Footer";

export default function DevelopmentsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <DevelopmentsHero />
      <BuildingExplorer />
      <PortfolioCarousel />
      <ConsultationForm />
      <ContactStrip />
      <SkylineStrip />
      <Footer />
    </main>
  );
}
