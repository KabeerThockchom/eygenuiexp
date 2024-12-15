"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Header } from '@/components/header';

export default function Welcome() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // Store name in localStorage for persistence
      localStorage.setItem("userName", name.trim());
      router.push("/banking");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-500 relative">
      <Header currentPage="home" />
      
      <div className="flex items-center justify-center flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-6"
        >
          <div className="text-center mb-8">
            <h1 className="text-neutral-500 dark:text-neutral-50 text-4xl font-bold mb-4 relative inline-block">
              Welcome to Bank Assist
              <AutoAwesomeIcon 
                className="absolute -top-3 -right-0 text-primary text-5xl animate-pulse" 
              />
            </h1>
            <p className="text-neutral-400 dark:text-neutral-200">
              Let&apos;s personalize your experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-neutral-400 dark:text-neutral-200 mb-2"
              >
                What&apos;s your name?
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-400 bg-neutral-50 dark:bg-neutral-500 text-neutral-500 dark:text-neutral-50 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-neutral-500 py-3 px-4 rounded-lg transition-colors"
            >
              Continue to Banking
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}