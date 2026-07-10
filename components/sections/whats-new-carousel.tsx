"use client";

import { useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import type { Article } from "@/types";
import { cn } from "@/lib/utils";

interface WhatsNewCarouselProps {
  items: Article[];
}

export function WhatsNewCarousel({ items }: WhatsNewCarouselProps): React.ReactElement {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!emblaApi) return () => {};
      emblaApi.on("select", onStoreChange);
      emblaApi.on("reInit", onStoreChange);
      return () => {
        emblaApi.off("select", onStoreChange);
        emblaApi.off("reInit", onStoreChange);
      };
    },
    [emblaApi],
  );

  const selected = useSyncExternalStore(
    subscribe,
    () => (emblaApi ? emblaApi.selectedScrollSnap() : 0),
    () => 0,
  );
  const snapCount = useSyncExternalStore(
    subscribe,
    () => (emblaApi ? emblaApi.scrollSnapList().length : 0),
    () => 0,
  );

  return (
    <div className="module-wrapper relative py-5">
      <Image
        src="/images/decorations/deco.svg"
        alt=""
        width={1200}
        height={800}
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[125%] max-w-none md:block"
      />

      <div className="relative z-10">
        <h2 className="mx-auto primary-text text-center text-h3 md:text-h2 lg:text-title">
          What&apos;s New
        </h2>

        <div className="overflow-hidden pb-12 pt-12 lg:pt-[55px]" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {items.map((item) => (
              <div
                key={item.slug}
                className="min-w-0 shrink-0 grow-0 basis-full px-3 md:basis-1/2 lg:basis-1/3"
              >
                <div className="group flex h-full w-full flex-col gap-4 transition duration-300 ease-linear">
                  <Link href={`/news/blogs/${encodeURIComponent(item.slug)}/`}>
                    {item.cover ? (
                      <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-[30px] bg-surface duration-300 lg:group-hover:-translate-y-3 lg:group-hover:drop-shadow-xl">
                        <Image
                          src={item.cover}
                          alt={item.title}
                          fill
                          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <h3 className="mt-4 line-clamp-2 text-h5 font-bold text-ink lg:text-2xl lg:group-hover:text-primary">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="text-p3 font-semibold text-ink">{item.date}</div>
                  <div className="text-p4 text-[#808080] lg:text-base">{item.excerpt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2.5">
          {Array.from({ length: snapCount }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === selected ? "w-6 bg-primary" : "w-2.5 bg-surface-2 hover:bg-muted/50",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
