import type { Metadata } from "next";
import { NewsListing } from "@/components/sections/news-listing";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blogs | RD Technologies",
  description: "Share our thoughts — the latest from RD Technologies.",
};

export default async function BlogPage(): Promise<React.ReactElement> {
  return <NewsListing active="blog" articles={await getArticlesByCategory("blog")} />;
}
