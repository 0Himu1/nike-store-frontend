'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsCart } from 'react-icons/bs';
import { IoMdHeartEmpty } from 'react-icons/io';
import { VscChromeClose } from 'react-icons/vsc';
import { BiMenu } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Menu from './Menu';
import Wrapper from './Wrapper';
import MobileMenu from './MobileMenu';
import logo from '@/public/logo.svg';
import fetchData from '@/app/api/api';

export default function Header() {
	const [mobileView, setMobileView] = useState(false);
	const [showCat, setShowCat] = useState(false);
	const [show, setShow] = useState('translet-y-0');
	const [lastScrollY, setLastScrollY] = useState(0);
	const [categories, setCategori] = useState(null);

	const { cartItems } = useSelector(state => state.cart);

	const controlNavbar = () => {
		if (window.scrollY > 200) {
			if (window.scrollY > lastScrollY && !mobileView) {
				setShow('-translate-y-20');
			} else {
				setShow('shadow-sm');
			}
		} else {
			setShow('translet-y-0');
		}
		setLastScrollY(window.scrollY);
	};

	const fetchCategories = async () => {
		const { data } = await fetchData('/api/categories?populate=*');
		setCategori(data);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', controlNavbar);
		return () => {
			window.removeEventListener('scroll', controlNavbar);
		};
	}, [lastScrollY]);

	return (
		<header
			className={`w-full h-[50px] md:h-[80px] py-5 bg-white z-20 fixed top-0 transition-transform duration-300 ${show}`}
		>
			<Wrapper className="flex items-center justify-between">
				<Link href="/">
					<Image
						src={logo}
						width={215}
						height={75}
						className="w-10 md:w-16"
						alt="logo"
					/>
				</Link>
				<Menu
					showCat={showCat}
					setShowCat={setShowCat}
					categories={categories}
				/>
				{mobileView && (
					<MobileMenu
						showCat={showCat}
						setShowCat={setShowCat}
						setMobileView={setMobileView}
						categories={categories}
					/>
				)}
				<div className="flex items-center gap-2 text-black">
					{/* icon Start */}
					<div className="w-8 md:w-12 h-8 md:h-12 flex items-center justify-center hover:bg-black/[0.03] rounded-md relative">
						<IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
						<div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full  bg-red-600 absolute top-0 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex items-center justify-center px-[2px] md:px-[5px]">
							18
						</div>
					</div>
					{/* icon end */}

					{/* icon Start */}
					<Link href="/cart">
						<div className="w-8 md:w-12 h-8 md:h-12 flex items-center justify-center hover:bg-black/[0.03] rounded-md relative">
							<BsCart className="text-[15px] md:text-lg" />
							{cartItems.length > 0 && (
								<div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full  bg-red-600 absolute top-0 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex items-center justify-center px-[2px] md:px-[5px]">
									{cartItems.length}
								</div>
							)}
						</div>
					</Link>

					{/* icon end */}

					{/* mobile menu icon  */}
					<div className="md:hidden w-8 md:w-12 h-8 md:h-12 flex items-center justify-center hover:bg-black/[0.03] rounded-md relative ">
						{mobileView ? (
							<VscChromeClose
								className="text-base"
								onClick={() => setMobileView(false)}
							/>
						) : (
							<BiMenu
								className="text-base"
								onClick={() => setMobileView(true)}
							/>
						)}
					</div>
				</div>
			</Wrapper>
		</header>
	);
}
