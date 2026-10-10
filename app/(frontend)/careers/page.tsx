import type { Metadata } from "next";
import Image from "next/image";
import { VacancyCard } from "@/components/sections/vacancy-card";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRightIcon, MailIcon, PeopleIcon, SparkIcon, TargetIcon } from "@/components/ui/icons";
import { getCareers, type Vacancy } from "@/lib/careers";

// Hourly re-render so scheduled publication dates and deadlines take effect
// without a CMS edit; CMS edits revalidate immediately via collection hooks.
export const revalidate = 3600;

const DESCRIPTION =
  "Build the future of digital financial services in Ghana with RD Technologies. Explore open positions and apply by email.";

export const metadata: Metadata = {
  title: "Careers | RD Technologies",
  description: DESCRIPTION,
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | RD Technologies",
    description: DESCRIPTION,
    url: "/careers",
    images: [{ url: "/seo/og-image.png", alt: "RD Technologies" }],
  },
};

const THEMES = [
  {
    icon: SparkIcon,
    title: "Innovation and Growth",
    body: "Contribute to practical digital financial solutions that respond to the needs of businesses and their customers.",
  },
  {
    icon: PeopleIcon,
    title: "Collaboration and Excellence",
    body: "Work alongside professionals who value initiative, accountability, teamwork, and quality service.",
  },
  {
    icon: TargetIcon,
    title: "Meaningful Impact",
    body: "Help strengthen business connections and expand access to innovative financial services.",
  },
];

const STEPS = [
  "Explore the available positions.",
  "Open the detailed job description to review the requirements.",
  "Prepare your CV and a brief cover letter.",
  "Email your application to the address indicated in the vacancy, using the exact position title as your email subject.",
];

const PRIMARY_BUTTON =
  "inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-h6 text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function jobPostingJsonLd(vacancies: Vacancy[]): string | null {
  const postings = vacancies
    .filter((v) => v.shortDescription && v.publishedDate && v.location)
    .map((v) => {
      const parts = (v.location ?? "").split(",").map((s) => s.trim());
      return {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: v.title,
        description: v.shortDescription,
        datePosted: v.publishedDate,
        ...(v.deadlineDay ? { validThrough: `${v.deadlineDay}T23:59:59+00:00` } : {}),
        hiringOrganization: { "@type": "Organization", name: v.company ?? "RD Technologies" },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: parts[0],
            ...(parts.length > 1 ? { addressCountry: parts[parts.length - 1] } : {}),
          },
        },
        directApply: false,
      };
    });
  return postings.length ? JSON.stringify(postings).replace(/</g, "\\u003c") : null;
}

