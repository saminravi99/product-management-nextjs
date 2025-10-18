import { cn } from "@/lib/utils";
import * as React from "react";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border-2 border-licorice bg-white px-3 py-2 text-sm text-licorice ring-offset-white placeholder:text-licorice/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-giants-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
