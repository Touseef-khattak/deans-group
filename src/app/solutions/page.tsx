import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import SolutionsHero from "@/components/sections/solutions/SolutionsHero";
import SolutionsGrid from "@/components/sections/solutions/SolutionsGrid";
import ConsultationForm from "@/components/sections/ConsultationForm";
import ContactStrip from "@/components/sections/ContactStrip";
import SkylineStrip from "@/components/sections/SkylineStrip";
import Footer from "@/components/sections/Footer";

export default function SolutionsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <SolutionsHero />
      <SolutionsGrid />
      <ConsultationForm id="consultation" heading="Request a consultation" />
      <ContactStrip />
      <SkylineStrip />
      <Footer />
    </main>
  );
}
