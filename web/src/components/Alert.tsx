"use client";

// components/Alert.tsx
// Inline success/danger/info message (§15). Role alert; text not color-only.

import * as React from "react";

export type AlertVariant = "success" | "danger" | "info";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Alert({
  variant = "info",
  message,
  dismissible = false,
  onDismiss,
  className,
  ...props
}: AlertProps) {
  return (
    <div
      {...props}
      role="alert"
      className={[
        "rounded-md border p-3 text-sm flex items-center gap-2",
        variant === "success"
          ? "border-success bg-success-soft text-success"
          : variant === "danger"
            ? "border-danger bg-danger-soft text-danger"
            : "border-primary bg-primary-soft text-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {message}
      {dismissible && onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="ml-auto rounded-md p-1 text-text-secondary hover:text-text transition-colors"
          aria-label="Dismiss"
        >
          <span className="visually-hidden">Dismiss</span>
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
