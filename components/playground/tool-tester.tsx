// components/playground/tool-tester.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat, Message } from 'ai/react';
import { ToolDefinition } from '@/app/(preview)/types/playground';
import { motion } from 'framer-motion';

interface FormState {
  [key: string]: string;
}

type CustomMessage = Message & {
  content: string | Array<{
    type: 'tool-call' | 'tool-result';
    toolCallId: string;
    toolName: string;
    args?: Record<string, any>;
    result?: string;
  }>;
};

interface FormProps {
  initialData?: Record<string, any>;
  onSubmit?: (data: Record<string, any>) => void;
}

// Simple form component that will be streamed
export function StreamedForm({ initialData, onSubmit }: FormProps) {
  return (
    <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Form Preview</h2>
      <div className="space-y-4">
        {Object.entries(initialData || {}).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1">{key}</label>
            <input 
              type="text"
              value={value as string}
              readOnly
              className="w-full p-2 border rounded bg-neutral-100 dark:bg-neutral-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ToolTester({ 
  tool, 
  onFormStateChange 
}: { 
  tool: ToolDefinition;
  onFormStateChange: (state: Record<string, string>) => void;
}) {
  const [formState, setFormState] = useState<FormState>({});
  const formRef = useRef<HTMLFormElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/playground/chat',
    body: {
      tool
    },
    onFinish: async (message: CustomMessage) => {
      if (Array.isArray(message.content)) {
        try {
          const toolCall = message.content.find(c => c.type === 'tool-call');
          if (toolCall && toolCall.args) {
            // Update form state with new fields
            const newFormState = {
              ...formState,
              ...toolCall.args.fields
            };
            setFormState(newFormState);
            onFormStateChange(newFormState);
          }
        } catch (e) {
          console.error('Error handling tool call:', e);
        }
      }
    }
  }) as { 
    messages: CustomMessage[]; 
    input: string; 
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; 
    isLoading: boolean; 
    error: Error | null 
  };

  // Reset form state when tool changes
  useEffect(() => {
    setFormState({});
    onFormStateChange({});
  }, [tool, onFormStateChange]);

  return (
    <div className="space-y-4">
      <div className="h-[400px] overflow-y-auto border border-neutral-400 rounded p-4 bg-neutral-50 dark:bg-neutral-500">
        {messages.map((message) => (
          <motion.div
            key={message.id} 
            className={`mb-4 ${message.role === 'assistant' ? 'pl-4' : 'pr-4'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="font-medium text-neutral-500 dark:text-neutral-50">
              {message.role === 'assistant' ? 'AI' : 'You'}
            </div>
            
            <div className="whitespace-pre-wrap text-neutral-400 dark:text-neutral-200">
              {typeof message.content === 'string' ? message.content : null}
            </div>

            {/* Render form if we have tool calls */}
            {message.role === 'assistant' && 
             Array.isArray(message.content) && 
             message.content.some(c => c.type === 'tool-call') && (
              <div className="mt-4">
                <StreamedForm initialData={formState} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-neutral-400 rounded bg-neutral-50 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-50 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded transition-colors ${
            isLoading
              ? 'bg-neutral-200 dark:bg-neutral-400 text-neutral-400 dark:text-neutral-200'
              : 'bg-primary hover:bg-primary-dark text-neutral-500'
          }`}
        >
          Send
        </button>
      </form>

      {error && (
        <div className="p-4 bg-[#fff2f2] dark:bg-[#662222] text-[#cc3333] dark:text-[#ff9999] rounded">
          {error.message}
        </div>
      )}
    </div>
  );
}