import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewGetApi = createApi({
    reducerPath: 'reviewGetApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fashion-backend.eclipseposapp.com/api'


    }),
    endpoints: builder => ({
        getReviewInfo: builder.query({
            query: (id) => {
                return `/review/${id}`;
            },
        }),
    })
})


export const { useGetReviewInfoQuery } = reviewGetApi;

export default reviewGetApi;