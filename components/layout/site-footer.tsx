import Image from "next/image";
import Link from "next/link";
import type { FooterColumn, SocialLinkItem } from "@/types";
import { SocialLink } from "@/components/layout/social-link";

interface SiteFooterProps {
  footerColumns: FooterColumn[];
  social: SocialLinkItem[];
}

export function SiteFooter({ footerColumns, social }: SiteFooterProps): React.ReactElement {
  return (
    <footer className="relative w-full bg-white before:absolute before:left-0 before:top-0 before:h-[2px] before:w-full before:bg-gradient-primary before:content-['']">
      <div className="pointer-events-none absolute -top-[44px] right-0 z-[1] hidden overflow-hidden md:block lg:-top-[53px]">
        <Image
          src="/images/decorations/footer-deco.svg"
          alt=""
          width={420}
          height={230}
          className="h-auto w-[180px] lg:w-[220px]"
        />
      </div>

      <div className="module-wrapper grid grid-cols-2 gap-10 pb-12 pt-16 md:grid-cols-4 md:gap-y-[72px] xl:grid-cols-7">
        <div className="col-span-2 flex flex-col gap-y-10 md:col-span-4 xl:col-span-3">
          <Link href="/" className="inline-block">
            <Image
              src="/images/brand/rd-logo.png"
              alt="RD Technologies"
              width={232}
              height={28}
              className="inline-block h-6 w-auto max-w-[232px]"
            />
          </Link>
        </div>

        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h3 className="mb-7 text-h6 text-ink">{col.heading}</h3>
            {col.links.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-4 block text-base font-normal text-ink transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="mb-4 block text-base font-normal text-ink transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        ))}
      </div>

      <div className="module-wrapper flex flex-col gap-6 pb-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          {social.map((item) => (
            <SocialLink key={item.label} item={item} />
          ))}
        </div>
        <p className="text-h7 text-muted xl:text-h6">© RD Technologies. All rights reserved.</p>
      </div>
    </footer>
  );
}
