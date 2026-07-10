import type { Metadata } from "next";
import type { OfficeLocation } from "@/types";
import { OfficeCard } from "@/components/sections/office-card";
import { ContactMap } from "@/components/sections/contact-map";
import { SocialLink } from "@/components/layout/social-link";
import { Reveal } from "@/components/ui/reveal";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact us | RD Technologies",
  description: "Talk to us to learn more about our products and receive customer support.",
};

const OFFICES: OfficeLocation[] = [
  {
    name: "Hong Kong Headquarters",
    address:
      "Units 2801-05A, Level 28, K11 Atelier King's Road, 728 King's Road, Quarry Bay, Hong Kong",
  },
  {
    name: "Shenzhen",
    address:
      "Room 1603-1604, T7, Qianhai Kerry Center, Qianhai Road, Qianhai Shenzhen-HongKong Cooperation Zone, Nanshan District, Shenzhen, Guangdong Province, P.R.C.",
  },
];

const SUPPORT = [
  { label: "Customer Support", email: "care@rd.group" },
  { label: "Sales Support", email: "partnership@rd.group" },
  { label: "General Inquiries", email: "enquiries@rd.group" },
];

export default async function ContactPage(): Promise<React.ReactElement> {
  const { socialLinks } = await getSiteSettings();
  return (
    <>
      <section
        className="relative -mt-[72px] overflow-hidden pt-[72px] xl:-mt-[140px] xl:pt-[140px]"
        style={{
          background:
            "radial-gradient(120% 90% at 60% 0%, #eaf1fb 0%, #f4f7fc 45%, #ffffff 80%)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[1440/700] w-full">
          <ContactMap />
        </div>
        <div className="module-wrapper relative pt-24 pb-40 md:pt-32 md:pb-56 lg:pb-64">
          <h1 className="primary-text module-title">Contact us</h1>
          <p className="mt-6 max-w-[520px] text-p3 text-ink">
            Talk to us to learn more about our products and receive customer support.
          </p>
        </div>
      </section>

      <section className="module-wrapper relative z-[1] -mt-32 grid gap-6 pb-16 md:-mt-44 md:grid-cols-2 md:pb-20 lg:-mt-52">
        {OFFICES.map((office, i) => (
          <Reveal key={office.name} delay={(i + 1) as 1 | 2}>
            <OfficeCard office={office} />
          </Reveal>
        ))}
      </section>

      <section className="module-wrapper pb-24 text-center">
        <Reveal>
          <h2 className="primary-text module-title">
            We&apos;d love to hear from You!
          </h2>
          <p className="mt-8 text-h5 text-ink">Need help?</p>
          <div className="mt-4 space-y-2">
            {SUPPORT.map((s) => (
              <p key={s.label} className="text-p2 text-muted">
                {s.label}：{" "}
                <a href={`mailto:${s.email}`} className="font-medium text-blue hover:underline">
                  {s.email}
                </a>
              </p>
            ))}
          </div>

          <h3 className="mt-12 text-h4 text-ink lg:text-h3">Follow RD on Social Media</h3>
          <div className="mt-6 flex items-center justify-center gap-4">
            {socialLinks.map((item) => (
              <SocialLink key={item.label} item={item} circle />
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
