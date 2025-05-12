import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderGetApi = createApi({
    reducerPath: 'orderGetApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fashion-backend.eclipseposapp.com/api'
        // baseUrl: 'https://backend.glowthentic.store/api'

    }),
    endpoints: builder => ({
        getOrderInfo: builder.query({
            query: (id) => {
                // console.log("in api", id);
                return `/order/processing/${id}`;
            },
        }),
    })
})


export const { useGetOrderInfoQuery } = orderGetApi;

export default orderGetApi;
