const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#ff7043" },
        success: { DEFAULT: "#2e66f6" },
        secondary: { DEFAULT: "#263238" },
        neutral: { DEFAULT: "#78889b", 100: "#f8f9fb", 200: "#eaeef5" },
      },
    },
  },
  plugins: [heroui()],
};
