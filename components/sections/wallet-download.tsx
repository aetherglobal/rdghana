import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface AdvantageCard {
  title: string;
  icon: string;
  image: string;
  hover: string;
  span: string;
  titleClassName?: string;
  headerClassName?: string;
}

const CARDS: readonly AdvantageCard[] = [
  {
    title: "Licenced Stored Value Facility",
    icon: "/images/cms/sme-advantage-svf-icon.svg",
    image: "/images/cms/sme-feature-svf-lg.png",
    hover: "/images/products/feature-hovered-short.png",
    span: "md:col-span-6",
    titleClassName: "md:max-w-[50%] lg:max-w-[40%]",
  },
  {
    title: "100% Mobile Onboarding",
    icon: "/images/cms/sme-advantage-onboarding-icon.svg",
    image: "/images/cms/sme-feature-onboarding-lg.png",
    hover: "/images/products/feature-hovered-short.png",
    span: "md:col-span-6",
    titleClassName: "md:max-w-[50%] lg:max-w-[40%]",
  },
  {
    title: "Multiple Currencies with Competitive FX Rates",
    icon: "/images/cms/sme-advantage-fx-icon.svg",
    image: "/images/cms/sme-feature-fx-lg.png",
    hover: "/images/products/feature-hovered-short.png",
    span: "md:col-span-4",
    titleClassName: "max-w-[60%] md:max-w-full xl:max-w-[70%]",
  },
  {
    title: "Fund Transfers under Business Name",
    icon: "/images/cms/sme-advantage-transfer-icon.svg",
    image: "/images/cms/sme-feature-transfer-lg.png",
    hover: "/images/products/feature-hovered-short.png",
    span: "md:col-span-4",
    titleClassName: "max-w-[60%] md:max-w-full xl:max-w-[70%]",
  },
  {
    title: "Instant Settlement for Wallet-to-wallet Transfers",
    icon: "/images/cms/sme-advantage-instant-icon.svg",
    image: "/images/cms/sme-feature-instant-lg.png",
    hover: "/images/products/feature-hovered-short.png",
    span: "md:col-span-4",
    titleClassName: "max-w-[60%] md:max-w-full xl:max-w-[70%]",
  },
];

const CARD_CLASS =
  "group relative col-span-12 h-[244px] overflow-hidden rounded-3xl bg-surface p-4 lg:px-6 lg:py-8";

function AdvantageTile({
  card,
  delay,
}: {
  card: AdvantageCard;
  delay: 1 | 2 | 3;
}): React.ReactElement {
  return (
    <Reveal delay={delay} className={cn(CARD_CLASS, card.span)}>
      <Image
        src={card.hover}
        alt=""
        width={800}
        height={488}
        className="pointer-events-none absolute left-0 top-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
      />
      <Image
        src={card.image}
        alt=""
        width={816}
        height={732}
        className="pointer-events-none absolute bottom-0 right-0 z-0 origin-bottom object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="relative flex flex-col gap-2">
        <Image src={card.icon} alt="" width={48} height={48} className="w-12" />
        <h5 className={cn("text-h6 lg:text-h5", card.titleClassName)}>{card.title}</h5>
      </div>
    </Reveal>
  );
}

export function WalletDownload(): React.ReactElement {
  return (
    <section
      data-sensors-exposure-event-name="Exposure"
      data-sensors-exposure-property-name="wallet.sme.advantages"
      className="module-wrapper grid grid-cols-12 gap-4"
    >
      <AdvantageTile card={CARDS[0]} delay={1} />
      <AdvantageTile card={CARDS[1]} delay={2} />

      <Reveal delay={3} className={cn(CARD_CLASS, "md:col-span-12")}>
        <Image
          src="/images/products/feature-hovered-long.png"
          alt=""
          width={1200}
          height={488}
          className="pointer-events-none absolute left-0 top-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
        />
        <Image
          src="/images/cms/sme-feature-global-lg.png"
          alt=""
          width={2544}
          height={732}
          className="pointer-events-none absolute bottom-0 right-0 z-0 origin-bottom object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="relative flex flex-col gap-2 md:flex-row md:items-center">
          <Image
            src="/images/cms/sme-advantage-global-icon.svg"
            alt=""
            width={48}
            height={48}
            className="w-12"
          />
          <h5 className="text-h6 lg:text-h5">Open to Global Businesses*</h5>
        </div>
        <div className="relative mt-4 text-p3">
          <p>Accept applications from Hong Kong, overseas and offshore businesses*</p>
          <p>
            <Link
              href="/partners/"
              className="mt-4 block w-fit rounded-full border border-[#367af6] px-6 py-2 primary-text"
            >
              <strong>Find our partners</strong>
            </Link>
          </p>
        </div>
      </Reveal>

      <AdvantageTile card={CARDS[2]} delay={1} />
      <AdvantageTile card={CARDS[3]} delay={2} />
      <AdvantageTile card={CARDS[4]} delay={3} />
    </section>
  );
}
