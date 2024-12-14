"use client";

import { motion } from "framer-motion";
import { theme } from "@/lib/theme";
import { ReactNode } from "react";

interface BankingCardProps {
  children: ReactNode;
  variant?: "default" | "highlighted" | "warning";
  className?: string;
}

export const BankingCard = ({ 
  children, 
  variant = "default",
  className = "" 
}: BankingCardProps) => {
  const variants = {
    default: {
      background: theme.colors.neutral[50],
      border: `1px solid ${theme.colors.neutral[200]}`,
    },
    highlighted: {
      background: `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})`,
      border: "none",
    },
    warning: {
      background: `linear-gradient(135deg, ${theme.colors.warning}, ${theme.colors.error})`,
      border: "none",
    },
  };

  return (
    <motion.div
      className={`rounded-xl shadow-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        ...variants[variant],
        padding: theme.spacing.xl,
      }}
    >
      {children}
    </motion.div>
  );
}; 