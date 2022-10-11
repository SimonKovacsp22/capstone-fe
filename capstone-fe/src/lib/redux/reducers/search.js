import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.category = action.payload;
    },

  },
});

export const { setCategory } = searchSlice.actions;

export default searchSlice.reducer;

export const searchSelector = (state) => state.category;
