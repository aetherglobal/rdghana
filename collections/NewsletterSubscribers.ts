import type { CollectionConfig } from "payload";

export const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter-subscribers",
  labels: { singular: "Subscriber", plural: "Newsletter Subscribers" },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "consent", "createdAt"],
    group: "Content",
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "consent",
      type: "checkbox",
      label: "Agreed to receive marketing communications",
      defaultValue: false,
    },
  ],
};
