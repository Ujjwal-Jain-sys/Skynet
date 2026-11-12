// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

/**
 * Typed API client for the contact form endpoint.
 *
 * Contract: code/api-contract.md — POST /api/contact
 *
 * - Request body matches the server's ContactFormSchema (name, email, message,
 *   optional honeypot). Client validation is UX only; the server is the source
 *   of truth.
 * - Responses are typed per the contract (201/202 success, 400/502/500 errors).
 * - No secrets or visitor emails are stored or logged client-side.
 */

export interface ContactFormRequest {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export interface ContactFormSuccess {
  ok: true;
  message: string;
  inquiryId?: string;
}

export interface ContactFormErrorDetail {
  path?: string;
  message: string;
}

export interface ContactFormErrorBody {
  error: {
    code: string;
    message: string;
    details?: ContactFormErrorDetail[];
    correlationId?: string;
  };
}

type RawResponse = ContactFormSuccess | ContactFormErrorBody;

interface SubmitOptions {
  onSuccess?: (data: ContactFormSuccess) => void;
  onError?: (error: ContactFormErrorBody) => void;
}

/**
 * Parsed outcome of a contact form submission, used by the contact page to
 * render success / inline validation / service-error states.
 */
export interface SubmitOutcome {
  status: "success" | "spam" | "validation" | "service" | "network";
  message: string;
  details?: ContactFormErrorDetail[];
}

function isSuccess(body: RawResponse): body is ContactFormSuccess {
  return (body as ContactFormSuccess).ok === true;
}

function isErrorBody(body: RawResponse): body is ContactFormErrorBody {
  return !!(body as ContactFormErrorBody).error;
}

/**
 * Submit the contact form to POST /api/contact.
 *
 * Returns a typed outcome. Throws nothing — network and server errors are
 * normalized into the outcome object so the UI can render them gracefully.
 */
export async function submitContactForm(
  data: ContactFormRequest,
  options: SubmitOptions = {},
): Promise<SubmitOutcome> {
  const { onSuccess, onError } = options;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = (await response.json()) as RawResponse;

    // 202 Accepted — honeypot triggered (spam discarded). Generic success
    // shape avoids tipping off bots; treat as a successful submission to the
    // visitor so bots cannot distinguish the outcome.
    if (response.status === 202) {
      const outcome: SubmitOutcome = {
        status: "spam",
        message: isSuccess(body) ? body.message : "Thank you for your message.",
      };
      if (isSuccess(body)) onSuccess?.(body);
      return outcome;
    }

    // 201 Created — inquiry accepted.
    if (response.status === 201 && isSuccess(body)) {
      const outcome: SubmitOutcome = {
        status: "success",
        message:
          body.message ||
          "Thank you for your message. I'll get back to you soon.",
      };
      onSuccess?.(body);
      return outcome;
    }

    // Non-2xx success-shaped response (defensive).
    if (response.ok && isSuccess(body)) {
      const outcome: SubmitOutcome = {
        status: "success",
        message: body.message,
      };
      onSuccess?.(body);
      return outcome;
    }

    // Error response with the standard error shape.
    if (isErrorBody(body)) {
      const outcome: SubmitOutcome = {
        status:
          response.status === 400
            ? body.error.code === "validation_error"
              ? "validation"
              : "service"
            : response.status >= 500
              ? "service"
              : "service",
        message: body.error.message || "An unexpected error occurred.",
        details: body.error.details,
      };
      onError?.(body);
      return outcome;
    }

    // Fallback for unexpected error bodies.
    const outcome: SubmitOutcome = {
      status: "service",
      message:
        response.status >= 500
          ? "An unexpected error occurred. Please try again later."
          : "Unable to send your message. Please try again.",
    };
    return outcome;
  } catch {
    // Network failure — no request reached the server.
    return {
      status: "network",
      message:
        "Unable to send your message. Please check your connection and try again.",
    };
  }
}
