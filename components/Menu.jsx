import Link from 'next/link';
import React from 'react';
import { BsChevronDown } from 'react-icons/bs';

const data = [
	{ id: 1, name: 'Home', url: '/' },
	{ id: 2, name: 'About', url: '/about' },
	{ id: 3, name: 'Categories', subMenu: true },
	{ id: 4, name: 'Contact', url: '/contact' },
];

export default function Menu({ showCat, setShowCat, categories }) {
	return (
		<ul className="hidden md:flex items-center gap-8 font-medium px-1 py-1 text-black">
			{data.map(i => (
				<React.Fragment key={i.id}>
					{i?.subMenu ? (
						<li
							className="cursor-pointer flex items-center gap-2 relative"
							onMouseEnter={() => setShowCat(true)}
							onMouseLeave={() => setShowCat(false)}
						>
							{i.name}
							<BsChevronDown />
							{showCat && (
								<ul className="bg-white absolute top-6  left-0 min-w-[250px] px-1 text-black shadow-lg">
									{categories?.map(({ id, attributes: c }) => (
										<Link
											key={id}
											href={`category/${c.slug}`}
											onClick={() => setShowCat(false)}
										>
											<li className="h-12 flex justify-between items-center px-3  hover:bg-black/[0.03] rounded-md">
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
						<li className="cursor-pointer">
							<Link href={i.url}>{i.name}</Link>
						</li>
					)}
				</React.Fragment>
			))}
		</ul>
	);
}
