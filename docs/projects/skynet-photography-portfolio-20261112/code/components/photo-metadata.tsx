// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

import { formatDateMonthYear } from "@/lib/data";
import { cn } from "@/lib/utils";

export interface PhotoMetadataProps {
  location?: string | null;
  date_taken?: string | null;
  className?: string;
}

/**
 * Location + date label/value pairs. Omitted entirely when metadata is absent
 * (no empty placeholder), per spec.
 */
export function PhotoMetadata({
  location,
  date_taken,
  className,
}: PhotoMetadataProps) {
  const hasLocation = Boolean(location?.trim());
  const hasDate = Boolean(date_taken?.trim());
  if (!hasLocation && !hasDate) return null;

  const dateFormatted = formatDateMonthYear(date_taken ?? undefined);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 text-caption text-text-muted",
        className,
      )}
    >
      {hasLocation && (
        <span className="flex items-center gap-1">
          <span className="font-medium text-text-muted">Location:</span>{" "}
          <span className="text-text">{location}</span>
        </span>
      )}
      {hasLocation && hasDate && <span className="text-text-muted">|</span>}
      {hasDate && (
        <span className="flex items-center gap-1">
          <span className="font-medium text-text-muted">Date:</span>{" "}
          <span className="text-text">{dateFormatted}</span>
        </span>
      )}
    </div>
  );
}
