/**
 * One-off, idempotent: uploads the initial job-description PDFs, creates the two
 * initial vacancies, and adds Careers to the header + footer navigation.
 *
 *   NODE_ENV=production bun run scripts/seed-careers.ts <dir-containing-the-pdfs>
 *
 * NODE_ENV=production keeps Drizzle push off so migrate-managed databases are untouched.
 */
import path from "path";
import config from "@payload-config";
import { getPayload } from "payload";

const dir = process.argv[2];
if (!dir) throw new Error("Usage: bun run scripts/seed-careers.ts <pdf-dir>");

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

const payload = await getPayload({ config });

for (const v of VACANCIES) {
  const existing = await payload.find({
    collection: "job-openings",
    where: { title: { equals: v.title } },
    limit: 1,
  });
  if (existing.docs.length) {
    console.log(`skip (exists): ${v.title}`);
    continue;
  }
  const media = await payload.create({
    collection: "media",
    data: { alt: `${v.title} job description` },
    filePath: path.resolve(dir, v.pdf),
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
  });
  console.log(`created: ${v.title} (${media.filename})`);
}

const s = await payload.findGlobal({ slug: "site-settings", depth: 0 });
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
await payload.updateGlobal({ slug: "site-settings", data: { navDropdowns, footerColumns } });
console.log("navigation updated");

process.exit(0);
