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
  const [year, month, day] = dateString.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day))
    .toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
};

export const RMDResult = ({ formData, rmdAmount }: RMDResultProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <BankingCard variant="highlighted" className="text-neutral-50">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your 2024 Inherited RMD Estimate</h2>
            <p className="text-neutral-200">Based on the information you provided</p>
          </div>
          <button className="p-2 hover:bg-neutral-50/10 rounded-lg transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-8">
          <div className="text-lg font-medium text-neutral-200">Estimated RMD Amount</div>
          <div className="text-5xl font-bold mt-2">
            ${rmdAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-50 text-neutral-500 rounded-lg hover:bg-neutral-50/90 transition-colors">
            <PrinterIcon className="w-5 h-5" />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-50 text-neutral-500 rounded-lg hover:bg-neutral-50/90 transition-colors">
            <DocumentArrowDownIcon className="w-5 h-5" />
            Save as PDF
          </button>
        </div>
      </BankingCard>

      <BankingCard>
        <h3 className="text-xl font-semibold text-neutral-500 mb-6">Review Your Information</h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <div className="text-sm font-medium text-neutral-400">Account Type</div>
            <div className="mt-1 text-neutral-500">{formData.accountType}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-400">Account Balance</div>
            <div className="mt-1 text-neutral-500">
              ${formData.balance.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-400">Original Owner Information</div>
            <div className="mt-1 text-neutral-500">
              Born: {formatDisplayDate(formData.originalOwnerBirthDate)}
              <br />
              Died: {formatDisplayDate(formData.originalOwnerDeathDate)}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-400">Registration Type</div>
            <div className="mt-1 text-neutral-500">
              {formData.registrationType === "trust" ? "Trust or estate" : "Individual"}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-400">Beneficiary Type</div>
            <div className="mt-1 text-neutral-500">{formData.beneficiaryType}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-400">Your Date of Birth</div>
            <div className="mt-1 text-neutral-500">
              {formatDisplayDate(formData.beneficiaryBirthDate)}
            </div>
          </div>
        </div>
      </BankingCard>

      <BankingCard>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-neutral-500 mb-2">We&apos;d Love Your Feedback</h3>
            <p className="text-neutral-400">
              Help us improve your experience with the Inherited RMD Calculator
            </p>
          </div>

          <div>
            <div className="text-sm font-medium text-neutral-500 mb-3">
              How satisfied were you with the calculator?
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className="group p-2 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  <StarIcon className="w-8 h-8 text-neutral-200 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-neutral-400 mt-2">
              <span>Not Satisfied</span>
              <span>Very Satisfied</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-500 mb-2">
              Please tell us why
            </label>
            <textarea
              className="w-full p-3 border rounded-lg resize-none h-24 bg-neutral-50 border-neutral-200 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400 focus:ring-opacity-50 transition-colors"
              placeholder="Share your thoughts..."
            />
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-primary text-neutral-500 rounded-lg hover:bg-primary-dark transition-colors">
              Submit Feedback
            </button>
          </div>
        </div>
      </BankingCard>

      <div className="text-center text-sm text-neutral-400">
        Need help? Contact our support team at support@example.com
      </div>
    </div>
  );
};