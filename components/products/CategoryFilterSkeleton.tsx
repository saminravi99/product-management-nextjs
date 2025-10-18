export default function CategoryFilterSkeleton() {
  return (
    <div className="hidden lg:block flex-shrink-0">
      <div className="sticky top-20 bg-white dark:bg-[#1a1614] p-6 rounded-xl border-2 border-licorice/20 dark:border-mindaro/40 shadow-xl dark:shadow-mindaro/20 backdrop-blur-sm animate-pulse">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b-2 border-licorice/20 dark:border-mindaro/30">
            <div className="h-6 bg-licorice/10 dark:bg-baby-powder/10 rounded w-24" />
          </div>

          <div className="h-12 bg-licorice/10 dark:bg-baby-powder/10 rounded-lg" />

          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-12 bg-licorice/10 dark:bg-baby-powder/10 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
