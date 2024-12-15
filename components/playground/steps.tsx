// components/playground/steps.tsx
interface Step {
    id: string;
    title: string;
    description: string;
    content: React.ReactNode;
  }
  
  interface StepsProps {
    steps: Step[];
    currentStep: number;
    onStepClick: (step: number) => void;
  }
  
  export function Steps({ steps, currentStep, onStepClick }: StepsProps) {
    return (
      <div className="space-y-4">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepClick(index)}
            className={`w-full text-left p-4 rounded-lg transition-colors
              ${
                currentStep === index
                  ? 'bg-primary-light dark:bg-primary-dark border-2 border-primary'
                  : 'bg-neutral-50 dark:bg-neutral-500 border border-neutral-200 dark:border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-400'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    currentStep === index
                      ? 'bg-primary text-neutral-500'
                      : 'bg-neutral-200 dark:bg-neutral-400 text-neutral-400 dark:text-neutral-200'
                  }
                `}
              >
                {index + 1}
              </div>
              <div>
                <h3 className={`font-medium ${currentStep === index ? 'text-neutral-500 dark:text-neutral-50' : 'text-neutral-400 dark:text-neutral-200'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm ${currentStep === index ? 'text-neutral-400 dark:text-neutral-200' : 'text-neutral-400 dark:text-neutral-400'}`}>
                  {step.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }