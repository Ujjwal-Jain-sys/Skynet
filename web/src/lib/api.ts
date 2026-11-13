// lib/api.ts
// Typed API client for the Skynet backend API contract (api-contract.md).
// One module for all backend calls; types derived from the contract.
//
// Base URL: relative /api on the same origin. No secrets are exposed to the
// client; BETTER_AUTH_SECRET and DATABASE_URL are server-side only.

export interface ApiError {
  code:
    | "unauthenticated"
    | "forbidden"
    | "not_found"
    | "validation_error"
    | "conflict"
    | "rate_limited"
    | "internal_error";
  message: string;
  field?: string;
  request_id: string;
  status: number;
}

export interface User {
  id: string; // Better Auth user id (text)
  name: string | null;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string; // ISO 8601 timestamptz
  updatedAt: string; // ISO 8601 timestamptz
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  status: "draft" | "published" | "archived";
  created_at: string;
  updated_at: string;
}

export interface ProjectsResponse {
  projects: Project[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    has_more: boolean;
  };
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

export interface ContactResponse {
  inquiry: ContactInquiry;
  confirmation: string;
}

export class SkynetApiError extends Error {
  public readonly code: ApiError["code"];
  public readonly status: number;
  public readonly field?: string;
  public readonly request_id: string;
  constructor(error: ApiError) {
    super(error.message);
    this.name = "SkynetApiError";
    this.code = error.code;
    this.status = error.status;
    this.field = error.field;
    this.request_id = error.request_id;
  }
}

const BASE_URL = "/api";

async function parseResponse<T>(res: Response): Promise<T> {
  const requestId = res.headers.get("x-request-id") ?? "";
  let body: unknown;
  try {
    body = await res.json();
  } catch {
    body = {};
  }

  if (!res.ok) {
    const err = (body as { error?: ApiError })?.error ?? {
      code: "internal_error",
      message: `Request failed with status ${res.status}`,
      request_id: requestId,
    };
    const apiError: ApiError = {
      code: err.code ?? "internal_error",
      message: err.message ?? "Something went wrong",
      field: "field" in err ? err.field : undefined,
      request_id: err.request_id ?? requestId,
      status: res.status,
    };
    throw new SkynetApiError(apiError);
  }

  return body as T;
}

type RequestInitOverride = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export const skynetApi = {
  async get<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {
    const url = new URL(`${BASE_URL}${path}`, window.location.origin);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, String(value));
      }
    }
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });
    return parseResponse<T>(res);
  },

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    return parseResponse<T>(res);
  },
};
