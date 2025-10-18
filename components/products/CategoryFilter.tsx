"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  productCounts?: Record<string, number>;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  productCounts = {},
}: CategoryFilterProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const FilterContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-4 border-b-2 border-licorice/20 dark:border-mindaro/30">
        <h3 className="text-lg font-bold text-licorice dark:text-baby-powder">
          Categories
        </h3>
        {selectedCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onCategoryChange(null);
              setIsMobileOpen(false);
            }}
            className="text-xs"
          >
            Clear
          </Button>
        )}
      </div>

      <button
        onClick={() => {
          onCategoryChange(null);
          setIsMobileOpen(false);
        }}
        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold ${
          selectedCategory === null
            ? "bg-giants-orange dark:bg-mindaro text-white dark:text-licorice shadow-lg border-2 border-giants-orange dark:border-mindaro"
            : "bg-white dark:bg-[#1a1614] hover:bg-giants-orange/10 dark:hover:bg-mindaro/20 text-licorice dark:text-baby-powder border-2 border-licorice/20 dark:border-mindaro/40 hover:border-giants-orange dark:hover:border-mindaro shadow-sm"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-bold">All Products</span>
          {productCounts.all && (
            <span
              className={`text-sm px-2.5 py-1 rounded-md font-bold ${
                selectedCategory === null
                  ? "bg-white/30 dark:bg-licorice/30 text-white dark:text-licorice"
                  : "bg-giants-orange/15 dark:bg-mindaro/20 text-giants-orange dark:text-mindaro"
              }`}
            >
              {productCounts.all}
            </span>
          )}
        </div>
      </button>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              onCategoryChange(category);
              setIsMobileOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-semibold ${
              selectedCategory === category
                ? "bg-giants-orange dark:bg-mindaro text-white dark:text-licorice shadow-lg border-2 border-giants-orange dark:border-mindaro"
                : "bg-white dark:bg-[#1a1614] hover:bg-giants-orange/10 dark:hover:bg-mindaro/20 text-licorice dark:text-baby-powder border-2 border-licorice/20 dark:border-mindaro/40 hover:border-giants-orange dark:hover:border-mindaro shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold capitalize">{category}</span>
              {productCounts[category] !== undefined && (
                <span
                  className={`text-sm px-2.5 py-1 rounded-md font-bold ${
                    selectedCategory === category
                      ? "bg-white/30 dark:bg-licorice/30 text-white dark:text-licorice"
                      : "bg-giants-orange/15 dark:bg-mindaro/20 text-giants-orange dark:text-mindaro"
                  }`}
                >
                  {productCounts[category]}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block flex-shrink-0">
        <div className="sticky top-20 bg-white dark:bg-[#1a1614] p-6 rounded-xl border-2 border-licorice/20 dark:border-mindaro/40 shadow-xl dark:shadow-mindaro/20 backdrop-blur-sm">
          <FilterContent />
        </div>
      </div>

      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsMobileOpen(true)}
          size="lg"
          className="shadow-2xl rounded-full w-14 h-14 p-0"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </Button>
      </div>

      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      />
      <div
        className={`lg:hidden fixed inset-y-0 right-0 w-80 max-w-full bg-baby-powder dark:bg-[#1a1410] z-50 shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-licorice dark:text-baby-powder">
              Filter Products
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <FilterContent />
        </div>
      </div>
    </>
  );
}
