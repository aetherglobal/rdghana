import Image from "next/image";
import type { License } from "@/types";
import { Reveal } from "@/components/ui/reveal";

function LicenseCard({ license }: { license: License }): React.ReactElement {
	return (
		<div className="flex basis-1/3 flex-col items-center justify-center rounded border-2 border-[#f0f2f5] p-6">
			<Image
				src="/images/company/license-icon.svg"
				alt=""
				aria-hidden
				width={24}
				height={24}
				className="h-6 w-6 rounded-[15px]"
			/>
			<div className="mt-4 text-center text-h7">
				{license.title}
				{license.subtitle ? ` - ${license.subtitle}` : ""}
			</div>
		</div>
	);
}

export function LicenseBadges({ licenses }: { licenses: License[] }): React.ReactElement {
	return (
		<div
			id="our-company-licenses"
			className="module-wrapper pt-20 md:pt-10 lg:pt-0 lg:pb-20 min-[1440px]:pt-10"
		>
			<Reveal>
				<div className="primary-text mx-auto text-center text-h2 md:text-h1">Our Licenses</div>
			</Reveal>

			<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
				{licenses.map((license, i) => (
					<Reveal key={license.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
						<LicenseCard license={license} />
					</Reveal>
				))}
			</div>
		</div>
	);
}
