import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    _id: any;
    product: {
        _id: string;
        title: string;
        price: number;
        images: string[];
        stockQuantity: number;
        discountPercentage: number;
    };
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Use this when the API returns the full cart list
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.product._id === action.payload.product._id);

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        // Optimistic local update (optional if you rely purely on API refetching)
        updateLocalQuantity: (state, action: PayloadAction<{ cartId: string; quantity: number }>) => {
            const item = state.items.find((i) => i._id === action.payload.cartId);
            if (item) {
                item.quantity = Math.max(1, Math.min(action.payload.quantity, item.product.stockQuantity));
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addToCart, updateLocalQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;