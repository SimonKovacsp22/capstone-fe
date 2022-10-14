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
    addProduct: (state, action) => {
      const productIndex = state.items.findIndex((item) => item.productId._id === action.payload.productId);
      if (productIndex !== -1) {
        const newQuantity = state.items[productIndex].quantity + action.payload.quantity;
        const updatedItem = { ...state.items[productIndex], quantity: newQuantity };
        state.items[productIndex] = updatedItem;
      } else {
        state.items.push(
          { productId: { _id: action.payload.productId,
            name: action.payload.name,
            price: action.payload.price,
          },
          quantity: action.payload.quantity,
          },
        );
      }
    },

  },
});

export const { setItems, addProduct } = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart.items;
