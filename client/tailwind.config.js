/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        tertiary: 'var(--color-bg-tertiary)',
        quaternary: 'var(--color-bg-quaternary)',
        card: 'var(--color-bg-card)',
      },
      textColor: {
        primary: 'var(--color-font-primary)',
        secondary: 'var(--color-font-secondary)',
        tertiary: 'var(--color-font-tertiary)',
        quaternary: 'var(--color-font-quaternary)',
      },
      colors: {
        // primary: "#0284C7",
        // secondary: "#0EA5E9",
        // tertiary: "#FFFFFF",
        // font_primary: "#000000",
        // font_secondary: "#4B5563",
        font_tertiary: "#6B7280",
        bg_primary: "var(--color-bg-secondary)",
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
