import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import AboutHero from "@/components/sections/about/AboutHero";
import BannerStrip from "@/components/sections/about/BannerStrip";
import StatsBar from "@/components/sections/StatsBar";
import CompanyOverview from "@/components/sections/about/CompanyOverview";
import StoryTimeline from "@/components/sections/StoryTimeline";
import Leadership from "@/components/sections/about/Leadership";
import CoreValues from "@/components/sections/CoreValues";
import ProfileCta from "@/components/sections/about/ProfileCta";
import ConsultationForm from "@/components/sections/ConsultationForm";
import ContactStrip from "@/components/sections/ContactStrip";
import SkylineStrip from "@/components/sections/SkylineStrip";
import Footer from "@/components/sections/Footer";

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <AboutHero />
      <BannerStrip />
      <StatsBar />
      <CompanyOverview />
      <StoryTimeline heading="How we got here" imageHeight={486} />
      <Leadership />
      <CoreValues heading="How do we work?" />
      <ProfileCta />
      <ConsultationForm heading="Request a consultation" />
      <ContactStrip />
      <SkylineStrip />
      <Footer />
    </main>
  );
}
