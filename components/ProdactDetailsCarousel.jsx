'use client';

import React from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ProdactDetailsCarousel({ images }) {
	return (
		<div className="text-white text-xl w-full max-w-[1360px] mx-auto sticky top-[50px]">
			<Carousel
				infiniteLoop
				showIndicators={false}
				showStatus={false}
				thumbWidth={60}
				className="productCarousel"
			>
				{images?.map(image => {
					const { url, id, name } = image.attributes;

					return <img src={url} key={id} width={800} height={800} alt={name} />;
				})}
			</Carousel>
		</div>
	);
}
