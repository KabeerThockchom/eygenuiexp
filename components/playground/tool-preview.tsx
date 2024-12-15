import { ToolDefinition } from '@/app/(preview)/types/playground';

function FieldPreview({ field, value }: { field: any, value: string }) {
  const commonClasses = "w-full p-2 border border-neutral-200 dark:border-neutral-500 rounded bg-neutral-50 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-50 focus:ring-2 focus:ring-primary focus:border-transparent";

  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          name={field.name}
          placeholder={field.placeholder}
          required={field.validation?.required}
          value={value}
          readOnly
          className={`${commonClasses} h-24`}
        />
      );

    case 'select':
      return (
        <select
          name={field.name}
          required={field.validation?.required}
          value={value}
          className={commonClasses}
          disabled
        >
          <option value="">Select an option</option>
          {field.options?.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );

    default:
      return (
        <input
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          required={field.validation?.required}
          value={value}
          readOnly
          className={commonClasses}
        />
      );
  }
}

export function ToolPreview({ tool, formState = {} }: { tool: ToolDefinition | null, formState?: Record<string, string> }) {
  if (!tool) {
    return (
      <div className="h-full flex items-center justify-center text-neutral-400 dark:text-neutral-200">
        No tool selected
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-500 dark:text-neutral-50">{tool.name}</h2>
        <p className="text-neutral-400 dark:text-neutral-200">{tool.description}</p>
      </div>

      <form className="space-y-6">
        {tool.steps.map((step) => (
          <div key={step.id} className="border border-neutral-200 dark:border-neutral-500 rounded p-4 bg-neutral-50 dark:bg-neutral-500">
            <h3 className="text-xl font-semibold mb-2 text-neutral-500 dark:text-neutral-50">
              {step.title}
            </h3>
            {step.description && (
              <p className="text-sm text-neutral-400 dark:text-neutral-200 mb-4">
                {step.description}
              </p>
            )}
            
            <div className="space-y-4">
              {step.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="block font-medium text-neutral-500 dark:text-neutral-50">
                    {field.label}
                    {field.validation?.required && (
                      <span className="text-[#ff4444] ml-1">*</span>
                    )}
                  </label>
                  
                  {field.helpText && (
                    <p className="text-sm text-neutral-400 dark:text-neutral-200 mb-1">
                      {field.helpText}
                    </p>
                  )}

                  <FieldPreview field={field} value={formState[field.name] || ''} />

                  {field.validation?.customMessage && (
                    <p className="text-sm text-[#ff4444]">
                      {field.validation.customMessage}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary hover:bg-primary-dark text-neutral-500 rounded transition-colors"
        >
          {tool.settings?.submitLabel || 'Submit'}
        </button>
      </form>
    </div>
  );
}