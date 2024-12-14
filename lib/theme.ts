export const theme = {
  colors: {
    primary: {
      main: "#333333", // EY dark gray
      light: "#999999", // EY light gray
      dark: "#000000", // Darker shade for depth
      contrast: "#FFFFFF",
    },
    secondary: {
      main: "#FFE600", // EY yellow
      light: "#FFF133", // Lighter yellow
      dark: "#E6CF00", // Darker yellow
      contrast: "#333333", // Dark text for contrast on yellow
    },
    neutral: {
      50: "#FFFFFF",
      100: "#F5F5F5",
      200: "#CCCCCC",
      300: "#B3B3B3",
      400: "#999999",
      500: "#808080",
      600: "#666666",
      700: "#4D4D4D",
      800: "#333333",
      900: "#1A1A1A",
    },
    error: "#FF3333",
    warning: "#FFE600", // Using EY yellow for warning
    info: "#999999", // Using EY light gray for info
  },
  typography: {
    fontFamily: {
      sans: '"Inter", system-ui, -apple-system, sans-serif',
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
  },
};