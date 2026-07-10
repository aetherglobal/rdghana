import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

interface WhatIsItem {
  icon: string;
  title: string;
  description?: string;
  cta?: boolean;
}

interface WhatIsColumn {
  heading: string;
  items: WhatIsItem[];
}

const COLUMNS: readonly WhatIsColumn[] = [
  {
    heading: "Functions",
    items: [
      {
        icon: "/images/cms/icon-currencies.svg",
        title: "8 Currencies",
        description: "Support HKD, CNY, USD, JPY, SGD, EUR, GBP, AUD",
      },
      {
        icon: "/images/cms/icon-fx-free.svg",
        title: "Competitive FX Rates",
        description: "Exchange 24/7 with 0% fee",
      },
      {
        icon: "/images/cms/icon-transaction.svg",
        title: "Transfer Fund through TT and CHATS",
      },
    ],
  },
  {
    heading: "Convenience",
    items: [
      {
        icon: "/images/cms/icon-onboarding.svg",
        title: "100% Mobile Onboarding",
        description: "Open your account anytime, anywhere",
      },
      {
        icon: "/images/cms/icon-instant.svg",
        title: "Instant Settlement, 24/7",
        description: "Available for wallet-to-wallet transfers",
      },
    ],
  },
  {
    heading: "Coverage",
    items: [
      {
        icon: "/images/cms/icon-global.svg",
        title: "Open to Global businesses*",
        description: "Accept applications from Hong Kong, overseas and offshore businesses*",
        cta: true,
      },
    ],
  },
];

const HEADING_STYLE = {
  borderImage: "linear-gradient(57.4deg, #6c29ed 3.23%, #00ccff 95.61%) 1",
} as const;

export function WalletWhatIs(): React.ReactElement {
  return (
    <section className="module-wrapper py-16 md:py-24">
      <div className="mx-auto w-full xl:w-10/12">
        <Reveal>
          <h2 className="module-title text-center text-ink">What is RD Payment Platform?</h2>
          <p className="mt-4 text-center text-p3 text-muted lg:text-p2">
            RD Payment Platform is the first business-focused mobile wallet in Hong Kong and it
            supports currencies commonly used in regional trade.
          </p>
        </Reveal>

        <div className="mt-7.5 grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-6 lg:mt-1 lg:gap-10">
          {COLUMNS.map((column, i) => (
            <Reveal
              key={column.heading}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="space-y-6 lg:space-y-8"
            >
              <h3
                style={HEADING_STYLE}
                className="mt-6 inline-block w-full border-b-[1px] pb-3 text-gradient-primary text-h6 lg:mt-8 lg:pb-4 lg:text-h3"
              >
                {column.heading}
              </h3>
              {column.items.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <Image
                    src={item.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 shrink-0"
                  />
                  <div className="flex-1">
                    <h5 className="text-h9 text-ink lg:text-h6">{item.title}</h5>
                    {item.description ? (
                      <div className="mt-1 text-p4 text-muted lg:text-p3">
                        <p>{item.description}</p>
                        {item.cta ? (
                          <p>
                            <Link
                              href="/partners/"
                              className="mt-4 block w-fit rounded-full border border-[#367af6] px-6 py-2 primary-text"
                            >
                              <strong>Find our partners</strong>
                            </Link>
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-center text-p4 text-muted lg:mt-10 lg:text-p3">
            *Subject to successful completion of corporate identity verification on RD App and RD
            Payment Platform&apos;s internal approval procedures, which include but are not limited to
            the provision of entity and business information in English for company search. Terms and
            conditions apply.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
