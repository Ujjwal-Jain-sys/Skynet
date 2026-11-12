// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import { cn } from "@/lib/utils";

export interface CaptionProps {
  title: string;
  className?: string;
}

export function Caption({ title, className }: CaptionProps) {
  return (
    <h2
      id="photo-caption"
      className={cn("text-h2 text-text mb-2", className)}
      tabIndex={-1}
    >
      {title}
    </h2>
  );
}
