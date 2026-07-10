import Image from "next/image";
import type { SocialLinkItem } from "@/types";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  item: SocialLinkItem;
  circle?: boolean;
  className?: string;
}

export function SocialLink({ item, circle = false, className }: SocialLinkProps): React.ReactElement {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.label}
      className={cn(
        "inline-flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5",
        circle
          ? "h-12 w-12 rounded-full bg-white shadow-[0_8px_24px_rgba(17,24,39,0.08)] hover:shadow-[0_10px_28px_rgba(108,41,237,0.18)]"
          : "opacity-80 hover:opacity-100",
        className,
      )}
    >
      <Image
        src={item.icon}
        alt={item.label}
        width={circle ? 20 : 20}
        height={circle ? 20 : 20}
        className={circle ? "h-5 w-5" : "h-5 w-5"}
      />
    </a>
  );
}
