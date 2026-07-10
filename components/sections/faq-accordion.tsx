import Link from "next/link";
import { Accordion, type AccordionItemData } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

const FAQ_ITEMS: readonly AccordionItemData[] = [
  {
    question: "1. What is RD Wallet?",
    answer: (
      <>
        RD Wallet is licenced stored value facility (SVF) in Hong Kong regulated by Hong Kong
        Monetary Authority (licence number: SVF0016). It is the first digital wallet for
        enterprises, providing value-added, local and cross-border payment and foreign exchange
        services for corporate customers:
        <br />
        <br />
        <ol className="list-inside list-decimal">
          <li>
            100% mobile onboarding, accepting applications from Hong Kong, overseas and offshore
            businesses*
          </li>
          <li>Applicable to local and cross-border payment</li>
          <li>Wallet-to-wallet transfer features instant settlement</li>
          <li>Support multiple currencies</li>
        </ol>
        <br />
        *Subject to successful completion of corporate identity verification on RD App and RD
        Wallet&rsquo;s internal approval procedures, which include but are not limited to the
        provision of entity and business information in English for company search. Terms and
        conditions apply.
      </>
    ),
  },
  {
    question: "2. Who can open an RD Wallet account?",
    answer: (
      <>
        We support sole proprietorship, partnership and limited companies established in Hong Kong
        SAR. We also support limited companies established overseas. (Except limited companies
        established in Mainland China)
      </>
    ),
  },
  {
    question: "3. What currencies do RD Wallet support?",
    answer: (
      <p>
        Currently, RD Wallet supports multiple currencies, including HKD, CNY, USD, JPY, SGD, EUR,
        GBP, AUD. More options of currencies will be supported in the near future to facilitate
        cross-border payment.
      </p>
    ),
  },
  {
    question: "4. What transfer or payment channels do RD Wallet support?",
    answer: (
      <p>
        RD Wallet corporate customers can make inward and outward fund transfer by using local bank
        transfer, Faster Payment System (FPS) or remittance, as well as receiving payments from
        local and overseas enterprises and individuals via such channels. Corporate users can also
        make use of the &ldquo;wallet-to-wallet transfer&rdquo; function featuring instant
        settlement which highly improves cash liquidity.
      </p>
    ),
  },
  {
    question: "5. What is the charge of RD Wallet service?",
    answer: (
      <p>
        Please refer to our{" "}
        <a
          href="https://static-official.rd.group/cms/92/RD_Wallet_Fee_Schedule.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="primary-text underline"
        >
          fee
        </a>
        .
      </p>
    ),
  },
  {
    question: "6. Can I open an RD Wallet account for personal use?",
    answer: <p>RD Wallet currently does not offer wallet account services for personal use.</p>,
  },
];

export function FaqAccordion(): React.ReactElement {
  return (
    <section className="module-wrapper py-16 md:py-24">
      <div className="mx-auto w-full xl:w-10/12">
        <Reveal>
          <h3 className="mx-auto w-fit text-center primary-text text-h6 lg:text-h4">FAQS</h3>
          <h3 className="mx-auto mt-5 w-fit text-center primary-text text-h3 md:pb-6 md:text-h2 lg:text-h1">
            Frequently Asked Questions
          </h3>
        </Reveal>

        <Reveal delay={1} className="mt-5">
          <Accordion items={[...FAQ_ITEMS]} defaultOpen={-1} />
        </Reveal>

        <Reveal delay={1} className="mt-6 flex justify-center">
          <Link
            href="/faq/?tab=rd-wallet"
            className="bg-gradient-primary gradient-primary-hover inline-flex items-center justify-center rounded px-[30px] py-3 text-h6 text-white transition-opacity duration-200 hover:opacity-90 lg:px-10 lg:py-4"
          >
            More Questions
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
