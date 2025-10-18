"use client";

import Header from "@/components/layout/Header";
import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { apiClient } from "@/lib/api/client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  deleteProduct,
  fetchProducts,
  searchProducts,
  setCurrentPage,
  setSearchQuery,
} from "@/lib/redux/productsSlice";
import { debounce } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ProductsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    items: products,
    loading,
    error,
    searchQuery,
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.products);
  const { token, isAuthenticated } = useAppSelector((state) => state.auth);

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (token) {
      apiClient.setToken(token);
    }

    const offset = (currentPage - 1) * itemsPerPage;
    if (searchQuery) {
      dispatch(
        searchProducts({
          searchedText: searchQuery,
          offset,
          limit: itemsPerPage,
        })
      );
    } else {
      dispatch(fetchProducts({ offset, limit: itemsPerPage }));
    }
  }, [
    dispatch,
    token,
    isAuthenticated,
    router,
    currentPage,
    itemsPerPage,
    searchQuery,
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(setSearchQuery(query));
      dispatch(setCurrentPage(1));
    }, 500),
    [dispatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    debouncedSearch(value);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await dispatch(deleteProduct(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-baby-powder">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-licorice mb-2">Products</h1>
          <p className="text-gray-600">
            Browse, search, and manage your product catalog
          </p>
        </div>

        {/* Search and Actions */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search products by name..."
              value={localSearchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => router.push("/products/create")}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 4v16m8-8H4" />
            </svg>
            Create Product
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-medium mb-2">
              Error Loading Products
            </p>
            <p className="text-red-500 text-sm">{error}</p>
            <Button
              variant="primary"
              size="sm"
              className="mt-4"
              onClick={() =>
                dispatch(
                  searchQuery
                    ? searchProducts({ searchedText: searchQuery })
                    : fetchProducts()
                )
              }
            >
              Retry
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && paginatedProducts.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-licorice mb-2">
              {searchQuery ? "No products found" : "No products yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? `No products match "${searchQuery}". Try a different search.`
                : "Get started by creating your first product."}
            </p>
            {!searchQuery && (
              <Button
                variant="primary"
                onClick={() => router.push("/products/create")}
              >
                Create Your First Product
              </Button>
            )}
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && paginatedProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                  isDeleting={deletingId === product.id}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  )
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}

            {/* Results Info */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of{" "}
              {products.length} products
            </p>
          </>
        )}
      </main>
    </div>
  );
}
