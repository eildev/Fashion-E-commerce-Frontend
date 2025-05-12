import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fashion-backend.eclipseposapp.com/api' }),
  endpoints: (builder) => ({
    reviewInfo: builder.mutation({
      query: (data) => ({
        url: '/review/add',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useReviewInfoMutation } = reviewApi;
export default reviewApi;