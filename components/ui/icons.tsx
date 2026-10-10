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

function StrokeIcon({ d, ...props }: SVGProps<SVGSVGElement> & { d: string }): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" aria-hidden {...props}>
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <StrokeIcon
      d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"
      {...props}
    />
  );
}

export function PeopleIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <StrokeIcon
      d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20c.6-3.3 3.2-5.5 6.5-5.5s5.9 2.2 6.5 5.5M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.8c1.9.8 3.1 2.6 3.5 5.2"
      {...props}
    />
  );
}

export function TargetIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <StrokeIcon
      d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18ZM12 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9ZM12 12l7-7M16 5h3v3"
      {...props}
    />
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <StrokeIcon
      d="M4 5.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1ZM3.5 6.5l8.5 6.5 8.5-6.5"
      {...props}
    />
  );
}

export function DocumentIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <StrokeIcon
      d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5L14 3ZM14 3v4.5h4.5M9 12.5h6M9 16h6"
      {...props}
    />
  );
}

export function DownloadIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return <StrokeIcon d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" {...props} />;
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <StrokeIcon
      d="M5 5.5h14a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1ZM4 10h16M8 3.5v4M16 3.5v4"
      {...props}
    />
  );
}

export function BriefcaseIcon(props: SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <StrokeIcon
      d="M4 7.5h16a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1ZM9 7.5V5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12.5h18"
      {...props}
    />
  );
}
