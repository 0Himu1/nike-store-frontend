import { strapiToken, apiURL } from './urls.js';

const fetchData = async endpoint => {
	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${strapiToken}`,
		},
	};

	const res = await fetch(`${apiURL}${endpoint}`, options, {
		next: { revalidate: 5 },
	});
	const data = res.json();

	return data;
};

export const makePaymentrequest = async (endpoint, payload) => {
	const res = await fetch(`${apiURL}${endpoint}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${strapiToken}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	const data = await res.json();
	return data;
};

export default fetchData;
