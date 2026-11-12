// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

/**
 * Skeleton shimmer placeholder used for loading states without layout shift.
 */

export function Skeleton({
  className,
  width = "100%",
  height = "100%",
}: {
  className?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div
      className={className}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
