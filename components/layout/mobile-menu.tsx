'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { NavDropdown, NavLink, SocialLinkItem } from '@/types';
import { ChevronDownIcon } from '@/components/ui/icons';
import { SocialLink } from '@/components/layout/social-link';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
	open: boolean;
	onClose: () => void;
	navDropdowns: NavDropdown[];
	contact: NavLink;
	social: SocialLinkItem[];
}

export function MobileMenu({
	open,
	onClose,
	navDropdowns,
	contact,
	social,
}: MobileMenuProps): React.ReactElement {
	const [expanded, setExpanded] = useState<string | null>(null);

	return (
		<div
			className={cn(
				'fixed inset-0 z-998 bg-white transition-opacity duration-300 xl:hidden',
				open ? 'visible opacity-100' : 'invisible opacity-0'
			)}
		>
			<div className='flex h-full flex-col overflow-y-auto px-6 pb-10 pt-24'>
				<nav className='flex flex-col divide-y divide-black/5'>
					{navDropdowns.map((item) => {
						const isOpen = expanded === item.label;
						return (
							<div key={item.label} className='py-1'>
								<button
									type='button'
									onClick={() => setExpanded(isOpen ? null : item.label)}
									className='flex w-full items-center justify-between py-4 text-lg font-bold text-ink'
								>
									{item.label}
									<ChevronDownIcon
										className={cn(
											'h-5 w-5 transition-transform',
											isOpen && 'rotate-180'
										)}
									/>
								</button>
								<div
									className={cn(
										'grid overflow-hidden transition-all duration-300',
										isOpen ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]'
									)}
								>
									<div className='min-h-0'>
										{item.links.map((link) =>
											link.external ?
												<a
													key={link.label}
													href={link.href}
													target='_blank'
													rel='noopener noreferrer'
													onClick={onClose}
													className='block py-2.5 pl-1 text-sm font-medium text-muted-2'
												>
													{link.label}
												</a>
											:	<Link
													key={link.label}
													href={link.href}
													onClick={onClose}
													className='block py-2.5 pl-1 text-sm font-medium text-muted-2'
												>
													{link.label}
												</Link>
										)}
									</div>
								</div>
							</div>
						);
					})}

					<Link
						href={contact.href}
						onClick={onClose}
						className='py-5 text-lg font-bold text-ink'
					>
						{contact.label}
					</Link>
				</nav>

				<div className='mt-auto flex items-center justify-between pt-10'>
					<LanguageSwitcher />
					<div className='flex items-center gap-4'>
						{social.map((item) => (
							<SocialLink key={item.label} item={item} />
						))}
					</div>
				</div>
				<p className='mt-6 text-xs font-medium text-muted'>
					© RD Technologies. All rights reserved.
				</p>
			</div>
		</div>
	);
}
