import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BE_URL }),
  endpoints: (builder) => ({

    getOrdersBySearch: builder.query({
      query: ({ startDate, endDate, email, limit, skip }) => {
        if (!startDate && !email) {
          return {
            url: `/orders?limit=${limit}&skip=${skip}`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          };
        }

        if (startDate && !email) {
          return { url: `/orders?limit=${limit}&skip=${skip}&startDate=${startDate}&endDate=${endDate}`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          };
        }

        if (!startDate && email) {
          return { url: `/orders?limit=${limit}&skip=${skip}&email=${email}`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            } };
        }

        if (startDate && email) {
          return { url: `/orders?limit=${limit}&skip=${skip}&startDate=${startDate}&endDate=${endDate}&email=${email}`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            } };
        }
      },
    }),
  }),
});

export const {
  useGetOrdersBySearchQuery,
} = ordersApi;
