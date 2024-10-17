import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#010816",
        card: "#ffffff",
        cardForeground: "#010816",
        popover: "#ffffff",
        popoverForeground: "#010816",
        primary: "#0f172a",
        primaryForeground: "#f7f9fb",
        secondary: "#f1f5f9",
        secondaryForeground: "#0f172a",
        muted: "#f1f5f9",
        mutedForeground: "#64748b",
        accent: "#f1f5f9",
        accentForeground: "#0f172a",
        destructive: "#ee4444",
        destructiveForeground: "#f7f9fb",
        border: "#e2e8f0",
        input: "#e2e8f0",
        ring: "#010816",
        chart1: "#e76e4f",
        chart2: "#299d8f",
        chart3: "#264753",
        chart4: "#e8c468",
        chart5: "#f4a361",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
