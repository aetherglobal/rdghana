import type { GlobalConfig } from "payload";

export const Company: GlobalConfig = {
  slug: "company",
  access: { read: () => true },
  admin: { group: "Site" },
  fields: [
    {
      name: "licenses",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "subtitle", type: "text", required: true },
      ],
    },
    {
      name: "timeline",
      type: "array",
      labels: { singular: "Timeline entry", plural: "Timeline entries" },
      fields: [
        {
          name: "side",
          type: "select",
          required: true,
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
          ],
        },
        { name: "year", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "management",
      type: "array",
      labels: { singular: "Team member", plural: "Management team" },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text", required: true },
        { name: "photo", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "board",
      type: "array",
      labels: { singular: "Board member", plural: "Board members" },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text" },
        { name: "photo", type: "upload", relationTo: "media" },
        { name: "featured", type: "checkbox" },
      ],
    },
    {
      name: "founder",
      type: "group",
      fields: [
        { name: "name", type: "text" },
        { name: "role", type: "text" },
        { name: "photo", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
