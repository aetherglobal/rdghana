import type { Metadata } from "next";
import { Poppins, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getSiteSettings } from "@/lib/content";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rd.group"),
  title: "RD Technologies | Bridging WEB2 and WEB3",
  description:
    "RD Technologies is the financial platform that bridges the Web2 and Web3 worlds. It deploys innovative fintech to build a business world interconnected by trust.",
  openGraph: {
    title: "RD Technologies | Bridging WEB2 and WEB3",
    description:
      "RD Technologies is the financial platform that bridges the Web2 and Web3 worlds. It deploys innovative fintech to build a business world interconnected by trust.",
    url: "/",
    locale: "en",
    images: [{ url: "/seo/og-image.png", alt: "RD Technologies" }],
  },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactElement> {
  const chrome = await getSiteSettings();
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-ink">
        <SiteHeader
          navDropdowns={chrome.navDropdowns}
          contact={chrome.contact}
          social={chrome.socialLinks}
          oristapayUrl={chrome.oristapayUrl}
        />
        <main className="flex-1 pt-[72px] xl:pt-[140px]">{children}</main>
        <SiteFooter footerColumns={chrome.footerColumns} social={chrome.socialLinks} />
      </body>
    </html>
  );
}
