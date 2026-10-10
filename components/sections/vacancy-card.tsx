import type { Vacancy } from "@/lib/careers";
import {
  BriefcaseIcon,
  CalendarIcon,
  DocumentIcon,
  DownloadIcon,
  MailIcon,
  PinIcon,
} from "@/components/ui/icons";

interface VacancyCardProps {
  vacancy: Vacancy;
}

export function VacancyCard({ vacancy: v }: VacancyCardProps): React.ReactElement {
  const applyHref = `mailto:${v.applicationEmail}?subject=${encodeURIComponent(v.title)}`;
  const meta = [
    { icon: BriefcaseIcon, label: "Department", value: v.department },
    { icon: PinIcon, label: "Location", value: v.location },
    { icon: CalendarIcon, label: "Application deadline", value: v.deadline },
  ];

  return (
    <article className="flex h-full flex-col rounded-3xl border border-[#e4ebf7] bg-white p-6 shadow-[0_20px_50px_rgba(17,24,39,0.06)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(108,41,237,0.12)] md:p-8">
      <div className="flex flex-wrap items-center gap-2 text-p4 font-medium">
        {v.featured ? (
          <span className="rounded-full bg-gradient-primary px-3 py-1 text-white">Featured</span>
        ) : null}
        {v.company ? <span className="text-muted-2">{v.company}</span> : null}
        {v.employmentType ? (
          <span className="rounded-full bg-surface-2 px-3 py-1 text-ink">{v.employmentType}</span>
        ) : null}
      </div>

      <h3 className="mt-3 text-h4 text-ink lg:text-h3">
        <a
          href={v.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {v.title}
          <span className="sr-only"> (job description PDF, opens in a new tab)</span>
        </a>
      </h3>

      <dl className="mt-5 grid gap-3 text-p3 text-ink sm:grid-cols-2">
        {meta.map(({ icon: Icon, label, value }) =>
          value ? (
            <div key={label} className="flex items-start gap-2.5">
              <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-primary" />
              <div>
                <dt className="text-p5 text-muted-2">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            </div>
          ) : null,
        )}
      </dl>

      {v.shortDescription ? (
        <p className="mt-5 text-p2 text-muted-2">{v.shortDescription}</p>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
        <a
          href={applyHref}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-h6 text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <MailIcon className="h-[18px] w-[18px]" />
          Apply Now
          <span className="sr-only"> for {v.title} by email</span>
        </a>
        <a
          href={v.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-h6 text-primary transition-colors hover:border-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <DocumentIcon className="h-[18px] w-[18px]" />
          View Job Description
          <span className="sr-only"> for {v.title} (PDF, opens in a new tab)</span>
        </a>
        <a
          href={v.pdfUrl}
          download={v.pdfFilename}
          className="inline-flex items-center gap-1.5 rounded px-2 py-3 text-p3 font-medium text-muted-2 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <DownloadIcon className="h-4 w-4" />
          Download PDF
          <span className="sr-only"> for {v.title}</span>
        </a>
      </div>
    </article>
  );
}
