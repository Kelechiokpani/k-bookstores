import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Mirroring your .js schema for the Frontend
export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    category: string; // ID or populated object
    brand: string;    // ID or populated object
    stockQuantity: number;
    thumbnail: string;
    images: string[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ProductState {
    searchTerm: string;
    selectedCategory: string | null;
    sortBy: string;
}

const initialState: ProductState = {
    searchTerm: "",
    selectedCategory: null,
    sortBy: "newest",
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
    },
});

export const { setSearchTerm, setCategory, setSortBy } = productSlice.actions;
export default productSlice.reducer;