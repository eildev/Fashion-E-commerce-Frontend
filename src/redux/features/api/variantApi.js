import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const variantApi = createApi({
    reducerPath: 'variantApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fashion-backend.eclipseposapp.com/api' }),
    endpoints: builder => ({
        getVariantApi: builder.query({
            query: () => '/variant',
        }),
    })
})

export const {
    useGetVariantApiQuery,

} = variantApi;

export default variantApi;