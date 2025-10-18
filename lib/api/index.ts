import { apiClient } from "./client";
import type {
  AuthRequest,
  AuthResponse,
  Product,
  Category,
  ProductFormData,
  PaginationParams,
  SearchParams,
} from "@/types";

// Auth API
export const authApi = {
  login: async (email: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth", { email });
    if (response.token) {
      apiClient.setToken(response.token);
    }
    return response;
  },
};

// Products API
export const productsApi = {
  getAll: async (params?: PaginationParams): Promise<Product[]> => {
    const queryParams = new URLSearchParams();
    if (params?.offset !== undefined) queryParams.append("offset", String(params.offset));
    if (params?.limit !== undefined) queryParams.append("limit", String(params.limit));
    
    const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    return apiClient.get<Product[]>(endpoint);
  },

  getBySlug: async (slug: string): Promise<Product> => {
    return apiClient.get<Product>(`/products/${slug}`);
  },

  search: async (searchParams: SearchParams): Promise<Product[]> => {
    const queryParams = new URLSearchParams();
    queryParams.append("searchedText", searchParams.searchedText);
    if (searchParams.offset !== undefined) queryParams.append("offset", String(searchParams.offset));
    if (searchParams.limit !== undefined) queryParams.append("limit", String(searchParams.limit));
    
    return apiClient.get<Product[]>(`/products/search?${queryParams.toString()}`);
  },

  filterByCategory: async (categoryId: string, params?: PaginationParams): Promise<Product[]> => {
    const queryParams = new URLSearchParams();
    queryParams.append("categoryId", categoryId);
    if (params?.offset !== undefined) queryParams.append("offset", String(params.offset));
    if (params?.limit !== undefined) queryParams.append("limit", String(params.limit));
    
    return apiClient.get<Product[]>(`/products?${queryParams.toString()}`);
  },

  create: async (data: ProductFormData): Promise<Product> => {
    return apiClient.post<Product>("/products", data);
  },

  update: async (id: string, data: Partial<ProductFormData>): Promise<Product> => {
    return apiClient.put<Product>(`/products/${id}`, data);
  },

  delete: async (id: string): Promise<Product> => {
    return apiClient.delete<Product>(`/products/${id}`);
  },
};

// Categories API
export const categoriesApi = {
  getAll: async (params?: PaginationParams): Promise<Category[]> => {
    const queryParams = new URLSearchParams();
    if (params?.offset !== undefined) queryParams.append("offset", String(params.offset));
    if (params?.limit !== undefined) queryParams.append("limit", String(params.limit));
    
    const endpoint = `/categories${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    return apiClient.get<Category[]>(endpoint);
  },

  search: async (searchText: string): Promise<Category[]> => {
    const queryParams = new URLSearchParams();
    queryParams.append("searchedText", searchText);
    return apiClient.get<Category[]>(`/categories/search?${queryParams.toString()}`);
  },
};
