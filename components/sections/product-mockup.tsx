import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface ProductMockupProps {
	imageSide: "left" | "right";
	image: string;
	imageAlt: string;
	heading: string;
	description: string;
}

const FEATURE_ICON_SHADOW =
	"drop-shadow(7.28092px 7.28092px 12.1349px hsla(45,6%,58%,.15)) drop-shadow(12.1349px 21.8427px 29.1237px hsla(32,8%,58%,.2))";

export function ProductMockup({
	imageSide,
	image,
	imageAlt,
	heading,
	description,
}: ProductMockupProps): React.ReactElement {
	return (
		<div className="module-wrapper pt-20 lg:pt-0">
			<div
				className={cn(
					"flex flex-col gap-10 md:items-center",
					imageSide === "left" ? "md:flex-row" : "md:flex-row-reverse",
				)}
			>
				<Reveal className="md:basis-1/2">
					<Image
						src={image}
						alt={imageAlt}
						width={960}
						height={1920}
						className="mx-auto w-full max-w-[300px] md:max-w-[400px]"
						style={{ filter: FEATURE_ICON_SHADOW }}
					/>
				</Reveal>

				<Reveal
					delay={1}
					className="flex flex-col gap-4 text-center text-black md:basis-1/2 md:text-left lg:max-w-[400px] lg:gap-6"
				>
					<h4 className="text-h3 md:text-h2 lg:text-h1">{heading}</h4>
					<div className="text-p3 md:text-p2 lg:text-p1">
						<p>{description}</p>
					</div>
				</Reveal>
			</div>
		</div>
	);
}
