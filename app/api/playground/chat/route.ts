import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, tool } = await req.json();

    // Create a system message that includes the tool definition and form handling instructions
    const systemMessage = `You are an AI assistant helping users with the following tool:
Name: ${tool.name}
Description: ${tool.description}

${tool.systemPrompt}

The tool has the following form structure:
${tool.steps.map((step: any, index: number) => `
Step ${index + 1}: ${step.title}
Fields:
${step.fields.map((field: any) => `- ${field.label} (${field.name}): ${field.type}${field.validation?.required ? ' (required)' : ''}`).join('\n')}`).join('\n')}

When users provide information that can be used to fill the form:
1. Parse their input to extract relevant information
2. Send a tool call message FIRST:
{
  "type": "tool-call",
  "toolName": "fillForm",
  "fields": {
    // field names and values matching the form structure
  }
}
3. Then send a friendly message confirming what was filled and asking for the next required field

Important:
- Use the exact field names from the form structure
- Send tool calls BEFORE your text responses
- Keep track of which fields are still empty
- Ask for required fields first
- Be concise in your responses`;

    const result = await streamText({
      model: openai('gpt-4o'),
      messages,
      system: systemMessage,
    });

    return result.toDataStreamResponse({
      sendUsage: true,
      getErrorMessage: error => {
        if (error == null) return 'An unknown error occurred';
        if (typeof error === 'string') return error;
        if (error instanceof Error) return error.message;
        return JSON.stringify(error);
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
} 