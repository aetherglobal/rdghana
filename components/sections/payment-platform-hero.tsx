import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { CheckIcon } from "@/components/ui/icons";

const LABELS: readonly string[] = [
  "Licenced Stored Value Facility",
  "Fast, Easy, and Secure",
  "First Business-Focused Mobile Wallet",
];

export function PaymentPlatformHero(): React.ReactElement {
  return (
    <section className="relative overflow-hidden pt-16 pb-16 md:pb-24">
      <div className="module-wrapper flex flex-col items-center text-center">
        <Reveal
          as="h1"
          className="text-gradient-primary module-title"
        >
          RD Payment Platform
        </Reveal>

        <Reveal
          delay={1}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {LABELS.map((label) => (
            <span key={label} className="flex items-center gap-2 text-h9 lg:text-h7 text-ink">
              <CheckIcon className="h-4 w-4 shrink-0 text-blue" />
              {label}
            </span>
          ))}
        </Reveal>

        <Reveal
          as="p"
          delay={2}
          className="mx-auto mt-4 max-w-[600px] text-p5 xl:text-p2 text-ink lg:mt-5 xl:mt-6"
        >
          One mobile business account, multiple financial services, infinite opportunities.
          Empowering business growth with easier and cheaper access to financial services.
        </Reveal>

        <Reveal delay={2} className="relative mt-12 w-full">
          <Image
            src="/images/products/feature-hovered-short.png"
            alt=""
            width={800}
            height={488}
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[820px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-25 blur-2xl"
          />
          <Image
            src="/images/products/wallet-banner-phones.png"
            alt="RD Wallet mobile dashboard"
            width={2294}
            height={1680}
            priority
            className="mx-auto h-auto w-full max-w-[640px]"
          />
        </Reveal>

        <Reveal
          delay={3}
          className="relative z-[1] -mt-6 flex w-full max-w-[720px] items-center gap-5 rounded-t-[30px] bg-white px-8 py-5 shadow-[0px_4px_13px_rgba(0,0,0,0.2)] lg:-mt-12 lg:px-6 lg:pb-2.5 lg:pt-[5px]"
        >
          <Image
            src="/images/products/payment-platform-phone.png"
            alt=""
            width={256}
            height={256}
            className="hidden w-[86px] flex-shrink-0 lg:block"
          />
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center justify-center gap-4 lg:-ml-6">
              <Image
                src="/images/products/logo-download.svg"
                alt=""
                width={62}
                height={62}
                className="w-[60px]"
              />
              <div className="text-h6">Get your RD Wallet Now</div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <a
                href="https://apps.apple.com/app/rd/id1626942371"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/products/badge-app-store.svg"
                  alt="Download on the App Store"
                  width={183}
                  height={54}
                  className="w-[140px] lg:w-[182px]"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=group.rd.rdapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/products/badge-google-play.svg"
                  alt="Get it on Google Play"
                  width={183}
                  height={54}
                  className="w-[140px] lg:w-[182px]"
                />
              </a>
              <a
                href="https://static-official.rd.group/apk/rdwallet.apk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/products/badge-apk-file.svg"
                  alt="Download APK File"
                  width={183}
                  height={54}
                  className="w-[140px] lg:w-[182px]"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
