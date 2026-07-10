import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import type { FeatureItem } from "@/types";

const FEATURES: FeatureItem[] = [
  {
    title: "A Flexible Payment Ecosystem, Without Borders",
    description:
      "Dual-Rail Integration: Buyers pay in local fiat or stablecoins. Sellers receive USD, HKD, or stablecoins — all through fully compliant settlement channels.",
    icon: "/images/cms/frame-47514.png",
  },
  {
    title: "Direct Access to Emerging Markets",
    description:
      "Deeply integrated with local payment networks across Africa and Latin America — built for global reach.",
    icon: "/images/cms/currencies.png",
  },
  {
    title: "Lightning Settlement: A New Standard for Capital Flow",
    description:
      "24/7 Liquidity: Stablecoin-powered rails eliminate traditional banking hour constraints, enabling round-the-clock transfers and settlement.",
    icon: "/images/cms/icon-ezlink-search-pros-3.png",
  },
  {
    title: "Institutional-Grade Compliance",
    description:
      "Global Licensed Ecosystem: Anchored in RD Technologies' commitment to Hong Kong's rigorous regulatory framework.",
    icon: "/images/cms/for-global-businesses.png",
  },
  {
    title: "Intelligently Simple",
    description:
      "End-to-End Visibility: A user-first interface that translates blockchain transparency into enterprise-grade financial clarity.",
    icon: "/images/cms/currencies.png",
  },
];

export function OristaPayFeatures(): React.ReactElement {
  return (
    <div className="module-wrapper group relative flex flex-col items-center text-center lg:flex-row-reverse lg:items-start lg:justify-between lg:gap-x-9">
      <Reveal className="mb-8 w-4/5 pt-15 sm:w-80 lg:w-[46%] xl:w-[42%]">
        <div className="relative mx-auto w-fit lg:ml-auto lg:mr-0">
          <Image
            src="/images/home/ipad-dashboard.png"
            alt="OristaPay"
            width={960}
            height={686}
            priority
            className="relative z-[1] w-full max-w-[480px] md:ml-auto"
          />
          <Image
            src="/images/home/coin-usdt.png"
            alt=""
            width={202}
            height={202}
            className="animate-float pointer-events-none absolute h-auto w-[50px] md:w-[70px] lg:w-[100px]"
            style={{ top: "-18%", left: "-7%" }}
          />
          <Image
            src="/images/home/coin-generic.png"
            alt=""
            width={437}
            height={454}
            className="animate-float pointer-events-none absolute h-auto w-20 md:w-[120px] lg:w-40"
            style={{ bottom: "-5%", left: "-22%", animationDelay: "1.5s" }}
          />
          <Image
            src="/images/home/coin-usd.png"
            alt=""
            width={349}
            height={335}
            className="animate-float pointer-events-none absolute z-[1] h-auto w-[60px] md:w-[90px] lg:w-[130px]"
            style={{ bottom: "-10%", right: "-9%", animationDelay: "0.8s" }}
          />
        </div>
      </Reveal>

      <div className="relative z-[1] flex flex-col gap-y-5 lg:w-[54%] lg:text-left xl:w-[58%]">
        <Reveal className="space-y-2">
          <div className="text-h3 mx-auto primary-text md:w-auto md:text-h2 lg:pb-4 lg:text-h1">
            OristaPay by RD Technologies
          </div>
          <div className="px-5 pb-1 text-p3 sm:px-16 md:px-0 md:pb-5 md:text-p2 lg:text-[26px] lg:leading-snug">
            <p>
              <strong>Next Generation Enterprise Accounts</strong> for AI + Web3 Era
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6 md:gap-7.5 xl:gap-10">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="flex gap-3 text-left"
            >
              <div className="basis-1/6">
                {f.icon ? (
                  <Image
                    src={f.icon}
                    alt=""
                    width={64}
                    height={64}
                    className="pointer-events-none w-16"
                  />
                ) : null}
              </div>
              <div className="flex basis-5/6 flex-col gap-2">
                <div className="text-h4 leading-normal md:text-h3">{f.title}</div>
                <div className="text-p4 leading-normal md:text-p2 xl:text-p2">
                  <p>{f.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
