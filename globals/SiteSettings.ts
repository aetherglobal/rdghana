import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: { read: () => true },
  admin: { group: "Site" },
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import("next/cache");
          revalidatePath("/", "layout");
        } catch {}
      },
    ],
  },
  fields: [
    { name: "oristapayUrl", type: "text" },
    { name: "privacyPolicyUrl", type: "text" },
    { name: "pdpoNoticeUrl", type: "text" },
    {
      name: "navDropdowns",
      type: "array",
      labels: { singular: "Nav dropdown", plural: "Nav dropdowns" },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
            { name: "external", type: "checkbox" },
            { name: "description", type: "text" },
          ],
        },
      ],
    },
    {
      name: "navLinks",
      type: "array",
      labels: { singular: "Nav link", plural: "Nav links" },
      admin: { description: "Top-level header links shown after the dropdowns, before Contact." },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    { name: "contactLabel", type: "text" },
    { name: "contactHref", type: "text" },
    {
      name: "footerColumns",
      type: "array",
      fields: [
        { name: "heading", type: "text", required: true },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
            { name: "external", type: "checkbox" },
          ],
        },
      ],
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        { name: "icon", type: "text", required: true },
      ],
    },
  ],
};
