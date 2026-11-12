// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import { cn } from "@/lib/utils";

export interface ErrorMessageProps {
  message: string;
  variant?: "inline" | "form-level";
  className?: string;
}

export function ErrorMessage({
  message,
  variant = "inline",
  className,
}: ErrorMessageProps) {
  return (
    <p
      role="alert"
      className={cn(
        "text-caption text-error",
        variant === "form-level"
          ? "text-center mb-4"
          : "",
        className,
      )}
    >
      {message}
    </p>
  );
}
