import Link from "next/link";
import type { Article, NewsCategory } from "@/types";
import { NewsCard } from "@/components/sections/news-card";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface NewsListingProps {
  active: NewsCategory;
  articles: Article[];
}

const TABS: { key: NewsCategory; label: string; href: string }[] = [
  { key: "blog", label: "Blog", href: "/news/blog/" },
  { key: "newsroom", label: "Newsroom", href: "/news/newsroom/" },
  { key: "media-clippings", label: "Media clippings", href: "/news/media-clippings/" },
  { key: "important-notice", label: "Important Notice", href: "/news/important-notice/" },
];

export function NewsListing({ active, articles }: NewsListingProps): React.ReactElement {
  return (
    <section className="module-wrapper pb-40 md:pb-32 lg:pb-52">
      <div className="primary-text module-title">What&apos;s new</div>
      <div className="w-full max-w-[629px] pt-4 text-p3 md:text-p2 lg:text-p1">
        Get the latest news on RD&apos;s innovative breakthroughs, achievements, events and future
        initiatives.!!
      </div>

      <div className="mt-16">
        <div
          role="tablist"
          className="group mt-10 flex w-full items-center justify-start gap-6 overflow-x-auto no-scrollbar lg:gap-12 xl:mt-30"
        >
          {TABS.map((tab) => (
            <Link key={tab.key} href={tab.href}>
              <div
                className={cn(
                  "relative shrink-0 cursor-pointer whitespace-nowrap font-bold !leading-loose transition-opacity ease-in-out text-h4 xl:text-h2",
                  tab.key === active &&
                    "primary-text before:absolute before:bottom-0 before:left-2/4 before:block before:h-[5px] before:w-5 before:-translate-x-1/2 before:rounded before:bg-primary before:transition before:content-['']",
                )}
              >
                {tab.label}
              </div>
            </Link>
          ))}
        </div>

        {articles.length ? (
          <div className="mt-10 grid w-full grid-cols-1 gap-x-4 gap-y-[50px] md:grid-cols-2 xl:grid-cols-3 min-[1440px]:mt-15">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <NewsCard article={a} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
