// app/(preview)/playground/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ToolBuilder } from '@/components/playground/tool-builder';
import { ToolPreview } from '@/components/playground/tool-preview';
import { ToolDefinition } from '../types/playground';
import { Steps } from '@/components/playground/steps';
import { ToolTester } from '@/components/playground/tool-tester';
import { Header } from '@/components/header';

const GUIDED_STEPS = [
  {
    id: 'intro',
    title: 'Welcome to Tool Builder',
    description: 'Learn how to create your own AI-powered form tool, similar to the RMD Calculator.',
    content: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-500 dark:text-neutral-50">What you'll create:</h3>
        <ul className="list-disc pl-5 space-y-2 text-neutral-400 dark:text-neutral-200">
          <li>A multi-step form tool</li>
          <li>Custom form fields with validation</li>
          <li>AI integration for form assistance</li>
          <li>Real-time preview of your tool</li>
        </ul>
      </div>
    )
  },
  {
    id: 'basic-info',
    title: 'Step 1: Basic Information',
    description: 'Start by defining your tool\'s purpose and basic details.',
    content: (
      <div className="space-y-4">
        <p className="text-neutral-400 dark:text-neutral-200">Give your tool a clear name and description that explains its purpose.</p>
        <p className="text-neutral-400 dark:text-neutral-200">Example from RMD Calculator:</p>
        <div className="bg-neutral-50 dark:bg-neutral-500 p-4 rounded">
          <strong className="text-neutral-500 dark:text-neutral-50">Name:</strong> RMD Calculator
          <br />
          <strong className="text-neutral-500 dark:text-neutral-50">Description:</strong> Calculate Required Minimum Distribution for retirement accounts
        </div>
      </div>
    )
  },
  {
    id: 'form-steps',
    title: 'Step 2: Define Form Steps',
    description: 'Break down your form into logical steps.',
    content: (
      <div className="space-y-4">
        <p className="text-neutral-400 dark:text-neutral-200">Each step should group related fields together.</p>
        <p className="text-neutral-400 dark:text-neutral-200">RMD Calculator Example:</p>
        <ul className="list-disc pl-5 text-neutral-400 dark:text-neutral-200">
          <li>Step 1: Account Information</li>
          <li>Step 2: Original Owner Information</li>
          <li>Step 3: Beneficiary Information</li>
        </ul>
      </div>
    )
  },
  {
    id: 'fields',
    title: 'Step 3: Add Form Fields',
    description: 'Create the fields needed for each step.',
    content: (
      <div className="space-y-4">
        <p className="text-neutral-400 dark:text-neutral-200">Choose appropriate field types and add validation rules.</p>
        <p className="text-neutral-400 dark:text-neutral-200">Available field types:</p>
        <ul className="list-disc pl-5 text-neutral-400 dark:text-neutral-200">
          <li>Text - For names and general input</li>
          <li>Number - For amounts and numerical values</li>
          <li>Date - For dates like birth dates</li>
          <li>Select - For choosing from options</li>
          <li>Radio - For single choice from options</li>
          <li>Checkbox - For multiple selections</li>
        </ul>
      </div>
    )
  },
  {
    id: 'ai-prompt',
    title: 'Step 4: AI Integration',
    description: 'Write instructions for the AI to handle your tool.',
    content: (
      <div className="space-y-4">
        <p className="text-neutral-400 dark:text-neutral-200">Define how the AI should:</p>
        <ul className="list-disc pl-5 text-neutral-400 dark:text-neutral-200">
          <li>Introduce and explain the tool</li>
          <li>Guide users through each step</li>
          <li>Handle the form data</li>
          <li>Present results</li>
        </ul>
        <div className="bg-neutral-50 dark:bg-neutral-500 p-4 rounded">
          <strong className="text-neutral-500 dark:text-neutral-50">Example Prompt:</strong>
          <p className="text-sm mt-2 text-neutral-400 dark:text-neutral-200">
            "You are a helpful assistant guiding users through calculating their RMD. 
            Ask clarifying questions about their retirement account and help them understand 
            the implications of their RMD calculation."
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'test',
    title: 'Step 5: Test Your Tool',
    description: 'Preview and test your tool with the AI.',
    content: (
      <div className="space-y-4">
        <p className="text-neutral-400 dark:text-neutral-200">Try out your tool to ensure:</p>
        <ul className="list-disc pl-5 text-neutral-400 dark:text-neutral-200">
          <li>All fields work as expected</li>
          <li>Validation rules are appropriate</li>
          <li>AI responses are helpful</li>
          <li>The flow makes sense to users</li>
        </ul>
      </div>
    )
  }
];

export default function PlaygroundPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTool, setCurrentTool] = useState<ToolDefinition | null>(null);
  const [savedTools, setSavedTools] = useState<ToolDefinition[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolDefinition | null>(null);
  const [showTester, setShowTester] = useState(false);
  const [formState, setFormState] = useState<Record<string, string>>({});

  // Load saved tools on mount
  useEffect(() => {
    fetch('/api/playground/tools')
      .then(res => res.json())
      .then(data => {
        if (data.tools) {
          setSavedTools(data.tools);
        }
      })
      .catch(console.error);
  }, []);

  const handleSaveTool = async (tool: ToolDefinition) => {
    try {
      const response = await fetch('/api/playground/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tool),
      });
      
      const data = await response.json();
      if (data.success) {
        setSavedTools([...savedTools, tool]);
        setCurrentTool(null);
        setSelectedTool(tool);
        setShowTester(true);
      }
    } catch (error) {
      console.error('Failed to save tool:', error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-500">
      <Header currentPage="playground" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Panel - Guide */}
          <div className="w-1/4">
            <Steps
              steps={GUIDED_STEPS}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
            
            {/* Saved Tools List */}
            {savedTools.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-neutral-500 dark:text-neutral-50">Saved Tools</h3>
                <div className="space-y-2">
                  {savedTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setSelectedTool(tool);
                        setShowTester(true);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-500 text-neutral-500 dark:text-neutral-50"
                    >
                      {tool.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Center Panel - Builder/Tester */}
          <div className="w-2/5">
            <div className="bg-neutral-50 dark:bg-neutral-500 rounded-lg shadow-lg p-6 border border-neutral-200 dark:border-neutral-400">
              {showTester && selectedTool ? (
                <>
                  <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-neutral-500 dark:text-neutral-50">Testing: {selectedTool.name}</h2>
                    <button
                      onClick={() => {
                        setShowTester(false);
                        setSelectedTool(null);
                        setFormState({});
                      }}
                      className="px-3 py-1 bg-neutral-50 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-50 rounded"
                    >
                      Back to Builder
                    </button>
                  </div>
                  <ToolTester tool={selectedTool} onFormStateChange={setFormState} />
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-neutral-500 dark:text-neutral-50">{GUIDED_STEPS[currentStep].title}</h2>
                    <p className="text-neutral-400 dark:text-neutral-200">{GUIDED_STEPS[currentStep].description}</p>
                  </div>
                  {GUIDED_STEPS[currentStep].content}
                  <ToolBuilder
                    currentTool={currentTool}
                    onSave={handleSaveTool}
                  />
                </>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="w-1/3">
            <div className="bg-neutral-50 dark:bg-neutral-500 rounded-lg shadow-lg p-6 border border-neutral-200 dark:border-neutral-400">
              <h2 className="text-xl font-semibold mb-4 text-neutral-500 dark:text-neutral-50">Preview</h2>
              <ToolPreview 
                tool={showTester ? selectedTool : currentTool} 
                formState={formState}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}