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
import { AccountsOverview } from "@/components/accounts-overview";
import { AccountFormWrapper } from "@/components/client-wrappers/account-form-wrapper";
import { RMDCalculatorWrapper } from "@/components/client-wrappers/rmd-calculator-wrapper";
import { Account } from "@/components/accounts-overview";

// Mock bank accounts data
let bankAccounts: Account[] = [
  {
    id: "1",
    type: "checking",
    name: "Essential Checking",
    balance: 5420.50,
    accountNumber: "1234567890",
  },
  {
    id: "2",
    type: "savings",
    name: "High-Yield Savings",
    balance: 12750.75,
    accountNumber: "9876543210",
    apy: 2.50,
  },
  {
    id: "3",
    type: "investment",
    name: "Investment Portfolio",
    balance: 45680.25,
    accountNumber: "5678901234",
    trend: 12.5,
  },
  {
    id: "4",
    type: "credit",
    name: "Rewards Credit Card",
    balance: 1250.00,
    accountNumber: "4321098765",
    creditLimit: 10000,
  },
];

const sendMessage = async (message: string) => {
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
    model: openai("gpt-4o-mini"),
    system: `\
      You are an expert banking assistant specializing in Required Minimum Distributions (RMDs) and account management.

      For RMD Calculations:
      - When users ask about RMDs, first explain what they are and their importance
      - Present the RMD calculator tool and explain how to use it
      - When prefilling data for the RMD calculator, use these exact formats:
        * Account types: *Traditional IRA*, *Roth IRA*, *401(k)*, *403(b)*, *457(b)*
        * Dates: YYYY-MM-DD format
        * Registration type: either *trust* or *individual*
        * Beneficiary types: *spouse*, *child*, *grandchild*, *other-family*, *non-family*
      - Offer to guide them through the form step by step if they request help
      - Ask clarifying questions about their inherited account details
      - Maintain awareness of previously shared information in the conversation
      - Provide explanations for each field in the calculator
      - After calculation, explain the results and implications
      - Log all interactions for transparency

      For Account Management:
      - Help users understand their account options and status
      - Guide them through account opening processes
      - Maintain professional yet approachable tone
      - Prioritize security and accuracy
      - Provide clear explanations for banking terms

      Remember:
      - Keep track of context from previous messages
      - Be proactive in offering relevant information
      - Verify information before calculations
      - Explain implications of financial decisions
      - Always use consistent data formats as specified above
    `,
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
      showAccounts: {
        description: "Show overview of user's bank accounts",
        parameters: z.object({}),
        generate: async function* ({}) {
          const toolCallId = generateId();
          console.log("Showing accounts overview");

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "showAccounts",
                  args: {},
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolCallId,
                  toolName: "showAccounts",
                  result: "Displaying account overview",
                },
              ],
            },
          ]);

          return (
            <Message
              role="assistant"
              content={<AccountsOverview accounts={bankAccounts} />}
            />
          );
        },
      },
      showRMDCalculator: {
        description: `Show the RMD calculator form with detailed guidance. The calculator helps users:
          - Calculate Required Minimum Distributions for inherited retirement accounts
          - Input account details, beneficiary information, and dates
          - Get step-by-step assistance if requested
          - Understand the implications of their RMD calculation`,
        parameters: z.object({
          showGuidance: z.boolean().optional().describe("Whether to show detailed guidance"),
          prefillData: z.object({
            accountType: z.string().optional(),
            balance: z.number().optional(),
            originalOwnerBirthDate: z.string().optional(),
            originalOwnerDeathDate: z.string().optional(),
            registrationType: z.enum(["trust", "individual"]).optional(),
            beneficiaryType: z.string().optional(),
            beneficiaryBirthDate: z.string().optional(),
          }).optional(),
        }),
        generate: async function* ({ showGuidance, prefillData }) {
          const toolCallId = generateId();
          console.log("Showing RMD calculator", { showGuidance, prefillData });

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "showRMDCalculator",
                  args: { showGuidance, prefillData },
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolCallId,
                  toolName: "showRMDCalculator",
                  result: "Displaying RMD calculator with guidance",
                },
              ],
            },
          ]);

          return (
            <Message
              role="assistant"
              content={
                <>
                  {showGuidance && (
                    <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-lg">
                      <h3 className="font-medium mb-2">RMD Calculator Guide</h3>
                      <p className="text-sm mb-2">
                        This calculator will help you determine your Required Minimum Distribution (RMD) 
                        for an inherited retirement account. Here&apos;s what you&apos;ll need:
                      </p>
                      <ul className="text-sm list-disc list-inside">
                        <li>Account type and balance as of December 31 last year</li>
                        <li>Original account owner&apos;s birth and death dates</li>
                        <li>Your relationship to the original owner</li>
                        <li>Your date of birth</li>
                      </ul>
                      <p className="text-sm mt-2">
                        I can help you fill out this form - just ask me questions at any step!
                      </p>
                    </div>
                  )}
                  <RMDCalculatorWrapper initialData={prefillData} />
                </>
              }
            />
          );
        },
      },
      openAccount: {
        description: "Show the account opening application form",
        parameters: z.object({}),
        generate: async function* ({}) {
          const toolCallId = generateId();
          console.log("Showing account opening form");

          messages.done([
            ...(messages.get() as CoreMessage[]),
            {
              role: "assistant",
              content: [
                {
                  type: "tool-call",
                  toolCallId,
                  toolName: "openAccount",
                  args: {},
                },
              ],
            },
            {
              role: "tool",
              content: [
                {
                  type: "tool-result",
                  toolCallId,
                  toolName: "openAccount",
                  result: "Showing account opening form",
                },
              ],
            },
          ]);

          return (
            <Message
              role="assistant"
              content={<AccountFormWrapper />}
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
      // save to database
    }
  },
});
