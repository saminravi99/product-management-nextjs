import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-giants-orange text-white shadow-lg hover:bg-giants-orange/90 hover:shadow-xl focus-visible:ring-giants-orange dark:shadow-mindaro/20",
        destructive:
          "bg-red-600 text-white shadow-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
        outline:
          "border-2 border-licorice bg-white shadow-sm hover:bg-giants-orange hover:text-white hover:border-giants-orange focus-visible:ring-licorice dark:bg-licorice dark:border-mindaro dark:text-baby-powder dark:hover:bg-mindaro dark:hover:text-licorice dark:hover:border-mindaro",
        secondary:
          "bg-mindaro text-licorice shadow-lg hover:bg-mindaro/90 hover:shadow-xl focus-visible:ring-mindaro dark:bg-mindaro dark:text-licorice dark:hover:bg-mindaro/80 font-semibold",
        ghost:
          "text-licorice hover:bg-giants-orange/10 hover:text-giants-orange dark:text-baby-powder dark:hover:bg-mindaro/20 dark:hover:text-mindaro border border-transparent hover:border-giants-orange/30 dark:hover:border-mindaro/30",
        link: "text-giants-orange underline-offset-4 hover:underline dark:text-mindaro",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const shouldUseSlot = asChild && !isLoading;
    const Comp = shouldUseSlot ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
