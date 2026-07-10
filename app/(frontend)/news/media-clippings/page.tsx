import type { Metadata } from "next";
import { NewsListing } from "@/components/sections/news-listing";
import { getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Media Clippings | RD Technologies",
  description: "Latest news featuring RD Technologies.",
};

export default async function MediaClippingsPage(): Promise<React.ReactElement> {
  return (
    <NewsListing active="media-clippings" articles={await getArticlesByCategory("media-clippings")} />
  );
}
