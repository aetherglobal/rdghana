import Image from "next/image";
import type { ArticleBlock } from "@/types";
import { cn } from "@/lib/utils";

interface ArticleBodyProps {
  blocks: ArticleBlock[];
}

const RICH_LINK =
  "[&_a]:font-medium [&_a]:text-[#367af6] [&_a]:underline [&_a]:underline-offset-1";

export function ArticleBody({ blocks }: ArticleBodyProps): React.ReactElement {
  return (
    <div className="mx-auto w-full space-y-[30px] font-light sm:text-lg xl:w-10/12">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const sizes = {
              2: "text-h4 lg:text-h2",
              3: "text-h5 lg:text-h3",
              4: "text-h6 lg:text-h4",
            } as const;
            return (
              <h2 key={i} className={cn("pb-2 font-bold text-ink", sizes[block.level])}>
                {block.text}
              </h2>
            );
          }
          case "paragraph":
            return (
              <p
                key={i}
                className={cn("text-p2 lg:text-p1", RICH_LINK)}
                dangerouslySetInnerHTML={{ __html: block.html }}
              />
            );
          case "list": {
            const cls = cn(
              "space-y-1 pl-5 text-left text-p2 lg:text-p1",
              RICH_LINK,
            );
            return block.ordered ? (
              <ol key={i} className={cn(cls, "list-outside list-decimal")}>
                {block.items.map((it, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: it }} />
                ))}
              </ol>
            ) : (
              <ul key={i} className={cn(cls, "list-outside list-disc")}>
                {block.items.map((it, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: it }} />
                ))}
              </ul>
            );
          }
          case "image":
            return (
              <span key={i} className="block">
                <Image
                  src={block.src}
                  alt={block.alt ?? ""}
                  width={1100}
                  height={0}
                  sizes="(min-width:1280px) 900px, (min-width:768px) 80vw, 100vw"
                  className="h-auto w-full"
                  style={{ height: "auto" }}
                />
              </span>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      {block.headers.map((h, j) => (
                        <th
                          key={j}
                          className="border border-black/10 bg-surface px-4 py-3 text-left font-bold"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c} className="border border-black/10 px-4 py-3 align-top">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
