import type { Metadata } from "next";
import { FaqExplorer } from "@/components/sections/faq-explorer";
import { getFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQs | RD Technologies",
  description: "Frequently asked questions about RD ezLink, RD Wallet and RD Technologies.",
};

export default async function FaqPage(): Promise<React.ReactElement> {
  const sections = await getFaq();
  return (
    <>
      <section
        className="relative overflow-hidden pb-4 pt-16 md:pt-24"
        style={{
          background: "radial-gradient(120% 90% at 60% 0%, #eef2fb 0%, #f7f9fd 45%, #fff 80%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-24 h-[560px] w-[560px] rounded-full border border-[#dbe6fb]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-8 h-[360px] w-[360px] rounded-full border border-[#e4ecfb]"
        />
        <div className="module-wrapper relative">
          <h1 className="text-gradient-primary w-fit text-[2.5rem] font-bold leading-tight md:text-title min-[1440px]:text-[3.5rem]">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <FaqExplorer sections={sections} />
      </section>
    </>
  );
}
