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
          "bg-[#f05d23] text-white shadow hover:bg-[#f05d23]/90 focus-visible:ring-[#f05d23]",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-600/90 focus-visible:ring-red-600",
        outline:
          "border-2 border-[#261c15] bg-transparent shadow-sm hover:bg-[#e4e6c3] hover:text-[#261c15] focus-visible:ring-[#261c15]",
        secondary:
          "bg-[#c5d86d] text-[#261c15] shadow-sm hover:bg-[#c5d86d]/80 focus-visible:ring-[#c5d86d]",
        ghost: "hover:bg-[#e4e6c3] hover:text-[#261c15]",
        link: "text-[#f05d23] underline-offset-4 hover:underline",
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
    // When using asChild, we can't add the loading spinner as a sibling
    // So we disable asChild when loading
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
