import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { cn } from "@/lib/utils";

interface ArticleRichTextProps {
  data: SerializedEditorState;
  className?: string;
}

const ARTICLE_PROSE = cn(
  "mx-auto w-full space-y-[30px] font-light sm:text-lg xl:w-10/12",
  "[&_h2]:pb-2 [&_h2]:font-bold [&_h2]:text-ink [&_h2]:text-h4 lg:[&_h2]:text-h2",
  "[&_h3]:pb-2 [&_h3]:font-bold [&_h3]:text-ink [&_h3]:text-h5 lg:[&_h3]:text-h3",
  "[&_h4]:pb-2 [&_h4]:font-bold [&_h4]:text-ink [&_h4]:text-h6 lg:[&_h4]:text-h4",
  "[&_p]:text-p2 lg:[&_p]:text-p1",
  "[&_a]:font-medium [&_a]:text-[#367af6] [&_a]:underline [&_a]:underline-offset-1",
  "[&_ul]:list-outside [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-p2 lg:[&_ul]:text-p1",
  "[&_ol]:list-outside [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_ol]:text-p2 lg:[&_ol]:text-p1",
  "[&_img]:h-auto [&_img]:w-full",
  "[&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
  "[&_th]:border [&_th]:border-black/10 [&_th]:bg-surface [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-bold",
  "[&_td]:border [&_td]:border-black/10 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top",
);

export function ArticleRichText({ data, className }: ArticleRichTextProps): React.ReactElement {
  return (
    <div className={cn(ARTICLE_PROSE, className)}>
      <LexicalRichText data={data} />
    </div>
  );
}
