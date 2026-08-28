import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fbf3e4",
          100: "#f5e3be",
          200: "#eccb8a",
          300: "#e0b15a",
          400: "#d29b3c",
          500: "#c08a34",
          600: "#a06f26",
          700: "#7c551e",
          800: "#5c3f17",
          900: "#3e2a0f",
        },
        sage: {
          300: "#a9c4b6",
          400: "#7fa593",
          500: "#5f8874",
          600: "#4a6c5c",
          700: "#385447",
        },
        surface: {
          DEFAULT: "#0a0a0b",
          elevated: "#131315",
          high: "#1b1b1e",
        },
        paper: {
          DEFAULT: "#f3efe6",
        },
        line: "#232226",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        marquee: "marquee 32s linear infinite",
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin 16s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-18px) translateX(10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
