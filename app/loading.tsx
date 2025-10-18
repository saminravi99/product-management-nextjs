import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f2]">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-[#261c15]/70">Loading...</p>
      </div>
    </div>
  );
}
