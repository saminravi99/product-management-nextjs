"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-baby-powder dark:bg-licorice transition-colors duration-300">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-white dark:bg-licorice/30 rounded-xl shadow-lg dark:shadow-mindaro/10 p-8 border-2 border-licorice dark:border-mindaro/30">
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto mb-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-licorice dark:text-baby-powder mb-2">
              Something went wrong!
            </h2>
            <p className="text-licorice/70 dark:text-baby-powder/80">
              An unexpected error occurred. Please try again.
            </p>
          </div>

          <Button variant="default" onClick={reset}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
