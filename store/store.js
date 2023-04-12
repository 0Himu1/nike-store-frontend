/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';

export default configureStore({
	reducer: {
		cart: cartSlice,
	},
});
