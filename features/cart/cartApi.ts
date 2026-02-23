import { api } from "@/app/api";
import { CartItem } from "@/features/cart/cartSlice";

export const cartApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<CartItem[], void>({
            query: () => "/cart",
            providesTags: ["Cart"],
        }),

        addToCart: builder.mutation<CartItem, { product: string; quantity: number }>({
            query: (data) => ({
                url: "/cart",
                method: "POST",
                body: data, // Matches { product: "id", quantity: 1 }
                credentials: 'include',
            }),
            invalidatesTags: ["Cart"]
        }),

        updateCartQuantity: builder.mutation<CartItem, { cartId: string; quantity: number }>({
            query: ({ cartId, quantity }) => ({
                url: `/cart/${cartId}`,
                method: "PATCH",
                body: { quantity },
                credentials: 'include',
            }),
            invalidatesTags: ["Cart"]
        }),

        removeFromCart: builder.mutation<{ success: boolean }, string>({
            query: (cartId) => ({
                url: `/cart/${cartId}`,
                method: "DELETE",
                credentials: 'include',
            }),
            invalidatesTags: ["Cart"]
        }),

        // DELETE /cart/reset
        clearCart: builder.mutation<void, void>({
            query: () => ({
                url: "/cart/reset",
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"]
        })
    })
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartQuantityMutation,
    useRemoveFromCartMutation,
    useClearCartMutation
} = cartApi;