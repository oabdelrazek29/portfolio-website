/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a",
        secondary: "#e0d9c8",
        tertiary: "#1a1008",
        "black-100": "#120d05",
        "black-200": "#0a0700",
        "white-100": "#ffffff",
      },
      boxShadow: {
        card: "0px 35px 120px -15px rgba(249, 115, 22, 0.25)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
