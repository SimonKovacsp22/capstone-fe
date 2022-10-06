import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const kotolApi = createApi({
  reducerPth: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BE_URL }),
  endpoints: (builder) => ({

    //* Get Categories
    getCategories: builder.query({
      query: () => '/categories',
    }),
  }),
});

export const {
  useGetCategoriesQuery,
} = kotolApi;
