/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import getDiscountedPercentage from '@/app/api/helper';

export default function ProductCard({ product }) {
	const productData = product?.attributes;
	const {
		name,
		subtitle,
		price,
		description,
		size,
		original_price,
		slug,
		thumbnail,
		image,
	} = productData || {};

	return (
		<Link
			href={`/product/${slug}`}
			className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
		>
			<Image
				className="w-full"
				src={thumbnail?.data.attributes.url}
				width={500}
				height={500}
				alt={name}
			/>
			<div className="p-4 text-black/[0.9]">
				<h2 className="text-lg font-medium">{name}</h2>
				<div className="flex items-center text-black/[0.5]">
					<p className="mr-2 text-lg font-semibold">&#8377;{price}</p>
					{original_price && (
						<>
							<p className="text-base  font-medium line-through">
								&#8377;{original_price}
							</p>
							<p className="ml-auto text-base font-medium text-green-500">
								{`${getDiscountedPercentage(original_price, price)}% off`}
							</p>
						</>
					)}
				</div>
			</div>
		</Link>
	);
}
