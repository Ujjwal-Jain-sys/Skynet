/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Design tokens from design/design-tokens.json, exposed as CSS variables
      // in src/styles/tokens.css and wired into Tailwind here so components
      // use semantic token names (e.g. bg-primary, text-text) and never
      // hardcoded hex values, spacing or font sizes.
      colors: {
        // light/dark theme overrides the CSS variable on <html class="dark">
        transparent: "transparent",
        current: "currentColor",
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-inverse": "var(--color-surface-inverse)",
        text: "var(--color-text)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "text-on-primary": "var(--color-text-on-primary)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-active": "var(--color-primary-active)",
        "primary-soft": "var(--color-primary-soft)",
        accent: "var(--color-accent)",
        border: "var(--color-border)",
        "border-focus": "var(--color-border-focus)",
        success: "var(--color-success)",
        "success-soft": "var(--color-success-soft)",
        danger: "var(--color-danger)",
        "danger-soft": "var(--color-danger-soft)",
        warning: "var(--color-warning)",
        "warning-soft": "var(--color-warning-soft)",
      },
      borderRadius: {
        none: "0",
        sm: "var(--radius-sm, 0.25rem)",
        md: "var(--radius-md, 0.5rem)",
        lg: "var(--radius-lg, 0.75rem)",
        xl: "var(--radius-xl, 1rem)",
        full: "var(--radius-full, 9999px)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        xs: ["var(--text-xs, 0.75rem)", { lineHeight: "var(--leading-none, 1)", letterSpacing: "var(--tracking-normal, 0em)" }],
        sm: ["var(--text-sm, 0.875rem)", { lineHeight: "var(--leading-none, 1)", letterSpacing: "var(--tracking-normal, 0em)" }],
        base: ["var(--text-base, 1rem)", { lineHeight: "var(--leading-base, 1.5)", letterSpacing: "var(--tracking-normal, 0em)" }],
        lg: ["var(--text-lg, 1.125rem)", { lineHeight: "var(--leading-snug, 1.375)", letterSpacing: "var(--tracking-normal, 0em)" }],
        xl: ["var(--text-xl, 1.25rem)", { lineHeight: "var(--leading-snug, 1.375)", letterSpacing: "var(--tracking-tight, -0.025em)" }],
        "2xl": ["var(--text-2xl, 1.5rem)", { lineHeight: "var(--leading-relaxed, 1.625)", letterSpacing: "var(--tracking-tight, -0.025em)" }],
        "3xl": ["var(--text-3xl, 1.875rem)", { lineHeight: "var(--leading-tight, 1.25)", letterSpacing: "var(--tracking-tight, -0.025em)" }],
        "4xl": ["var(--text-4xl, 2.25rem)", { lineHeight: "var(--leading-tight, 1.25)", letterSpacing: "var(--tracking-tight, -0.025em)" }],
        "5xl": ["var(--text-5xl, 3rem)", { lineHeight: "var(--leading-tight, 1.25)", letterSpacing: "var(--tracking-tight, -0.025em)" }],
        "6xl": ["var(--text-6xl, 3.75rem)", { lineHeight: "var(--leading-tight, 1.25)", letterSpacing: "var(--tracking-tight, -0.025em)" }],
      },
      spacing: {
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
      },
      zIndex: {
        dropdown: "var(--z-dropdown, 100)",
        sticky: "var(--z-sticky, 200)",
        modal: "var(--z-modal, 300)",
        tooltip: "var(--z-tooltip, 400)",
      },
      transitionDuration: {
        fast: "var(--duration-fast, 150ms)",
        base: "var(--duration-base, 250ms)",
        slow: "var(--duration-slow, 350ms)",
      },
      transitionTimingFunction: {
        default: "var(--easing-default, cubic-bezier(0.4, 0, 0.2, 1))",
        spring: "var(--easing-spring, cubic-bezier(0.34, 1.56, 0.64, 1))",
      },
    },
  },
  plugins: [],
}
