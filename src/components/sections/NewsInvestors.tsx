import Image from "next/image";
import Reveal from "@/components/Reveal";
import { T } from "@/components/LanguageProvider";

const articles = [
  {
    image: "/images/news/deans-heights-news.png",
    meta: "14 Aug 2026 - Group",
    title: "Deans Heights: 5 blocks, 350 apartments, 935,000 sq ft in Hayatabad",
    excerpt:
      "The group's largest residential undertaking to date — figures updated Aug 21, 2026 from the client's project data. Status (in hand vs. delivered) still to be confirmed.",
  },
  {
    image: "/images/news/non-resident-news.png",
    meta: "14 Aug 2026 - Regulation",
    title: "What the latest non-resident property rules mean for overseas buyers",
    excerpt:
      "Plain-language explanation of the remittance route, documentation and transfer process for Pakistanis in the UAE and Saudi Arabia.",
  },
  {
    image: "/images/news/deans-complex-news.png",
    meta: "21 Jul 2026 - Progress",
    title: "Deans Complex: structure tops out on all four towers",
    excerpt:
      "Monthly construction-progress reporting — the trust signal remote buyers ask for most often.",
  },
];

export default function NewsInvestors() {
  return (
    <div className="flex flex-col gap-10 bg-background px-20 py-16">
      <Reveal>
        <T
          as="h2"
          en="News & what it means for investors"
          ur="خبریں"
          className="font-heading text-h1 text-text-primary"
        />
      </Reveal>

      <Reveal stagger className="grid grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.title}
            className="flex flex-col gap-4 border border-border p-4"
          >
            <div className="relative h-[280px] w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-cascadia text-caption text-text-secondary">
              {article.meta}
            </p>
            <h3 className="truncate font-heading text-h3 text-text-primary">
              {article.title}
            </h3>
            <p className="line-clamp-2 flex-1 text-body-md text-text-secondary">
              {article.excerpt}
            </p>
            <button
              type="button"
              className="flex h-14 w-[200px] items-center justify-center bg-secondary text-button text-primary-active"
            >
              Read More
            </button>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
