"use client";

import { CategoryFilter } from "@/components/products/CategoryFilter";
import { Pagination } from "@/components/products/Pagination";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types";
import { Package } from "lucide-react";
import { useMemo, useState } from "react";

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category.name));
    return Array.from(cats).sort();
  }, [products]);

  // Get product counts by category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      counts[p.category.name] = (counts[p.category.name] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.category.name === selectedCategory);
  }, [products, selectedCategory]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Reset to page 1 when category or items per page changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
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
    <div className="flex gap-6">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        productCounts={productCounts}
      />

      <div className="flex-1 min-w-0">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-6">
          {paginatedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            totalItems={filteredProducts.length}
          />
        )}

        {/* Results summary for single page */}
        {totalPages === 1 && (
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-licorice/70 dark:text-baby-powder/70">
                Show:
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="px-3 py-1.5 rounded-lg border-2 border-licorice/20 dark:border-mindaro/30 
                         bg-white dark:bg-licorice/50 text-licorice dark:text-baby-powder
                         text-sm focus:outline-none focus:ring-2 focus:ring-giants-orange
                         hover:border-giants-orange transition-colors cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-licorice/70 dark:text-baby-powder/70">
                items per page
              </span>
            </div>
            <span className="text-sm text-licorice/70 dark:text-baby-powder/70">
              Showing {filteredProducts.length} of {filteredProducts.length}{" "}
              products
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
