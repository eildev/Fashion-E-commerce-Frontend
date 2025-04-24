import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const contactUsApi = createApi({
    reducerPath: 'contactUsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    endpoints: builder => ({
        sendContactMessage: builder.mutation({
            query: (contactData) => ({
                url: '/contact-us/save',
                method: 'POST',
                body: contactData,
            }),
        }),
    }),
});

export const { useSendContactMessageMutation } = contactUsApi;
export default contactUsApi;