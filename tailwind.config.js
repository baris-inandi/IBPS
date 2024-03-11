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
          50: "#FBFBFB",
          100: "#EBEBEB",
          200: "#C9C9C9",
          300: "#A8A8A8",
          400: "#878787",
          500: "#666666",
          600: "#575757",
          700: "#474747",
          800: "#383838",
          900: "#292929",
          950: "#212121",
          1000: "#171717",
          1100: "#121212",
        },
        sidedark: {
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
          1000: "#14171A",
        },
      },
    },
  },
  plugins: [],
};
