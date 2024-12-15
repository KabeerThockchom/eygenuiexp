// components/playground/tool-builder.tsx
'use client';

import React from 'react';
import { useState } from 'react';
import { ToolDefinition, FormStep, FormField } from '@/app/(preview)/types/playground';

interface FieldBuilderProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onDelete: () => void;
}

// FieldBuilder Component
function FieldBuilder({ field, onUpdate, onDelete }: FieldBuilderProps) {
  return (
    <div className="flex space-x-4 items-center">
      <input
        type="text"
        placeholder="Field Name"
        value={field.name}
        onChange={(e) => onUpdate({ ...field, name: e.target.value })}
        className="w-1/3 p-2 border border-neutral-400 rounded bg-neutral-50 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-50 focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <select
        value={field.type}
        onChange={(e) => onUpdate({ ...field, type: e.target.value as FormField['type'] })}
        className="w-24 p-2 border border-neutral-400 rounded bg-neutral-50 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-50 focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="select">Select</option>
        <option value="checkbox">Checkbox</option>
      </select>
      <input
        type="text"
        placeholder="Label"
        value={field.label}
        onChange={(e) => onUpdate({ ...field, label: e.target.value })}
        className="w-1/3 p-2 border border-neutral-400 rounded bg-neutral-50 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-50 focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <button
        onClick={onDelete}
        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-neutral-50 rounded transition-colors"
      >
        Delete
      </button>
    </div>
  );
}

// Utility function to generate unique IDs
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

interface StepBuilderProps {
  step: FormStep;
  onUpdate: (step: FormStep) => void;
  onDelete: () => void;
}

// StepBuilder Component
function StepBuilder({ step, onUpdate, onDelete }: StepBuilderProps) {
  return (
    <div className="p-4 border border-neutral-400 rounded space-y-4 bg-neutral-50 dark:bg-neutral-500">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Step Title"
          value={step.title}
          onChange={(e) => onUpdate({ ...step, title: e.target.value })}
          className="w-1/2 p-2 border border-neutral-400 rounded bg-neutral-50 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-50 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          onClick={onDelete}
          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-neutral-50 rounded transition-colors"
        >
          Delete Step
        </button>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {step.fields.map((field, index) => (
          <FieldBuilder
            key={field.id}
            field={field}
            onUpdate={(updatedField) => {
              const newFields = [...step.fields];
              newFields[index] = updatedField;
              onUpdate({ ...step, fields: newFields });
            }}
            onDelete={() => {
              onUpdate({
                ...step,
                fields: step.fields.filter(f => f.id !== field.id)
              });
            }}
          />
        ))}
        <button
          onClick={() => onUpdate({
            ...step,
            fields: [...step.fields, {
              id: generateId(),
              name: '',
              type: 'text',
              label: ''
            }]
          })}
          className="px-2 py-1 bg-neutral-200 dark:bg-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-500 text-neutral-500 dark:text-neutral-50 rounded transition-colors"
        >
          Add Field
        </button>
      </div>
    </div>
  );
}

interface ToolBuilderProps {
  currentTool: ToolDefinition | null;
  onSave: (tool: ToolDefinition) => void;
}

export function ToolBuilder({ currentTool, onSave }: ToolBuilderProps) {
  const [tool, setTool] = useState<ToolDefinition>(currentTool || {
    id: generateId(),
    name: '',
    description: '',
    steps: [],
    systemPrompt: ''
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-500 dark:text-neutral-50">Tool Builder</h2>
        <button 
          onClick={() => onSave(tool)}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-neutral-500 rounded transition-colors shadow-lg"
        >
          Save Tool
        </button>
      </div>

      {/* Basic Info */}
      <section className="space-y-4">
        <input
          type="text"
          placeholder="Tool Name"
          value={tool.name}
          onChange={(e) => setTool({ ...tool, name: e.target.value })}
          className="w-full p-2 border border-neutral-400 rounded bg-neutral-50 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-50 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <textarea
          placeholder="Tool Description"
          value={tool.description}
          onChange={(e) => setTool({ ...tool, description: e.target.value })}
          className="w-full p-2 border border-neutral-400 rounded bg-neutral-50 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-50 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </section>

      {/* Steps Builder */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-neutral-500 dark:text-neutral-50">Steps</h3>
        {tool.steps.map((step, index) => (
          <StepBuilder 
            key={step.id}
            step={step}
            onUpdate={(updatedStep) => {
              const newSteps = [...tool.steps];
              newSteps[index] = updatedStep;
              setTool({ ...tool, steps: newSteps });
            }}
            onDelete={() => {
              setTool({
                ...tool,
                steps: tool.steps.filter(s => s.id !== step.id)
              });
            }}
          />
        ))}
        <button
          onClick={() => setTool({
            ...tool,
            steps: [...tool.steps, {
              id: generateId(),
              title: '',
              fields: []
            }]
          })}
          className="px-4 py-2 bg-neutral-200 dark:bg-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-500 text-neutral-500 dark:text-neutral-50 rounded transition-colors"
        >
          Add Step
        </button>
      </section>

      {/* System Prompt */}
      <section>
        <h3 className="text-xl font-semibold text-neutral-500 dark:text-neutral-50">LLM Instructions</h3>
        <textarea
          placeholder="Instructions for the LLM on how to use this tool..."
          value={tool.systemPrompt}
          onChange={(e) => setTool({ ...tool, systemPrompt: e.target.value })}
          className="w-full p-2 border border-neutral-400 rounded bg-neutral-50 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-50 focus:ring-2 focus:ring-primary focus:border-transparent h-32"
        />
      </section>
    </div>
  );
}