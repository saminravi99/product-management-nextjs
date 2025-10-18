export default function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 animate-pulse">
        <div className="h-10 bg-licorice/10 dark:bg-baby-powder/10 rounded w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
        <div className="space-y-4">
          <div className="relative aspect-square bg-licorice/10 dark:bg-baby-powder/10 rounded-xl" />

          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-licorice/10 dark:bg-baby-powder/10 rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="h-10 bg-licorice/10 dark:bg-baby-powder/10 rounded w-3/4" />
            <div className="h-6 bg-licorice/10 dark:bg-baby-powder/10 rounded w-24" />
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 bg-licorice/10 dark:bg-baby-powder/10 rounded w-40" />
            <div className="h-6 bg-licorice/10 dark:bg-baby-powder/10 rounded-full w-32" />
          </div>

          <div className="border-t-2 border-licorice/20 dark:border-mindaro/40 pt-6 space-y-3">
            <div className="h-6 bg-licorice/10 dark:bg-baby-powder/10 rounded w-32" />
            <div className="space-y-2">
              <div className="h-4 bg-licorice/10 dark:bg-baby-powder/10 rounded w-full" />
              <div className="h-4 bg-licorice/10 dark:bg-baby-powder/10 rounded w-full" />
              <div className="h-4 bg-licorice/10 dark:bg-baby-powder/10 rounded w-5/6" />
              <div className="h-4 bg-licorice/10 dark:bg-baby-powder/10 rounded w-4/6" />
            </div>
          </div>

          <div className="border-t-2 border-licorice/20 dark:border-mindaro/40 pt-6 space-y-3">
            <div className="h-6 bg-licorice/10 dark:bg-baby-powder/10 rounded w-48" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-licorice/10 dark:bg-baby-powder/10 rounded w-20" />
                <div className="h-5 bg-licorice/10 dark:bg-baby-powder/10 rounded w-32" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-licorice/10 dark:bg-baby-powder/10 rounded w-20" />
                <div className="h-5 bg-licorice/10 dark:bg-baby-powder/10 rounded w-32" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <div className="h-12 bg-licorice/10 dark:bg-baby-powder/10 rounded-lg flex-1" />
            <div className="h-12 w-12 bg-licorice/10 dark:bg-baby-powder/10 rounded-lg" />
            <div className="h-12 w-12 bg-licorice/10 dark:bg-baby-powder/10 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
