import type { Metadata } from "next";
import { CompanyHero } from "@/components/sections/company-hero";
import { LicenseBadges } from "@/components/sections/license-badges";
import { ProductMockup } from "@/components/sections/product-mockup";
import { StoryTimeline } from "@/components/sections/story-timeline";
import { ManagementTeam } from "@/components/sections/management-team";
import { BoardMembers } from "@/components/sections/board-members";
import { getCompany } from "@/lib/content";

export const metadata: Metadata = {
  title: "Company | RD Technologies",
  description:
    "RD Technologies deploys innovative technologies to build a business world interconnected by trust.",
};

export default async function CompanyPage(): Promise<React.ReactElement> {
  const company = await getCompany();
  return (
    <>
      <CompanyHero />
      <LicenseBadges licenses={company.licenses} />

      <ProductMockup
        imageSide="left"
        image="/images/company/rd-wallet-phone.png"
        imageAlt="RD Wallet mobile app"
        heading="RD Wallet"
        description="RD Wallet is a licenced Stored Value Facility in Hong Kong. It is the first business-focused mobile wallet in Hong Kong that supports multiple currencies, providing secure, fast and cost-efficient payment solution for businesses."
      />
      <ProductMockup
        imageSide="right"
        image="/images/company/ezlink-phone.png"
        imageAlt="RD ezLink mobile app"
        heading="RD ezLink"
        description="A customer due diligence utility designed and developed in accordance with banking regulatory standards that makes seamless remote onboarding and effective compliance with ongoing customer due diligence requirements possible."
      />

      <StoryTimeline timeline={company.timeline} />
      <ManagementTeam members={company.management} />
      <BoardMembers members={company.board} founder={company.founder} />
    </>
  );
}
