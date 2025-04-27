import { configureStore } from '@reduxjs/toolkit'
import registerApi from './features/api/registerApi/registerApi';
import authReducer from "./features/slice/authSlice";
import authApi from './features/api/auth/authApi';
import subscriptionApi from './features/api/subscribtionApi';
// import productApi from './features/api/productApi';
// import bannerApi from './features/api/bannerApi';
// import variantApi from './features/api/variantApi';
// import categoryApi from './features/api/categoryApi';
// import selectCartReducer from "./features/slice/cartSlice";
// import authReducer from "./features/slice/authSlice";

const store = configureStore({
    reducer: {

        // search: searchReducer,
        auth: authReducer,
        // cart: selectCartReducer,
        // filters: filterReducer,
        // selectCart: selectCartReducer,
        // order: orderReducer,


        // [productApi.reducerPath]: productApi.reducer,
        // [bannerApi.reducerPath]: bannerApi.reducer,
        // [variantApi.reducerPath]: variantApi.reducer,
        // [categoryApi.reducerPath]: categoryApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            // .concat(productApi.middleware)
            // .concat(bannerApi.middleware)
            // .concat(variantApi.middleware)
            // .concat(categoryApi.middleware)
            .concat(authApi.middleware)
            .concat(registerApi.middleware)
            .concat(subscriptionApi.middleware)
})

export default store;