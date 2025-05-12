import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const bannerApi = createApi({
    reducerPath: 'bannerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fashion-backend.eclipseposapp.com/api' }),
    endpoints: builder => ({
        getBannerApi: builder.query({
            query: () => '/homeBanner',
        }),
    })
})

export const {
    useGetBannerApiQuery,

} = bannerApi;

export default bannerApi;