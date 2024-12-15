import type { Config } from "tailwindcss";
import { theme } from "./lib/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: theme.colors.primary.main,
          dark: theme.colors.primary.dark,
          light: theme.colors.primary.light,
          contrast: theme.colors.primary.contrast,
        },
        neutral: theme.colors.neutral,
        error: theme.colors.error,
        warning: theme.colors.warning,
        info: theme.colors.info,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      spacing: theme.spacing,
      boxShadow: theme.shadows,
      borderRadius: theme.borderRadius,
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
