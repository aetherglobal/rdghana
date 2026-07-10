import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { getTerms } from "@/lib/content";

export const metadata: Metadata = { title: "Terms and Conditions | RD Technologies" };

export default async function TermsPage(): Promise<React.ReactElement> {
  const sections = await getTerms();
  return (
    <section
      className="module-wrapper bg-white pt-28 md:pt-40 lg:pt-[221px]"
      style={{ background: "radial-gradient(120% 90% at 60% 0%, #eef2fb 0%, #f7f9fd 45%, #fff 80%)" }}
    >
      <div className="max-w-[816px]">
        <h1 className="primary-text module-title">Terms and Conditions</h1>
      </div>

      <div className="mx-auto mt-[100px] space-y-[70px] xl:mt-[150px] xl:w-10/12">
        {sections.map((section) => (
          <Reveal key={section.title}>
            <h2 className="primary-text mx-auto text-center text-h4">{section.title}</h2>
            <div className="mt-5 space-y-[25px]">
              {section.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-[20px] bg-surface px-5 py-5 text-h5 text-ink transition-all duration-300 hover:bg-white hover:shadow-[0_20px_50px_rgba(17,24,39,0.08)] md:px-7.5 md:text-h4 xl:text-h3"
                >
                  <span className="transition-colors group-hover:text-transparent group-hover:[background-image:var(--gradient-primary)] group-hover:bg-clip-text">
                    {link.label}
                  </span>
                  <svg
                    className="h-5 w-5 shrink-0 text-ink transition-colors group-hover:text-primary md:h-6 md:w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </a>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
