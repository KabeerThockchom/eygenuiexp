// Color schemes
const colorSchemes = {
  eyYellow: {
    primary: {
      main: "#FFE600",
      dark: "#E6CF00",
      light: "#FFF173",
      contrast: "#333333",
    },
    neutral: {
      50: "#FFFFFF",
      100: "#F5F5F5",
      200: "#CCCCCC",
      300: "#999999",
      400: "#666666",
      500: "#333333",
      600: "#222222",
      700: "#1A1A1A",
      800: "#0F0F0F",
      900: "#000000",
    },
  },
  eyBlue: {
    primary: {
      main: "#00A3E0",
      dark: "#0082B3",
      light: "#33B5E6",
      contrast: "#FFFFFF",
    },
    neutral: {
      50: "#FFFFFF",
      100: "#F5F5F5",
      200: "#CCCCCC",
      300: "#999999",
      400: "#666666",
      500: "#333333",
      600: "#222222",
      700: "#1A1A1A",
      800: "#0F0F0F",
      900: "#000000",
    },
  },
  eyGreen: {
    primary: {
      main: "#2AC420",
      dark: "#229C1A",
      light: "#55D04D",
      contrast: "#FFFFFF",
    },
    neutral: {
      50: "#FFFFFF",
      100: "#F5F5F5",
      200: "#CCCCCC",
      300: "#999999",
      400: "#666666",
      500: "#333333",
      600: "#222222",
      700: "#1A1A1A",
      800: "#0F0F0F",
      900: "#000000",
    },
  },
};

// Select the active color scheme
const activeColorScheme = colorSchemes.eyBlue;

export const theme = {
  colors: {
    ...activeColorScheme,
    error: "#FF3333",
    warning: activeColorScheme.primary.main,
    info: activeColorScheme.neutral[300],
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