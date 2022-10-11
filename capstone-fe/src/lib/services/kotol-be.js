import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const kotolApi = createApi({
  reducerPth: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BE_URL }),
  endpoints: (builder) => ({

    //* Get Categories
    getCategories: builder.query({
      query: () => '/categories',
    }),

    getProductsByCategory: builder.query({
      query: ({ categoryId }) => {
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
  useGetProductsByCategoryQuery,
} = kotolApi;
