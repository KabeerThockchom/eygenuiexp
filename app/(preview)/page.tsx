"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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
    <div className="flex items-center justify-center min-h-screen bg-[#ffffff] dark:bg-[#333333]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#333333] dark:text-[#ffffff] mb-4 relative inline-block">
            Welcome to Bank Assist
            <AutoAwesomeIcon 
              className="absolute -top-3 -right-0 text-[#ffe600] text-4xl animate-pulse" 
            />
          </h1>
          <p className="text-[#999999] dark:text-[#cccccc]">
            Let&apos;s personalize your experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-[#999999] dark:text-[#cccccc] mb-2"
            >
              What&apos;s your name?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[#cccccc] dark:border-[#999999] bg-[#ffffff] dark:bg-[#333333] text-[#333333] dark:text-[#ffffff] focus:ring-2 focus:ring-[#ffe600] focus:border-transparent"
              placeholder="Enter your name"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#ffe600] text-[#333333] py-3 px-4 rounded-lg hover:bg-[#cccccc] transition-colors"
          >
            Continue to Banking
          </button>
        </form>
      </motion.div>
    </div>
  );
}