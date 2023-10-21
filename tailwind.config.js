/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      asap: ["Asap Condensed", "sans"],
    },
    screens: {
      sm: "450px",
      md: "650px",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
