"use client";

import { motion } from "framer-motion";
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
      className: "bg-neutral-50 border border-neutral-200",
    },
    highlighted: {
      className: "bg-gradient-to-br from-primary to-primary-dark",
    },
    warning: {
      className: "bg-gradient-to-br from-warning to-error",
    },
  };

  return (
    <motion.div
      className={`rounded-xl shadow-lg overflow-hidden p-8 ${variants[variant].className} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}; 