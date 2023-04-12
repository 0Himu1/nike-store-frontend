/* eslint-disable react/no-array-index-key */
/* eslint-disable no-tabs */
import Image from 'next/image';
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { updateCart, removeFromCart } from '@/store/cartSlice';

export default function CartItem({ data }) {
	const { name, size, subtitle, price, thumbnail } = data.attributes;
	const dispatch = useDispatch();

	const updateCartItem = (e, key) => {
		const payload = {
			key,
			value: key === 'quantity' ? parseInt(e.target.value, 10) : e.target.value,
			id: data.id,
		};
		dispatch(updateCart(payload));
	};

	return (
		<div className="flex py-5 gap-3 md:gap-5 border-b">
			{/* IMAGE START */}
			<div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
				<Image
					src={thumbnail.data.attributes.url}
					alt={name}
					width={120}
					height={120}
				/>
			</div>
			{/* IMAGE END */}

			<div className="w-full flex flex-col">
				<div className="flex flex-col md:flex-row justify-between">
					{/* PRODUCT TITLE */}
					<div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
						{name}
					</div>

					{/* PRODUCT SUBTITLE */}
					<div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
						{subtitle}
					</div>

					{/* PRODUCT PRICE */}
					<div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
						MRP : &#8377; {price}
					</div>
				</div>

				{/* PRODUCT SUBTITLE */}
				<div className="text-md font-medium text-black/[0.5] hidden md:block">
					{subtitle}
				</div>

				<div className="flex items-center justify-between mt-4">
					<div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
						<div className="flex items-center gap-1">
							<div className="font-semibold">Size:</div>
							<select
								className="hover:text-black"
								onChange={e => updateCartItem(e, 'selectedSize')}
							>
								{size.data.map((item, id) => (
									<option
										value={item.size}
										key={id}
										disabled={!item.enabled}
										selected={data.selectedSize === item.size}
									>
										{item.size}
									</option>
								))}
							</select>
						</div>

						<div className="flex items-center gap-1">
							<div className="font-semibold">Quantity:</div>
							<select
								className="hover:text-black"
								onChange={e => updateCartItem(e, 'quantity')}
							>
								{Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => (
									<option value={q} key={i} selected={data.quantity === q}>
										{q}
									</option>
								))}
							</select>
						</div>
					</div>
					<RiDeleteBin6Line
						onClick={() => dispatch(removeFromCart({ id: data.id }))}
						className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
					/>
				</div>
			</div>
		</div>
	);
}
