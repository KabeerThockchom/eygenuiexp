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
                      ? "bg-[#999999] text-[#ffffff]"
                      : isCurrent
                      ? "bg-[#ffe600] text-[#333333]"
                      : "bg-[#cccccc] text-[#333333]"
                  }`}
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? "#999999"
                    : isCurrent
                    ? "#ffe600"
                    : "#cccccc",
                  opacity: 1
                }}
              >
                {isCompleted ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </motion.div>
              <span
                className={`mt-2 text-xs font-medium
                  ${
                    isCompleted
                      ? "text-[#999999]"
                      : isCurrent
                      ? "text-[#ffe600]"
                      : "text-[#333333]"
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
                      ? "bg-[#999999]"
                      : "bg-[#cccccc]"
                  }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}; 