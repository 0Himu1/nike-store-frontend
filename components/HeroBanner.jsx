'use client';

import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BiArrowBack } from 'react-icons/bi';

export default function HeroBanner() {
	return (
		<div className="relative text-white text-xl w-full max-w-7xl mx-auto">
			<Carousel
				autoPlay
				infiniteLoop
				showThumbs={false}
				showArrows={false}
				showIndicators={false}
				showStatus={false}
				renderArrowPrev={clickHandelar => (
					<div
						onClick={clickHandelar}
						className="absolute bottom-0 right-[31px] md:right-[51px] w-8 md:w-12 h-8 md:h-12 bg-black flex items-center justify-center cursor-pointer hover:opacity-90 z-20"
					>
						<BiArrowBack className="text-sm md:text-lg" />
					</div>
				)}
				renderArrowNext={clickHandelar => (
					<div
						onClick={clickHandelar}
						className="absolute bottom-0 right-0 w-8 md:w-12 h-8 md:h-12 bg-black flex items-center justify-center cursor-pointer hover:opacity-90"
					>
						<BiArrowBack className="text-sm md:text-lg rotate-180" />
					</div>
				)}
			>
				<div>
					<img src="/slide-1.png" alt="slide-1" className="aspect-auto" />
					<div className="px-4 md:px-10 py-3 md:py-7 font-oswald bg-white absolute left-0 bottom-7 md:bottom-20 text-black/[0.9] text-base md:text-3xl uppercase font-medium cursor-pointer hover:opacity-90">
						Shop Now
					</div>
				</div>
				<div>
					<img src="/slide-2.png" alt="slide-1" className="aspect-auto" />
					<div className="px-4 md:px-10 py-3 md:py-7 font-oswald bg-white absolute left-0 bottom-7 md:bottom-20 text-black/[0.9] text-base md:text-3xl uppercase font-medium cursor-pointer hover:opacity-90">
						Shop Now
					</div>
				</div>
				<div>
					<img src="/slide-3.png" alt="slide-1" className="aspect-auto" />
					<div className="px-4 md:px-10 py-3 md:py-7 font-oswald bg-white absolute left-0 bottom-7 md:bottom-20 text-black/[0.9] text-base md:text-3xl uppercase font-medium cursor-pointer hover:opacity-90">
						Shop Now
					</div>
				</div>
			</Carousel>
		</div>
	);
}
