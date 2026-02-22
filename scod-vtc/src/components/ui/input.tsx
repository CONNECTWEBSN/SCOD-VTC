"use client";

import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  variant?: "light" | "dark";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      icon: Icon,
      error,
      variant = "light",
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium leading-none",
              variant === "dark" ? "text-white/90" : "text-grey-700"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              <Icon
                className={cn(
                  "h-5 w-5",
                  variant === "dark"
                    ? "text-white/60"
                    : error
                      ? "text-error"
                      : "text-grey-400"
                )}
              />
            </div>
          )}
          <input
            id={inputId}
            type={type}
            className={cn(
              "flex h-12 w-full rounded-input border px-4 font-sans text-base transition-all duration-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-grey-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              Icon && "pl-11",
              variant === "dark"
                ? [
                    "border-white/20 bg-white/10 text-white backdrop-blur-sm placeholder:text-white/50",
                    "focus-visible:border-accent focus-visible:bg-white/15 focus-visible:shadow-[0_0_0_3px_rgba(255,195,0,0.1)]",
                  ]
                : [
                    "border-grey-200 bg-white text-grey-900",
                    error
                      ? "border-error focus-visible:border-error focus-visible:ring-2 focus-visible:ring-error/20"
                      : "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
                  ],
              className
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm font-medium text-error"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
