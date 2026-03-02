/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#FAF7F2",
        "warm-gray": {
          50: "#FAF9F7",
          100: "#F5F3F0",
          200: "#E8E4DE",
          300: "#D4CEC5",
          400: "#B5ADA1",
          500: "#96897A",
          600: "#7A6E60",
          700: "#5E544A",
          800: "#433C35",
          900: "#2A2521",
        },
        accent: "#8B4513",
        sienna: {
          50: "#FDF6F0",
          100: "#F9E8D9",
          200: "#F0CBA8",
          300: "#E4A76E",
          400: "#D48840",
          500: "#8B4513",
          600: "#723A10",
          700: "#5A2E0D",
          800: "#42210A",
          900: "#2B1607",
        },
        gold: "#C8A96E",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        scaleIn: "scaleIn 0.4s ease-out forwards",
        slideInRight: "slideInRight 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
