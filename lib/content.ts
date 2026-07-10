import "server-only";

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type {
  BoardMember,
  FooterColumn,
  License,
  NavDropdown,
  NavLink,
  SocialLinkItem,
  TeamMember,
  TimelineEntry,
} from "@/types";
import type { Media } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";

function mediaUrl(m: number | Media | null | undefined): string | undefined {
  if (m && typeof m === "object") return m.url ?? undefined;
  return undefined;
}

export interface CompanyContent {
  licenses: License[];
  timeline: TimelineEntry[];
  management: TeamMember[];
  board: BoardMember[];
  founder: BoardMember;
}

export async function getCompany(): Promise<CompanyContent> {
  const payload = await getPayloadClient();
  const c = await payload.findGlobal({ slug: "company", depth: 1 });
  return {
    licenses: (c.licenses ?? []).map((l) => ({ title: l.title, subtitle: l.subtitle })),
    timeline: (c.timeline ?? []).map((t) => ({
      side: t.side,
      year: t.year ?? undefined,
      title: t.title,
      description: t.description ?? undefined,
      image: mediaUrl(t.image),
    })),
    management: (c.management ?? []).map((m) => ({
      name: m.name,
      role: m.role,
      photo: mediaUrl(m.photo) ?? "",
    })),
    board: (c.board ?? []).map((b) => ({
      name: b.name,
      role: b.role ?? "",
      photo: mediaUrl(b.photo) ?? "",
      featured: b.featured ?? undefined,
    })),
    founder: {
      name: c.founder?.name ?? "",
      role: c.founder?.role ?? "",
      photo: mediaUrl(c.founder?.photo) ?? "",
    },
  };
}

export interface SiteChrome {
  oristapayUrl: string;
  privacyPolicyUrl: string;
  pdpoNoticeUrl: string;
  navDropdowns: NavDropdown[];
  contact: NavLink;
  footerColumns: FooterColumn[];
  socialLinks: SocialLinkItem[];
}

export async function getSiteSettings(): Promise<SiteChrome> {
  const payload = await getPayloadClient();
  const s = await payload.findGlobal({ slug: "site-settings", depth: 0 });
  return {
    oristapayUrl: s.oristapayUrl ?? "",
    privacyPolicyUrl: s.privacyPolicyUrl ?? "",
    pdpoNoticeUrl: s.pdpoNoticeUrl ?? "",
    navDropdowns: (s.navDropdowns ?? []).map((d) => ({
      label: d.label,
      href: d.href,
      links: (d.links ?? []).map((l) => ({
        label: l.label,
        href: l.href,
        external: l.external ?? undefined,
        description: l.description ?? undefined,
      })),
    })),
    contact: { label: s.contactLabel ?? "Contact us", href: s.contactHref ?? "/contact-us/" },
    footerColumns: (s.footerColumns ?? []).map((c) => ({
      heading: c.heading,
      links: (c.links ?? []).map((l) => ({
        label: l.label,
        href: l.href,
        external: l.external ?? undefined,
      })),
    })),
    socialLinks: (s.socialLinks ?? []).map((sl) => ({
      label: sl.label,
      href: sl.href,
      icon: sl.icon,
    })),
  };
}

export interface FaqEntry {
  question: string;
  answer: SerializedEditorState | null;
}
export interface FaqCategoryContent {
  name: string;
  slug: string;
  icon?: string;
  activeIcon?: string;
  faqs: FaqEntry[];
}
export interface FaqSectionContent {
  title: string;
  slug: string;
  categories: FaqCategoryContent[];
}

export async function getFaq(): Promise<FaqSectionContent[]> {
  const payload = await getPayloadClient();
  const f = await payload.findGlobal({ slug: "faq", depth: 1 });
  return (f.sections ?? []).map((s) => ({
    title: s.title,
    slug: s.slug,
    categories: (s.categories ?? []).map((c) => ({
      name: c.name,
      slug: c.slug,
      icon: c.icon ?? undefined,
      activeIcon: c.activeIcon ?? undefined,
      faqs: (c.faqs ?? []).map((q) => ({
        question: q.question,
        answer: q.answer ?? null,
      })),
    })),
  }));
}

export interface TermsSectionContent {
  title: string;
  links: { label: string; href: string }[];
}

export async function getTerms(): Promise<TermsSectionContent[]> {
  const payload = await getPayloadClient();
  const t = await payload.findGlobal({ slug: "terms", depth: 0 });
  return (t.sections ?? []).map((s) => ({
    title: s.title,
    links: (s.links ?? []).map((l) => ({ label: l.label, href: l.href })),
  }));
}

export interface VulnerabilityContent {
  intro: string;
  securityEmail: string;
  pgpUrl: string;
  reportInfo: string[];
  guidelines: string[];
}

export async function getVulnerability(): Promise<VulnerabilityContent> {
  const payload = await getPayloadClient();
  const v = await payload.findGlobal({ slug: "vulnerability-disclosure", depth: 0 });
  return {
    intro: v.intro ?? "",
    securityEmail: v.securityEmail ?? "",
    pgpUrl: v.pgpUrl ?? "",
    reportInfo: (v.reportInfo ?? []).map((r) => r.item),
    guidelines: (v.guidelines ?? []).map((g) => g.item),
  };
}

export interface PageContent {
  title: string;
  intro?: string;
  body?: SerializedEditorState;
}

export async function getPage(slug: string): Promise<PageContent | undefined> {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  const doc = res.docs[0];
  if (!doc) return undefined;
  return {
    title: doc.title,
    intro: doc.intro ?? undefined,
    body: doc.body ?? undefined,
  };
}
