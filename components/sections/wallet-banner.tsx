"use client";

import { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

const BANNER_BG =
	"radial-gradient(120% 130% at 82% 62%, rgba(0,170,255,0.55) 0%, rgba(0,170,255,0) 46%), linear-gradient(126deg, #6d28d9 0%, #4f46e5 44%, #2563eb 100%)";

const CARD =
	"relative min-h-[380px] overflow-hidden px-6 py-12 text-white md:min-h-[440px] md:px-12";

const REFERENCE_NOTE =
	"absolute bottom-4 left-6 text-[10px] leading-tight text-white/70 md:bottom-5 md:left-10";

function ShieldCheckIcon(): React.ReactElement {
	return (
		<svg aria-hidden viewBox="0 0 96 108" className="h-[76px] w-[76px] md:h-[92px] md:w-[92px]" fill="none">
			<defs>
				<linearGradient id="svf-shield" x1="20" y1="8" x2="76" y2="100" gradientUnits="userSpaceOnUse">
					<stop stopColor="#A9F5D8" />
					<stop offset="1" stopColor="#5AA9FF" />
				</linearGradient>
			</defs>
			<path d="M48 6 84 20v30c0 27-18 44-36 51C30 94 12 77 12 50V20L48 6Z" stroke="url(#svf-shield)" strokeWidth="5" strokeLinejoin="round" />
			<path d="M34 52 44 63 65 40" stroke="url(#svf-shield)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function WhatIsSlide(): React.ReactElement {
	return (
		<div className={`${CARD} flex flex-col md:block`} style={{ backgroundImage: BANNER_BG }}>
			<Image
				src="/images/brand/rd-logo-icon.png"
				alt=""
				aria-hidden
				width={96}
				height={96}
				className="absolute right-8 top-8 h-11 w-11 opacity-90 brightness-0 invert md:right-10 md:top-10"
			/>
			<div className="relative z-[1] text-center md:absolute md:right-10 md:top-1/2 md:w-[46%] md:-translate-y-1/2 md:text-left lg:right-16">
				<p className="text-[2rem] font-medium leading-tight md:text-[2.5rem]">What is</p>
				<p className="text-[2.75rem] font-bold leading-[1.05] md:text-[3.5rem]">RD Wallet</p>
				<p className="mt-1 text-[1.75rem] font-bold md:text-[2rem]">圓幣錢包</p>
			</div>
			<div className="pointer-events-none relative z-0 mx-auto mt-6 w-[82%] max-w-[340px] md:absolute md:bottom-0 md:left-0 md:mt-0 md:w-[52%] md:max-w-none lg:w-[46%]">
				<Image
					src="/images/products/wallet-banner-phones.png"
					alt="RD Wallet app"
					width={2294}
					height={1680}
					className="h-auto w-full"
				/>
			</div>
			<span className={REFERENCE_NOTE}>*The content on the screen is for reference only</span>
		</div>
	);
}

function SvfSlide(): React.ReactElement {
	return (
		<div className={`${CARD} flex flex-col items-center justify-center text-center`} style={{ backgroundImage: BANNER_BG }}>
			<div aria-hidden className="pointer-events-none absolute -top-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full border border-white/20 md:h-80 md:w-80" />
			<div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full border border-white/10" />
			<div className="relative z-[1] flex flex-col items-center">
				<ShieldCheckIcon />
				<h2 className="mt-6 max-w-[720px] text-h2 font-bold text-white md:text-h1 min-[1440px]:text-[2.5rem]! min-[1440px]:leading-[3.125rem]">
					Hong Kong Stored Value Facility (SVF) Licensed
				</h2>
			</div>
			<span className={REFERENCE_NOTE}>*The content on the screen is for reference only</span>
			<span className="absolute bottom-5 right-6 text-p3 font-bold text-white md:bottom-7 md:right-10 lg:text-p2">
				(Licence number: SVF0016)
			</span>
		</div>
	);
}

export function WalletBanner(): React.ReactElement {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", duration: 28 });

	useEffect(() => {
		if (!emblaApi) return;
		const id = setInterval(() => emblaApi.scrollNext(), 5000);
		return () => clearInterval(id);
	}, [emblaApi]);

	return (
		<section className="module-wrapper py-16 md:py-24">
			<div className="overflow-hidden rounded-[30px]" ref={emblaRef}>
				<div className="flex">
					<div className="min-w-0 flex-[0_0_100%]">
						<WhatIsSlide />
					</div>
					<div className="min-w-0 flex-[0_0_100%]">
						<SvfSlide />
					</div>
				</div>
			</div>
		</section>
	);
}
