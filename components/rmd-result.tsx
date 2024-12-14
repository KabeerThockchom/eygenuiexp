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

export const RMDResult = ({ formData, rmdAmount }: RMDResultProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <BankingCard variant="highlighted" className="text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your 2024 Inherited RMD Estimate</h2>
            <p className="text-white/80">Based on the information you provided</p>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-8">
          <div className="text-lg font-medium text-white/80">Estimated RMD Amount</div>
          <div className="text-5xl font-bold mt-2">
            ${rmdAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-primary-main rounded-lg hover:bg-white/90 transition-colors">
            <PrinterIcon className="w-5 h-5" />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-primary-main rounded-lg hover:bg-white/90 transition-colors">
            <DocumentArrowDownIcon className="w-5 h-5" />
            Save as PDF
          </button>
        </div>
      </BankingCard>

      <BankingCard>
        <h3 className="text-xl font-semibold text-neutral-900 mb-6">Review Your Information</h3>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div>
            <div className="text-sm font-medium text-neutral-600">Account Type</div>
            <div className="mt-1 text-neutral-900">{formData.accountType}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-600">Account Balance</div>
            <div className="mt-1 text-neutral-900">
              ${formData.balance.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-600">Original Owner Information</div>
            <div className="mt-1 text-neutral-900">
              Born: {new Date(formData.originalOwnerBirthDate).toLocaleDateString()}
              <br />
              Died: {new Date(formData.originalOwnerDeathDate).toLocaleDateString()}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-600">Registration Type</div>
            <div className="mt-1 text-neutral-900">
              {formData.registrationType === "trust" ? "Trust or estate" : "Individual"}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-600">Beneficiary Type</div>
            <div className="mt-1 text-neutral-900">{formData.beneficiaryType}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-neutral-600">Your Date of Birth</div>
            <div className="mt-1 text-neutral-900">
              {new Date(formData.beneficiaryBirthDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </BankingCard>

      <BankingCard>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">We'd Love Your Feedback</h3>
            <p className="text-neutral-600">
              Help us improve your experience with the Inherited RMD Calculator
            </p>
          </div>

          <div>
            <div className="text-sm font-medium text-neutral-700 mb-3">
              How satisfied were you with the calculator?
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className="group p-2 hover:bg-neutral-50 rounded-lg transition-colors"
                >
                  <StarIcon className="w-8 h-8 text-neutral-300 group-hover:text-yellow-400 transition-colors" />
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-neutral-500 mt-2">
              <span>Not Satisfied</span>
              <span>Very Satisfied</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Please tell us why
            </label>
            <textarea
              className="w-full p-3 border rounded-lg resize-none h-24 bg-white border-neutral-200 focus:border-primary-main focus:ring-2 focus:ring-primary-light focus:ring-opacity-50 transition-colors"
              placeholder="Share your thoughts..."
            />
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors">
              Submit Feedback
            </button>
          </div>
        </div>
      </BankingCard>

      <div className="text-center text-sm text-neutral-500">
        Need help? Contact our support team at support@example.com
      </div>
    </div>
  );
}; 