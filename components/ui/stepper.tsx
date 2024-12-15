"use client";

import { motion } from "framer-motion";
import { theme } from "@/lib/theme";
import { CheckIcon } from "@heroicons/react/24/solid";

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
  onStepClick?: (step: number) => void;
}

export const Stepper = ({ steps, currentStep, className = "", onStepClick }: StepperProps) => {
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center flex-1">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-medium
                  ${
                    isCompleted
                      ? "bg-primary text-neutral-900"
                      : isCurrent
                      ? "bg-primary text-neutral-900"
                      : "bg-neutral-200 text-neutral-500"
                  }`}
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                }}
                onClick={() => onStepClick?.(index)}
                style={{ cursor: onStepClick ? 'pointer' : 'default' }}
              >
                {isCompleted ? (
                  <CheckIcon className="w-6 h-6" />
                ) : (
                  index + 1
                )}
              </motion.div>
              <span
                className={`mt-2 text-sm font-medium
                  ${
                    isCompleted || isCurrent
                      ? "text-neutral-900"
                      : "text-neutral-400"
                  }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-full mx-4
                  ${
                    index < currentStep
                      ? "bg-primary"
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