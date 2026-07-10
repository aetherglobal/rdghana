import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticle } from "@/lib/articles";
import { ArticleHero } from "@/components/sections/article-hero";
import { ArticleRichText } from "@/components/sections/rich-text";
import { ArticleNav } from "@/components/sections/article-nav";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(decodeURIComponent(slug));
  if (!article) return { title: "RD Technologies" };
  return {
    title: `${article.title} | RD Technologies`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const [article, all] = await Promise.all([getArticle(decoded), getAllArticles()]);
  if (!article) notFound();

  const idx = all.findIndex((a) => a.slug === decoded);
  const prev = idx > 0 ? all[idx - 1] : undefined;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;

  return (
    <article className="pb-20">
      <ArticleHero article={article} />
      <div className="module-wrapper mt-10 md:mt-14">
        {article.body ? <ArticleRichText data={article.body} /> : null}
        <ArticleNav prev={prev} next={next} />
      </div>
    </article>
  );
}
