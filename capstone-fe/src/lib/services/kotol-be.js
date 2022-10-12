import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const kotolApi = createApi({
  reducerPth: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BE_URL }),
  endpoints: (builder) => ({

    //* Get Categories
    getCategories: builder.query({
      query: () => '/categories',
    }),

    getProductsBySearch: builder.query({
      query: ({ categoryId, searchTerm }) => {
        if (searchTerm) {
          return `/products/search?term=${searchTerm}`;
        }

        if (categoryId) {
          return `/products/category/${categoryId}`;
        }

        return '/products/category/6342a76ac34b3b92f7f2673e';
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsBySearchQuery,
} = kotolApi;
