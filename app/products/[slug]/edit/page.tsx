import Header from "@/components/layout/Header";
import ProductForm from "@/components/products/ProductForm";
import { Button } from "@/components/ui/button";
import {
  fetchCategories,
  fetchProductBySlug,
  updateProduct,
} from "@/lib/actions/products";
import type { ProductFormData } from "@/types";
import { Package } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EditProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  return {
    title: product
      ? `Edit ${product.name} - ProductHub`
      : "Edit Product - ProductHub",
  };
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  const { slug } = await params;
  const [product, categories] = await Promise.all([
    fetchProductBySlug(slug),
    fetchCategories(),
  ]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f7f7f2]">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-md p-12 text-center border-2 border-[#261c15]">
            <Package className="w-16 h-16 text-[#261c15]/40 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#261c15] mb-2">
              Product Not Found
            </h2>
            <p className="text-[#261c15]/70 mb-6">
              The product you&apos;re trying to edit doesn&apos;t exist.
            </p>
            <Button asChild>
              <Link href="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleSubmit = async (data: ProductFormData) => {
    "use server";
    await updateProduct(product.id, data);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f2]">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#261c15] mb-2">
            Edit Product
          </h1>
          <p className="text-[#261c15]/70">
            Update product information. All fields marked with * are required.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border-2 border-[#261c15]">
          <ProductForm
            initialData={{
              name: product.name,
              description: product.description,
              price: product.price,
              images: product.images,
              categoryId: product.category.id,
              id: product.id,
            }}
            onSubmit={handleSubmit}
            isEdit
            categories={categories}
          />
        </div>
      </main>
    </div>
  );
}
