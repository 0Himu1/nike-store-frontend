export default function getDiscountedPercentage(orginal, price) {
	const discount = orginal - price;
	const discountedPercentage = (discount / orginal) * 100;
	return discountedPercentage.toFixed(2);
}
