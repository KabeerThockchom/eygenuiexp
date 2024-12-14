import { ReactNode } from "react";

interface BankingCardProps {
  children: ReactNode;
  className?: string;
}

export const BankingCard = ({ children, className = "" }: BankingCardProps) => {
  return (
    <div className={`#ffe600 rounded-xl shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}; 