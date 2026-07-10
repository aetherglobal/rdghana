import Image from "next/image";
import type { BoardMember } from "@/types";
import { Reveal } from "@/components/ui/reveal";

const MEMBER_OVERLAY_BG =
	"radial-gradient(151.07% 126.85% at 27.29% 107.91%, rgba(60,60,60,.8) 14.16%, rgba(60,60,60,0) 65.82%, rgba(60,60,60,0) 100%)";

function BoardCard({ member }: { member: BoardMember }): React.ReactElement {
	return (
		<div className="group relative mx-auto h-[400px] w-full max-w-[360px] overflow-hidden rounded-[15px] lg:h-[460px] xl:h-[520px] xl:max-w-[500px] min-[1440px]:h-[550px]">
			<Image
				src={member.photo}
				alt={member.name}
				fill
				sizes="(min-width: 1024px) 500px, (min-width: 768px) 50vw, 100vw"
				className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out will-change-transform group-hover:scale-105"
			/>
			<div
				className="pointer-events-none absolute inset-0 rounded-[15px]"
				style={{ backgroundImage: MEMBER_OVERLAY_BG }}
			/>
			<div
				className="absolute inset-0 bg-cover bg-center opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-20"
				style={{
					backgroundImage: "url('/images/decorations/company-gradient-overlay.svg')",
				}}
			/>
			<div
				className="absolute bottom-0 left-0 flex w-full flex-col overflow-hidden px-5 py-[30px] md:h-full md:pt-[180px] lg:pt-[220px] xl:pt-[280px] min-[1440px]:px-[30px] min-[1440px]:pt-[350px]"
				style={{ backgroundImage: MEMBER_OVERLAY_BG }}
			>
				<div className="mt-auto min-h-[120px] text-white transition-transform duration-500 ease-in-out">
					<p className="text-h3 lg:text-h2">{member.name}</p>
					{member.role ? <p className="mt-2 text-h6 lg:text-h4">{member.role}</p> : null}
				</div>
			</div>
		</div>
	);
}

export function BoardMembers({
	members,
	founder,
}: {
	members: BoardMember[];
	founder: BoardMember;
}): React.ReactElement {
	const [chairman, ...rest] = members;

	return (
		<div className="module-wrapper pt-[100px]">
			<div className="mx-auto w-full xl:w-10/12">
				<div id="our-board-members">
					<Reveal>
						<div className="text-h5 md:text-h3 lg:text-h2 pt-10 md:pt-[50px]">
							<div className="flex items-center justify-center">
								<div>Our&nbsp;</div>
								<div className="primary-text">Board Members</div>
							</div>
						</div>
					</Reveal>

					{chairman ? (
						<div className="mt-10 flex flex-wrap justify-center gap-[20px] lg:flex-nowrap">
							<Reveal delay={1} className="w-full flex-shrink-0 md:w-[calc(50%-10px)] lg:flex-1">
								<BoardCard member={chairman} />
							</Reveal>
						</div>
					) : null}

					<div className="mt-10 flex flex-wrap justify-center gap-[20px] lg:flex-nowrap">
						{rest.map((member, i) => (
							<Reveal
								key={member.name}
								delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
								className="w-full flex-shrink-0 md:w-[calc(50%-10px)] lg:flex-1"
							>
								<BoardCard member={member} />
							</Reveal>
						))}
					</div>

					<Reveal>
						<div className="text-h5 md:text-h3 lg:text-h2 pt-10 md:pt-[50px]">
							<div className="flex items-center justify-center">
								<div>&nbsp;</div>
								<div className="primary-text">Founder and Senior Advisor</div>
							</div>
						</div>
					</Reveal>

					<div className="mt-10 flex flex-wrap justify-center gap-[20px] lg:flex-nowrap">
						<Reveal delay={1} className="w-full flex-shrink-0 md:w-[calc(50%-10px)] lg:flex-1">
							<BoardCard member={founder} />
						</Reveal>
					</div>
				</div>
			</div>
		</div>
	);
}
