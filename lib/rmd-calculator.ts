import { RMDFormData } from "@/components/rmd-calculator";

// Mock life expectancy factors based on age
const lifeExpectancyFactors: Record<number, number> = {
  20: 63.0,
  30: 53.3,
  40: 43.6,
  50: 34.2,
  60: 25.2,
  70: 17.0,
  80: 10.2,
  90: 5.3,
};

export function calculateRMD(formData: RMDFormData): number {
  // Get beneficiary's age
  const beneficiaryBirthDate = new Date(formData.beneficiaryBirthDate);
  const currentYear = new Date().getFullYear();
  const age = currentYear - beneficiaryBirthDate.getFullYear();

  // Get the closest age factor
  const ages = Object.keys(lifeExpectancyFactors).map(Number);
  const closestAge = ages.reduce((prev, curr) => {
    return Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev;
  });

  let factor = lifeExpectancyFactors[closestAge];

  // Adjust factor based on beneficiary type
  if (formData.beneficiaryType === "A surviving spouse") {
    factor *= 1.1; // Longer life expectancy for surviving spouses
  } else if (formData.beneficiaryType.includes("under age 21")) {
    factor *= 1.2; // Even longer for young beneficiaries
  }

  // Adjust factor based on registration type
  if (formData.registrationType === "trust") {
    factor *= 0.9; // Shorter distribution period for trusts
  }

  // Calculate RMD
  const rmd = formData.balance / factor;

  // Round to 2 decimal places
  return Math.round(rmd * 100) / 100;
} 