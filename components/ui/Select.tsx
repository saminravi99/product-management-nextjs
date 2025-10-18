import { cn } from "@/lib/utils";
import * as React from "react";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border-2 border-licorice/30 bg-white px-3 py-2 text-sm text-licorice ring-offset-white focus:outline-none focus:ring-2 focus:ring-giants-orange focus:ring-offset-2 focus:border-giants-orange disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#2a2320] dark:border-mindaro/40 dark:text-baby-powder dark:focus:ring-mindaro dark:focus:border-mindaro dark:ring-offset-licorice shadow-sm",
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
