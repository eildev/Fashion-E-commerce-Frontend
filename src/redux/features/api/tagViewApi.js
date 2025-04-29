import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tagViewApi = createApi({
    reducerPath: 'tagViewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
    endpoints: builder => ({
        getTags: builder.query({
            query: () => '/tagname',
        }),
    })
})

export const {
    useGetTagsQuery,
} = tagViewApi;

export default tagViewApi;
