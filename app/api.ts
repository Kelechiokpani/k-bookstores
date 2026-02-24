import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "./store"


export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://k-bookstores-backend.onrender.com/",
        // baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            // 1. Get token from Redux state
            const token = (getState() as RootState).auth.token;
            // 2. If token exists (and you use Bearer auth), set the header
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }

            // 3. Ensure JSON is accepted
            headers.set("accept", "application/json");

            return headers;
        },
    }),
    tagTypes: [
        "User", "Products", "Orders", "Cart",
        "Brands", "Categories", "Address", "Reviews", "Wishlist"
    ],
    endpoints: () => ({})
})


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import type { RootState } from "./store"
//
// export const api = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({
//         // Fallback to localhost if env variable isn't set
//         baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/",
//
//         // IMPORTANT: This allows cookies to be sent with every request
//         prepareHeaders: (headers, { getState }) => {
//             const token = (getState() as RootState).auth.token;
//
//             if (token) {
//                 headers.set("authorization", `Bearer ${token}`);
//             }
//
//             // Set default content type
//             headers.set("accept", "application/json");
//
//             return headers;
//         },
//         // Required for HTTP-Only cookies to work with RTK Query
//         fetchFn: (input, init) => {
//             return fetch(input, { ...init, credentials: "include" });
//         },
//     }),
//     tagTypes: [
//         "User",
//         "Products",
//         "Orders",
//         "Cart",
//         "Brands",
//         "Categories",
//         "Address",
//         "Reviews",
//         "Wishlist"
//     ],
//     endpoints: () => ({})
// })