import { ProductsGrid } from "@/components/products/ProductsGrid";
import ProductsSearch from "@/components/products/ProductsSearch";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/actions/products";
import { Package, Plus } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Products - ProductHub",
  description: "Browse and manage your product catalog",
};

export const revalidate = 60;

interface ProductsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  const params = await searchParams;
  const searchQuery = params.search || "";

  const { products, error } = await fetchProducts({
    search: searchQuery,
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-giants-orange to-giants-orange/70 dark:from-mindaro dark:to-mindaro/70 bg-clip-text text-transparent">
          Products
        </h1>
        <p className="text-licorice/70 dark:text-baby-powder/80 text-lg">
          Browse, search, and manage your product catalog
        </p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="flex-1">
          <ProductsSearch initialValue={searchQuery} />
        </div>
        <Link href="/products/create">
          <Button size="lg" className="shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            Create Product
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6 text-center mb-8">
          <p className="text-red-600 dark:text-red-400 font-medium mb-2">
            Error Loading Products
          </p>
          <p className="text-red-500 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}

      {!error && products.length === 0 && (
        <div className="bg-white dark:bg-licorice/30 rounded-xl shadow-lg p-12 text-center border-2 border-licorice/10 dark:border-mindaro/20">
          <div className="flex justify-center mb-4">
            <Package className="w-16 h-16 text-licorice/40 dark:text-baby-powder/40" />
          </div>
          <h3 className="text-xl font-semibold text-licorice dark:text-baby-powder mb-2">
            {searchQuery ? "No products found" : "No products yet"}
          </h3>
          <p className="text-licorice/70 dark:text-baby-powder/70 mb-6">
            {searchQuery
              ? `No products match "${searchQuery}". Try a different search.`
              : "Get started by creating your first product."}
          </p>
          {!searchQuery && (
            <Link href="/products/create">
              <Button>Create Your First Product</Button>
            </Link>
          )}
        </div>
      )}

      {!error && products.length > 0 && <ProductsGrid products={products} />}
    </div>
  );
}
