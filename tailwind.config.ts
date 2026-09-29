import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        accent: {
          DEFAULT: "var(--accent-red)",
          bright: "var(--bright-red)",
        }
      },
      fontFamily: {
        oswald: ["var(--font-oswald)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        space: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
