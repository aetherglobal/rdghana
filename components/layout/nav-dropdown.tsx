import Link from "next/link";
import type { NavDropdown as NavDropdownData, NavLink } from "@/types";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/ui/icons";

interface NavDropdownProps {
  item: NavDropdownData;
}

const rowClass =
  "group/item flex w-full items-center justify-between gap-8 rounded-2xl px-5 py-3.5 transition-colors duration-200 hover:bg-gradient-primary";

function DropdownRow({ link }: { link: NavLink }): React.ReactElement {
  return (
    <>
      <span className="flex flex-col">
        <span className="text-[17px] font-bold leading-tight text-ink transition-colors group-hover/item:text-white">
          {link.label}
        </span>
        {link.description ? (
          <span className="mt-1 text-[13px] font-normal text-muted transition-colors group-hover/item:text-white/85">
            {link.description}
          </span>
        ) : null}
      </span>
      <ArrowRightIcon className="h-5 w-5 shrink-0 text-ink transition-colors group-hover/item:text-white" />
    </>
  );
}

export function NavDropdown({ item }: NavDropdownProps): React.ReactElement {
  return (
    <div className="group relative">
      <Link
        href={item.href}
        className="flex items-center gap-1 py-2 text-h6 text-ink transition-colors group-hover:text-primary"
      >
        {item.label}
        <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
      </Link>

      <div className="invisible absolute left-0 top-full z-50 min-w-[340px] translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex flex-col gap-1 rounded-[30px] border border-[#f0f2f5] bg-white p-3 shadow-2xl">
          {item.links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClass}
              >
                <DropdownRow link={link} />
              </a>
            ) : (
              <Link key={link.label} href={link.href} className={rowClass}>
                <DropdownRow link={link} />
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
