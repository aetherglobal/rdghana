"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

interface JobOpening {
	title: string;
	team: string;
	location: string;
	postDate: string;
	href: string;
}

const OPENINGS: readonly JobOpening[] = [
	{
		title: "SVP,Head of Stablecoin Technology",
		team: "Technology",
		location: "Shenzhen",
		postDate: "9 October 2025",
		href: "/company/careers/SVP_Head%20of%20Stablecoin%20Technology_SZ/",
	},
	{
		title: "Backstage Development _ Engineer (Blockchain)",
		team: "Technology",
		location: "Shenzhen",
		postDate: "15 May 2025",
		href: "/company/careers/SZ_Backstage%20Development%20_%20Engineer%20(Blockchain%20Direction)/",
	},
	{
		title: "Backstage Development _ Engineer (Payment Direction)",
		team: "Technology",
		location: "Shenzhen",
		postDate: "15 May 2025",
		href: "/company/careers/SZ_Backstage%20Development%20_%20Engineer%20(Payment%20Direction)/",
	},
	{
		title: "Test Engineer",
		team: "Technology",
		location: "Shenzhen",
		postDate: "15 May 2025",
		href: "/company/careers/SZ_Test_%20Engineer/",
	},
	{
		title: "Manager, Operations (TM/EDD/AML/L2)",
		team: "Operations",
		location: "Hong Kong",
		postDate: "13 March 2025",
		href: "/company/careers/Operations_HK/",
	},
	{
		title: "Senior Manager, Risk Management (Tech Risk focus)",
		team: "Risk Management",
		location: "Hong Kong",
		postDate: "13 March 2025",
		href: "/company/careers/Risk%20Mgr_HK/",
	},
	{
		title: "AI Application Development_Senior Engineer (Financial/Payment Direction)",
		team: "Technology",
		location: "Shenzhen",
		postDate: "11 March 2025",
		href: "/company/careers/SZ_AI_Application_Development_Senior_Engineer_Finnancial_Payment_Direction_On/",
	},
];

const COLS = "md:grid md:grid-cols-[minmax(0,2.3fr)_1fr_1fr_1.1fr_auto] md:items-center md:gap-4";

export function CareersListing(): React.ReactElement {
	const [query, setQuery] = useState("");
	const q = query.trim().toLowerCase();

	const jobs = useMemo(
		() =>
			q
				? OPENINGS.filter((j) =>
						(j.title + " " + j.team + " " + j.location).toLowerCase().includes(q),
					)
				: OPENINGS,
		[q],
	);

	return (
		<div className="module-wrapper relative z-[1]">
			<div className="flex items-center gap-2 rounded-full bg-surface p-2 shadow-[0_16px_40px_rgba(17,24,39,0.06)] md:max-w-[720px]">
				<input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Enter Job title or keywords"
					aria-label="Search job openings"
					className="min-w-0 flex-1 bg-transparent px-5 text-p2 text-ink outline-none placeholder:text-muted"
				/>
				<button
					type="button"
					className="shrink-0 rounded-full bg-gradient-primary px-6 py-3 text-h6 text-white transition-opacity hover:opacity-90 md:px-10"
				>
					Search
				</button>
			</div>

			<div className="mt-10 rounded-3xl bg-white p-5 shadow-[0_20px_50px_rgba(17,24,39,0.08)] md:p-8">
				<div className={`${COLS} hidden border-b border-black/10 pb-4 text-p3 text-muted`}>
					<span>Position</span>
					<span>Team</span>
					<span>Location</span>
					<span>Post Date</span>
					<span />
				</div>

				<ul>
					{jobs.map((job) => (
						<li
							key={job.title}
							className={`${COLS} space-y-3 border-b border-black/10 py-6 last:border-b-0 md:space-y-0`}
						>
							<p className="text-h6 text-ink">{job.title}</p>
							<p className="text-p2 text-ink">
								<span className="text-muted md:hidden">Team </span>
								{job.team}
							</p>
							<p className="text-p2 text-ink">
								<span className="text-muted md:hidden">Location </span>
								{job.location}
							</p>
							<p className="text-p2 text-ink">
								<span className="text-muted md:hidden">Post Date </span>
								{job.postDate}
							</p>
							<Link
								href={job.href}
								className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-gradient-primary px-8 py-2.5 text-h6 text-white transition-opacity hover:opacity-90 md:mt-0"
							>
								Details
							</Link>
						</li>
					))}
					{jobs.length === 0 ? (
						<li className="py-8 text-center text-p2 text-muted">
							No openings match “{query.trim()}”.
						</li>
					) : null}
				</ul>
			</div>
		</div>
	);
}
