"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export type PaymentMethodType =
  | "paytech"
  | "stripe"
  | "wave_business"
  | "cash";

export interface PaymentMethod {
  type: PaymentMethodType;
  name: string;
  description: string;
  icon: React.ReactNode;
  supported: string[];
}

export interface PaymentMethodCardProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  method: PaymentMethod;
  selected?: boolean;
  onSelect?: () => void;
}

const PaymentMethodCard = React.forwardRef<
  HTMLButtonElement,
  PaymentMethodCardProps
>(({ className, method, selected = false, onSelect, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      className={cn(
        "relative w-full rounded-card border-2 p-4 text-left transition-all duration-normal hover:border-accent/50",
        selected
          ? "border-accent bg-accent-soft shadow-md"
          : "border-grey-200 bg-white hover:bg-grey-50",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors",
            selected ? "bg-accent/20" : "bg-grey-100"
          )}
        >
          {method.icon}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-lg font-bold text-grey-900">
              {method.name}
            </h3>
            {selected && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent">
                <Check className="h-4 w-4 text-brand" />
              </div>
            )}
          </div>
          <p className="mt-1 text-sm text-grey-600">{method.description}</p>
          {method.supported.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {method.supported.map((item) => (
                <span
                  key={item}
                  className={cn(
                    "inline-flex items-center rounded-pill border px-2.5 py-0.5 text-xs font-semibold",
                    selected
                      ? "border-accent/30 bg-accent/10 text-accent-hover"
                      : "border-grey-200 bg-grey-50 text-grey-600"
                  )}
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
});

PaymentMethodCard.displayName = "PaymentMethodCard";

export { PaymentMethodCard };
