import Image from "next/image";
import type { TeamMember } from "@/types";
import { Reveal } from "@/components/ui/reveal";

const MEMBER_PLACEHOLDER_BG =
	"radial-gradient(139.86% 139.86% at 0 100%, #b0b0b0 8.98%, #f9f9f9 79.99%, #fff 100%)";

function MemberCard({ member }: { member: TeamMember }): React.ReactElement {
	return (
		<div>
			<Image
				src={member.photo}
				alt={member.name}
				width={480}
				height={480}
				className="aspect-square w-full rounded-[15px] object-cover"
				style={{ backgroundImage: MEMBER_PLACEHOLDER_BG }}
			/>
			<div className="mt-4 text-h6 md:text-h4">{member.name}</div>
			<div className="mt-1 text-p2 md:text-p1">{member.role}</div>
		</div>
	);
}

export function ManagementTeam({ members }: { members: TeamMember[] }): React.ReactElement {
	return (
		<div id="team" className="module-wrapper pt-[100px]">
			<div className="mx-auto w-full xl:w-10/12">
				<Reveal>
					<h2 className="text-center text-h3 md:text-h2 lg:text-h1 min-[1440px]:text-[2.5rem]!">Our Team</h2>
					<div className="mt-8 text-center text-p3 md:mt-10 md:text-p2 lg:text-p1">
						<p>
							The management team members are generally with more than 20 years working
							experience gained from financial services and technology industries.
						</p>
					</div>
				</Reveal>

				<div id="our-management-team" className="pt-10 md:pt-[50px]">
					<Reveal delay={1}>
						<div className="text-h5 md:text-h3 lg:text-h2">
							<div className="flex items-center justify-center">
								<div>Our&nbsp;</div>
								<div className="primary-text">Management Team</div>
							</div>
						</div>
					</Reveal>

					<div className="mt-10 flex flex-wrap items-start justify-center gap-5">
						{members.map((member, i) => (
							<Reveal
								key={member.name}
								delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
								className="basis-[calc((100%-20px)/2)] md:basis-[calc((100%-40px)/3)] lg:basis-[calc((100%-60px)/4)]"
							>
								<MemberCard member={member} />
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
