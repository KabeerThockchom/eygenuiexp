"use client";

import { useState, useEffect } from "react";
import { BankingCard } from "@/components/banking-card";
import { Stepper } from "@/components/stepper";

export interface RMDFormData {
  accountType: string;
  balance: number;
  originalOwnerBirthDate: string;
  originalOwnerDeathDate: string;
  registrationType: "trust" | "individual";
  beneficiaryType: string;
  beneficiaryBirthDate: string;
}

interface RMDCalculatorProps {
  onCalculate: (data: RMDFormData) => void;
  initialData?: Partial<RMDFormData>;
}

const formatDateForInput = (dateString: string): string => {
  if (!dateString) return "";
  
  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  // Convert MM/DD/YYYY to YYYY-MM-DD
  const [month, day, year] = dateString.split("/");
  if (!month || !day || !year) return dateString;
  
  return `${year.padStart(4, '20')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const normalizeAccountType = (type: string): string => {
  // First denormalize any kebab-case values
  const denormalizeMap: { [key: string]: string } = {
    'traditional-ira': 'Traditional IRA',
    'roth-ira': 'Roth IRA',
    '401k': '401(k)',
    '403b': '403(b)',
    '457b': '457(b)'
  };

  // Then normalize display values
  const normalizeMap: { [key: string]: string } = {
    'Traditional IRA': 'traditional-ira',
    'Roth IRA': 'roth-ira',
    '401(k)': '401k',
    '403(b)': '403b',
    '457(b)': '457b'
  };

  // If it's already normalized, denormalize then normalize to ensure consistency
  const displayValue = denormalizeMap[type] || type;
  return normalizeMap[displayValue] || type.toLowerCase().replace(/\s+/g, '-');
};

export const RMDCalculator = ({ onCalculate, initialData }: RMDCalculatorProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RMDFormData>({
    accountType: normalizeAccountType(initialData?.accountType || ""),
    balance: initialData?.balance || 0,
    originalOwnerBirthDate: formatDateForInput(initialData?.originalOwnerBirthDate || ""),
    originalOwnerDeathDate: formatDateForInput(initialData?.originalOwnerDeathDate || ""),
    registrationType: initialData?.registrationType || "individual",
    beneficiaryType: initialData?.beneficiaryType || "",
    beneficiaryBirthDate: formatDateForInput(initialData?.beneficiaryBirthDate || ""),
  });

  useEffect(() => {
    if (initialData) {
      console.log("Initializing RMD calculator with formatted data:", {
        ...initialData,
        originalOwnerBirthDate: formatDateForInput(initialData.originalOwnerBirthDate || ""),
        originalOwnerDeathDate: formatDateForInput(initialData.originalOwnerDeathDate || ""),
        beneficiaryBirthDate: formatDateForInput(initialData.beneficiaryBirthDate || ""),
        accountType: normalizeAccountType(initialData.accountType || ""),
      });
    }
  }, [initialData]);

  const steps = [
    {
      title: "Account Information",
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#333333] dark:text-[#ffffff] mb-1">
              Account Type
            </label>
            <select
              className="w-full px-3 py-2 border border-[#cccccc] rounded-md shadow-sm focus:ring-[#ffe600] focus:border-[#ffe600]"
              value={formData.accountType}
              onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
            >
              <option value="">Select account type</option>
              <option value="traditional-ira">Traditional IRA</option>
              <option value="roth-ira">Roth IRA</option>
              <option value="401k">401(k)</option>
              <option value="403b">403(b)</option>
              <option value="457b">457(b)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] dark:text-[#ffffff] mb-1">
              Account Balance (as of December 31 last year)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-[#999999]">$</span>
              <input
                type="number"
                className="w-full pl-8 pr-3 py-2 border border-[#cccccc] rounded-md shadow-sm focus:ring-[#ffe600] focus:border-[#ffe600]"
                value={formData.balance || ""}
                onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] dark:text-[#ffffff] mb-1">
              Registration Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-[#ffe600] border-[#333333] dark:border-[#ffffff] focus:ring-[#ffe600] dark:focus:ring-[#ffe600]"
                  name="registrationType"
                  value="individual"
                  checked={formData.registrationType === "individual"}
                  onChange={(e) => setFormData({ ...formData, registrationType: e.target.value as "individual" | "trust" })}
                />
                <span className="ml-2 text-[#333333] dark:text-[#ffffff]">Individual</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-[#ffe600] border-[#333333] dark:border-[#ffffff] focus:ring-[#ffe600] dark:focus:ring-[#ffe600]"
                  name="registrationType"
                  value="trust"
                  checked={formData.registrationType === "trust"}
                  onChange={(e) => setFormData({ ...formData, registrationType: e.target.value as "individual" | "trust" })}
                />
                <span className="ml-2 text-[#333333] dark:text-[#ffffff]">Trust</span>
              </label>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Original Owner Information",
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#333333] dark:text-[#ffffff] mb-1">
              Original Owner&apos;s Date of Birth
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.originalOwnerBirthDate}
              onChange={(e) => setFormData({ ...formData, originalOwnerBirthDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] dark:text-[#ffffff] mb-1">
              Original Owner&apos;s Date of Death
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.originalOwnerDeathDate}
              onChange={(e) => setFormData({ ...formData, originalOwnerDeathDate: e.target.value })}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Beneficiary Information",
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#333333] dark:text-[#ffffff] mb-1">
              Beneficiary Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.beneficiaryType}
              onChange={(e) => setFormData({ ...formData, beneficiaryType: e.target.value })}
            >
              <option value="">Select beneficiary type</option>
              <option value="spouse">Spouse</option>
              <option value="child">Child</option>
              <option value="grandchild">Grandchild</option>
              <option value="other-family">Other Family Member</option>
              <option value="non-family">Non-Family Member</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#333333] dark:text-[#ffffff] mb-1">
              Beneficiary&apos;s Date of Birth
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.beneficiaryBirthDate}
              onChange={(e) => setFormData({ ...formData, beneficiaryBirthDate: e.target.value })}
            />
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Submitting RMD calculation form:", formData);
      onCalculate(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.accountType && formData.balance > 0 && formData.registrationType;
      case 1:
        return formData.originalOwnerBirthDate && formData.originalOwnerDeathDate;
      case 2:
        return formData.beneficiaryType && formData.beneficiaryBirthDate;
      default:
        return false;
    }
  };

  return (
    <BankingCard>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-[#333333] dark:text-[#ffffff] mb-6">
          RMD Calculator
        </h2>
        <div className="relative pb-12">
          <Stepper
            steps={steps.map(s => s.title)}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>
        <div className="mt-8">
          {steps[currentStep].fields}
        </div>
        <div className="mt-8 flex justify-between">
          <button
            className="px-4 py-2 text-sm font-medium text-[#333333] dark:text-[#333333] bg-[#ffffff] dark:bg-[#ffffff] border border-[#cccccc] dark:border-[#cccccc] rounded-md shadow-sm hover:bg-[#cccccc] dark:hover:bg-[#cccccc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffe600]"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-[#333333] dark:text-[#333333] bg-[#ffe600] dark:bg-[#ffe600] border border-transparent rounded-md shadow-sm hover:bg-[#cccccc] dark:hover:bg-[#cccccc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffe600] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            {currentStep === steps.length - 1 ? "Calculate RMD" : "Next"}
          </button>
        </div>
      </div>
    </BankingCard>
  );
}; 