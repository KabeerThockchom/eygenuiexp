"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActions } from "ai/rsc";
import { Message } from "@/components/message";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";
import { motion } from "framer-motion";
import { BanknotesIcon, PlusCircleIcon, CalculatorIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Banking() {
  const router = useRouter();
  const { sendMessage } = useActions();
  const [userName, setUserName] = useState<string>("");
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Array<ReactNode>>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  useEffect(() => {
    // Check if user has entered their name
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      router.push("/welcome");
      return;
    }
    setUserName(storedName);
    
    // Add greeting message directly without LLM call
    setMessages([
      <Message
        key="greeting"
        role="assistant"
        content={`Hi ${storedName}! 👋 Great to see you! ⭐ How can I assist you today?`}
      />
    ]);
  }, [router]);

  const suggestedActions = [
    { 
      title: "Show me", 
      label: "my accounts overview", 
      action: "Show me my accounts overview",
      icon: BanknotesIcon
    },
    { 
      title: "I'd like to", 
      label: "open a new account", 
      action: "I want to open a new account",
      icon: PlusCircleIcon
    },
    {
      title: "Calculate",
      label: "my RMD for inherited account",
      action: "Help me calculate my Required Minimum Distribution",
      icon: CalculatorIcon
    },
    {
      title: "What are",
      label: "the current account options?",
      action: "What types of accounts do you offer?",
      icon: UserCircleIcon
    },
  ];

  const handleActionClick = async (action: string) => {
    setHasUserInteracted(true);
    setMessages((messages) => [
      ...messages,
      <Message
        key={messages.length}
        role="user"
        content={action}
      />,
    ]);
    // Include user's name in first message to LLM
    const response: ReactNode = await sendMessage(
      `[User: ${userName}] ${action}`
    );
    setMessages((messages) => [...messages, response]);
  };

  return (
    <div className="flex flex-row justify-center pb-20 h-dvh bg-[#ffffff] dark:bg-[#333333]">
      <div className="flex flex-col justify-between gap-4">
        <div
          ref={messagesContainerRef}
          className="flex flex-col gap-3 h-full w-dvw items-center overflow-y-scroll"
        >
          {!hasUserInteracted && (
            <motion.div className="min-h-[200px] px-4 w-full md:w-[500px] md:px-0 pt-8">
              <div className="border rounded-lg p-6 flex flex-col gap-4 text-[#999999] text-sm dark:text-[#cccccc] dark:border-[#999999]">
                <p className="text-center text-2xl font-medium text-[#333333] dark:text-[#ffffff] relative inline-block">
                  Welcome to Your Bank Assist
                  <AutoAwesomeIcon 
                    className="absolute -top-2 text-[#ffe600] text-2xl animate-pulse" 
                  />
                </p>
                <p>
                  I&apos;m here to help you manage your accounts, open new ones, and answer any banking-related questions you may have.
                </p>
                <p>
                  Choose from the suggested actions below or type your question to get started.
                </p>
              </div>
            </motion.div>
          )}
          {messages.map((message) => message)}
          <div ref={messagesEndRef} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full px-4 md:px-0 mx-auto md:max-w-[500px] mb-4">
          {!hasUserInteracted &&
            suggestedActions.map((action, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.01 * index }}
                key={index}
              >
                <button
                  onClick={() => handleActionClick(action.action)}
                  className="w-full text-left border border-[#cccccc] dark:border-[#999999] text-[#333333] dark:text-[#cccccc] rounded-lg p-4 text-sm hover:bg-[#f0f0f0] hover:text-[#333333] dark:hover:bg-[#999999] transition-colors flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <action.icon className="w-5 h-5 text-[#ffe600]" />
                    <span className="font-medium">{action.title}</span>
                  </div>
                  <span className="text-[#999999] dark:text-[#cccccc]">
                    {action.label}
                  </span>
                </button>
              </motion.div>
            ))}
        </div>

        <form
          className="flex flex-col gap-2 relative items-center"
          onSubmit={async (event) => {
            event.preventDefault();
            setHasUserInteracted(true);

            setMessages((messages) => [
              ...messages,
              <Message key={messages.length} role="user" content={input} />,
            ]);
            setInput("");

            // Include user's name in first message to LLM
            const response: ReactNode = await sendMessage(
              `[User: ${userName}] ${input}`
            );
            setMessages((messages) => [...messages, response]);
          }}
        >
          <input
            ref={inputRef}
            className="bg-[#f0f0f0] rounded-md px-4 py-3 w-full outline-none focus:ring-2 focus:ring-[#ffe600] focus:ring-opacity-100 dark:focus:ring-[#ffe600] dark:focus:ring-opacity-100 dark:bg-[#999999] text-[#333333] dark:text-[#ffffff] md:max-w-[500px] max-w-[calc(100dvw-32px)] placeholder:text-[#666666] dark:placeholder:text-[#e6e6e6]"
            placeholder="Ask me about your banking needs..."
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
}
