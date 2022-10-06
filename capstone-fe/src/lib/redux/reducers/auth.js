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
  },
});

export const { setUser, setUserLogout } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state) => state.user;
