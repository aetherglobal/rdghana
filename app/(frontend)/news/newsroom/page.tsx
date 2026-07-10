import type { Metadata } from "next";
import { NewsListing } from "@/components/sections/news-listing";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Newsroom | RD Technologies",
  description: "Latest updates from RD Technologies.",
};

export default async function NewsroomPage(): Promise<React.ReactElement> {
  return <NewsListing active="newsroom" articles={await getArticlesByCategory("newsroom")} />;
}
