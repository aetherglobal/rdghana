import Image from 'next/image';

export function HeroBanner({ oristapayUrl }: { oristapayUrl: string }): React.ReactElement {
	return (
		<section className='relative -mt-[72px] pt-20 xl:-mt-[140px]'>
			<div className='hero-media pointer-events-none absolute left-0 top-0 w-full'>
				<Image
					src='/images/home/hero-bg.svg'
					alt=''
					fill
					sizes='100vw'
					priority
					className='object-cover'
				/>
			</div>

			<div className='hero-frame module-wrapper relative z-[1] flex flex-col justify-center text-center leading-normal'>
				<h1 className='mx-auto primary-text text-[32px] font-medium md:text-[44px] lg:text-[50px]'>
					B2B Global Stablecoin Payment Platform
				</h1>
				<a
					href={oristapayUrl}
					target='_blank'
					rel='noopener noreferrer'
					className='mx-auto mt-14 w-fit rounded-[30px] bg-gradient-primary px-[30px] py-3 text-h6 text-white transition-opacity duration-200 hover:opacity-90 md:px-9 md:py-[14px] lg:px-10 lg:py-4'
				>
					Learn more
				</a>
			</div>
		</section>
	);
}
