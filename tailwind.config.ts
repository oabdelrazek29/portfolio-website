import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0a0910",
        aura: {
          purple: "#c084fc",
          violet: "#a78bfa",
          deep: "#7c3aed",
          blue: "#818cf8",
          glow: "#e9d5ff",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "velvet-radial":
          "radial-gradient(ellipse 85% 65% at 50% -5%, rgba(167, 139, 250, 0.22), transparent 58%)",
        "velvet-mesh":
          "radial-gradient(at 18% 28%, rgba(139, 92, 246, 0.2) 0px, transparent 52%), radial-gradient(at 82% 18%, rgba(99, 102, 241, 0.16) 0px, transparent 48%), radial-gradient(at 48% 78%, rgba(91, 33, 182, 0.18) 0px, transparent 52%), radial-gradient(at 60% 40%, rgba(76, 29, 149, 0.08) 0px, transparent 45%)",
      },
      boxShadow: {
        aura: "0 0 36px rgba(192, 132, 252, 0.32), 0 0 72px rgba(129, 140, 248, 0.18)",
        "aura-sm": "0 0 24px rgba(216, 180, 254, 0.35)",
        innerGlow: "inset 0 0 28px rgba(167, 139, 250, 0.1)",
      },
      animation: {
        blob: "blob 22s ease-in-out infinite",
        "blob-slow": "blob 32s ease-in-out infinite reverse",
        drift: "drift 18s ease-in-out infinite",
        smoke: "smoke 48s ease-in-out infinite",
        "smoke-slow": "smoke 72s ease-in-out infinite reverse",
        "smoke-drift": "smokeDrift 60s linear infinite",
        "purple-ribbon": "purpleRibbon 90s ease-in-out infinite",
        "purple-ribbon-2": "purpleRibbon2 120s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(6%, -4%) scale(1.05)" },
          "66%": { transform: "translate(-5%, 5%) scale(0.95)" },
        },
        drift: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(-3%) translateY(2%)" },
        },
        smoke: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.35" },
          "50%": { transform: "translate(8%, -6%) scale(1.15)", opacity: "0.55" },
        },
        smokeDrift: {
          "0%": { transform: "translate(-10%, 0) rotate(0deg)" },
          "100%": { transform: "translate(10%, -5%) rotate(8deg)" },
        },
        purpleRibbon: {
          "0%, 100%": { transform: "translate(-15%, 10%) scale(1)", opacity: "0.25" },
          "50%": { transform: "translate(20%, -8%) scale(1.08)", opacity: "0.4" },
        },
        purpleRibbon2: {
          "0%, 100%": { transform: "translate(10%, -5%) scale(1.05)", opacity: "0.2" },
          "50%": { transform: "translate(-25%, 12%) scale(0.95)", opacity: "0.38" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
