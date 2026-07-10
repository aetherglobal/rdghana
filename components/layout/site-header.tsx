"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NavDropdown as NavDropdownConfig, NavLink, SocialLinkItem } from "@/types";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { SocialLink } from "@/components/layout/social-link";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  navDropdowns: NavDropdownConfig[];
  contact: NavLink;
  social: SocialLinkItem[];
  oristapayUrl: string;
}

const Logo = ({ className }: { className?: string }): React.ReactElement => (
  <Link href="/" aria-label="RD Technologies home" className={className}>
    <Image
      src="/images/brand/rd-logo.png"
      alt="RD Technologies"
      width={232}
      height={28}
      priority
      className="h-5 w-auto lg:h-6"
    />
  </Link>
);

const IconLogo = ({ className }: { className?: string }): React.ReactElement => (
  <Link href="/" aria-label="RD Technologies home" className={className}>
    <Image
      src="/images/brand/rd-logo-icon.png"
      alt="RD Technologies"
      width={96}
      height={96}
      className="h-[30px] w-[30px]"
    />
  </Link>
);

const GetStartedButton = ({ href }: { href: string }): React.ReactElement => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-primary px-3.5 text-[13px] font-bold tracking-[-0.16px] text-white transition-opacity duration-200 hover:opacity-90 xl:h-[46px] xl:px-6 xl:text-base"
  >
    Get Started
  </a>
);

export function SiteHeader({
  navDropdowns,
  contact,
  social,
  oristapayUrl,
}: SiteHeaderProps): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    let ticking = false;
    const onScroll = (): void => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-[999] w-full select-none">
      <div
        className={cn(
          "nav-bg pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          "module-wrapper relative z-[1] hidden items-center justify-between overflow-hidden transition-all duration-500 ease-in-out xl:flex",
          scrolled ? "max-h-0 pt-0 opacity-0" : "max-h-24 pt-6 opacity-100",
        )}
      >
        <Logo />
        <div className="flex items-center gap-6">
          <LanguageSwitcher />
          <div className="flex items-center gap-4">
            {social.map((item) => (
              <SocialLink key={item.label} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "module-wrapper relative z-[999] flex items-center justify-between transition-all duration-300",
          scrolled ? "py-2.5 xl:py-3" : "py-2.5 md:py-4 xl:py-3",
        )}
      >
        <div className="flex items-center gap-8">
          <Logo className="xl:hidden" />
          {scrolled ? <IconLogo className="hidden xl:block" /> : null}
          <nav className="hidden items-center gap-8 xl:flex">
            {navDropdowns.map((item) => (
              <NavDropdown key={item.label} item={item} />
            ))}
            <Link
              href={contact.href}
              className="py-2 text-h6 text-ink transition-colors hover:text-primary"
            >
              {contact.label}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <GetStartedButton href={oristapayUrl} />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="relative z-[999] flex h-8 w-8 flex-col items-center justify-center gap-[5px] xl:hidden"
          >
            <span
              className={cn(
                "h-[3px] w-6 rounded-full bg-ink transition-all duration-300",
                menuOpen && "translate-y-[8px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-[3px] w-6 rounded-full bg-ink transition-all duration-300",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "h-[3px] w-6 rounded-full bg-ink transition-all duration-300",
                menuOpen && "-translate-y-[8px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navDropdowns={navDropdowns}
        contact={contact}
        social={social}
      />
    </header>
  );
}
