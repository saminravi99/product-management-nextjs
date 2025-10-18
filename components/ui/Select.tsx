import { cn } from "@/lib/utils";
import * as React from "react";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border-2 border-licorice/30 bg-white px-3 py-2 text-sm text-licorice focus:outline-none focus:border-giants-orange disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#2a2320] dark:border-mindaro/40 dark:text-baby-powder dark:focus:border-mindaro shadow-sm transition-colors",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = "Select";

export { Select };
