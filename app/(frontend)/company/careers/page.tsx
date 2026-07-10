import type { Metadata } from "next";
import Image from "next/image";
import { CareersListing } from "@/components/sections/careers-listing";

export const metadata: Metadata = {
  title: "Careers | RD Technologies",
  description: "Join RD Technologies and help build a business world interconnected by trust.",
};

const BADGES = [
  { src: "/images/products/badge-app-store.svg", alt: "Download on the App Store", href: "#" },
  { src: "/images/products/badge-google-play.svg", alt: "Get it on Google Play", href: "#" },
  { src: "/images/products/badge-apk-file.svg", alt: "Download APK File", href: "#" },
];

export default function CareersPage(): React.ReactElement {
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
          <h1 className="primary-text module-title">Careers</h1>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <CareersListing />
      </section>

      <section className="module-wrapper pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-[30px] bg-gradient-primary px-8 py-14 md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-24 h-[420px] w-[420px] rounded-full border border-white/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-24 top-10 h-[300px] w-[300px] rounded-full border border-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-48 h-[320px] w-[320px] rounded-full border border-white/10"
          />
          <div className="relative z-[1] max-w-[560px]">
            <h2 className="text-[2.75rem] font-bold leading-tight text-white md:text-[3.5rem]">
              Get It Now
            </h2>
            <p className="mt-4 max-w-[420px] text-p1 text-white/90">
              Enjoy easier access to financial services and more efficient business payments!
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {BADGES.map((b) => (
                <a
                  key={b.src}
                  href={b.href}
                  className="transition-opacity hover:opacity-90"
                  aria-label={b.alt}
                >
                  <Image src={b.src} alt={b.alt} width={180} height={54} className="h-[54px] w-auto" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
