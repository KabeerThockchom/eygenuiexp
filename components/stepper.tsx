interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export const Stepper = ({
  steps,
  currentStep,
  onStepClick,
  className = "",
}: StepperProps) => {
  return (
    <div className={`flex items-center w-full ${className}`}>
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1 relative">
          <button
            onClick={() => onStepClick?.(index)}
            disabled={index > currentStep}
            className={`
              flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
              ${
                index === currentStep
                  ? "bg-[#ffe600] text-[#333333]"
                  : index < currentStep
                  ? "bg-[#999999] text-[#ffffff]"
                  : "bg-[#cccccc] text-[#333333]"
              }
              ${onStepClick ? "cursor-pointer hover:opacity-80" : "cursor-default"}
              transition-colors duration-200
            `}
          >
            {index + 1}
          </button>
          {index < steps.length - 1 && (
            <div
              className={`
                flex-1 h-0.5 mx-2
                ${
                  index < currentStep
                    ? "bg-[#999999]"
                    : index === currentStep
                    ? "bg-[#ffe600]"
                    : "bg-[#cccccc]"
                }
              `}
            />
          )}
          <div
            className={`
              absolute top-10 text-xs font-medium whitespace-nowrap
              ${
                index === currentStep
                  ? "text-[#ffe600]"
                  : index < currentStep
                  ? "text-[#999999]"
                  : "text-[#333333]"
              }
              ${index === 0 ? "left-0" : index === steps.length - 1 ? "right-0" : ""}
              ${
                index !== 0 && index !== steps.length - 1
                  ? "left-1/2 -translate-x-1/2"
                  : ""
              }
            `}
          >
            {step}
          </div>
        </div>
      ))}
    </div>
  );
};