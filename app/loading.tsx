import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-baby-powder">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-licorice/70">Loading...</p>
      </div>
    </div>
  );
}
