import { productsApi } from "@/lib/api";
import type { PaginationParams, Product, SearchParams } from "@/types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductsState {
    items: Product[];
    currentProduct: Product | null;
    loading: boolean;
    error: string | null;
    searchQuery: string;
    totalCount: number;
    currentPage: number;
    itemsPerPage: number;
}

const initialState: ProductsState = {
    items: [],
    currentProduct: null,
    loading: false,
    error: null,
    searchQuery: "",
    totalCount: 0,
    currentPage: 1,
    itemsPerPage: 12,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (params?: PaginationParams) => {
        const response = await productsApi.getAll(params);
        return response;
    }
);

export const fetchProductBySlug = createAsyncThunk(
    "products/fetchProductBySlug",
    async (slug: string) => {
        const response = await productsApi.getBySlug(slug);
        return response;
    }
);

export const searchProducts = createAsyncThunk(
    "products/searchProducts",
    async (params: SearchParams) => {
        const response = await productsApi.search(params);
        return response;
    }
);

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (data: any) => {
        const response = await productsApi.create(data);
        return response;
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, data }: { id: string; data: any }) => {
        const response = await productsApi.update(id, data);
        return response;
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id: string) => {
        await productsApi.delete(id);
        return id;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch products
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.totalCount = action.payload.length;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch products";
            });

        // Fetch product by slug
        builder
            .addCase(fetchProductBySlug.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductBySlug.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch product";
            });

        // Search products
        builder
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.totalCount = action.payload.length;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to search products";
            });

        // Create product
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload);
                state.totalCount += 1;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create product";
            });

        // Update product
        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.currentProduct = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update product";
            });

        // Delete product
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((p) => p.id !== action.payload);
                state.totalCount -= 1;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete product";
            });
    },
});

export const { setSearchQuery, setCurrentPage, clearCurrentProduct, clearError } =
    productsSlice.actions;
export default productsSlice.reducer;
