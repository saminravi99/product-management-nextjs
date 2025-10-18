import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProductForm from "@/components/products/ProductForm";
import { createProduct, fetchCategories } from "@/lib/actions/products";
import type { ProductFormData } from "@/types";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Product - ProductHub",
  description: "Add a new product to your catalog",
};

export default async function CreateProductPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  const categories = await fetchCategories();

  const handleSubmit = async (data: ProductFormData) => {
    "use server";
    await createProduct(data);
  };

  return (
    <div className="min-h-screen bg-[baby-powder] flex flex-col">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[licorice] mb-2">
            Create New Product
          </h1>
          <p className="text-[licorice]/70">
            Add a new product to your catalog. All fields marked with * are
            required.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border-2 border-[licorice]">
          <ProductForm onSubmit={handleSubmit} categories={categories} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
