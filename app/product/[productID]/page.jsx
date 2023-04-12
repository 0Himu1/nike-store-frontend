/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import React, { useState, useEffect } from 'react';
import { IoIosHeartEmpty } from 'react-icons/io';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Wrapper from '@/components/Wrapper';
import ProdactDetailsCarousel from '@/components/ProdactDetailsCarousel';
import RelatedProduct from '@/components/RelatedProduct';
import fetchData from '@/app/api/api';
import getDiscountedPercentage from '@/app/api/helper';
import { addToCart } from '@/store/cartSlice';
import 'react-toastify/dist/ReactToastify.css';

async function getProduct({ productID }) {
	const { data: product } = await fetchData(
		`/api/products?populate=*&filters[slug][$eq]=${productID}`
	);
	const { data: products } = await fetchData(
		`/api/products?populate=*&filters[slug][$ne]=${productID}`
	);

	return { product, products };
}

export default function page({ params }) {
	const [product, setProduct] = useState([]);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedSize, setSelectedSize] = useState();
	const [showError, setShowError] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		async function setData() {
			// eslint-disable-next-line no-shadow
			const { product, products } = await getProduct(params);
			setProduct(product[0]);
			setRelatedProducts(products);
		}
		setData();
		setIsLoading(false);
	}, []);

	const { name, subtitle, price, description, size, original_price, image } =
		product?.attributes || {};
	const images = image?.data;

	const notify = () => {
		toast.success('Success. Check your cart', {
			position: 'bottom-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		});
	};

	return (
		<div className="w-full md:py-20">
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<Wrapper className="">
				<div className="flex flex-col lg:flex-row md:px-10 gap-12 lg:gap-24">
					<div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
						<ProdactDetailsCarousel images={images} />
					</div>
					<div className="flex-[1] py-3">
						<h1 className="text-4xl font-semibold mb-2">
							{isLoading ? 'Loading' : name}
						</h1>
						<p className="text-lg font-semibold mb-5">{subtitle}</p>
						<div className="flex items-center">
							<p className="text-lg font-semibold mr-2">MRP: &#8377;{price}</p>
							{original_price && (
								<>
									<p className="text-base font-medium line-through">
										&#8377;{original_price}
									</p>
									<p className="ml-auto text-base font-medium text-green-500">
										{`${getDiscountedPercentage(original_price, price)}% off`}
									</p>
								</>
							)}
						</div>
						<p className="text-base font-medium text-black/[0.5]">
							incl. all taxes
						</p>
						<p className="text-base font-medium text-black/[0.5] mb-20">
							(Also includes all applicable duties)
						</p>

						<div className="mb-10">
							<div className="flex justify-between mb-2">
								<p className="text-base font-semibold">Select Size</p>
								<p className="text-base font-medium text-black/[0.5] cursor-pointer">
									Select Guide
								</p>
							</div>
							<div className="grid grid-cols-3 gap-2" id="sizeGrid">
								{size?.data.map((item, i) => (
									<div
										key={i}
										className={`border rounded-md text-center py-3 font-medium ${
											item.enabled
												? 'cursor-pointer'
												: 'cursor-not-allowed bg-black/[0.1] opacity-50'
										} ${selectedSize === item.size ? 'border-black' : ''}`}
										onClick={() => {
											setSelectedSize(item.size);
											setShowError(false);
										}}
									>
										{item.size}
									</div>
								))}
							</div>

							{showError && (
								<div className="text-red-600 mt-1">
									Size selection is required
								</div>
							)}
						</div>
						<button
							type="button"
							className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
							onClick={() => {
								if (!selectedSize) {
									setShowError(true);
									document.getElementById('sizeGrid').scrollIntoView({
										block: 'start',
										behavior: 'smooth',
									});
								} else {
									dispatch(
										addToCart({
											...product,
											selectedSize,
											oneQuantitySize: price,
										})
									);
									notify();
								}
							}}
						>
							Add to cart
						</button>
						<button
							type="button"
							className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10"
						>
							Whishlist
							<IoIosHeartEmpty size={20} />
						</button>
						<div className="">
							<h1 className="text-lg font-bold mb-5">Product Details</h1>
							<div className="text-base mb-5">
								<ReactMarkdown>{description}</ReactMarkdown>
							</div>
						</div>
					</div>
				</div>
				<RelatedProduct relatedProducts={relatedProducts} />
			</Wrapper>
		</div>
	);
}

export async function generateStaticParams() {
	const { data } = await fetchData('/api/products?populate=*');
	const paths = data.map(c => ({
		params: { slug: c.attributes.slug },
	}));
	return paths;
}
