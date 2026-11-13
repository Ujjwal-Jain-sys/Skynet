"use client";

// app/dashboard/page.tsx
// /dashboard — Auth-gated project dashboard (US-05, FR-04).
// Hydrates auth via GET /api/auth/me; lists projects via GET /api/projects.
// Unauthenticated → redirect to /log-in (middleware + client guard).

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { skynetApi } from "@/lib/api";
import { useSafeAuth } from "@/lib/auth-client";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ProjectCard } from "@/components/ProjectCard";
import { Skeleton } from "@/components/Skeleton";
import { Alert } from "@/components/Alert";

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoaded } = useSafeAuth();

  const [projects, setProjects] = React.useState<
    Array<{ id: string; name: string; description: string | null; status: string; updated_at: string }>
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Hydrate auth + load projects on mount.
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await skynetApi.get<{ user: { id: string; email: string } }>("/auth/me");
        if (!me.user) throw new Error("unauthenticated");
        const data = await skynetApi.get<{ projects: Array<{ id: string; name: string; description: string | null; status: string; created_at: string; updated_at: string }> }>(
          "/projects",
        );
        if (!cancelled) {
          setProjects(data.projects ?? []);
          setLoading(false);
        }
      } catch (err: any) {
        if (cancelled) return;
        // 401 → not authenticated, redirect to log-in preserving return URL.
        const cb = pathname ?? "/";
        if (err?.status === 401 || err?.code === "unauthenticated") {
          router.push(`/log-in?callbackUrl=${encodeURIComponent(cb)}`);
        } else {
          setError("Something went wrong. Please try again.");
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router, pathname]);

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-bg p-4" id="main-content">
        <Skeleton className="w-full max-w-md h-96" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-bg p-4" id="main-content">
        <Card className="w-full max-w-md text-center p-8">
          <h2 className="text-xl font-semibold text-text mb-2">Please sign in</h2>
          <p className="text-text-secondary mb-6">
            You need to be signed in to view your dashboard.
          </p>
          <Button
            asChild
            variant="primary"
            size="lg"
            href={`/log-in?callbackUrl=${encodeURIComponent(pathname ?? "/")}`}
            className="w-full"
          >
            Log in
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-bg" id="main-content">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text">Your projects</h1>
            <p className="text-text-secondary">View and manage your saved websites.</p>
          </div>
          <Button
            asChild
            variant="primary"
            href="/dashboard/new"
            className="touch-target-min"
          >
            Create new project
          </Button>
        </div>

        {error && <Alert variant="danger" message={error} role="alert" />}

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Skeleton className="w-full h-48" />
          </div>
        ) : projects.length === 0 ? (
          <EmptyState
            heading="No projects yet"
            description="Create your first website to get started. No code required — pick a theme and publish."
            ctaLabel="Create your first project →"
            ctaHref="/dashboard/new"
          />
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                id={p.id}
                name={p.name}
                description={p.description}
                status={p.status as "draft" | "published" | "archived"}
                updatedAt={p.updated_at}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
