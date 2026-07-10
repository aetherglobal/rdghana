import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps): React.ReactElement {
  return (
    <div className="group flex h-full w-full flex-col gap-4 transition duration-300 ease-linear">
      <Link href={`/news/blogs/${encodeURIComponent(article.slug)}/`}>
        {article.cover ? (
          <Image
            src={article.cover}
            alt=""
            width={400}
            height={400}
            sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
            className="aspect-square w-full max-w-[400px] rounded object-cover duration-300 lg:group-hover:-translate-y-3 lg:group-hover:drop-shadow-2xl"
          />
        ) : null}
        <h3 className="mt-4 line-clamp-2 text-h5 font-bold lg:text-2xl lg:group-hover:text-primary">
          {article.title}
        </h3>
      </Link>
      <div className="text-p3 font-semibold">{article.date}</div>
      {article.excerpt ? (
        <div className="text-p4 text-[#808080] lg:text-base">{article.excerpt}</div>
      ) : null}
    </div>
  );
}
