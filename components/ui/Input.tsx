import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border-2 border-licorice/30 bg-white px-3 py-2 text-sm text-licorice file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-licorice/50 focus-visible:outline-none focus-visible:border-giants-orange disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#2a2320] dark:border-mindaro/40 dark:text-baby-powder dark:placeholder:text-baby-powder/50 dark:focus-visible:border-mindaro shadow-sm transition-colors",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
