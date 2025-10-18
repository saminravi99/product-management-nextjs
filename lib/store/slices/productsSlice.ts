import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ProductsState {
    selectedCategory: string | null;
    currentPage: number;
    itemsPerPage: number;
    searchQuery: string;
}

const initialState: ProductsState = {
    selectedCategory: null,
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: "",
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<string | null>) => {
            state.selectedCategory = action.payload;
            state.currentPage = 1; // Reset to first page when category changes
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload;
            state.currentPage = 1; // Reset to first page when items per page changes
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.currentPage = 1; // Reset to first page when search changes
        },
        resetFilters: (state) => {
            state.selectedCategory = null;
            state.currentPage = 1;
            state.searchQuery = "";
        },
    },
});

export const {
    setSelectedCategory,
    setCurrentPage,
    setItemsPerPage,
    setSearchQuery,
    resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
