"use client";

import { motion } from "framer-motion";
import { BankingCard } from "./ui/banking-card";
import { 
  BanknotesIcon, 
  ChartBarIcon, 
  ArrowTrendingUpIcon,
  CreditCardIcon 
} from "@heroicons/react/24/outline";

export interface Account {
  id: string;
  type: "checking" | "savings" | "investment" | "credit";
  name: string;
  balance: number;
  accountNumber: string;
  trend?: number;
  apy?: number;
  creditLimit?: number;
}

interface AccountsOverviewProps {
  accounts: Account[];
}

const AccountIcon = ({ type }: { type: Account["type"] }) => {
  switch (type) {
    case "checking":
      return <BanknotesIcon className="w-6 h-6" />;
    case "savings":
      return <ChartBarIcon className="w-6 h-6" />;
    case "investment":
      return <ArrowTrendingUpIcon className="w-6 h-6" />;
    case "credit":
      return <CreditCardIcon className="w-6 h-6" />;
  }
};

export const AccountsOverview = ({ accounts }: AccountsOverviewProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <BankingCard>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-500">Your Accounts</h2>
            <p className="text-neutral-400 mt-1">Overview of all your accounts</p>
          </div>

          <div className="grid gap-4">
            {accounts.map((account) => (
              <motion.div
                key={account.id}
                className="p-4 border rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="p-2 bg-primary-light text-neutral-500 rounded-lg">
                      <AccountIcon type={account.type} />
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-500">{account.name}</h3>
                      <p className="text-sm text-neutral-400">
                        ••••{account.accountNumber.slice(-4)}
                      </p>
                      {account.apy && (
                        <p className="text-sm text-primary mt-1">
                          {account.apy}% APY
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-neutral-500">
                      ${account.balance.toLocaleString()}
                    </div>
                    {account.trend && (
                      <p className={`text-sm ${account.trend > 0 ? "text-primary" : "text-error"}`}>
                        {account.trend > 0 ? "+" : ""}{account.trend}%
                      </p>
                    )}
                    {account.creditLimit && (
                      <p className="text-sm text-neutral-400">
                        ${account.creditLimit.toLocaleString()} limit
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full p-3 border border-primary text-primary rounded-lg hover:bg-primary-dark transition-colors">
            Open New Account
          </button>
        </div>
      </BankingCard>
    </div>
  );
}; 