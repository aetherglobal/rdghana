import type { Metadata } from "next";
import { NewsListing } from "@/components/sections/news-listing";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Important Notice | RD Technologies",
  description: "Know more about our important notices.",
};

export default async function ImportantNoticePage(): Promise<React.ReactElement> {
  return (
    <NewsListing active="important-notice" articles={await getArticlesByCategory("important-notice")} />
  );
}
