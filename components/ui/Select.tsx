import { cn } from "@/lib/utils";
import * as React from "react";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border-2 border-[#261c15] bg-white px-3 py-2 text-sm text-[#261c15] ring-offset-white focus:outline-none focus:ring-2 focus:ring-[#f05d23] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
