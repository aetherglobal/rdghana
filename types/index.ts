import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export type NewsCategory = "blog" | "newsroom" | "media-clippings" | "important-notice";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
}

export interface NavDropdown {
  label: string;
  href: string;
  links: NavLink[];
}

export interface SocialLinkItem {
  label: string;
  href: string;
  icon: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface Article {
  slug: string;
  category: NewsCategory;
  title: string;
  date: string;
  excerpt: string;
  cover?: string;
  externalHref?: string;
  /** Rich-text body as a Payload Lexical editor state (rendered via <ArticleRichText>). */
  body?: SerializedEditorState;
}

export type ArticleBlock =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "paragraph"; html: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "image"; src: string; alt?: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface License {
  title: string;
  subtitle: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

export interface BoardMember {
  name: string;
  role: string;
  photo: string;
  featured?: boolean;
}

export interface TimelineEntry {
  side: "left" | "right";
  year?: string;
  title: string;
  description?: string;
  image?: string;
}

export interface FaqItem {
  question: string;
  answer: ArticleBlock[] | string;
}

export interface OfficeLocation {
  name: string;
  address: string;
}
