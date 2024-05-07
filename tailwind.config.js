/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gray: {
          base: "#B9C1C7",
          lighter: "#D9D9D9",
        },
        blue: {
          accent: "#152E45",
          dark: "#102A41",
        },
        orange: {
          base: "#F7900B",
        },
      },
    },
  },
  plugins: [],
}

