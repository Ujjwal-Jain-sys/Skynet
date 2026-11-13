// lib/theme.ts
// Theme helpers: next-themes integration, localStorage persistence,
// system-theme resolution via prefers-color-scheme.
//
// Storage key: skynet-theme (localStorage). Values: "light" | "dark" | "system".
// With no saved preference, the site follows the OS theme and re-renders when
// the OS theme changes (FR-02, US-02, US-07).

export const THEME_STORAGE_KEY = "skynet-theme";

export type Theme = "light" | "dark" | "system";

export const THEMES: Theme[] = ["light", "dark", "system"];

export function themeLabel(
  theme: string,
  systemTheme: "light" | "dark" | null,
): string {
  const t: Theme =
    theme === "light" || theme === "dark" || theme === "system"
      ? theme
      : "system";
  if (t === "system") {
    return systemTheme ? (systemTheme === "dark" ? "Dark" : "Light") : "System default";
  }
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export function isValidTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

export function readStoredTheme(): Theme | null {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isValidTheme(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function writeStoredTheme(theme: Theme): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage unavailable (e.g. private mode); ignore gracefully.
  }
}

export function clearStoredTheme(): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function resolveSystemTheme(): "light" | "dark" | null {
  if (typeof window === "undefined" || !window.matchMedia) {
    return null;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
