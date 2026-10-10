import path from "path";
import { fileURLToPath } from "url";
import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

const assets = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "assets");

const EMAIL = "rdghana@aetherstrategies.io";
const VACANCIES = [
  {
    title: "Partnership Manager",
    department: "Business Development & Partnerships",
    shortDescription:
      "Lead business development and strategic partnerships, identify corporate opportunities, coordinate commercial negotiations, and support the expansion of RD Ghana Limited’s corporate client network.",
    pdf: "PartnershipManager_RDGhana_JD.pdf",
    displayOrder: 1,
  },
  {
    title: "Sales, Service and Administration Officer",
    department: "Sales, Client Services & Administration",
    shortDescription:
      "Support office administration, client enquiries, onboarding coordination, sales activities, and routine financial administration to ensure efficient business operations.",
    pdf: "Sales_Service_Admin_RDGhana_JD.pdf",
    displayOrder: 2,
  },
];

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const v of VACANCIES) {
    const existing = await payload.find({
      collection: "job-openings",
      where: { title: { equals: v.title } },
      limit: 1,
      req,
    });
    if (existing.docs.length) continue;
    const media = await payload.create({
      collection: "media",
      data: { alt: `${v.title} job description` },
      filePath: path.join(assets, v.pdf),
      req,
    });
    await payload.create({
      collection: "job-openings",
      data: {
        title: v.title,
        status: "open",
        company: "RD Ghana Limited",
        location: "Accra, Ghana",
        department: v.department,
        shortDescription: v.shortDescription,
        applicationDeadline: "2026-10-31T12:00:00.000Z",
        applicationEmail: EMAIL,
        displayOrder: v.displayOrder,
        jobDescriptionPdf: media.id,
      },
      req,
    });
  }

  const s = await payload.findGlobal({ slug: "site-settings", depth: 0, req });
  const navDropdowns = (s.navDropdowns ?? []).map((d) =>
    d.label === "Company" && !(d.links ?? []).some((l) => l.href.startsWith("/careers"))
      ? { ...d, links: [...(d.links ?? []), { label: "Careers", href: "/careers", external: false }] }
      : d,
  );
  const footerColumns = (s.footerColumns ?? []).map((c) => ({
    ...c,
    links: (c.links ?? []).map((l) =>
      l.href.startsWith("/company/careers") ? { ...l, href: "/careers" } : l,
    ),
  }));
  await payload.updateGlobal({ slug: "site-settings", data: { navDropdowns, footerColumns }, req });
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({
    collection: "job-openings",
    where: { title: { in: VACANCIES.map((v) => v.title) } },
    req,
  });
}
