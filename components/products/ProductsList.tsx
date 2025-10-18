"use client";

import CategoryFilterSkeleton from "@/components/products/CategoryFilterSkeleton";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import ProductsGridSkeleton from "@/components/products/ProductsGridSkeleton";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/actions/products";
import type { Product } from "@/types";
import { Package } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductsListProps {
  searchQuery: string;
}

export default function ProductsList({ searchQuery }: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);

      const { products: fetchedProducts, error: fetchError } =
        await fetchProducts({
          search: searchQuery,
        });

      if (fetchError) {
        setError(fetchError);
      } else {
        setProducts(fetchedProducts);
      }

      setIsLoading(false);
    };

    loadProducts();
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        <CategoryFilterSkeleton />
        <div className="flex-1">
          <ProductsGridSkeleton count={8} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6 text-center mb-8">
        <p className="text-red-600 dark:text-red-400 font-medium mb-2">
          Error Loading Products
        </p>
        <p className="text-red-500 dark:text-red-300 text-sm">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
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
    );
  }

  return <ProductsGrid products={products} />;
}
