import "server-only";

import type { Media } from "@/payload-types";
import { getPayloadClient } from "@/lib/payload";
import { GHANA_TZ, accraDay, isListed } from "@/lib/careers-rules";

export interface Vacancy {
  slug: string;
  title: string;
  company?: string;
  department?: string;
  location?: string;
  employmentType?: string;
  shortDescription?: string;
  /** Display string, e.g. "31 October 2026". */
  deadline?: string;
  /** YYYY-MM-DD in Ghana time. */
  deadlineDay?: string;
  publishedDate?: string;
  pdfUrl: string;
  pdfFilename: string;
  applicationEmail: string;
  featured: boolean;
}

export interface CareersContent {
  vacancies: Vacancy[];
  recruitmentEmail: string;
  heroImage?: { url: string; alt: string; width: number; height: number };
}

const formatDay = (iso: string): string =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: GHANA_TZ,
  }).format(new Date(iso));

const asMedia = (m: number | Media | null | undefined): Media | undefined =>
  m && typeof m === "object" && m.url ? m : undefined;

export async function getCareers(): Promise<CareersContent> {
  const payload = await getPayloadClient();
  const now = new Date();
  const [jobs, page] = await Promise.all([
    payload.find({
      collection: "job-openings",
      where: { status: { equals: "open" } },
      sort: ["-featured", "displayOrder", "-publishedDate"],
      depth: 1,
      limit: 100,
    }),
    payload.findGlobal({ slug: "careers", depth: 1 }),
  ]);

  const vacancies: Vacancy[] = [];
  for (const j of jobs.docs) {
    const pdf = asMedia(j.jobDescriptionPdf);
    if (!pdf?.url || !isListed(j, now)) continue;
    vacancies.push({
      slug: j.slug ?? String(j.id),
      title: j.title,
      company: j.company ?? undefined,
      department: j.department ?? undefined,
      location: j.location ?? undefined,
      employmentType: j.employmentType ?? undefined,
      shortDescription: j.shortDescription ?? undefined,
      deadline: j.applicationDeadline ? formatDay(j.applicationDeadline) : undefined,
      deadlineDay: j.applicationDeadline ? accraDay(j.applicationDeadline) : undefined,
      publishedDate: j.publishedDate ?? undefined,
      pdfUrl: pdf.url,
      pdfFilename: pdf.filename ?? `${j.title}.pdf`,
      applicationEmail: j.applicationEmail,
      featured: Boolean(j.featured),
    });
  }

  const hero = asMedia(page.heroImage);
  return {
    vacancies,
    recruitmentEmail: page.recruitmentEmail,
    heroImage:
      hero?.url && hero.width && hero.height
        ? { url: hero.url, alt: hero.alt ?? "", width: hero.width, height: hero.height }
        : undefined,
  };
}
