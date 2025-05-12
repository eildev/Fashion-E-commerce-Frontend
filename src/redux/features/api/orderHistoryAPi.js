import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderHistoryApi = createApi({
  reducerPath: "orderHistoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fashion-backend.eclipseposapp.com/api'
    // baseUrl: "https://backend.glowthentic.store/api",
  }),
  endpoints: (builder) => ({
    getOrderHistory: builder.query({
      query: (id) => {
        // console.log("in api", id);
        return `/order/completed/${id}`;
      },
    }),
  }),
});

export const { useGetOrderHistoryQuery } = orderHistoryApi;

export default orderHistoryApi;
