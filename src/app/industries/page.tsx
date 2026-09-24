import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import IndustriesHero from "@/components/sections/industries/IndustriesHero";
import SectorPanel from "@/components/sections/SectorPanel";
import DeansUniverse from "@/components/sections/DeansUniverse";
import NewsInvestors from "@/components/sections/NewsInvestors";
import ConsultationForm from "@/components/sections/ConsultationForm";
import ContactStrip from "@/components/sections/ContactStrip";
import SkylineStrip from "@/components/sections/SkylineStrip";
import Footer from "@/components/sections/Footer";

export default function IndustriesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <IndustriesHero />

      <SectorPanel
        number="01"
        tag="Industrial manufacturing"
        title="Deans Industries"
        description="Manufacturing and industrial supply serving the group's own construction programme and the wider market, with specialised mechanical installation capability and an established international supplier network."
        detail={
          <>
            Product and specification data currently sits at{" "}
            <span className="text-primary">imcpakistan.com.pk.</span> A
            dedicated company site is scoped separately from this phase.
          </>
        }
        image="/images/industries/deans-industries.png"
        imageAlt="A Deans Industries manufacturing facility"
        imageCaption="Sector overview and imagery for Deans Industries."
      />

      <SectorPanel
        number="02"
        tag="Industrial holdings"
        title="Aurora Industries"
        description="Aurora Industries holds the group's industrial interests alongside Deans Industries, supplying materials and equipment into the construction programme and the wider market."
        detail="A dedicated company site, with the full sector overview and product data, is scoped separately from this phase."
        image="/images/industries/aurora-industries.png"
        imageAlt="A construction site supplied by Aurora Industries"
        imageCaption="Sector overview and imagery for Aurora Industries."
        reverse
        tone="warm"
      />

      <SectorPanel
        number="03"
        tag="Renewable energy"
        title="Electrify Solutions"
        description="Batteries, circuit breakers and electrical distribution equipment for projects, trade and retail. The group frames this line under renewable energy rather than electrical goods alone."
        detail="Product data currently sits at diwanit.pk; a dedicated company site is scoped separately from this phase."
        image="/images/industries/electrify-solutions.png"
        imageAlt="An Electrify Solutions industrial facility"
        imageCaption="Sector overview and imagery for Electrify Solutions."
      />

      <DeansUniverse />
      <NewsInvestors />
      <ConsultationForm heading="Sourcing, supplying, or partnering?" />
      <ContactStrip />
      <SkylineStrip />
      <Footer />
    </main>
  );
}
