import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import LegalContent from "@/components/sections/legal/LegalContent";
import Footer from "@/components/sections/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <LegalContent
        title="Privacy Policy"
        lastUpdated="28 September 2026"
        intro="Deans Group of Companies respects the privacy of everyone who visits this website. This Privacy Policy explains what information we collect, how we use it, and the choices available to you."
        sections={[
          {
            heading: "Information We Collect",
            paragraphs: [
              "When you fill out a form on this site, such as a consultation request, job application, booking enquiry, or newsletter signup, we collect the details you provide, which may include your name, email address, phone number, and any message or documents you choose to submit.",
              "Like most websites, our server also automatically records certain technical information whenever you visit, described further under Log Files below.",
            ],
          },
          {
            heading: "Your Data Protection Rights",
            paragraphs: [
              "Depending on where you are located, you may have rights over the personal information we hold about you, including the right to request access to it, ask us to correct inaccurate details, request that we delete it, object to or restrict how we use it, receive a copy of it in a portable format, and withdraw any consent you have previously given.",
              "To exercise any of these rights, please contact us using the details at the end of this page. We will respond within a reasonable time and in line with applicable law.",
            ],
          },
          {
            heading: "Log Files",
            paragraphs: [
              "As with most websites, our hosting provider automatically collects standard log information, such as your IP address, browser type, internet service provider, timestamps, referring and exit pages, and the number of clicks on the site. This information is not linked to anything that personally identifies you and is used only to analyse trends, administer the site, and gather broad demographic information.",
            ],
          },
          {
            heading: "Cookies and Similar Technologies",
            paragraphs: [
              "This website uses cookies to remember your preferences and to understand how visitors use the site, so that we can tailor the experience to your interests. You are free to disable cookies through your browser settings; doing so may limit some features of the site but will not prevent you from browsing it.",
            ],
          },
          {
            heading: "Third-Party Websites and Advertisers",
            paragraphs: [
              "Our website may link to other websites of interest, and third-party advertisers may also appear on our pages. Once you leave our site or click on such an advertisement, this Privacy Policy no longer applies. We encourage you to review the privacy practices of any third-party site before providing any information to it, as we have no control over, and accept no responsibility for, the content or practices of those sites.",
            ],
          },
          {
            heading: "Children's Privacy",
            paragraphs: [
              "We do not knowingly collect any personal information from children under the age of 13. If you believe your child has provided us with this kind of information, please contact us so that we can remove it promptly.",
            ],
          },
          {
            heading: "Scope of This Policy",
            paragraphs: [
              "This Privacy Policy applies only to our online activities and is valid for visitors to our website regarding information they share and/or collect on this site. It does not apply to any information collected offline or through channels other than this website.",
            ],
          },
          {
            heading: "Consent",
            paragraphs: [
              "By using our website, you consent to this Privacy Policy and agree to its terms.",
            ],
          },
          {
            heading: "Intellectual Property and User Comments",
            paragraphs: [
              "Unless otherwise stated, Deans Group of Companies and/or its licensors own the intellectual property rights in all material on this website. All such rights are reserved. You may access this material for your own personal use, subject to the restrictions set out in these terms.",
              "You must not republish, sell, rent, sub-license, reproduce, duplicate, or otherwise redistribute content from this website, including in any format, without our permission.",
              "Parts of this website may allow visitors to post comments or reviews. We do not filter, edit, publish, or review comments before they appear, and comments reflect the views of the person who posted them, not those of Deans Group of Companies. To the extent permitted by law, we are not liable for the content of comments, though we reserve the right to monitor and remove any comment we consider inappropriate or in breach of these Terms.",
              "By posting a comment, you warrant that you have the right to do so and that it does not infringe any third-party right, and you grant Deans Group of Companies a non-exclusive licence to use, reproduce, and edit that comment in any format.",
            ],
          },
          {
            heading: "Linking to Our Website",
            paragraphs: [
              "Government agencies, search engines, news organisations, and directory listing services may link to our homepage, publications, or other site content without prior written approval, provided the link is not misleading, does not falsely imply any association with or endorsement by us, and fits the context of the linking site.",
              "Other organisations, such as consumer or industry associations, may request permission to link to our website. We consider such requests at our discretion, taking into account the nature of the requesting organisation, the content of its site, and the overall value the link would add for our visitors.",
            ],
          },
          {
            heading: "Third-Party Access to Information",
            paragraphs: [
              "Other websites and services that we link to, or that link to us, may collect and use information about your visits in accordance with their own privacy practices, over which we have no control. If you are concerned, you can choose to disable cookies as described above.",
            ],
          },
          {
            heading: "Requesting Removal of a Link",
            paragraphs: [
              "If you find a link on our website that you consider objectionable, you are welcome to contact us about it. We will consider requests to remove such links but are under no obligation to do so or to respond directly.",
              "We do not guarantee that the information on this website is complete, accurate, or up to date, and nothing on this site should be relied upon as such without independent verification.",
            ],
          },
          {
            heading: "Changes to This Policy",
            paragraphs: [
              "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page, and continued use of the website after such changes constitutes your acceptance of the updated policy.",
            ],
          },
          {
            heading: "Contact Us",
            paragraphs: [
              "If you have any questions about this Privacy Policy or how we handle your information, please contact us at contact@deansgroupofcompanies.com.",
            ],
          },
        ]}
      />
      <Footer />
    </main>
  );
}
