"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-zinc-50 mb-4">
            Welcome to Digital Banking
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Let's personalize your experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
            >
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary-main focus:border-transparent"
              placeholder="Enter your name"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-main text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Continue to Banking
          </button>
        </form>
      </motion.div>
    </div>
  );
}