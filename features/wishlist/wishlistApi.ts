import { api } from "@/app/api";

// Assuming WishlistItem contains { _id: string, product: Product, user: string }
export const wishlistApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query<any[], void>({
            query: () => "/wishlist",
            providesTags: ["Wishlist"]
        }),

        addToWishlist: builder.mutation<any, { product: string; note?: string }>({
            query: (body) => ({
                url: "/wishlist",
                method: "POST",
                body
            }),
            invalidatesTags: ["Wishlist"]
        }),

        deleteWishlist: builder.mutation<{ message: string; _id: string }, string>({
            query: (id) => ({
                url: `/wishlist/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Wishlist"]
        }),

        clearWishlist: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: "/wishlist/reset",
                method: "DELETE"
            }),
            invalidatesTags: ["Wishlist"]
        })
    })
});

export const {
    useGetWishlistQuery,
    useAddToWishlistMutation,
    useDeleteWishlistMutation,
    useClearWishlistMutation
} = wishlistApi;