import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Mirroring your .js schema's "Mixed" types for the frontend
export interface Order {
    _id: string;
    user: string;
    item: any[]; // The items captured at the time of purchase
    address: any; // The shipping address used
    status: 'Pending' | 'Dispatched' | 'Out for delivery' | 'Cancelled';
    paymentMode: 'COD' | 'UPI' | 'CARD';
    total: number;
    createdAt: string;
}

interface OrderState {
    currentCheckoutStep: number;
    selectedPaymentMode: 'COD' | 'UPI' | 'CARD';
}

const initialState: OrderState = {
    currentCheckoutStep: 0,
    selectedPaymentMode: 'COD',
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setCheckoutStep: (state, action: PayloadAction<number>) => {
            state.currentCheckoutStep = action.payload;
        },
        setPaymentMode: (state, action: PayloadAction<'COD' | 'UPI' | 'CARD'>) => {
            state.selectedPaymentMode = action.payload;
        },
        resetCheckout: (state) => {
            state.currentCheckoutStep = 0;
            state.selectedPaymentMode = 'COD';
        }
    }
});

export const { setCheckoutStep, setPaymentMode, resetCheckout } = orderSlice.actions;
export default orderSlice.reducer;