"use client";

import { RMDCalculator } from "../rmd-calculator";
import { RMDResult } from "../rmd-result";
import { calculateRMD } from "@/lib/rmd-calculator";
import { useState } from "react";
import { RMDFormData } from "../rmd-calculator";

interface RMDCalculatorWrapperProps {
  initialData?: Partial<RMDFormData>;
}

export const RMDCalculatorWrapper = ({ initialData }: RMDCalculatorWrapperProps) => {
  const [result, setResult] = useState<React.ReactNode>(null);

  const handleCalculate = (formData: RMDFormData) => {
    console.log("Calculating RMD with data:", formData);
    const rmdAmount = calculateRMD(formData);
    console.log("RMD calculation result:", rmdAmount);
    
    setResult(
      <div className="space-y-6">
        <RMDResult formData={formData} rmdAmount={rmdAmount} />
        <div className="p-4 bg-blue-50 text-blue-700 rounded-lg">
          <h3 className="font-medium mb-2">Understanding Your RMD</h3>
          <p className="text-sm">
            Based on your information, your Required Minimum Distribution (RMD) for this year 
            is ${rmdAmount.toLocaleString()}. This amount must be withdrawn by December 31st 
            to avoid potential penalties.
          </p>
          <p className="text-sm mt-2">
            Need help setting up your withdrawal? Just ask and I&apos;ll guide you through the process.
          </p>
        </div>
      </div>
    );
  };

  if (result) {
    return result;
  }

  return <RMDCalculator onCalculate={handleCalculate} initialData={initialData} />;
}; 