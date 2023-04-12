import Link from 'next/link';
import React from 'react';
import { BsChevronDown } from 'react-icons/bs';

const data = [
	{ id: 1, name: 'Home', url: '/' },
	{ id: 2, name: 'About', url: '/about' },
	{ id: 3, name: 'Categories', subMenu: true },
	{ id: 4, name: 'Contact', url: '/contact' },
];

export default function MobileMenu({
	showCat,
	setShowCat,
	setMobileView,
	categories,
}) {
	return (
		<ul className="md:hidden flex flex-col font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
			{data.map(i => (
				<React.Fragment key={i.id}>
					{i?.subMenu ? (
						<li
							className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
							onClick={() => setShowCat(!showCat)}
						>
							<div className="flex justify-between items-center">
								{i.name}
								<BsChevronDown />
							</div>
							{showCat && (
								<ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
									{categories?.map(({ id, attributes: c }) => (
										<Link
											key={id}
											href={`category/${c.slug}`}
											onClick={() => setMobileView(false)}
										>
											<li className="py-4 px-8 border-t flex justify-between">
												{c.name}
												<span className="opacity-50 text-sm">
													{c.products.data.length}
												</span>
											</li>
										</Link>
									))}
								</ul>
							)}
						</li>
					) : (
						<li className="py-4 px-5 border-b ">
							<Link href={i.url} onClick={() => setMobileView(false)}>
								{i.name}
							</Link>
						</li>
					)}
				</React.Fragment>
			))}
		</ul>
	);
}
