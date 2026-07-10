import { HeroBanner } from "@/components/sections/hero-banner";
import { VisionMission } from "@/components/sections/vision-mission";
import { OristaPayFeatures } from "@/components/sections/oristapay-features";
import { WhatsNewCarousel } from "@/components/sections/whats-new-carousel";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { getFeaturedArticles } from "@/lib/articles";
import { getSiteSettings } from "@/lib/content";

export default async function Home(): Promise<React.ReactElement> {
  const [whatsNew, chrome] = await Promise.all([getFeaturedArticles(), getSiteSettings()]);
  return (
    <>
      <HeroBanner oristapayUrl={chrome.oristapayUrl} />
      <div className="space-y-20 md:space-y-30 pb-40 md:pb-32 lg:pb-52">
        <VisionMission />
        <OristaPayFeatures />
        <WhatsNewCarousel items={whatsNew} />
        <NewsletterSignup
          privacyPolicyUrl={chrome.privacyPolicyUrl}
          pdpoNoticeUrl={chrome.pdpoNoticeUrl}
        />
      </div>
    </>
  );
}
