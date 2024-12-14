import { ReactNode } from "react";

interface BankingCardProps {
  children: ReactNode;
  className?: string;
}

export const BankingCard = ({ children, className = "" }: BankingCardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}; 