// repositories/projects.ts
// Data access for the `projects` table. No HTTP/Better Auth types — plain values in/out.
// Every query scopes to user_id (never trusts client-supplied owner id).
import { sql } from "@/lib/db";

export interface ProjectRow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  status: "draft" | "published" | "archived";
  created_at: string;
  updated_at: string;
}

export interface ListProjectsOpts {
  limit: number;
  offset: number;
  status?: string;
}

export async function listProjects(
  userId: string,
  opts: ListProjectsOpts
): Promise<{ projects: ProjectRow[]; total: number }> {
  const { limit, offset, status } = opts;

  const projects = status
    ? await sql`
        SELECT id, user_id, name, description, status, created_at, updated_at
        FROM projects
        WHERE user_id = ${userId} AND status = ${status}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    : await sql`
        SELECT id, user_id, name, description, status, created_at, updated_at
        FROM projects
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;

  const countResult = status
    ? await sql`SELECT count(*)::int AS total FROM projects WHERE user_id = ${userId} AND status = ${status}`
    : await sql`SELECT count(*)::int AS total FROM projects WHERE user_id = ${userId}`;

  const total = (countResult[0] as { total: number }).total;

  return { projects: projects as ProjectRow[], total };
}

export async function createProject(
  userId: string,
  data: { name: string; description: string | null; status: string }
): Promise<ProjectRow> {
  const rows = await sql`
    INSERT INTO projects (user_id, name, description, status)
    VALUES (${userId}, ${data.name}, ${data.description}, ${data.status})
    RETURNING id, user_id, name, description, status, created_at, updated_at
  `;
  return rows[0] as ProjectRow;
}