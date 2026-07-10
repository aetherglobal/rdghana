import type { Metadata } from "next";
import { NewsListing } from "@/components/sections/news-listing";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Discover | RD Technologies",
  description: "The latest news on RD's innovative breakthroughs, achievements, events and future initiatives.",
};

export default async function NewsPage(): Promise<React.ReactElement> {
  return <NewsListing active="blog" articles={await getArticlesByCategory("blog")} />;
}