export default async function CareersPage(): Promise<React.ReactElement> {
  const { vacancies, recruitmentEmail, heroImage } = await getCareers();
  const jsonLd = jobPostingJsonLd(vacancies);

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      ) : null}

      {/* A — Hero */}
      <section
        className="relative -mt-[72px] overflow-hidden pt-[72px] xl:-mt-[140px] xl:pt-[140px]"
        style={{
          background: "radial-gradient(120% 90% at 60% 0%, #eef2fb 0%, #f7f9fd 45%, #fff 80%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-24 h-[560px] w-[560px] rounded-full border border-[#dbe6fb]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-8 h-[360px] w-[360px] rounded-full border border-[#e4ecfb]"
        />
        <div className="module-wrapper relative grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div className="max-w-[640px]">
            <p className="text-h6 text-primary md:text-h5">Careers at RD Technologies</p>
            <h1 className="primary-text module-title mt-3">Build the Future With Us</h1>
            <p className="mt-4 text-h4 text-ink md:text-h3">Your Talent. Our Possibilities.</p>
            <div className="mt-6 space-y-4 text-p2 text-muted-2 md:text-p1">
              <p>
                At RD Technologies, we believe meaningful innovation begins with talented people. We
                are building a team of professionals passionate about technology, financial
                services, and creating solutions that help businesses grow and connect across
                markets.
              </p>
              <p>
                Join us as we shape the future of digital financial services in Ghana and beyond.
              </p>
            </div>
            <a href="#open-positions" className={`${PRIMARY_BUTTON} mt-8`}>
              Explore Open Positions
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </div>

          {heroImage ? (
            <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-[36px] bg-gradient-primary opacity-20 blur-2xl"
              />
              <Image
                src={heroImage.url}
                alt={heroImage.alt}
                width={heroImage.width}
                height={heroImage.height}
                priority
                sizes="(min-width:1024px) 45vw, 100vw"
                className="relative aspect-[4/3] w-full rounded-[30px] object-cover shadow-[0_30px_60px_rgba(17,24,39,0.15)]"
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* B — Working at RD Technologies */}
      <section className="module-wrapper py-16 md:py-24">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <h2 className="module-title text-ink">Where Talent Meets Opportunity</h2>
          <div className="mt-5 space-y-4 text-p2 text-muted-2 md:text-p1">
            <p>
              We bring together commercial expertise, technological innovation, and a commitment to
              excellent service.
            </p>
            <p>
              Whether your strengths lie in strategic partnerships, client relations, operations, or
              technology, RD Technologies offers an opportunity to contribute to a growing business
              serving an evolving digital economy.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {THEMES.map(({ icon: Icon, title, body }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={(i + 1) as 1 | 2 | 3}
              className="rounded-[28px] border border-[#c9d6ff] p-7 backdrop-blur-xl md:p-8"
              style={{ background: "var(--gradient-soft-card-2)" }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-white">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-h4 text-ink">{title}</h3>
              <p className="mt-2 text-p2 text-muted-2">{body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* C — Current opportunities */}
      <section id="open-positions" className="scroll-mt-24 bg-surface py-16 md:py-24 xl:scroll-mt-36">
        <div className="module-wrapper">
          <Reveal className="max-w-[760px]">
            <h2 className="primary-text module-title">Explore Open Positions</h2>
            <p className="mt-4 text-p2 text-muted-2 md:text-p1">
              Discover opportunities to apply your experience, develop your professional
              capabilities, and contribute to the growth of RD Technologies.
            </p>
          </Reveal>

          {vacancies.length ? (
            <ul className="mt-10 grid gap-6 lg:grid-cols-2">
              {vacancies.map((v) => (
                <li key={v.slug}>
                  <VacancyCard vacancy={v} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 rounded-3xl border border-[#e4ebf7] bg-white px-6 py-14 text-center md:px-16">
              <h3 className="text-h3 text-ink">No Current Openings</h3>
              <p className="mx-auto mt-3 max-w-[560px] text-p2 text-muted-2">
                Thank you for your interest in joining RD Technologies. We do not have any open
                positions at the moment. Please check this page again for future opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* D — How to apply */}
      <section className="module-wrapper py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2 className="module-title text-ink">Take the Next Step</h2>
            <p className="mt-4 text-p2 text-muted-2 md:text-p1">
              Interested in joining our team? Review our current opportunities and submit your
              application in a few simple steps.
            </p>
            <div className="mt-8 rounded-3xl bg-surface p-6">
              <p className="text-p3 text-muted-2">General recruitment email</p>
              <p className="mt-1 break-all text-h5 text-ink">{recruitmentEmail}</p>
              <a href={`mailto:${recruitmentEmail}`} className={`${PRIMARY_BUTTON} mt-5`}>
                <MailIcon className="h-5 w-5" />
                Email Your Application
              </a>
            </div>
          </Reveal>

          <Reveal delay={1} as="ol" className="space-y-4">
            {STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-5 rounded-3xl border border-[#e4ebf7] bg-white p-5 md:p-6"
              >
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-h6 text-white"
                >
                  {i + 1}
                </span>
                <p className="pt-2 text-p2 text-ink">{step}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* E — Closing call to action */}
      <section className="module-wrapper pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-[30px] bg-gradient-primary px-8 py-14 md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-24 h-[420px] w-[420px] rounded-full border border-white/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-24 top-10 h-[300px] w-[300px] rounded-full border border-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-48 h-[320px] w-[320px] rounded-full border border-white/10"
          />
          <div className="relative z-[1] max-w-[640px]">
            <h2 className="text-[2.25rem] font-bold leading-tight text-white md:text-[3rem]">
              Your Next Opportunity Starts Here
            </h2>
            <div className="mt-4 space-y-3 text-p1 text-white/90">
              <p>
                We welcome talented professionals who share our commitment to innovation,
                collaboration, and delivering meaningful business solutions.
              </p>
              <p>
                Explore our opportunities and discover how you can contribute to our growing team.
              </p>
            </div>
            <a
              href="#open-positions"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-h6 text-primary transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View Open Positions
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
