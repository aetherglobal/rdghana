import type { OfficeLocation } from "@/types";
import { PinIcon } from "@/components/ui/icons";

interface OfficeCardProps {
  office: OfficeLocation;
}

export function OfficeCard({ office }: OfficeCardProps): React.ReactElement {
  return (
    <div className="min-h-[260px] rounded-[20px] bg-white px-7 py-8 shadow-[0_20px_50px_rgba(17,24,39,0.08)] md:min-h-[300px] md:px-9">
      <h3 className="text-gradient-primary w-fit text-h4 font-bold xl:text-h3">{office.name}</h3>
      <div className="mt-5 flex items-start gap-3">
        <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
        <p className="text-h6 text-ink">{office.address}</p>
      </div>
    </div>
  );
}
