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
      query: ({ category, searchTerm }) => {
        if (searchTerm) {
          return `/products/search?term=${searchTerm}`;
        }

        if (category._id) {
          return `/products/category/${category._id}`;
        }

        return '/products/category/6342a76ac34b3b92f7f2673e';
      },
    }),
    getCart: builder.query({
      query: ({ userId }) => `/cart/${userId}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsBySearchQuery,
  useGetCartQuery,
} = kotolApi;
