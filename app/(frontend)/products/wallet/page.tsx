import type { Metadata } from "next";
import { PaymentPlatformHero } from "@/components/sections/payment-platform-hero";
import { WalletDownload } from "@/components/sections/wallet-download";
import { WalletWhatIs } from "@/components/sections/wallet-what-is";
import { WalletBanner } from "@/components/sections/wallet-banner";
import { FaqAccordion } from "@/components/sections/faq-accordion";

export const metadata: Metadata = {
  title: "RD Payment Platform | RD Technologies",
};

export default function WalletPage(): React.ReactElement {
  return (
    <main>
      <PaymentPlatformHero />
      <WalletDownload />
      <WalletWhatIs />
      <WalletBanner />
      <FaqAccordion />
    </main>
  );
}
