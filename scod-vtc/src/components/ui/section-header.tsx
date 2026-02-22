"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface SectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tag?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    { className, tag, title, subtitle, centered = true, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "space-y-4",
          centered ? "text-center" : "text-left",
          className
        )}
        {...props}
      >
        {tag && (
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
              {tag}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent" />
          </div>
        )}
        <h2 className="font-sans text-balance text-grey-900" style={{ fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto max-w-[60ch] font-sans text-base font-normal leading-[1.65] text-grey-600">
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
