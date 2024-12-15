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
  CheckCircleIcon,
  SparklesIcon
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

  const autoFillForm = () => {
    setFormData({
      accountType: "checking",
      personalInfo: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        dateOfBirth: "1990-01-01",
        ssn: "123-45-6789",
      },
      address: {
        street: "123 Main Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
      },
      employment: {
        status: "employed",
        employer: "Tech Company Inc.",
        income: 85000,
      },
      funding: {
        initialDeposit: 1000,
        fundingMethod: "bank-transfer",
      },
    });
  };

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
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-neutral-200/10 transition-all ${
                    formData.accountType === type.id
                      ? "border-neutral-500 ring-2 ring-neutral-400 ring-opacity-50"
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
                      <div className="p-2 bg-neutral-500/10 text-neutral-500 rounded-lg">
                        <type.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-medium text-neutral-500">{type.name}</h3>
                    </div>
                    <p className="text-sm text-neutral-400 mb-4">
                      {type.description}
                    </p>
                    <ul className="mt-auto space-y-2">
                      {type.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-neutral-400"
                        >
                          <CheckCircleIcon className="w-4 h-4 text-primary" />
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
                <label className="block text-sm font-medium text-neutral-500 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
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
                <label className="block text-sm font-medium text-neutral-500 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
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
              <label className="block text-sm font-medium text-neutral-500 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
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
              <label className="block text-sm font-medium text-neutral-500 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
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
                <label className="block text-sm font-medium text-neutral-500 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
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
                <label className="block text-sm font-medium text-neutral-500 mb-2">
                  Social Security Number
                </label>
                <input
                  type="password"
                  className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
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
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-2">
                Street Address
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
                value={formData.address.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: {
                      ...formData.address,
                      street: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-500 mb-2">
                  City
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
                  value={formData.address.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        city: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-500 mb-2">
                  State
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
                  value={formData.address.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        state: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-500 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
                  value={formData.address.zipCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        zipCode: e.target.value,
                      },
                    })
                  }
                  required
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-2">
                Employment Status
              </label>
              <select
                className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
                value={formData.employment.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    employment: {
                      ...formData.employment,
                      status: e.target.value,
                    },
                  })
                }
                required
              >
                <option value="">Select status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="retired">Retired</option>
                <option value="student">Student</option>
              </select>
            </div>
            {(formData.employment.status === "employed" || formData.employment.status === "self-employed") && (
              <>
                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-2">
                    Employer Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
                    value={formData.employment.employer}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        employment: {
                          ...formData.employment,
                          employer: e.target.value,
                        },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-500 mb-2">
                    Annual Income
                  </label>
                  <input
                    type="number"
                    className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
                    value={formData.employment.income}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        employment: {
                          ...formData.employment,
                          income: Number(e.target.value),
                        },
                      })
                    }
                    required
                  />
                </div>
              </>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-2">
                Initial Deposit Amount
              </label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
                value={formData.funding.initialDeposit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    funding: {
                      ...formData.funding,
                      initialDeposit: Number(e.target.value),
                    },
                  })
                }
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-2">
                Funding Method
              </label>
              <select
                className="w-full p-3 border rounded-lg bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
                value={formData.funding.fundingMethod}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    funding: {
                      ...formData.funding,
                      fundingMethod: e.target.value,
                    },
                  })
                }
                required
              >
                <option value="">Select method</option>
                <option value="bank-transfer">Bank Transfer</option>
                <option value="debit-card">Debit Card</option>
                <option value="check">Check</option>
                <option value="wire-transfer">Wire Transfer</option>
              </select>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-neutral-500/5 p-4 rounded-lg">
              <h3 className="font-medium text-neutral-500 mb-4">Review Your Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Account Type</h4>
                  <p className="text-neutral-400">
                    {accountTypes.find(type => type.id === formData.accountType)?.name}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Personal Information</h4>
                  <p className="text-neutral-400">
                    {formData.personalInfo.firstName} {formData.personalInfo.lastName}<br />
                    {formData.personalInfo.email}<br />
                    {formData.personalInfo.phone}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Address</h4>
                  <p className="text-neutral-400">
                    {formData.address.street}<br />
                    {formData.address.city}, {formData.address.state} {formData.address.zipCode}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Employment</h4>
                  <p className="text-neutral-400">
                    Status: {formData.employment.status}<br />
                    {formData.employment.employer && `Employer: ${formData.employment.employer}`}<br />
                    {formData.employment.income && `Annual Income: $${formData.employment.income.toLocaleString()}`}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Funding</h4>
                  <p className="text-neutral-400">
                    Initial Deposit: ${formData.funding.initialDeposit.toLocaleString()}<br />
                    Method: {formData.funding.fundingMethod}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-neutral-500/5 rounded-lg">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-neutral-200 text-neutral-500 focus:ring-neutral-400"
                  required
                />
                <label htmlFor="terms" className="text-sm text-neutral-500">
                  I agree to the Terms and Conditions and Privacy Policy
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <BankingCard className="max-w-3xl mx-auto">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-neutral-500 mb-2">
              Open a New Account
            </h2>
            <p className="text-neutral-400">
              Complete the application to open your account. It only takes a few minutes.
            </p>
          </div>
          <button
            type="button"
            onClick={autoFillForm}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-neutral-500 hover:bg-primary-dark transition-colors"
          >
            <SparklesIcon className="w-5 h-5" />
            Auto Fill
          </button>
        </div>

        <div className="flex items-center gap-3 p-4 bg-neutral-500/5 rounded-lg">
          <ShieldCheckIcon className="w-6 h-6 text-neutral-500" />
          <p className="text-sm text-neutral-500">
            Your information is secure and encrypted
          </p>
        </div>

        <Stepper steps={steps} currentStep={currentStep} className="mb-8" />

        <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
          <form onSubmit={handleSubmit} className="space-y-8">
            {renderStepContent()}

            <div className="flex justify-between pt-6 border-t">
              <button
                type="button"
                onClick={handleBack}
                className={`px-6 py-2 rounded-lg border border-neutral-200 text-neutral-500 hover:bg-neutral-200/10 transition-colors ${
                  currentStep === 0 ? "invisible" : ""
                }`}
              >
                Back
              </button>
              {currentStep === steps.length - 1 ? (
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-neutral-500 text-neutral-50 hover:bg-neutral-500/90 transition-colors"
                >
                  Submit Application
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 rounded-lg bg-neutral-500 text-neutral-50 hover:bg-neutral-500/90 transition-colors"
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