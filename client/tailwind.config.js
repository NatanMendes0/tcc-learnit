/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0284C7",
        secondary: "#0EA5E9",
        tertiary: "#FFFFFF",
        font_primary: "#000000",
        font_secondary: "#4B5563",
        font_tertiary: "#6B7280",
        bg_primary: "#F9FAFB",
        bg_secondary: "#F3F4F6",
        bg_tertiary: "#E5E7EB",
      },
      fontFamily: {
        sans: ["Karma", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
