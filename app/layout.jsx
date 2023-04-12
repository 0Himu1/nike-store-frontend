'use client';

import { Provider } from 'react-redux';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';
import store from '../store/store';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="">
				<Provider store={store}>
					<Header />
					<div className="mt-20" />
					{children}
					<Footer />
				</Provider>
			</body>
		</html>
	);
}
