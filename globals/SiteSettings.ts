import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: { read: () => true },
  admin: { group: "Site" },
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
