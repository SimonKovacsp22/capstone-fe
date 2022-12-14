import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuthenticated: false,
  onlineUsers: [],
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

      if (action.payload?._id) {
        localStorage.setItem('account_id', action.payload._id);
      }
    },

    setUserLogout: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.user = {};
      // eslint-disable-next-line no-param-reassign
      state.isAuthenticated = false;
    },

    setUserFavorites: (state, action) => {
      const isThere = state.user.favorites.findIndex((product) => product._id === action.payload.product._id);
      if (isThere !== -1) {
        const newFavorites = state.user.favorites.filter((product) => product._id !== action.payload.product._id);
        // eslint-disable-next-line no-param-reassign
        state.user.favorites = newFavorites;
      } else {
        state.user.favorites.push(action.payload.product);
      }
    },

    setOnlineUsers: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.onlineUsers = action.payload;
    },
  },
});

export const { setUser, setUserLogout, setUserFavorites, setOnlineUsers } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state) => state.user;
