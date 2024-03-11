/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./ibps-ide/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Roboto",
        "Inter",
        "ui-sans-serif",
        "system-ui",
      ],
      mono: ["Chivo Mono", "SF Mono", "Menlo", "Cascadia Mono", "mono"],
    },
    extend: {
      colors: {
        idedark: {
          50: "rgb(var(--theme-dark-50) / <alpha-value>)",
          100: "rgb(var(--theme-dark-100) / <alpha-value>)",
          200: "rgb(var(--theme-dark-200) / <alpha-value>)",
          300: "rgb(var(--theme-dark-300) / <alpha-value>)",
          400: "rgb(var(--theme-dark-400) / <alpha-value>)",
          500: "rgb(var(--theme-dark-500) / <alpha-value>)",
          600: "rgb(var(--theme-dark-600) / <alpha-value>)",
          700: "rgb(var(--theme-dark-700) / <alpha-value>)",
          800: "rgb(var(--theme-dark-800) / <alpha-value>)",
          900: "rgb(var(--theme-dark-900) / <alpha-value>)",
          950: "rgb(var(--theme-dark-950) / <alpha-value>)",
          1000: "rgb(var(--theme-dark-1000) / <alpha-value>)",
          1100: "rgb(var(--theme-dark-1100) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
