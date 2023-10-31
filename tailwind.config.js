/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      asap: ["Asap Condensed", "sans"],
    },
    screens: {
      sm: "400px",
      md: "500px",
      lg: "600px",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
