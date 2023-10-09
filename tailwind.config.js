/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    fontFamily: {
      sans: [
        "Heebo",
        "Inter",
        "Roboto",
        "Arial",
        "ui-sans-serif",
        "system-ui",
      ],
      mono: ["JetBrains Mono", "Menlo", "Cascadia Code", "mono"],
    },
    extend: {
      colors: {
        onedark: {
          50: "#D7DAE0",
          100: "#CBCFD7",
          200: "#B4BAC5",
          300: "#9DA5B4",
          400: "#868FA2",
          500: "#6F7A90",
          600: "#5D6779",
          700: "#4B5362",
          800: "#3A404B",
          900: "#282C34",
          950: "#1C1F24",
        },
      },
    },
  },
  plugins: [],
};
