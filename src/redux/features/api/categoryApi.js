import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fashion-backend.eclipseposapp.com/api' }),
    endpoints: builder => ({
        getCategory: builder.query({
            query: () => '/category',
        }),
        getProductByDetails: builder.query({
            query: (id) => `/category/${id}`,
        }),
        getNavbarCategory: builder.query({
            query: () => '/nav/category/show',
        }),
    })
})

export const {
    useGetCategoryQuery,
    useGetProductByDetailsQuery,
    useGetNavbarCategoryQuery,

} = categoryApi;

export default categoryApi;
