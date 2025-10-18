"use client";

import Header from "@/components/layout/Header";
import ProductForm from "@/components/products/ProductForm";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { apiClient } from "@/lib/api/client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  clearCurrentProduct,
  fetchProductBySlug,
  updateProduct,
} from "@/lib/redux/productsSlice";
import type { ProductFormData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentProduct: product, loading } = useAppSelector(
    (state) => state.products
  );
  const { token, isAuthenticated } = useAppSelector((state) => state.auth);
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (token) {
      apiClient.setToken(token);
    }

    if (slug) {
      dispatch(fetchProductBySlug(slug));
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, slug, token, isAuthenticated, router]);

  const handleSubmit = async (data: ProductFormData) => {
    if (!product) return;

    try {
      await dispatch(updateProduct({ id: product.id, data })).unwrap();
      router.push(`/products/${slug}`);
    } catch (error) {
      console.error("Failed to update product:", error);
      throw error;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-baby-powder">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  const initialData: ProductFormData = {
    name: product.name,
    description: product.description,
    price: product.price,
    images: product.images,
    categoryId: product.category.id,
  };

  return (
    <div className="min-h-screen bg-baby-powder">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-sm">
          <button
            onClick={() => router.push("/products")}
            className="text-giants-orange hover:underline"
          >
            Products
          </button>
          <span className="text-gray-400">/</span>
          <button
            onClick={() => router.push(`/products/${slug}`)}
            className="text-giants-orange hover:underline"
          >
            {product.name}
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Edit</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-licorice mb-2">
            Edit Product
          </h1>
          <p className="text-gray-600">
            Update the details of {product.name}. All fields marked with * are
            required.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-200">
          <ProductForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isEdit
          />
        </div>
      </main>
    </div>
  );
}
