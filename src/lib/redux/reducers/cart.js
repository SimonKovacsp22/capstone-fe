/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload.products;
      state.quantity = action.payload.quantity;
    },
    addProduct: (state, action) => {
      const productIndex = state.items.findIndex((item) => item.productId._id === action.payload.data._id);
      if (productIndex !== -1) {
        const newQuantity = state.items[productIndex].quantity + action.payload.quantity;
        const updatedItem = { ...state.items[productIndex], quantity: newQuantity };
        state.items[productIndex] = updatedItem;

        state.quantity += action.payload.quantity;
      } else {
        state.items.push(
          { productId: { ...action.payload.data,
          },
          quantity: action.payload.quantity,
          },
        );

        state.quantity += action.payload.quantity;
      }
    },
    removeProduct: (state, action) => {
      const productIndex = state.items.findIndex((item) => item.productId._id === action.payload.productId);
      if (productIndex !== -1) {
        if (state.items[productIndex].quantity > 1) {
          const newQuantity = state.items[productIndex].quantity - 1;
          const updatedItem = { ...state.items[productIndex], quantity: newQuantity };
          state.items[productIndex] = updatedItem;
          state.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.productId._id !== action.payload.productId);
          state.quantity -= 1;
        }
      }
    },

  },
});

export const { setItems, addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;

