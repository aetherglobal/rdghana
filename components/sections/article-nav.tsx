import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, LinkedInGlyph, FacebookGlyph } from "@/components/ui/icons";

interface ArticleNavProps {
  prev?: Article;
  next?: Article;
}

const SHADOW_DARK_1 = "shadow-[0px_4px_13px_rgba(0,0,0,0.2)]";

function NavCard({ article, side }: { article: Article; side: "prev" | "next" }): React.ReactElement {
  return (
    <Link href={`/news/blogs/${encodeURIComponent(article.slug)}/`} className="group">
      <div className={cn("flex flex-row gap-5", side === "next" && "flex-row-reverse")}>
        {article.cover ? (
          <Image
            src={article.cover}
            alt=""
            width={114}
            height={114}
            className="aspect-square w-[114px] shrink-0 object-cover"
          />
        ) : null}
        <div className={cn("flex-1", side === "next" ? "text-right" : "text-left")}>
          <h3 className="line-clamp-3 text-h3 text-ink transition-colors group-hover:text-primary">
            {article.title}
          </h3>
          <p className="text-p2 text-muted">{article.date}</p>
        </div>
      </div>
    </Link>
  );
}

export function ArticleNav({ prev, next }: ArticleNavProps): React.ReactElement {
  return (
    <div className="mx-auto mt-[30px] w-full space-y-[30px] xl:w-10/12">
      <div className="flex flex-col items-center gap-[30px] lg:flex-row">
        <div className="flex flex-col items-center gap-5 text-p4 text-[#1660e7] md:flex-row" />
        <div className="space-x-3 lg:ml-auto">
          <a
            href="#"
            aria-label="Share on LinkedIn"
            className={cn(
              "inline-flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-[#1660e7]",
              SHADOW_DARK_1,
            )}
          >
            <LinkedInGlyph className="w-5" />
          </a>
          <a
            href="#"
            aria-label="Share on Facebook"
            className={cn(
              "inline-flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-[#1660e7]",
              SHADOW_DARK_1,
            )}
          >
            <FacebookGlyph className="w-5" />
          </a>
        </div>
      </div>

      <div className="h-px w-full bg-[#F0E2D0] opacity-50" />

      {prev || next ? (
        <div className="relative lg:overflow-hidden lg:px-[33px]">
          <div className="grid w-full grid-rows-2 gap-4 md:grid-cols-2 md:grid-rows-1 lg:gap-20">
            <div>{prev ? <NavCard article={prev} side="prev" /> : null}</div>
            <div>{next ? <NavCard article={next} side="next" /> : null}</div>
          </div>
          {prev ? (
            <button
              type="button"
              aria-label="Previous article"
              className={cn(
                "absolute left-[-15px] top-[46px] flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center rounded-full border-none bg-white text-ink lg:left-0 lg:top-1/2 lg:ml-2 lg:h-[50px] lg:w-[50px]",
                SHADOW_DARK_1,
              )}
            >
              <ArrowRightIcon className="w-[7px] rotate-180 lg:w-[10px]" />
            </button>
          ) : null}
          {next ? (
            <button
              type="button"
              aria-label="Next article"
              className={cn(
                "absolute right-[-15px] bottom-[46px] flex h-[30px] w-[30px] translate-y-1/2 items-center justify-center rounded-full border-none bg-white text-ink lg:right-0 lg:bottom-1/2 lg:mr-2 lg:h-[50px] lg:w-[50px]",
                SHADOW_DARK_1,
              )}
            >
              <ArrowRightIcon className="w-[7px] lg:w-[10px]" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
