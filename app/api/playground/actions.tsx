import { Message, TextStreamMessage } from "@/components/message";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateId } from "ai";
import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  streamUI,
} from "ai/rsc";
import { ReactNode } from "react";
import { z } from "zod";
import { ToolDefinition } from "@/app/(preview)/types/playground";
import { StreamedForm } from "@/components/playground/tool-tester";

const sendMessage = async (message: string, tool: ToolDefinition) => {
  "use server";

  const messages = getMutableAIState<typeof AI>("messages");
  console.log("User message:", message);

  messages.update([
    ...(messages.get() as CoreMessage[]),
    { role: "user", content: message },
  ]);

  const contentStream = createStreamableValue("");
  const textComponent = <TextStreamMessage content={contentStream.value} />;

  const { value: stream } = await streamUI({
    model: openai("gpt-4o"),
    system: `You are an AI assistant helping users with the following tool:
Name: ${tool.name}
Description: ${tool.description}

${tool.systemPrompt}

The tool has the following form structure:
${tool.steps.map((step, index) => `
Step ${index + 1}: ${step.title}
Fields:
${step.fields.map(field => `- ${field.label} (${field.name}): ${field.type}${field.validation?.required ? ' (required)' : ''}`).join('\n')}`).join('\n')}

When users provide information that can be used to fill the form:
1. Parse their input to extract relevant information
2. Send a tool call message FIRST using the fillForm tool
3. Then send a friendly message confirming what was filled and asking for the next required field

Important:
- Use the exact field names from the form structure
- Send tool calls BEFORE your text responses
- Keep track of which fields are still empty
- Ask for required fields first
- Be concise in your responses`,
    messages: messages.get() as CoreMessage[],
    text: async function* ({ content, done }) {
      if (done) {
        console.log("Assistant response:", content);
        messages.done([
          ...(messages.get() as CoreMessage[]),
          { role: "assistant", content },
        ]);
        contentStream.done();
      } else {
        contentStream.update(content);
      }
      return textComponent;
    },
    tools: {
      fillForm: {
        description: "Fill form fields with provided values",
        parameters: z.object({
          fields: z.record(z.string(), z.string()),
        }),
        generate: async function* ({ fields }) {
          const toolCallId = generateId();
          console.log("Filling form fields:", fields);

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "fillForm",
                  args: { fields },
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolCallId,
                  toolName: "fillForm",
                  result: "Form fields updated",
                },
              ],
            },
          ]);

          return (
            <Message
              role="assistant"
              content={<StreamedForm initialData={fields} />}
            />
          );
        },
      },
    },
  });

  return stream;
};

export type UIState = Array<ReactNode>;

export type AIState = {
  chatId: string;
  messages: Array<CoreMessage>;
};

export const AI = createAI<AIState, UIState>({
  initialAIState: {
    chatId: generateId(),
    messages: [],
  },
  initialUIState: [],
  actions: {
    sendMessage,
  },
  onSetAIState: async ({ state, done }) => {
    "use server";
    if (done) {
      // save to database if needed
    }
  },
}); 