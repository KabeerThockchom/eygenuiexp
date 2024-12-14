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
                  ? "bg-blue-600 text-white"
                  : index < currentStep
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-400"
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
                    ? "bg-blue-600"
                    : index === currentStep
                    ? "bg-blue-200"
                    : "bg-gray-200"
                }
              `}
            />
          )}
          <div
            className={`
              absolute top-10 text-xs font-medium whitespace-nowrap
              ${
                index === currentStep
                  ? "text-blue-600"
                  : index < currentStep
                  ? "text-blue-600"
                  : "text-gray-400"
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