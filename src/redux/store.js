import { configureStore } from '@reduxjs/toolkit'
import registerApi from './features/api/registerApi/registerApi';
import authReducer from "./features/slice/authSlice";
import authApi from './features/api/auth/authApi';
import subscriptionApi from './features/api/subscribtionApi';
import productApi from './features/api/productApi';
import bannerApi from './features/api/bannerApi';
import variantApi from './features/api/variantApi';
import categoryApi from './features/api/categoryApi';
import couponApi from './features/api/couponApi';
import checkoutApi from './features/api/checkoutApi';
import selectCartReducer from "./features/slice/cartSlice";

import searchReducer from "./features/slice/searchSlice";
import cartReducer from "./features/slice/cartSlice";
import wishListApi from './features/api/wishListApi';
import wishlistByUserAPI from './features/api/wishlistByUserAPI';

// import productApi from './features/api/productApi';
// import bannerApi from './features/api/bannerApi';
// import variantApi from './features/api/variantApi';
// import categoryApi from './features/api/categoryApi';
// import selectCartReducer from "./features/slice/cartSlice";
// import authReducer from "./features/slice/authSlice";

const store = configureStore({
    reducer: {

        search: searchReducer,
        auth: authReducer,
        cart: cartReducer,
        // filters: filterReducer,
        selectCart: selectCartReducer,
        // order: orderReducer,
      
     
        // filters: filterReducer,
       
        // order: orderReducer,


      
        
        [couponApi.reducerPath]: couponApi.reducer,
        [checkoutApi.reducerPath]: checkoutApi.reducer,

        [productApi.reducerPath]: productApi.reducer,
        [bannerApi.reducerPath]: bannerApi.reducer,
        [variantApi.reducerPath]: variantApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [subscriptionApi.reducerPath]: subscriptionApi.reducer,
        [wishListApi.reducerPath]: wishListApi.reducer,
        [wishlistByUserAPI.reducerPath]: wishlistByUserAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(bannerApi.middleware)
            .concat(variantApi.middleware)
            .concat(categoryApi.middleware)
            .concat(authApi.middleware)
            .concat(registerApi.middleware)
            .concat(subscriptionApi.middleware)
            .concat(wishListApi.middleware)
            .concat(wishlistByUserAPI.middleware)
})

export default store;