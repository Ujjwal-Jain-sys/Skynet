import { projectStore } from "./project-store.js"
import { z } from "zod"

/**
 * Hard dependency order for Skynet departments.
 * A department can only start once all preceding departments are done.
 */
export const DEPENDENCY_ORDER = [
  "requirements-analysis",
  "product-strategist",
  "ux-architect",
  "ui-design",
  "database-architect",
  "backend",
  "frontend",
  "content-writer",
  "qa-tester",
  "security-auditor",
  "seo-specialist",
  "project-manager",
  "devops",
] as const

export type DepartmentId = (typeof DEPENDENCY_ORDER)[number]

/**
 * Check whether a department can start given completed departments.
 */
export function canStartDepartment(
  department: DepartmentId,
  completed: DepartmentId[]
): { allowed: boolean; missing: DepartmentId[] } {
  const index = DEPENDENCY_ORDER.indexOf(department)
  if (index === -1) {
    return { allowed: false, missing: [] }
  }
  const prerequisites = DEPENDENCY_ORDER.slice(0, index)
  const missing = prerequisites.filter((p) => !completed.includes(p))
  return { allowed: missing.length === 0, missing }
}

/**
 * Get all departments that can start next given completed ones.
 */
export function nextDepartments(
  completed: DepartmentId[]
): DepartmentId[] {
  return DEPENDENCY_ORDER.filter((d) => {
    const { allowed, missing } = canStartDepartment(d, completed)
    return allowed && !completed.includes(d)
  })
}

/**
 * Parse a department id from a string, validating it's a known department.
 */
export function parseDepartmentId(value: string): DepartmentId | null {
  return DEPENDENCY_ORDER.includes(value as DepartmentId)
    ? (value as DepartmentId)
    : null
}

/**
 * The DelegationSchema validates a delegation brief payload.
 */
export const DelegationSchema = z.object({
  projectId: z.string().min(1),
  department: z.string().min(1),
  brief: z.string().min(1),
  inputs: z.array(z.string()).optional(),
  constraints: z.array(z.string()).optional(),
  deliverable: z.string().optional(),
  acceptanceCriteria: z.array(z.string()).optional(),
  dependencies: z.array(z.string()).optional(),
})

export type DelegationInput = z.infer<typeof DelegationSchema>