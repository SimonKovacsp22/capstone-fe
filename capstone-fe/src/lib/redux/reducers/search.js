/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '',
  searchTerm: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

  },
});

export const { setCategory, setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;

export const categorySelector = (state) => state.search.category;

export const searchTermSelector = (state) => state.search.searchTerm;
