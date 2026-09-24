import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import CareersHero from "@/components/sections/careers/CareersHero";
import OrgWings from "@/components/sections/careers/OrgWings";
import OpenPositions from "@/components/sections/careers/OpenPositions";
import Culture from "@/components/sections/careers/Culture";
import WhyDeans from "@/components/sections/careers/WhyDeans";
import ApplicationForm from "@/components/sections/careers/ApplicationForm";
import ContactStrip from "@/components/sections/ContactStrip";
import SkylineStrip from "@/components/sections/SkylineStrip";
import Footer from "@/components/sections/Footer";

export default function CareersPage() {
  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <CareersHero />
      <OrgWings />
      <OpenPositions />
      <Culture />
      <WhyDeans />
      <ApplicationForm />
      <ContactStrip />
      <SkylineStrip />
      <Footer />
    </main>
  );
}
