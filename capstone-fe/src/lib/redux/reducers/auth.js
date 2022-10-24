import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = true;
      // eslint-disable-next-line no-param-reassign

      localStorage.setItem('account_id', action.payload._id);
    },

    setUserLogout: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.user = {};
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = false;
    },

    setUserFavorites: (state, action) => {
      const isThere = state.user.favorites.findIndex((id) => id === action.payload.productId);
      if (isThere !== -1) {
        const newFavorites = state.user.favorites.filter((id) => id !== action.payload.productId);
        // eslint-disable-next-line no-param-reassign
        state.user.favorites = newFavorites;
      } else {
        state.user.favorites.push(action.payload.productId);
      }
    },
  },
});

export const { setUser, setUserLogout, setUserFavorites } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state) => state.user;
