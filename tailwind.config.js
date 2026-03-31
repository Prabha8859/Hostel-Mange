// import type { Config } from "tailwindcss";
export default {
  content: ["./src/app/**/*.{ts,tsx}", "./src/comonents/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        c1: "#E8FFE8", c2: "#A7FFF3", c3: "#74F9FE", c4: "#00E1FF",
        sidebar: "#0a2a35",
      },
      fontFamily: { outfit: ["Outfit", "sans-serif"] },
    },
  },
  plugins: [],
}