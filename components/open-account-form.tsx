"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BankingCard } from "./ui/banking-card";
import { Stepper } from "./ui/stepper";
import { 
  ShieldCheckIcon, 
  BanknotesIcon, 
  ChartBarIcon, 
  ArrowTrendingUpIcon,
  CreditCardIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

interface AccountOpeningData {
  accountType: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    ssn: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  employment: {
    status: string;
    employer?: string;
    income?: number;
  };
  funding: {
    initialDeposit: number;
    fundingMethod: string;
  };
}

const steps = [
  "Account Type",
  "Personal Info",
  "Address",
  "Employment",
  "Funding",
  "Review"
];

const accountTypes = [
  {
    id: "checking",
    name: "Essential Checking",
    description: "Everyday banking with no minimum balance",
    icon: BanknotesIcon,
    features: ["No monthly fee", "Online & mobile banking", "Debit card"],
  },
  {
    id: "savings",
    name: "High-Yield Savings",
    description: "Earn more on your savings",
    icon: ChartBarIcon,
    features: ["2.50% APY", "No minimum balance", "No monthly fee"],
  },
  {
    id: "investment",
    name: "Investment Account",
    description: "Start building your portfolio",
    icon: ArrowTrendingUpIcon,
    features: ["Commission-free trades", "Professional guidance", "Research tools"],
  },
  {
    id: "credit",
    name: "Rewards Credit Card",
    description: "Earn rewards on every purchase",
    icon: CreditCardIcon,
    features: ["2% cashback", "No annual fee", "$200 welcome bonus"],
  },
];

export const OpenAccountForm = ({ onSubmit }: { onSubmit: (data: AccountOpeningData) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AccountOpeningData>({
    accountType: "",
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      ssn: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    employment: {
      status: "",
      employer: "",
      income: undefined,
    },
    funding: {
      initialDeposit: 0,
      fundingMethod: "",
    },
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {accountTypes.map((type) => (
                <label
                  key={type.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-[#cccccc]/10 transition-all ${
                    formData.accountType === type.id
                      ? "border-[#333333] ring-2 ring-[#999999] ring-opacity-50"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="accountType"
                    value={type.id}
                    checked={formData.accountType === type.id}
                    onChange={(e) =>
                      setFormData({ ...formData, accountType: e.target.value })
                    }
                    className="sr-only"
                  />
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[#333333]/10 text-[#333333] rounded-lg">
                        <type.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-medium text-[#333333]">{type.name}</h3>
                    </div>
                    <p className="text-sm text-[#999999] mb-4">
                      {type.description}
                    </p>
                    <ul className="mt-auto space-y-2">
                      {type.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-[#999999]"
                        >
                          <CheckCircleIcon className="w-4 h-4 text-[#ffe600]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-[#ffffff] border-[#cccccc] focus:border-[#333333] focus:ring-2 focus:ring-[#999999] focus:ring-opacity-50 transition-colors"
                  value={formData.personalInfo.firstName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        firstName: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-[#ffffff] border-[#cccccc] focus:border-[#333333] focus:ring-2 focus:ring-[#999999] focus:ring-opacity-50 transition-colors"
                  value={formData.personalInfo.lastName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        lastName: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg bg-[#ffffff] border-[#cccccc] focus:border-[#333333] focus:ring-2 focus:ring-[#999999] focus:ring-opacity-50 transition-colors"
                value={formData.personalInfo.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: {
                      ...formData.personalInfo,
                      email: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full p-3 border rounded-lg bg-[#ffffff] border-[#cccccc] focus:border-[#333333] focus:ring-2 focus:ring-[#999999] focus:ring-opacity-50 transition-colors"
                value={formData.personalInfo.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    personalInfo: {
                      ...formData.personalInfo,
                      phone: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg bg-[#ffffff] border-[#cccccc] focus:border-[#333333] focus:ring-2 focus:ring-[#999999] focus:ring-opacity-50 transition-colors"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        dateOfBirth: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-2">
                  Social Security Number
                </label>
                <input
                  type="password"
                  className="w-full p-3 border rounded-lg bg-[#ffffff] border-[#cccccc] focus:border-[#333333] focus:ring-2 focus:ring-[#999999] focus:ring-opacity-50 transition-colors"
                  value={formData.personalInfo.ssn}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        ssn: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>
        );
      // Add cases for Address, Employment, and Funding steps
      default:
        return null;
    }
  };

  return (
    <BankingCard className="max-w-3xl mx-auto">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-[#333333] mb-2">
            Open a New Account
          </h2>
          <p className="text-[#999999]">
            Complete the application to open your account. It only takes a few minutes.
          </p>
        </div>

        <div className="flex items-center gap-3 p-4 bg-[#333333]/5 rounded-lg">
          <ShieldCheckIcon className="w-6 h-6 text-[#333333]" />
          <p className="text-sm text-[#333333]">
            Your information is secure and encrypted
          </p>
        </div>

        <Stepper steps={steps} currentStep={currentStep} className="mb-8" />

        <div className="bg-[#ffffff] rounded-xl p-6 border border-[#cccccc]">
          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStepContent()}

            <div className="flex justify-between pt-6 border-t">
              <button
                type="button"
                onClick={handleBack}
                className={`px-6 py-2 rounded-lg border border-[#cccccc] text-[#333333] hover:bg-[#cccccc]/10 transition-colors ${
                  currentStep === 0 ? "invisible" : ""
                }`}
              >
                Back
              </button>
              {currentStep === steps.length - 1 ? (
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#333333] text-[#ffffff] hover:bg-[#333333]/90 transition-colors"
                >
                  Submit Application
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 rounded-lg bg-[#333333] text-[#ffffff] hover:bg-[#333333]/90 transition-colors"
                >
                  Continue
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </BankingCard>
  );
}; 