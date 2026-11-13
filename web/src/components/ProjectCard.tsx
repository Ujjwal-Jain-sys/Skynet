"use client";

// components/ProjectCard.tsx
// Dashboard project list item (§7). Title, meta, status badge, open action.
// Status not conveyed by color alone — text label present.

import Link from "next/link";
import * as React from "react";
import { Badge } from "@/components/Badge";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string | null;
  status: "draft" | "published" | "archived";
  updatedAt: string;
}

export function ProjectCard({
  id,
  name,
  description,
  status,
  updatedAt,
}: ProjectCardProps) {
  return (
    <Link
      href={`/dashboard/${id}`}
      className="rounded-lg border border-border bg-surface shadow-sm p-4 hover:border-border-focus transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
      aria-label={`Open project ${name}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium text-text">{name}</div>
          <div className="text-sm text-text-muted">{updatedAt}</div>
          {description && (
            <p className="mt-1 text-sm text-text-secondary line-clamp-2">{description}</p>
          )}
        </div>
        <Badge variant={status === "published" ? "success" : "default"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
    </Link>
  );
}
