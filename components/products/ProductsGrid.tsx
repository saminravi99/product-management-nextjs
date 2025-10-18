"use client";

import { CategoryFilter } from "@/components/products/CategoryFilter";
import { Pagination } from "@/components/products/Pagination";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types";
import { Package } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || null;
  const currentPage = parseInt(searchParams.get("page") || "1");
  const itemsPerPage = parseInt(searchParams.get("limit") || "10");

  const updateURL = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category.name));
    return Array.from(cats).sort();
  }, [products]);

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      counts[p.category.name] = (counts[p.category.name] || 0) + 1;
    });
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.category.name === selectedCategory);
  }, [products, selectedCategory]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleCategoryChange = (category: string | null) => {
    updateURL({ category, page: "1" });
  };

  const handleItemsPerPageChange = (items: number) => {
    updateURL({ limit: items.toString(), page: "1" });
  };

  const handlePageChange = (page: number) => {
    updateURL({ page: page.toString() });
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="flex gap-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          productCounts={productCounts}
        />
        <div className="flex-1">
          <div className="bg-white dark:bg-licorice/30 rounded-xl shadow-lg p-12 text-center border-2 border-licorice/10 dark:border-mindaro/20">
            <div className="flex justify-center mb-4">
              <Package className="w-16 h-16 text-licorice/40 dark:text-baby-powder/40" />
            </div>
            <h3 className="text-xl font-semibold text-licorice dark:text-baby-powder mb-2">
              No products found
            </h3>
            <p className="text-licorice/70 dark:text-baby-powder/70 mb-6">
              {selectedCategory
                ? `No products in "${selectedCategory}" category.`
                : "No products available."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-80 flex-shrink-0">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          productCounts={productCounts}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-6">
          {paginatedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            totalItems={filteredProducts.length}
          />
        )}

        {totalPages === 1 && (
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-licorice dark:text-baby-powder">
                Show:
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="px-3 py-2 rounded-lg border-2 border-licorice/30 dark:border-mindaro/40 
                         bg-white dark:bg-licorice/60 text-licorice dark:text-baby-powder
                         text-sm font-medium focus:outline-none focus:ring-2 focus:ring-giants-orange dark:focus:ring-mindaro
                         hover:border-giants-orange dark:hover:border-mindaro transition-colors cursor-pointer shadow-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm font-medium text-licorice dark:text-baby-powder">
                items per page
              </span>
            </div>
            <span className="text-sm font-medium text-licorice dark:text-baby-powder">
              Showing {filteredProducts.length} of {filteredProducts.length}{" "}
              products
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
