import { configureStore } from '@reduxjs/toolkit';
import { kotolApi } from '../services/kotol-be';
// import categoryReducer from '../features/currentGenreOrCategory';
import userReducer from './reducers/auth';
import searchReducer from './reducers/search';
import cartReducer from './reducers/cart';
import { ordersApi } from '../services/orders-be';

export default configureStore({
  reducer: {
    [kotolApi.reducerPath]: kotolApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
  },
});
