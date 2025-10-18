"use client";

import Header from "@/components/layout/Header";
import ProductForm from "@/components/products/ProductForm";
import { apiClient } from "@/lib/api/client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { createProduct } from "@/lib/redux/productsSlice";
import type { ProductFormData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateProductPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (token) {
      apiClient.setToken(token);
    }
  }, [token, isAuthenticated, router]);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await dispatch(createProduct(data)).unwrap();
      router.push("/products");
    } catch (error) {
      console.error("Failed to create product:", error);
      throw error;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-baby-powder">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-licorice mb-2">
            Create New Product
          </h1>
          <p className="text-gray-600">
            Add a new product to your catalog. All fields marked with * are
            required.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-200">
          <ProductForm onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
}
