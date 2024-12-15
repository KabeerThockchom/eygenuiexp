// types/playground.ts
export interface FormField {
    id: string;
    name: string;
    type: 'text' | 'number' | 'date' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'email' | 'tel' | 'url';
    label: string;
    options?: string[]; // For select/radio/checkbox
    validation?: {
      required?: boolean;
      min?: number;
      max?: number;
      pattern?: string;
      minLength?: number;
      maxLength?: number;
      customMessage?: string;
    };
    placeholder?: string;
    helpText?: string;
  }
  
  export interface FormStep {
    id: string;
    title: string;
    description?: string;
    fields: FormField[];
  }
  
  export interface FormAction {
    type: string;
    handler: string;
    label: string;
  }
  
  export interface ToolDefinition {
    id: string;
    name: string;
    description: string;
    steps: FormStep[];
    systemPrompt: string; // LLM instructions for using this tool
    actions?: FormAction[]; // Custom actions that can be performed with the form data
    settings?: {
      submitLabel?: string;
      showStepIndicator?: boolean;
      allowPartialSubmit?: boolean;
      theme?: {
        primaryColor?: string;
        backgroundColor?: string;
        textColor?: string;
      };
    };
  }