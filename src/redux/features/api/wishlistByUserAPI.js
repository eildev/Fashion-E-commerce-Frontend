import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const wishlistByUserAPI = createApi({
    reducerPath: 'wishlistByUserAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fashion-backend.eclipseposapp.com/api',
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
    tagTypes: ['Wishlist'],
    endpoints: (builder) => ({
        addToWishlist: builder.mutation({
            query: (wishlistData) => {
                console.log("Sending wishlistData:", wishlistData);
                return {
                  url: "/wishlist/add",
                  method: "POST",
                  body: wishlistData,
                };
              },
            invalidatesTags: ['Wishlist'],
        }),
        getWishlistByUserId: builder.query({
            query: (userId) => `/wishlist/${userId}`,
            providesTags: ['Wishlist'],
        }),
        deleteWishlistItem: builder.mutation({
            query: (itemId) => ({
                url: `/wishlist/delete/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Wishlist'],
        }),
    }),
});

export const {
    useAddToWishlistMutation,
    useGetWishlistByUserIdQuery,
    useDeleteWishlistItemMutation,
} = wishlistByUserAPI;

export default wishlistByUserAPI;