import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import ContactHero from "@/components/sections/contact/ContactHero";
import EnquiryForm from "@/components/sections/contact/EnquiryForm";
import OfficeCards from "@/components/sections/contact/OfficeCards";
import ContactStrip from "@/components/sections/ContactStrip";
import SkylineStrip from "@/components/sections/SkylineStrip";
import Footer from "@/components/sections/Footer";

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <ContactHero />
      <EnquiryForm />
      <OfficeCards />
      <ContactStrip />
      <SkylineStrip />
      <Footer />
    </main>
  );
}
