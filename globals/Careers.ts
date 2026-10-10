import type { GlobalConfig } from "payload";

export const Careers: GlobalConfig = {
  slug: "careers",
  label: "Careers Page",
  access: { read: () => true },
  admin: { group: "Careers" },
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidatePath } = await import("next/cache");
          revalidatePath("/careers");
        } catch {}
      },
    ],
  },
  fields: [
    {
      name: "recruitmentEmail",
      label: "General Recruitment Email",
      type: "email",
      required: true,
      defaultValue: "rdghana@aetherstrategies.io",
      admin: { description: "Used by the “How to Apply” email button." },
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      admin: { description: "Optional photo shown beside the page heading." },
    },
  ],
};
