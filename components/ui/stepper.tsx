"use client";

import { motion } from "framer-motion";
import { theme } from "@/lib/theme";
import { CheckIcon } from "@heroicons/react/24/solid";

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export const Stepper = ({ steps, currentStep, className = "" }: StepperProps) => {
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    isCompleted
                      ? "bg-secondary-main text-white"
                      : isCurrent
                      ? "bg-primary-main text-white"
                      : "bg-neutral-200 text-neutral-600"
                  }`}
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? theme.colors.secondary.main
                    : isCurrent
                    ? theme.colors.primary.main
                    : theme.colors.neutral[200],
                }}
              >
                {isCompleted ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </motion.div>
              <span
                className={`mt-2 text-xs
                  ${
                    isCompleted
                      ? "text-secondary-main"
                      : isCurrent
                      ? "text-primary-main"
                      : "text-neutral-600"
                  }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-16 mx-4
                  ${
                    index < currentStep
                      ? "bg-secondary-main"
                      : "bg-neutral-200"
                  }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}; 