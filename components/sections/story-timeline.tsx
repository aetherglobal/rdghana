import Image from "next/image";
import Link from "next/link";
import type { TimelineEntry } from "@/types";
import { Reveal } from "@/components/ui/reveal";

function TimelineItem({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}): React.ReactElement {
  return (
    <Reveal
      delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
      className="relative md:grid md:grid-cols-2 md:items-center md:gap-x-16"
    >
      <span className="absolute left-0 top-4 z-10 h-3.5 w-3.5 -translate-x-[6px] rounded-full bg-gradient-primary ring-4 ring-white md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2" />

      {entry.image ? (
        <div className="mb-4 hidden md:col-start-1 md:mb-0 md:flex md:justify-end md:pr-6">
          <Image
            src={entry.image}
            alt={entry.title}
            width={720}
            height={440}
            className="h-auto w-full max-w-[320px] rounded-2xl object-cover"
          />
        </div>
      ) : null}

      <div className="pl-8 md:col-start-2 md:pl-6">
        <div className="rounded-2xl border border-[#f0f2f5] bg-white p-6 shadow-[0_12px_36px_rgba(17,24,39,0.06)]">
          <p className="text-lg font-bold text-primary md:text-xl">{entry.title}</p>
          {entry.description ? (
            <p className="mt-2 text-base leading-7 text-ink">{entry.description}</p>
          ) : null}
        </div>
        {entry.image ? (
          <div className="mt-4 overflow-hidden rounded-2xl md:hidden">
            <Image
              src={entry.image}
              alt={entry.title}
              width={720}
              height={440}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

export function StoryTimeline({ timeline }: { timeline: TimelineEntry[] }): React.ReactElement {
  return (
    <section id="timeline" className="py-16 md:py-24">
      <div className="module-wrapper">
        <Reveal>
          <h2 className="text-gradient-primary text-center text-h3 md:text-h2 lg:text-h1">
            Our Story
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-[1000px]">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-cyan via-primary to-primary md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-16">
            {timeline.map((entry, i) => (
              <TimelineItem key={entry.title} entry={entry} index={i} />
            ))}
          </div>
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-4 text-center">
          <Link
            href="#"
            className="bg-gradient-primary gradient-primary-hover inline-flex items-center rounded-full px-8 py-3 text-sm font-semibold text-white transition-[background-image]"
          >
            Learn more
          </Link>
          <p className="text-sm text-muted">Learn more about our latest developments</p>
        </Reveal>
      </div>
    </section>
  );
}
