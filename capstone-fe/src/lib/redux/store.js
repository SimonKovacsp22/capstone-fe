import { configureStore } from '@reduxjs/toolkit';
import { kotolApi } from '../services/kotol-be';
// import categoryReducer from '../features/currentGenreOrCategory';
import userReducer from './reducers/auth';
import searchReducer from './reducers/search';
import cartReducer from './reducers/cart';

export default configureStore({
  reducer: {
    [kotolApi.reducerPath]: kotolApi.reducer,
    // currentGenreOrCategory: categoryReducer,
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
  },
});
