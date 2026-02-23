import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Mirroring your .js schema
export interface Category {
    _id: string;
    name: string;
}

interface CategoryState {
    items: Category[];
    activeCategory: string | null;
}

const initialState: CategoryState = {
    items: [],
    activeCategory: null,
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.items = action.payload;
        },
        setActiveCategory: (state, action: PayloadAction<string | null>) => {
            state.activeCategory = action.payload;
        },
    },
});

export const { setCategories, setActiveCategory } = categorySlice.actions;
export default categorySlice.reducer;