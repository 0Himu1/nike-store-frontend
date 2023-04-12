/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cartItems: [],
	},
	reducers: {
		addToCart: (state, action) => {
			const item = state.cartItems.find(p => p.id === action.payload.id);
			if (item) {
				item.quantity++;
				item.attributes.price = item.oneQuantitySize * item.quantity;
			} else {
				state.cartItems.push({ ...action.payload, quantity: 1 });
			}
		},
		updateCart: (state, action) => {
			state.cartItems = state.cartItems.map(p => {
				const { id, key, value } = action.payload;
				if (p.id === id) {
					if (key === 'quantity') {
						p.attributes.price = p.oneQuantitySize * value;
					}
					return { ...p, [key]: value };
				}
				return p;
			});
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(p => p.id !== action.payload.id);
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
