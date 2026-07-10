import { ArticleBody } from "@/components/sections/article-body";
import { Reveal } from "@/components/ui/reveal";
import type { ArticleBlock } from "@/types";

interface LegalPageProps {
  title: string;
  blocks: ArticleBlock[];
  intro?: React.ReactNode;
}

export function LegalPage({ title, blocks, intro }: LegalPageProps): React.ReactElement {
  return (
    <>
      <section
        className="pb-6 pt-16 md:pt-24"
        style={{ background: "radial-gradient(120% 90% at 60% 0%, #eef2fb 0%, #f7f9fd 45%, #fff 80%)" }}
      >
        <div className="module-wrapper">
          <h1 className="primary-text module-title">{title}</h1>
          {intro ? <div className="mt-5 max-w-[760px] text-p2 text-muted">{intro}</div> : null}
        </div>
      </section>

      <section className="module-wrapper py-12 md:py-16">
        <Reveal>
          <ArticleBody blocks={blocks} />
        </Reveal>
      </section>
    </>
  );
}
