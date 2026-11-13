"use client";

// components/SkipLink.tsx
// "Skip to content" link — first focusable item on every page (§14).
// Visually hidden until focus; visible focus ring; targets <main>.

import * as React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="absolute -mt-px left-4 top-4 z-tooltip rounded-md border border-border-focus bg-bg px-3 py-1.5 text-sm text-text font-medium shadow-md transition-colors transform -translate-y-full focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
    >
      Skip to content
    </a>
  );
}
