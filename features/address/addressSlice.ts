import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Mirroring your .js schema
export interface Address {
    _id: string;
    user: string;
    street: string;
    city: string;
    state: string;
    phoneNumber: string;
    postalCode: string;
    country: string;
    type: string; // e.g., 'Home', 'Work'
}

interface AddressState {
    items: Address[];
    selectedAddressId: string | null;
}

const initialState: AddressState = {
    items: [],
    selectedAddressId: null,
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        setAddresses: (state, action: PayloadAction<Address[]>) => {
            state.items = action.payload;
            // Auto-select the first address if none is selected
            if (!state.selectedAddressId && action.payload.length > 0) {
                state.selectedAddressId = action.payload[0]._id;
            }
        },
        selectAddress: (state, action: PayloadAction<string>) => {
            state.selectedAddressId = action.payload;
        },
        clearAddressState: (state) => {
            state.items = [];
            state.selectedAddressId = null;
        }
    }
});

export const { setAddresses, selectAddress, clearAddressState } = addressSlice.actions;
export default addressSlice.reducer;