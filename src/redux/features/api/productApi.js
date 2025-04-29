import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api',
        credentials: 'include', // Include cookies in requests
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            const csrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            if (csrfToken) {
                headers.set('X-XSRF-TOKEN', decodeURIComponent(csrfToken));
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/product',
        }),
        getProductByDetails: builder.query({
            query: (slug) => `/product/${slug}`,
        }),
        searchProducts: builder.mutation({
            query: (product) => ({
                url: '/product/search',
                method: 'POST',
                body: { q: product },
            }),
        }),

    })
})

export const {
    useGetProductsQuery,
    useGetProductByDetailsQuery,
    useSearchProductsMutation,

} = productApi;

export default productApi;
