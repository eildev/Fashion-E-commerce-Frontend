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
import filterReducer from "./features/slice/filterSlice";
import searchReducer from "./features/slice/searchSlice";
import compareReducer from "./features/slice/compareSlice";
import cartReducer from "./features/slice/cartSlice";
import wishListApi from './features/api/wishListApi';
import wishlistByUserAPI from './features/api/wishlistByUserAPI';
import brandApi from './features/api/brandApi';
import userApi from './features/api/userApi';
import tagViewApi from './features/api/tagViewApi';
import reviewApi from './features/api/reviewApi';
import reviewGetApi from './features/api/reviewGetApi';
import blogCategoryApi from './features/api/blogCategoryApi';
import blogApi from './features/api/blogApi';
import orderGetApi from './features/api/orderGetApi';
import orderHistoryApi from './features/api/orderHistoryAPi';

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
        filters: filterReducer,
        selectCart: selectCartReducer,
        compare: compareReducer,
   
        // order: orderReducer,
      
     
        // filters: filterReducer,
       
        // order: orderReducer,


      
        
        [couponApi.reducerPath]: couponApi.reducer,
        [checkoutApi.reducerPath]: checkoutApi.reducer,

        [productApi.reducerPath]: productApi.reducer,
        [bannerApi.reducerPath]: bannerApi.reducer,
        [variantApi.reducerPath]: variantApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [brandApi.reducerPath]: brandApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [subscriptionApi.reducerPath]: subscriptionApi.reducer,
        [wishListApi.reducerPath]: wishListApi.reducer,
        [wishlistByUserAPI.reducerPath]: wishlistByUserAPI.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [tagViewApi.reducerPath]: tagViewApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [reviewGetApi.reducerPath]: reviewGetApi.reducer,
        [blogCategoryApi.reducerPath]: blogCategoryApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [orderGetApi.reducerPath]: orderGetApi.reducer,
        [orderHistoryApi.reducerPath]: orderHistoryApi.reducer,
     
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(bannerApi.middleware)
            .concat(variantApi.middleware)
            .concat(categoryApi.middleware)
            .concat(brandApi.middleware)
            .concat(authApi.middleware)
            .concat(registerApi.middleware)
            .concat(subscriptionApi.middleware)
            .concat(wishListApi.middleware)
            .concat(wishlistByUserAPI.middleware)
            .concat(userApi.middleware)
            .concat(tagViewApi.middleware)
            .concat(reviewApi.middleware)
            .concat(reviewGetApi.middleware)
            .concat(blogCategoryApi.middleware)
            .concat(blogApi.middleware)
            .concat(checkoutApi.middleware)
            .concat(couponApi.middleware)
            .concat(orderGetApi.middleware)
            .concat(orderHistoryApi.middleware)
})

export default store;