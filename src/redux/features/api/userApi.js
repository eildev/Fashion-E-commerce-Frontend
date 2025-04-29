import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
    endpoints: builder => ({
        getUserInfo: builder.query({
            query: (id) => {
                // console.log("in api", id);
                return `/user/details/show/${id}`;
            },
        }),
    })
})

export const {
    useGetUserInfoQuery,

} = userApi;

export default userApi;
