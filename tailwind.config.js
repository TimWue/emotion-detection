/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "Arial", "sansSerif"],
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotateY(0.0deg)" },
          "50%": { transform: "rotateY(90.0deg)" },
          "100%": { transform: "rotateY(180.0deg)" },
        },
      },
      animation: {
        spin: "spin 0.2s linear",
      },
    },
  },
  plugins: [],
};
