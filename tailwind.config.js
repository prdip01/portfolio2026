/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light pink-cream base
        pinkBase: "#FDF0F5",
        pinkLight: "#FFF6FB",
        pinkSurface: "#FAE6F2",
        pinkBorder: "#F0C4DB",
        // Accent colors
        brandMagenta: "#D91E8C",
        brandViolet: "#5B21B6",
        brandDeep: "#1A0A2E",
        // Text
        inkPrimary: "#12002E",
        inkSecondary: "#6B5A7A",
        inkMuted: "#A890B8",
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
