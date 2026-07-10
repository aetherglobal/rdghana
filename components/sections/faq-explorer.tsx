"use client";

import { useState } from "react";
import Image from "next/image";
import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/components/ui/icons";

interface Faq {
	question: string;
	answer: SerializedEditorState | null;
}
interface Category {
	name: string;
	slug: string;
	icon?: string;
	activeIcon?: string;
	faqs: Faq[];
}
interface Section {
	title: string;
	slug: string;
	categories: Category[];
}

function lexToText(state: SerializedEditorState | null): string {
	if (!state) return "";
	const parts: string[] = [];
	const walk = (node: unknown): void => {
		if (node && typeof node === "object") {
			const n = node as { text?: unknown; children?: unknown };
			if (typeof n.text === "string") parts.push(n.text);
			if (Array.isArray(n.children)) n.children.forEach(walk);
		}
	};
	walk((state as { root?: unknown }).root);
	return parts.join(" ").toLowerCase();
}

export function FaqExplorer({ sections }: { sections: Section[] }): React.ReactElement {
	const [tabIndex, setTabIndex] = useState(0);
	const [catIndex, setCatIndex] = useState(0);
	const [query, setQuery] = useState("");
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const categories = sections[tabIndex]?.categories ?? [];
	const q = query.trim().toLowerCase();

	const items: Faq[] = q
		? categories
				.flatMap((c) => c.faqs)
				.filter((f) => f.question.toLowerCase().includes(q) || lexToText(f.answer).includes(q))
		: (categories[catIndex]?.faqs ?? []);

	const selectTab = (i: number): void => {
		setTabIndex(i);
		setCatIndex(0);
		setOpenIndex(0);
		setQuery("");
	};
	const selectCat = (i: number): void => {
		setCatIndex(i);
		setOpenIndex(0);
		setQuery("");
	};

	return (
		<div className="module-wrapper relative z-[1]">
			<div className="flex items-center gap-2 rounded-full bg-surface p-2 shadow-[0_16px_40px_rgba(17,24,39,0.06)] md:max-w-[720px]">
				<input
					value={query}
					onChange={(e) => {
						setOpenIndex(0);
						setQuery(e.target.value);
					}}
					placeholder="What can we help you find?"
					aria-label="Search FAQs"
					className="min-w-0 flex-1 bg-transparent px-5 text-p2 text-ink outline-none placeholder:text-muted"
				/>
				<button
					type="button"
					className="shrink-0 rounded-full bg-gradient-primary px-6 py-3 text-h6 text-white transition-opacity hover:opacity-90 md:px-10"
				>
					Search
				</button>
			</div>

			<div className="mt-12 flex items-center gap-8">
				{sections.map((s, i) => (
					<button
						key={s.slug}
						type="button"
						onClick={() => selectTab(i)}
						className={cn(
							"relative pb-2 text-h4 font-bold transition-colors md:text-h3",
							i === tabIndex ? "text-gradient-primary" : "text-ink hover:text-primary",
						)}
					>
						{s.title}
						{i === tabIndex ? (
							<span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-gradient-primary" />
						) : null}
					</button>
				))}
			</div>

			{!q ? (
				<div className="mt-8 grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
					{categories.map((c, i) => {
						const active = i === catIndex;
						const icon = active ? c.activeIcon : c.icon;
						return (
							<button
								key={c.slug}
								type="button"
								onClick={() => selectCat(i)}
								className={cn(
									"flex flex-col items-center justify-center gap-3 rounded-2xl px-2 py-6 text-center transition-all duration-200",
									active
										? "bg-gradient-primary text-white shadow-[0_16px_40px_rgba(108,41,237,0.3)]"
										: "bg-white text-ink shadow-[0_8px_24px_rgba(17,24,39,0.06)] hover:shadow-[0_12px_30px_rgba(17,24,39,0.1)]",
								)}
							>
								{icon ? (
									<Image
										src={icon}
										alt=""
										width={44}
										height={44}
										className="h-10 w-10 lg:h-11 lg:w-11"
									/>
								) : null}
								<span className="text-h8 md:text-h7">{c.name}</span>
							</button>
						);
					})}
				</div>
			) : null}

			<div className="mt-10 space-y-4 pb-4">
				{items.map((f, i) => {
					const isOpen = i === openIndex;
					return (
						<div
							key={`${f.question}-${i}`}
							className={cn(
								"overflow-hidden rounded-[20px] transition-colors",
								isOpen
									? "bg-white shadow-[0_20px_50px_rgba(17,24,39,0.08)]"
									: "bg-surface",
							)}
						>
							<button
								type="button"
								onClick={() => setOpenIndex(isOpen ? null : i)}
								className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
							>
								<span
									className={cn(
										"text-h6 transition-colors",
										isOpen ? "text-primary" : "text-ink",
									)}
								>
									{f.question}
								</span>
								<ChevronDownIcon
									className={cn(
										"h-5 w-5 shrink-0 transition-transform duration-300",
										isOpen ? "rotate-180 text-primary" : "text-ink",
									)}
								/>
							</button>
							<div
								className={cn(
									"grid transition-all duration-300 ease-out",
									isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
								)}
							>
								<div className="min-h-0 overflow-hidden">
									<div className="px-6 pb-6 text-p2 text-ink [&_a]:text-blue [&_a]:underline [&_p]:mb-3 [&_p:last-child]:mb-0">
										{f.answer ? <LexicalRichText data={f.answer} /> : null}
									</div>
								</div>
							</div>
						</div>
					);
				})}
				{items.length === 0 ? (
					<p className="py-6 text-center text-p2 text-muted">
						No results found for “{query.trim()}”.
					</p>
				) : null}
			</div>
		</div>
	);
}
