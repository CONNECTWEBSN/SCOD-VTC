"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-pill border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-fast",
  {
    variants: {
      variant: {
        electric: [
          "border-success/30 bg-success-soft text-success",
        ],
        luxe: [
          "border-accent/30 bg-accent-soft text-accent-hover",
        ],
        premium: [
          "border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#7C3AED]",
        ],
        accessible: [
          "border-info/30 bg-info-soft text-info",
        ],
        popular: [
          "border-accent bg-accent text-brand font-bold",
        ],
        default: [
          "border-grey-200 bg-grey-50 text-grey-700",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
