export default function ProductCardSkeleton() {
  return (
    <div className="group relative bg-white dark:bg-[#1a1614] rounded-xl border-2 border-licorice/20 dark:border-mindaro/40 shadow-lg overflow-hidden animate-pulse">
      <div className="relative h-64 bg-licorice/10 dark:bg-baby-powder/10" />

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-licorice/10 dark:bg-baby-powder/10 rounded w-3/4" />
            <div className="h-4 bg-licorice/10 dark:bg-baby-powder/10 rounded w-1/2" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 bg-licorice/10 dark:bg-baby-powder/10 rounded w-full" />
          <div className="h-4 bg-licorice/10 dark:bg-baby-powder/10 rounded w-5/6" />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-licorice/10 dark:border-mindaro/20">
          <div className="h-8 bg-licorice/10 dark:bg-baby-powder/10 rounded w-24" />
          <div className="flex gap-2">
            <div className="h-9 w-9 bg-licorice/10 dark:bg-baby-powder/10 rounded" />
            <div className="h-9 w-9 bg-licorice/10 dark:bg-baby-powder/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
