"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
  totalItems: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
      <div className="flex items-center gap-2">
        <label
          htmlFor="items-per-page-select"
          className="text-sm font-semibold text-licorice dark:text-baby-powder"
        >
          Show:
        </label>
        <select
          id="items-per-page-select"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-3 py-2 rounded-lg border-2 border-licorice/30 dark:border-mindaro/50 
                   bg-white dark:bg-[#2a2320] text-licorice dark:text-baby-powder
                   text-sm font-bold focus:outline-none focus:ring-2 focus:ring-giants-orange dark:focus:ring-mindaro
                   hover:border-giants-orange dark:hover:border-mindaro transition-colors cursor-pointer shadow-md"
          aria-label="Select number of items to display per page"
        >
          <option value={12}>12</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span className="text-sm font-semibold text-licorice dark:text-baby-powder">
          items per page
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <span className="text-sm font-semibold text-licorice dark:text-baby-powder">
          Showing {startItem}-{endItem} of {totalItems} products
        </span>

        <nav
          className="flex items-center gap-1"
          aria-label="Pagination navigation"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-9 w-9 p-0"
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>

          {getPageNumbers().map((page, index) =>
            typeof page === "number" ? (
              <Button
                key={index}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className="h-9 w-9 p-0 font-bold"
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Button>
            ) : (
              <span
                key={index}
                className="h-9 w-9 flex items-center justify-center text-licorice/60 dark:text-baby-powder/60 font-bold"
                aria-hidden="true"
              >
                {page}
              </span>
            )
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-9 w-9 p-0"
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </nav>
      </div>
    </div>
  );
}
