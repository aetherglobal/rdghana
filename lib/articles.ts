import "server-only";

import type { Where } from "payload";
import type { Article, NewsCategory } from "@/types";
import type { Article as CMSArticle } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";

function coverUrl(cover: CMSArticle["cover"]): string | undefined {
  if (cover && typeof cover === "object") return cover.url ?? undefined;
  return undefined;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

function toArticle(doc: CMSArticle): Article {
  return {
    slug: doc.slug,
    category: doc.category,
    title: doc.title,
    date: formatDate(doc.publishedDate),
    excerpt: doc.excerpt ?? "",
    cover: coverUrl(doc.cover),
    externalHref: doc.externalHref ?? undefined,
    body: doc.body ?? undefined,
  };
}

async function findArticles(where?: Where): Promise<Article[]> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "articles",
    where,
    depth: 2,
    limit: 1000,
    sort: "-publishedDate",
  });
  return res.docs.map(toArticle);
}

export async function getAllArticles(): Promise<Article[]> {
  return findArticles();
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "articles",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });
  const doc = res.docs[0];
  return doc ? toArticle(doc) : undefined;
}

export async function getArticlesByCategory(
  category: NewsCategory,
): Promise<Article[]> {
  const inCat = await findArticles({ category: { equals: category } });
  return inCat.length ? inCat : getAllArticles();
}

export async function getFeaturedArticles(): Promise<Article[]> {
  return findArticles({ featured: { equals: true } });
}
