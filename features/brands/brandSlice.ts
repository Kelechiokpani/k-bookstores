import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Mirroring your .js schema
export interface Brand {
    _id: string;
    name: string;
}

interface BrandState {
    items: Brand[];
    activeBrand: string | null;
}

const initialState: BrandState = {
    items: [],
    activeBrand: null,
};

const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        setBrands: (state, action: PayloadAction<Brand[]>) => {
            state.items = action.payload;
        },
        setActiveBrand: (state, action: PayloadAction<string | null>) => {
            state.activeBrand = action.payload;
        },
        resetBrandFilter: (state) => {
            state.activeBrand = null;
        }
    },
});

export const { setBrands, setActiveBrand, resetBrandFilter } = brandSlice.actions;
export default brandSlice.reducer;