/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // --- Colors (design tokens, referenced as CSS custom properties) ---
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-hover": "var(--color-surface-hover)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        "text-on-primary": "var(--color-text-on-primary)",
        border: "var(--color-border)",
        "border-focus": "var(--color-border-focus)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        "focus-ring": "var(--color-focus-ring)",
        overlay: "var(--color-overlay)",
      },
      // --- Typography (design tokens) ---
      fontFamily: {
        sans: [
          'var(--font-sans)',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"Roboto"',
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
        ],
        serif: [
          'var(--font-serif)',
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          '"Noto Serif"',
          "serif",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1" }],
        sm: ["0.875rem", { lineHeight: "1.25" }],
        base: ["1rem", { lineHeight: "1.5" }],
        lg: ["1.125rem", { lineHeight: "1.75" }],
        xl: ["1.25rem", { lineHeight: "1.75" }],
        "2xl": ["1.5rem", { lineHeight: "2" }],
        "3xl": ["1.875rem", { lineHeight: "2.25" }],
        "4xl": ["2.25rem", { lineHeight: "2.5" }],
        "5xl": ["2.5rem", { lineHeight: "3" }],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      lineHeight: {
        tight: "1.2",
        snug: "1.25",
        normal: "1.5",
        relaxed: "1.6",
        loose: "1.75",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0",
        wide: "0.05em",
        wider: "0.1em",
      },
      // --- Space (design tokens) ---
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
      // --- Radius (design tokens) ---
      borderRadius: {
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        full: "9999px",
      },
      // --- Shadow (design tokens) ---
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.4)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.45), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
      },
      // --- Z-index (design tokens) ---
      zIndex: {
        base: "0",
        dropdown: "100",
        sticky: "200",
        modal: "300",
        lightbox: "400",
        tooltip: "500",
      },
      // --- Transition (design tokens) ---
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "350ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      // --- Max-width (design tokens) ---
      maxWidth: {
        container: "1280px",
        content: "40rem",
        gallery: "1440px",
      },
      // --- Container (design tokens) ---
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
        },
      },
    },
  },
  plugins: [],
}
