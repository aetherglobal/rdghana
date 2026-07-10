import type { Article } from "@/types";

interface ArticleHeroProps {
  article: Article;
}

export function ArticleHero({ article }: ArticleHeroProps): React.ReactElement {
  return (
    <div className="module-wrapper pt-6">
      <div className="relative">
        {article.cover ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed cover shown at its natural aspect ratio (matches rd.group) */}
            <img
              src={article.cover}
              alt=""
              className="w-full rounded-[30px]"
              style={{
                filter:
                  "drop-shadow(rgba(156,148,139,0.2) 31px 56px 75px) drop-shadow(rgba(154,151,141,0.15) 18px 18px 31px)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] rounded-[30px]"
              style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0))" }}
            />
          </>
        ) : null}

        <div className="absolute bottom-4 left-0 right-0 z-[1] mx-auto flex flex-col gap-2 px-5 text-white lg:bottom-8 xl:w-10/12 xl:px-0">
          <span className="text-p3 font-semibold">{article.date}</span>
          <h1 className="module-title line-clamp-2 lg:line-clamp-3">{article.title}</h1>
          {article.excerpt ? (
            <p className="line-clamp-2 text-p3 xl:text-base">{article.excerpt}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
