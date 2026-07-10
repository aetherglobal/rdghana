import { GlobeIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps): React.ReactElement {
  return (
    <button
      type="button"
      aria-label="Switch language"
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-primary",
        className,
      )}
    >
      <GlobeIcon className="h-[18px] w-[18px]" />
      <span>中文</span>
    </button>
  );
}
