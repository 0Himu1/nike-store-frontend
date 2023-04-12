import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import Wrapper from '@/components/Wrapper';
import fetchData from './api/api';

export default async function Home() {
	const { data } = await fetchData('/api/products?populate=*');
	return (
		<div className="">
			<HeroBanner />
			<Wrapper>
				<div className="text-center max-w-[800px] mx-auto my-14 md:my-20">
					<h1 className="text-3xl md:text-4xl mb-5 font-semibold leading-tight">
						Heading
					</h1>
					<p className="text-lg md:text-xl">para</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
					{data.map(product => (
						<ProductCard product={product || ''} key={product.id} />
					))}
				</div>
			</Wrapper>
		</div>
	);
}
