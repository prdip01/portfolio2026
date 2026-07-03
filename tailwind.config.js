/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgBase: "var(--bg-base)",
        bgCard: "var(--bg-card)",
        bgSurface: "var(--bg-surface)",
        borderColor: "var(--border-color)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textMuted: "var(--text-muted)",
        accent: "var(--accent)",
        accentLight: "var(--accent-light)",
        accentMuted: "var(--accent-muted)",
        accentBorder: "var(--accent-border)",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Syne", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
