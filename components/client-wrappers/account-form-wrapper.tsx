"use client";

import { OpenAccountForm } from "../open-account-form";
import { Message } from "../message";
import { useState } from "react";

export const AccountFormWrapper = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (data: any) => {
    console.log("Account application submitted:", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 bg-primary-light text-neutral-500 rounded-lg">
        Application submitted successfully! We&apos;ll review your information and contact you soon.
      </div>
    );
  }

  return <OpenAccountForm onSubmit={handleSubmit} />;
}; 