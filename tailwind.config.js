/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
        "*.{js,ts,jsx,tsx,mdx}"
    ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Kids Learning AI brand palette (space / purple-dark theme).
        // Documented alongside the values in app/globals.css; opt-in via
        // classes like bg-brand-bg, text-brand-primary, border-brand-border.
        brand: {
          bg: "hsl(var(--brand-bg))",
          "bg-elevated": "hsl(var(--brand-bg-elevated))",
          foreground: "hsl(var(--brand-foreground))",
          primary: "hsl(var(--brand-primary))",
          "primary-foreground": "hsl(var(--brand-primary-foreground))",
          secondary: "hsl(var(--brand-secondary))",
          muted: "hsl(var(--brand-muted))",
          "muted-foreground": "hsl(var(--brand-muted-foreground))",
          border: "hsl(var(--brand-border))",
          star: "hsl(var(--brand-star))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "score-pop": "scorePop 0.4s cubic-bezier(0.36,0.07,0.19,0.97) both",
        "station-arrive": "stationArrive 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        "slide-up": "slideUp 0.25s ease-out both",
      },
      keyframes: {
        scorePop: {
          "0%,100%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.4)" },
        },
        stationArrive: {
          "0%": { transform: "scale(0.7)", opacity: "0.4" },
          "100%": { transform: "scale(1.25)", opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
