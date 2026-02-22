"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface Step {
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  completedSteps?: number[];
  orientation?: "horizontal" | "vertical";
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      steps,
      currentStep,
      completedSteps = [],
      orientation = "horizontal",
      ...props
    },
    ref
  ) => {
    const isStepCompleted = (index: number) => completedSteps.includes(index);
    const isStepCurrent = (index: number) => currentStep === index;
    const isStepFuture = (index: number) => index > currentStep;

    const progressPercentage =
      steps.length > 1
        ? (currentStep / (steps.length - 1)) * 100
        : 0;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          orientation === "horizontal" ? "block" : "flex flex-col",
          className
        )}
        {...props}
      >
        {orientation === "horizontal" ? (
          <>
            <div className="relative hidden md:block">
              <div className="absolute left-0 top-5 h-0.5 w-full bg-grey-200">
                <div
                  className="h-full bg-accent transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <ol className="relative flex justify-between">
                {steps.map((step, index) => {
                  const completed = isStepCompleted(index);
                  const current = isStepCurrent(index);
                  const future = isStepFuture(index);

                  return (
                    <li key={index} className="flex flex-col items-center">
                      <div
                        className={cn(
                          "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white font-sans text-sm font-bold transition-all duration-300",
                          completed &&
                            "border-success bg-success text-white",
                          current &&
                            "border-accent bg-accent text-brand shadow-glow-accent",
                          future && "border-grey-300 text-grey-400"
                        )}
                      >
                        {completed ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div className="mt-3 text-center">
                        <p
                          className={cn(
                            "font-sans text-sm font-semibold",
                            (current || completed) && "text-grey-900",
                            future && "text-grey-400"
                          )}
                        >
                          {step.label}
                        </p>
                        {step.description && (
                          <p className="mt-1 text-xs text-grey-500">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="md:hidden">
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-grey-700">
                    Étape {currentStep + 1} sur {steps.length}
                  </span>
                  <span className="text-grey-500">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-pill bg-grey-200">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              <p className="text-center font-sans text-lg font-bold text-grey-900">
                {steps[currentStep].label}
              </p>
              {steps[currentStep].description && (
                <p className="mt-1 text-center text-sm text-grey-600">
                  {steps[currentStep].description}
                </p>
              )}
            </div>
          </>
        ) : (
          <ol className="space-y-4">
            {steps.map((step, index) => {
              const completed = isStepCompleted(index);
              const current = isStepCurrent(index);
              const future = isStepFuture(index);

              return (
                <li key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 font-sans text-sm font-bold transition-all duration-300",
                        completed &&
                          "border-success bg-success text-white",
                        current &&
                          "border-accent bg-accent text-brand shadow-glow-accent",
                        future && "border-grey-300 bg-white text-grey-400"
                      )}
                    >
                      {completed ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "h-full w-0.5 flex-1 transition-colors duration-300",
                          index < currentStep ? "bg-success" : "bg-grey-200"
                        )}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p
                      className={cn(
                        "font-sans text-base font-semibold",
                        (current || completed) && "text-grey-900",
                        future && "text-grey-400"
                      )}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p className="mt-1 text-sm text-grey-500">
                        {step.description}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    );
  }
);

Stepper.displayName = "Stepper";

export { Stepper };
