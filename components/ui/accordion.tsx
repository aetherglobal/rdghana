"use client";

import { useState, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpen?: number;
  className?: string;
}

export function Accordion({ items, defaultOpen = 0, className }: AccordionProps): React.ReactElement {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-2xl transition-colors",
              isOpen ? "bg-white shadow-[0_20px_50px_rgba(17,24,39,0.08)]" : "bg-surface",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8"
            >
              <span
                className={cn(
                  "text-base font-bold md:text-lg",
                  isOpen ? "text-primary" : "text-ink",
                )}
              >
                {item.question}
              </span>
              <ChevronDownIcon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-300",
                  isOpen ? "rotate-180 text-primary" : "text-ink",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0">
                <div className="px-6 pb-6 text-sm leading-7 text-ink/90 md:px-8 md:text-base">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
