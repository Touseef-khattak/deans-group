import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import LegalContent from "@/components/sections/legal/LegalContent";
import Footer from "@/components/sections/Footer";

export default function DisclaimerPage() {
  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <LegalContent
        title="Disclaimer"
        lastUpdated="28 September 2026"
        sections={[
          {
            heading: "General Disclaimer",
            paragraphs: [
              "All information on this website is provided in good faith, for general informational purposes only. To the fullest extent permitted by law, Deans Group of Companies makes no warranty, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on this site.",
              "Nothing in this disclaimer excludes or limits our liability for death or personal injury arising from negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot be excluded or limited under applicable law. These limitations apply whether a claim arises in contract, tort (including negligence), breach of statutory duty, or otherwise, even where we have been advised of the possibility of such loss or damage.",
            ],
          },
          {
            heading: "Property and Investment Information",
            paragraphs: [
              "Project renders, floor plans, specifications, timelines, and pricing shown on this website are indicative and intended to give a general sense of each development. Actual layouts, materials, completion dates, and final terms may vary and are confirmed only in the formal booking and sale documents for a project.",
              "Nothing on this website constitutes financial, legal, or investment advice. Any figures relating to potential returns, rental yields, or property values are illustrative only and should not be relied upon when making an investment decision. We recommend seeking independent professional advice before committing to any purchase.",
            ],
          },
          {
            heading: "External Links",
            paragraphs: [
              "This website may contain links to other websites that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.",
            ],
          },
        ]}
      />
      <Footer />
    </main>
  );
}
