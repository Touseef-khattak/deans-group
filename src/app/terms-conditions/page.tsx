import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import LegalContent from "@/components/sections/legal/LegalContent";
import Footer from "@/components/sections/Footer";

export default function TermsConditionsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <LegalContent
        title="Terms & Conditions"
        lastUpdated="28 September 2026"
        sections={[
          {
            heading: "Agreement to Terms",
            paragraphs: [
              "These Terms and Conditions govern your use of the Deans Group of Companies website. By visiting or using this site in any way, you agree to be bound by the terms set out here. If you do not agree with any part of these terms, please stop using the website.",
              "These Terms are governed by and interpreted in accordance with the laws of Pakistan, and any disputes arising from them fall under the jurisdiction of the courts of Pakistan.",
            ],
          },
          {
            heading: "Definitions",
            paragraphs: [
              'Throughout this page and our Privacy Policy and Disclaimer, the following terms apply. "You", "Your" and "Client" refer to the person visiting or using this website. "Deans", "the Company", "We", "Us" and "Our" refer to Deans Group of Companies. "Party" or "Parties" refers to both You and the Company together.',
              "Any reference to the singular includes the plural and vice versa, and references to any gender include all genders, unless the context clearly requires otherwise.",
            ],
          },
        ]}
      />
      <Footer />
    </main>
  );
}
