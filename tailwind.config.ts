import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#0B2818",
          light: "#123D27",
        },
        navy: "#06131D",
        ivory: "#F9F8F5",
        gold: {
          DEFAULT: "#C5A059",
          light: "#D9BE8A",
          dark: "#A9803F",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        serif: ["var(--font-cormorant)", "serif"],
        heading: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, #C5A059, transparent)",
      },
      boxShadow: {
        elegant: "0 20px 60px -15px rgba(6, 19, 29, 0.35)",
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
