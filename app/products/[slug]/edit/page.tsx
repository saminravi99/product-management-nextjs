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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-licorice/30 rounded-xl shadow-md dark:shadow-mindaro/10 p-12 text-center border-2 border-licorice dark:border-mindaro/20">
          <Package className="w-16 h-16 text-licorice/40 dark:text-baby-powder/40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-licorice dark:text-baby-powder mb-2">
            Product Not Found
          </h2>
          <p className="text-licorice/70 dark:text-baby-powder/70 mb-6">
            The product you&apos;re trying to edit doesn&apos;t exist.
          </p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: ProductFormData) => {
    "use server";
    await updateProduct(product.id, data);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-licorice dark:text-baby-powder mb-2">
          Edit Product
        </h1>
        <p className="text-licorice/70 dark:text-baby-powder/80 text-lg">
          Update product information. All fields marked with * are required.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1a1614] rounded-xl shadow-xl dark:shadow-mindaro/20 p-6 sm:p-8 border-2 border-licorice/20 dark:border-mindaro/40">
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
    </div>
  );
}
