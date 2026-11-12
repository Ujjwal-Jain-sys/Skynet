// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely. Uses clsx for conditionals and tailwind-merge
 * to resolve conflicts (last class wins). Central, type-safe class utility.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
