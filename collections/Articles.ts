import type { CollectionConfig } from "payload";

const revalidate = async (slug?: string): Promise<void> => {
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath("/news/blog");
    revalidatePath("/news/newsroom");
    revalidatePath("/news/media-clippings");
    revalidatePath("/news/important-notice");
    if (slug) revalidatePath(`/news/blogs/${slug}`);
  } catch {}
};

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: { singular: "Article", plural: "News Articles" },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedDate", "featured"],
    group: "Content",
  },
  hooks: {
    afterChange: [({ doc }) => revalidate(doc?.slug)],
    afterDelete: [({ doc }) => revalidate(doc?.slug)],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "URL segment, e.g. /news/blogs/<slug>",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "blog",
      options: [
        { label: "Blog", value: "blog" },
        { label: "Newsroom", value: "newsroom" },
        { label: "Media Clippings", value: "media-clippings" },
        { label: "Important Notice", value: "important-notice" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" },
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show in the homepage “What’s new” carousel.",
      },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "externalHref",
      type: "text",
      admin: {
        description: "If set, the card links to this external URL instead of the article page.",
      },
    },
    {
      name: "body",
      type: "richText",
    },
  ],
};
