import { api } from "@/app/api";
import { Review } from "./reviewSlice";


export const reviewApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Get reviews for a specific product
        getProductReviews: builder.query<Review[], string>({
            query: (productId) => `/reviews/product/${productId}`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ _id }) => ({ type: 'Reviews' as const, id: _id })), 'Reviews']
                    : ['Reviews'],
        }),

        // Matches your schema requirements
        addReview: builder.mutation<Review, { product: string; rating: number; comment: string }>({
            query: (data) => ({
                url: "/reviews",
                method: "POST",
                body: data
            }),
            // Invalidates 'Products' to update the average rating on the product card
            invalidatesTags: ["Reviews", "Products"]
        }),

        // Optional: Delete a review
        deleteReview: builder.mutation<{ success: boolean }, string>({
            query: (reviewId) => ({
                url: `/reviews/${reviewId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Reviews", "Products"]
        })
    })
});

export const {
    useAddReviewMutation,
    useGetProductReviewsQuery,
    useDeleteReviewMutation
} = reviewApi;