import ProductCard from "@/components/products/ProductCard";
import ProductsSearch from "@/components/products/ProductsSearch";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/actions/products";
import type { Product } from "@/types";
import { Package, Plus } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Products - ProductHub",
  description: "Browse and manage your product catalog",
};

interface ProductsPageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
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
  const currentPage = parseInt(params.page || "1");
  const itemsPerPage = 12;
  const offset = (currentPage - 1) * itemsPerPage;

  const { products, total, error } = await fetchProducts({
    search: searchQuery,
    offset,
    limit: itemsPerPage,
  });

  const totalPages = Math.ceil((total || 0) / itemsPerPage);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[licorice] mb-2">Products</h1>
        <p className="text-[licorice]/70">
          Browse, search, and manage your product catalog
        </p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="flex-1">
          <ProductsSearch initialValue={searchQuery} />
        </div>
        <Button asChild>
          <Link href="/products/create">
            <Plus className="w-5 h-5 mr-2" />
            Create Product
          </Link>
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center mb-8">
          <p className="text-red-600 font-medium mb-2">
            Error Loading Products
          </p>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {!error && products.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center border-2 border-[licorice]">
          <div className="flex justify-center mb-4">
            <Package className="w-16 h-16 text-[licorice]/40" />
          </div>
          <h3 className="text-xl font-semibold text-[licorice] mb-2">
            {searchQuery ? "No products found" : "No products yet"}
          </h3>
          <p className="text-[licorice]/70 mb-6">
            {searchQuery
              ? `No products match "${searchQuery}". Try a different search.`
              : "Get started by creating your first product."}
          </p>
          {!searchQuery && (
            <Button asChild>
              <Link href="/products/create">Create Your First Product</Link>
            </Button>
          )}
        </div>
      )}

      {!error && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {currentPage > 1 && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/products?${new URLSearchParams({
                      ...(searchQuery && { search: searchQuery }),
                      page: String(currentPage - 1),
                    })}`}
                  >
                    Previous
                  </Link>
                </Button>
              )}

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    asChild
                  >
                    <Link
                      href={`/products?${new URLSearchParams({
                        ...(searchQuery && { search: searchQuery }),
                        page: String(pageNum),
                      })}`}
                    >
                      {pageNum}
                    </Link>
                  </Button>
                );
              })}

              {currentPage < totalPages && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/products?${new URLSearchParams({
                      ...(searchQuery && { search: searchQuery }),
                      page: String(currentPage + 1),
                    })}`}
                  >
                    Next
                  </Link>
                </Button>
              )}
            </div>
          )}

          <p className="text-center text-sm text-licorice/70 mt-4">
            Showing {offset + 1}-{Math.min(offset + itemsPerPage, total || 0)}{" "}
            of {total} products
          </p>
        </>
      )}
    </div>
  );
}
