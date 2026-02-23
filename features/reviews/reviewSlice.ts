import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Matches your .js schema
export interface Review {
    _id: string;
    user: {
        _id: string;
        name: string;
    } | string; // Can be populated or just ID
    product: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface ReviewState {
    userReviews: Review[];
    lastSubmittedReview: Review | null;
}

const initialState: ReviewState = {
    userReviews: [],
    lastSubmittedReview: null,
};

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        setReviews: (state, action: PayloadAction<Review[]>) => {
            state.userReviews = action.payload;
        },
        addReviewToState: (state, action: PayloadAction<Review>) => {
            state.userReviews.unshift(action.payload);
            state.lastSubmittedReview = action.payload;
        },
        clearReviewFeedback: (state) => {
            state.lastSubmittedReview = null;
        }
    }
});

export const { setReviews, addReviewToState, clearReviewFeedback } = reviewSlice.actions;
export default reviewSlice.reducer;