/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      asap: ["Asap Condensed", "sans"],
    },
    screens: {
      sm: "390px",
      md: "500px",
      lg: "750px",
      xl: "1900px",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
