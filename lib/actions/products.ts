"use server";

import type { Category, Product, ProductFormData } from "@/types";
import { revalidatePath, revalidateTag } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bitechx.com";

// Helper to get auth token from cookies (you can implement this based on your auth strategy)
async function getAuthToken(): Promise<string | null> {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get("token")?.value || null;
}

// Products Actions
export async function fetchProducts(params?: {
    offset?: number;
    limit?: number;
    categoryId?: string;
    search?: string;
}): Promise<{ products: Product[]; total: number; error?: string }> {
    const token = await getAuthToken();

    // If search is provided, use search endpoint
    if (params?.search && params.search.trim()) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/products/search?searchedText=${encodeURIComponent(params.search)}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                return { products: [], total: 0, error: "Failed to search products" };
            }

            const products = await response.json();
            return { products, total: products.length };
        } catch (error) {
            console.error("Error searching products:", error);
            return { products: [], total: 0, error: "Failed to search products" };
        }
    }

    const queryParams = new URLSearchParams();
    if (params?.offset !== undefined) queryParams.append("offset", String(params.offset));
    if (params?.limit !== undefined) queryParams.append("limit", String(params.limit));
    if (params?.categoryId) queryParams.append("categoryId", params.categoryId);

    const endpoint = `${API_BASE_URL}/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    try {
        const response = await fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            next: {
                revalidate: 60,
                tags: ["products"],
            },
        });

        if (!response.ok) {
            return { products: [], total: 0, error: `Failed to fetch products: ${response.statusText}` };
        }

        const products = await response.json();
        return { products, total: products.length };
    } catch (error) {
        console.error("Error fetching products:", error);
        return { products: [], total: 0, error: "Failed to fetch products" };
    }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
    const token = await getAuthToken();

    try {
        const response = await fetch(`${API_BASE_URL}/products/${slug}`, {
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            next: {
                revalidate: 3600, // Cache for 1 hour (ISR)
                tags: ["products", `product-${slug}`],
            },
        });

        if (!response.ok) {
            return null;
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export async function searchProducts(searchText: string): Promise<Product[]> {
    const token = await getAuthToken();

    if (!searchText.trim()) {
        return [];
    }

    try {
        const response = await fetch(
            `${API_BASE_URL}/products/search?searchedText=${encodeURIComponent(searchText)}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                cache: "no-store", // Always fresh for search
            }
        );

        if (!response.ok) {
            throw new Error("Failed to search products");
        }

        return response.json();
    } catch (error) {
        console.error("Error searching products:", error);
        return [];
    }
}

export async function createProduct(data: ProductFormData): Promise<{ success: boolean; product?: Product; error?: string }> {
    const token = await getAuthToken();

    if (!token) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: "Failed to create product" }));
            return { success: false, error: error.message };
        }

        const product = await response.json();

        // Revalidate products list
        revalidateTag("products");
        revalidatePath("/products");

        return { success: true, product };
    } catch (error) {
        console.error("Error creating product:", error);
        return { success: false, error: "Failed to create product" };
    }
}

export async function updateProduct(
    id: string,
    data: Partial<ProductFormData>
): Promise<{ success: boolean; product?: Product; error?: string }> {
    const token = await getAuthToken();

    if (!token) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: "Failed to update product" }));
            return { success: false, error: error.message };
        }

        const product = await response.json();

        // Revalidate products list and specific product
        revalidateTag("products");
        revalidateTag(`product-${product.slug}`);
        revalidatePath("/products");
        revalidatePath(`/products/${product.slug}`);

        return { success: true, product };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, error: "Failed to update product" };
    }
}

export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
    const token = await getAuthToken();

    if (!token) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: "Failed to delete product" }));
            return { success: false, error: error.message };
        }

        // Revalidate products list
        revalidateTag("products");
        revalidatePath("/products");

        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, error: "Failed to delete product" };
    }
}

// Categories Actions
export async function fetchCategories(): Promise<Category[]> {
    const token = await getAuthToken();

    try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            next: {
                revalidate: 3600, // Cache for 1 hour (ISR)
                tags: ["categories"],
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

// Auth Actions
export async function authenticateUser(email: string): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            return { success: false, error: "Failed to authenticate" };
        }

        const data = await response.json();

        // Set auth token in cookie
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        cookieStore.set("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        cookieStore.set("user_email", email, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return { success: true, token: data.token };
    } catch (error) {
        console.error("Error authenticating:", error);
        return { success: false, error: "Authentication failed" };
    }
}

export async function logoutUser(): Promise<void> {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("user_email");
    revalidatePath("/");
}
