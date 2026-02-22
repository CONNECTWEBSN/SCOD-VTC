"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-btn font-semibold font-sans transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-brand shadow-md hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lg",
        secondary:
          "bg-brand text-white shadow-md hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-lg",
        ghost:
          "bg-transparent text-grey-700 hover:-translate-y-0.5 hover:bg-grey-100 hover:text-grey-900",
        danger:
          "bg-error text-white shadow-md hover:-translate-y-0.5 hover:bg-error/90 hover:shadow-lg",
      },
      size: {
        sm: "h-9 px-4 text-sm font-semibold",
        md: "h-11 px-6 text-base font-semibold",
        lg: "h-14 px-8 text-lg font-bold",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      icon: Icon,
      iconPosition = "left",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        style={{
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : Icon && iconPosition === "left" ? (
          <Icon className="h-4 w-4" />
        ) : null}
        {children}
        {!loading && Icon && iconPosition === "right" ? (
          <Icon className="h-4 w-4" />
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
