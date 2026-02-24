import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import wishlistReducer from "@/features/wishlist/wishlistSlice";
import productReducer from "@/features/products/productSlice";
import categoryReducer from "@/features/category/categorySlice";
import orderReducer from "@/features/orders/orderSlice";
import reviewReducer from "@/features/reviews/reviewSlice";
import brandReducer from "@/features/brands/brandSlice";
import { rtkQueryErrorLogger } from "./middleware";



export const store = configureStore({
    reducer: {
        // RTK Query API Reducer
        [api.reducerPath]: api.reducer,

        // Feature Reducers
        auth: authReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        products: productReducer,
        categories: categoryReducer,
        brands: brandReducer,
        orders: orderReducer,
        reviews: reviewReducer,
    },


    // Middleware configuration
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false,}).concat(api.middleware)
            .concat(rtkQueryErrorLogger),

    // Enable Redux DevTools only in development
    devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;