import Image from "next/image";
import Reveal from "@/components/Reveal";
import { T } from "@/components/LanguageProvider";

const articles = [
  {
    image: "/images/news/deans-heights-news.png",
    meta: "14 Aug 2026 — Group",
    title: "Deans Heights: 5 blocks, 35…",
    excerpt:
      "The group's largest residential undertaking to date — figures updated Aug 21, 2026 from the cli…",
  },
  {
    image: "/images/news/non-resident-news.png",
    meta: "14 Aug 2026 — Regulation",
    title: "What the latest non-reside…",
    excerpt:
      "Plain-language explanation of the remittance route, documentation and transfer process for P…",
  },
  {
    image: "/images/news/deans-complex-news.png",
    meta: "21 Jul 2026 — Progress",
    title: "Deans Complex: structure…",
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
            <div className="relative h-[277px] w-full">
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
            <h3 className="font-heading text-h3 text-text-primary">
              {article.title}
            </h3>
            <p className="flex-1 text-body-md text-text-secondary">
              {article.excerpt}
            </p>
            <button
              type="button"
              className="flex h-11 items-center justify-center bg-surface-warm px-6 text-body-sm text-text-primary"
            >
              Read More
            </button>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
