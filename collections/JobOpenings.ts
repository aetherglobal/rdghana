import type { CollectionConfig } from "payload";
import { accraDay } from "@/lib/careers-rules";

const revalidate = async (): Promise<void> => {
  try {
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/careers");
  } catch {}
};

const slugify = (s: string): string =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const JobOpenings: CollectionConfig = {
  slug: "job-openings",
  labels: { singular: "Job Opening", plural: "Job Openings" },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "department", "applicationDeadline", "featured"],
    listSearchableFields: ["title", "department", "location"],
    group: "Careers",
    description:
      "Vacancies shown on /careers. Only “Open” vacancies whose publication date has arrived and whose deadline has not passed (Ghana time) are listed publicly.",
  },
  hooks: {
    afterChange: [() => revalidate()],
    afterDelete: [() => revalidate()],
  },
  fields: [
    {
      name: "title",
      label: "Job Title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Generated from the job title if left blank.",
      },
      hooks: {
        beforeValidate: [({ value, data }) => value || slugify(String(data?.title ?? ""))],
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
        { label: "Archived", value: "archived" },
      ],
      admin: {
        position: "sidebar",
        description:
          "Draft: never public. Open: listed while within its dates. Closed / Archived: hidden from the site but kept here.",
      },
    },
    {
      name: "publishedDate",
      label: "Publication Date",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime", displayFormat: "d MMMM yyyy, HH:mm" },
        description: "Set a future date to schedule. Defaults to now when first opened.",
      },
      hooks: {
        beforeChange: [
          ({ value, siblingData }) =>
            value ?? (siblingData.status === "open" ? new Date().toISOString() : value),
        ],
      },
    },
    {
      name: "applicationDeadline",
      label: "Application Deadline",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" },
        description: "Listed until the end of this day, Ghana time.",
      },
      validate: (value: Date | string | null | undefined, { siblingData }: { siblingData: { status?: string } }) =>
        siblingData.status === "open" && value && accraDay(value) < accraDay(new Date())
          ? "This deadline has passed. Extend it to open (or reopen) the vacancy, or set the status to Closed."
          : true,
    },
    {
      name: "featured",
      label: "Featured Position",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Featured vacancies are listed first." },
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first. Ties are ordered by newest publication date.",
      },
    },
    {
      type: "row",
      fields: [
        { name: "company", type: "text", defaultValue: "RD Ghana Limited" },
        { name: "department", type: "text" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "location", type: "text", defaultValue: "Accra, Ghana" },
        {
          name: "employmentType",
          type: "text",
          admin: { description: "Optional, e.g. Full-time." },
        },
      ],
    },
    {
      name: "shortDescription",
      type: "textarea",
      admin: { description: "One or two sentences shown on the vacancy card." },
    },
    {
      name: "jobDescriptionPdf",
      label: "Job Description PDF",
      type: "upload",
      relationTo: "media",
      filterOptions: { mimeType: { equals: "application/pdf" } },
      validate: (value: unknown, { siblingData }: { siblingData: { status?: string } }) =>
        value || siblingData.status === "draft"
          ? true
          : "Attach the job description PDF before opening this vacancy.",
    },
    {
      name: "applicationEmail",
      type: "email",
      required: true,
      admin: {
        description: "“Apply Now” opens an email to this address with the job title as the subject.",
      },
    },
  ],
};
