export interface Category {
    id: string;
    name: string;
    description: string | null;
    image: string;
    createdAt: string;
    updatedAt?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    slug: string;
    createdAt: string;
    updatedAt: string;
    category: Category;
}

export interface ProductFormData {
    name: string;
    description: string;
    images: string[];
    price: number;
    categoryId: string;
}

export interface ProductsResponse {
    products: Product[];
    total: number;
    offset: number;
    limit: number;
}

export interface AuthResponse {
    token: string;
}

export interface AuthRequest {
    email: string;
}

export interface ApiError {
    message: string;
    statusCode?: number;
}

export interface PaginationParams {
    offset?: number;
    limit?: number;
}

export interface SearchParams extends PaginationParams {
    searchedText: string;
}

export interface FilterParams extends PaginationParams {
    categoryId?: string;
}
