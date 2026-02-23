import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// This interface matches your .js schema after it has been .populated('product')
export interface WishlistItem {
    _id: string; // The ID of the wishlist entry itself
    user: string;
    product: {
        _id: string;
        title: string;
        price: number;
        thumbnail: string;
        stockQuantity: number;
        discountPercentage: number;
    };
    note?: string;
}

interface WishlistState {
    items: WishlistItem[];
}

const initialState: WishlistState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        // Syncs global state with database response
        setWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
            state.items = action.payload;
        },
        // Optimistic removal for better UX
        removeFromWishlistLocal: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        clearWishlist: (state) => {
            state.items = [];
        }
    }
});

export const { setWishlist, removeFromWishlistLocal, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;