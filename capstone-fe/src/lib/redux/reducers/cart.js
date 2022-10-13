/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

  },
});

export const { setItems } = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart.items;
