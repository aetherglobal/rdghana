import type { GlobalConfig } from "payload";

export const Faq: GlobalConfig = {
  slug: "faq",
  label: "FAQ",
  access: { read: () => true },
  admin: { group: "Site" },
  fields: [
    {
      name: "sections",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "slug", type: "text", required: true },
        {
          name: "categories",
          type: "array",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "slug", type: "text", required: true },
            { name: "icon", type: "text" },
            { name: "activeIcon", type: "text" },
            {
              name: "faqs",
              type: "array",
              labels: { singular: "FAQ", plural: "FAQs" },
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "richText" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
