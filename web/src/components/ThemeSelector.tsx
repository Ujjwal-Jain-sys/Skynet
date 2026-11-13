"use client";

// components/ThemeSelector.tsx
// Theme selector: light / dark / system dropdown (§5).
// Keyboard-operable, text labels, visible focus, color not sole indicator.
// Uses next-themes useTheme(); persists via localStorage key "skynet-theme".

import * as React from "react";
import { useTheme } from "next-themes";
import { themeLabel, type Theme } from "@/lib/theme";

interface ThemeSelectorProps {
  className?: string;
}

const OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System default" },
];

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { theme, setTheme, systemTheme } = useTheme();

  const activeLabel = themeLabel(theme ?? "system", systemTheme ?? null);

  const [open, setOpen] = React.useState(false);

  const select = (value: Theme) => {
    setTheme(value);
    setOpen(false);
  };

  return (
    <div className={["inline-flex", className].filter(Boolean).join(" ")}>
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Theme: ${activeLabel}`}
        onClick={() => setOpen((o) => !o)}
        className={[
          "inline-flex items-center gap-2 rounded-md border border-border bg-bg px-3 py-2 text-text text-sm font-medium transition-colors",
          "hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
          "touch-target-min",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span>{activeLabel}</span>
        <svg
          className="w-4 h-4 text-text-muted transition-transform duration-base transform open:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Popup */}
      {open && (
        <div
          role="listbox"
          aria-label="Theme options"
          className={[
            "z-dropdown absolute mt-2 w-48 rounded-lg border border-border bg-bg shadow-lg p-1 text-text text-sm",
            "focus-visible:outline-none",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {OPTIONS.map((option) => {
            const selected = theme === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                aria-label={option.label}
                onClick={() => select(option.value)}
                className={[
                  "w-full flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors touch-target-min",
                  !selected
                    ? "text-text hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:bg-surface focus-visible:text-text"
                    : "text-primary bg-primary-soft",
                  selected ? "font-semibold" : "font-medium",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span>{option.label}</span>
                {selected && (
                  <svg
                    className="w-4 h-4 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
