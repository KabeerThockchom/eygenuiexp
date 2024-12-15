"use client";

import { scaleLinear } from "d3-scale";
import { motion } from "framer-motion";
import { USAGES } from "@/components/data";
import { useWindowSize } from "react-use";

export const UsageView = ({
  type,
}: {
  type: "electricity" | "gas" | "water";
}) => {
  const { width } = useWindowSize();
  const usages = USAGES[type].slice(0, width < 768 ? 7 : 14);
  const maxUsage = Math.max(...usages.map((usage) => usage.amount));
  const usageToHeight = scaleLinear().domain([0, maxUsage]).range([0, 150]);
  const color =
    type === "electricity" ? "primary" : type === "gas" ? "primary-dark" : "primary-light";

  return (
    <div className="md:max-w-[452px] max-w-[calc(100dvw-80px)] w-full pb-6 flex flex-col gap-4">
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-neutral-500 text-sm">Average Usage</div>
        <div className="font-semibold">
          {`${(
            usages.reduce((acc, usage) => acc + usage.amount, 0) / 14
          ).toFixed()} ${
            type === "electricity" ? "kWh" : type === "gas" ? "m³" : "L"
          }`}
        </div>
      </motion.div>

      <div className="flex flex-row gap-6 justify-between">
        <motion.div
          className="mt-auto flex flex-col justify-between h-full py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[100, 75, 50, 25, 0].map((label) => (
            <div key={label} className="text-xs text-neutral-200 mb-3">
              {label}
            </div>
          ))}
        </motion.div>

        <div className="flex flex-row justify-between w-full">
          {usages.map((usage, index) => (
            <div
              key={usage.day}
              className="text-sm h-[150px] flex flex-col items-center gap-1 relative"
            >
              <motion.div
                key={`total-${usage.day}`}
                className={`w-2 bg-${color} rounded-md mt-auto`}
                initial={{ height: 0 }}
                animate={{ height: usageToHeight(usage.amount) }}
                transition={{ delay: index * 0.05 }}
              />
              {type === "electricity" && (
                <motion.div
                  key={`clean-${usage.day}`}
                  className={`absolute w-2 bg-primary-dark rounded-md mt-auto bottom-5`}
                  initial={{ height: 0 }}
                  animate={{ height: usageToHeight(usage.clean) }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                />
              )}
              <motion.div
                className="text-xs text-neutral-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {usage.day}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          className="flex flex-col gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex flex-row gap-2 items-center">
            <div className={`size-3 bg-${color} rounded-sm`} />
            <div className="text-xs text-neutral-400">Total</div>
          </div>
          {type === "electricity" && (
            <div className="flex flex-row gap-2 items-center">
              <div className={`size-3 bg-primary-dark rounded-sm`} />
              <div className="text-xs text-neutral-400">Clean</div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="hidden bg-primary" />
      <div className="hidden bg-primary-dark" />
      <div className="hidden bg-primary-light" />
    </div>
  );
};
