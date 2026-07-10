import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import { LegalPage } from "@/components/sections/legal-page";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notice relating to the Personal Data (Privacy) Ordinance | RD Technologies",
};

export default async function PdpoNoticePage(): Promise<React.ReactElement> {
  const page = await getPage("pdpo-notice");
  if (!page) notFound();
  return (
    <LegalPage
      title={page.title}
      blocks={[]}
      intro={
        page.body ? (
          <div className="[&_a]:font-medium [&_a]:text-blue [&_a]:underline">
            <LexicalRichText data={page.body} />
          </div>
        ) : undefined
      }
    />
  );
}
