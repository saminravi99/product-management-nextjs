"use client";

import Footer from "@/components/layout/Footer";
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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-[#f7f7f2] p-4">
        <div className="text-center max-w-md bg-white rounded-xl shadow-lg p-8 border-2 border-[#261c15]">
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-[#261c15] mb-2">
              Something went wrong!
            </h2>
            <p className="text-[#261c15]/70">
              An unexpected error occurred. Please try again.
            </p>
          </div>

          <Button variant="default" onClick={reset}>
            Try Again
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
