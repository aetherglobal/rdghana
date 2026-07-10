import type { SVGProps } from "react";

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="1em" height="1em" aria-hidden {...props}>
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="1em" height="1em" aria-hidden {...props}>
      <path
        d="M4 10h11M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" aria-hidden {...props}>
      <path
        d="M12 22s7-5.686 7-12a7 7 0 1 0-14 0c0 6.314 7 12 7 12Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M12 22s7-5.686 7-12a7 7 0 1 0-14 0c0 6.314 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="1em" height="1em" aria-hidden {...props}>
      <path
        d="m5 10.5 3.2 3.2L15 6.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinkedInGlyph(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden {...props}>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.4h3.1V21H3.4V8.4Zm5.06 0h2.97v1.72h.04c.41-.78 1.42-1.6 2.93-1.6 3.13 0 3.71 2.06 3.71 4.74V21h-3.1v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94V21h-3.1V8.4Z" />
    </svg>
  );
}

export function FacebookGlyph(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.53-1.5H17V3.6c-.28-.04-1.26-.12-2.4-.12-2.37 0-4 1.45-4 4.1v2.3H8v3.1h2.6V21h2.9Z" />
    </svg>
  );
}

export function GlobeIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
