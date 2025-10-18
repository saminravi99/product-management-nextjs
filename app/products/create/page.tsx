import ProductForm from "@/components/products/ProductForm";
import { createProduct, fetchCategories } from "@/lib/actions/products";
import type { ProductFormData } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product - ProductHub",
  description: "Add a new product to your catalog",
};

export default async function CreateProductPage() {
  const categories = await fetchCategories();

  const handleSubmit = async (data: ProductFormData) => {
    "use server";
    await createProduct(data);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-licorice dark:text-baby-powder mb-2">
          Create New Product
        </h1>
        <p className="text-licorice/70 dark:text-baby-powder/80 text-lg">
          Add a new product to your catalog. All fields marked with * are
          required.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1a1614] rounded-xl shadow-xl dark:shadow-mindaro/20 p-6 sm:p-8 border-2 border-licorice/20 dark:border-mindaro/40">
        <ProductForm onSubmit={handleSubmit} categories={categories} />
      </div>
    </div>
  );
}
