import { configureStore } from '@reduxjs/toolkit';
import { kotolApi } from '../services/kotol-be';
// import categoryReducer from '../features/currentGenreOrCategory';
import userReducer from './reducers/auth';

export default configureStore({
  reducer: {
    [kotolApi.reducerPath]: kotolApi.reducer,
    // currentGenreOrCategory: categoryReducer,
    user: userReducer,
  },
});
