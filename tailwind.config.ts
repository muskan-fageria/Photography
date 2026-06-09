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
        background: "var(--background)",
        foreground: "var(--foreground)",
        studioBlack: "#0a0a0a",
        warmGold: {
          DEFAULT: "#c59b27",
          light: "#e0b848",
          dark: "#9c7616",
        },
        softCream: {
          DEFAULT: "#f5ebe0",
          light: "#ffffff",
          dark: "#d8ccbf",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
