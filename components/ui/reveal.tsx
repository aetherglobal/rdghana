"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: 1 | 2 | 3 | 4;
}

export function Reveal({
  children,
  as: Tag = "div",
  className,
  style,
  delay,
}: RevealProps): React.ReactElement {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      style={style}
      className={cn(
        "reveal",
        delay && `reveal-delay-${delay}`,
        inView && "is-visible",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
