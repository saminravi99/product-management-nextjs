export default function CategoryFilterSkeleton() {
  return (
    <div className="hidden lg:block flex-shrink-0 w-64">
      <div className="sticky top-20 bg-white dark:bg-[#1a1614] p-6 rounded-xl border-2 border-licorice/20 dark:border-mindaro/40 shadow-xl dark:shadow-mindaro/20 backdrop-blur-sm">
        <div className="space-y-4 animate-pulse">
          <div className="flex items-center justify-between pb-4 border-b-2 border-licorice/10 dark:border-mindaro/20">
            <div className="h-7 bg-licorice/10 dark:bg-baby-powder/10 rounded w-28" />
            <div className="h-6 w-12 bg-licorice/10 dark:bg-baby-powder/10 rounded" />
          </div>

          <div className="space-y-1">
            <div className="h-14 bg-giants-orange/20 dark:bg-mindaro/20 rounded-lg" />
          </div>

          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-14 bg-licorice/10 dark:bg-baby-powder/10 rounded-lg flex items-center justify-between px-4"
              >
                <div className="h-4 bg-licorice/20 dark:bg-baby-powder/20 rounded w-24" />
                <div className="h-6 w-10 bg-licorice/20 dark:bg-baby-powder/20 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
