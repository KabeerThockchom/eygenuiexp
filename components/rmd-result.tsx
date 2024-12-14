"use client";

import { motion } from "framer-motion";
import { RMDFormData } from "./rmd-calculator";
import { BankingCard } from "./ui/banking-card";
import { DocumentArrowDownIcon, PrinterIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

interface RMDResultProps {
  formData: RMDFormData;
  rmdAmount: number;
}

const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00Z');
  return date.toLocaleDateString();
};

export const RMDResult = ({ formData, rmdAmount }: RMDResultProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <BankingCard variant="highlighted" className="text-[#ffffff]">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your 2024 Inherited RMD Estimate</h2>
            <p className="text-[#cccccc]">Based on the information you provided</p>
          </div>
          <button className="p-2 hover:bg-[#ffffff]/10 rounded-lg transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-8">
          <div className="text-lg font-medium text-[#cccccc]">Estimated RMD Amount</div>
          <div className="text-5xl font-bold mt-2">
            ${rmdAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#ffffff] text-[#333333] rounded-lg hover:bg-[#ffffff]/90 transition-colors">
            <PrinterIcon className="w-5 h-5" />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#ffffff] text-[#333333] rounded-lg hover:bg-[#ffffff]/90 transition-colors">
            <DocumentArrowDownIcon className="w-5 h-5" />
            Save as PDF
          </button>
        </div>
      </BankingCard>

      <BankingCard>
        <h3 className="text-xl font-semibold text-[#333333] mb-6">Review Your Information</h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <div className="text-sm font-medium text-[#999999]">Account Type</div>
            <div className="mt-1 text-[#333333]">{formData.accountType}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-[#999999]">Account Balance</div>
            <div className="mt-1 text-[#333333]">
              ${formData.balance.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-[#999999]">Original Owner Information</div>
            <div className="mt-1 text-[#333333]">
              Born: {formatDisplayDate(formData.originalOwnerBirthDate)}
              <br />
              Died: {formatDisplayDate(formData.originalOwnerDeathDate)}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-[#999999]">Registration Type</div>
            <div className="mt-1 text-[#333333]">
              {formData.registrationType === "trust" ? "Trust or estate" : "Individual"}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-[#999999]">Beneficiary Type</div>
            <div className="mt-1 text-[#333333]">{formData.beneficiaryType}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-[#999999]">Your Date of Birth</div>
            <div className="mt-1 text-[#333333]">
              {formatDisplayDate(formData.beneficiaryBirthDate)}
            </div>
          </div>
        </div>
      </BankingCard>

      <BankingCard>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-[#333333] mb-2">We&apos;d Love Your Feedback</h3>
            <p className="text-[#999999]">
              Help us improve your experience with the Inherited RMD Calculator
            </p>
          </div>

          <div>
            <div className="text-sm font-medium text-[#333333] mb-3">
              How satisfied were you with the calculator?
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className="group p-2 hover:bg-[#cccccc] rounded-lg transition-colors"
                >
                  <StarIcon className="w-8 h-8 text-[#cccccc] group-hover:text-[#ffe600] transition-colors" />
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-[#999999] mt-2">
              <span>Not Satisfied</span>
              <span>Very Satisfied</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Please tell us why
            </label>
            <textarea
              className="w-full p-3 border rounded-lg resize-none h-24 bg-[#ffffff] border-[#cccccc] focus:border-[#333333] focus:ring-2 focus:ring-[#999999] focus:ring-opacity-50 transition-colors"
              placeholder="Share your thoughts..."
            />
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-[#333333] text-[#ffffff] rounded-lg hover:bg-[#333333]/90 transition-colors">
              Submit Feedback
            </button>
          </div>
        </div>
      </BankingCard>

      <div className="text-center text-sm text-[#999999]">
        Need help? Contact our support team at support@example.com
      </div>
    </div>
  );
};