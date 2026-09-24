import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import ShowcaseCarousel from "@/components/sections/ShowcaseCarousel";
import LatestDevelopments from "@/components/sections/LatestDevelopments";
import DeansUniverse from "@/components/sections/DeansUniverse";
import NewsInvestors from "@/components/sections/NewsInvestors";
import StoryTimeline from "@/components/sections/StoryTimeline";
import Partners from "@/components/sections/Partners";
import DeansLandscape from "@/components/sections/DeansLandscape";
import CoreValues from "@/components/sections/CoreValues";
import BuildingExplorer from "@/components/sections/BuildingExplorer";
import NewsletterCta from "@/components/sections/NewsletterCta";
import ContactBar from "@/components/sections/ContactBar";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <Hero />
      <StatsBar />
      <ShowcaseCarousel />
      <LatestDevelopments />
      <DeansUniverse />
      <NewsInvestors />
      <StoryTimeline />
      <Partners />
      <DeansLandscape />
      <CoreValues />
      <BuildingExplorer />
      <NewsletterCta />
      <ContactBar />
      <Footer />
    </main>
  );
}
