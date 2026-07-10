import type { GlobalConfig } from "payload";

export const Terms: GlobalConfig = {
  slug: "terms",
  label: "Terms & Conditions",
  access: { read: () => true },
  admin: { group: "Site" },
  fields: [
    {
      name: "sections",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
          ],
        },
      ],
    },
  ],
};
