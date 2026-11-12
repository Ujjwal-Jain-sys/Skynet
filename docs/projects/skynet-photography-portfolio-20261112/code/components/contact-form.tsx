// owner: frontend, phase: frontend, status: review, updated: 2026-11-12T21:00:00Z

/**
 * Contact form (US-06, primary conversion).
 *
 * States: default, submitting, success, error.
 * - Client validation is UX only; the server (POST /api/contact) is the source
 *   of truth and returns inline field errors keyed by path.
 * - On validation failure, focus moves to the first invalid field.
 * - Honeypot included (hidden from AT). Visitor email never logged client-side.
 * - Tab order: Name → Email → Message → Submit.
 */

"use client";

import { useState, useCallback, useEffect, useRef, FormEvent } from "react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { ErrorMessage } from "./error-message";
import { SuccessMessage } from "./success-message";
import { HoneypotField } from "./honeypot-field";
import { Button } from "./button";
import { submitContactForm, SubmitOutcome } from "@/lib/api";
import { cn } from "@/lib/utils";

export interface ContactFormProps {
  className?: string;
}

export interface FormValues {
  name: string;
  email: string;
  message: string;
}

const INITIAL_VALUES: FormValues = { name: "", email: "", message: "" };

export function ContactForm({ className }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [submitting, setSubmitting] = useState(false);
  const [outcome, setOutcome] = useState<SubmitOutcome | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const firstInvalidRef = useRef<HTMLElement | null>(null);

  const resetFormState = useCallback(() => {
    setOutcome(null);
    setFieldErrors({});
    setFormError(null);
  }, []);

  const handleChange = useCallback(
    (key: keyof FormValues) => (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setValues((prev) => ({ ...prev, [key]: event.currentTarget.value }));
      // Clear inline error when the user starts correcting a field.
      if (fieldErrors[key]) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    },
    [fieldErrors],
  );

  // Move focus to the first invalid field after a failed submit.
  useEffect(() => {
    if (firstInvalidRef.current) {
      firstInvalidRef.current.focus();
      firstInvalidRef.current = null;
    }
  }, [firstInvalidRef]);

  const focusField = useCallback((id: string) => {
    const el = document.getElementById(id) as HTMLElement | null;
    if (el) {
      firstInvalidRef.current = el;
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetFormState();

    // --- Client-side validation (UX only) ---
    const nextErrors: Record<string, string> = {};
    let hasError = false;

    if (!values.name.trim()) {
      nextErrors.name = "Name is required.";
      hasError = true;
    }
    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
      hasError = true;
    }
    if (!values.message.trim()) {
      nextErrors.message = "Message is required.";
      hasError = true;
    }

    if (hasError) {
      setFieldErrors(nextErrors);
      setFormError(null);
      // Focus first invalid field in tab order: name → email → message.
      if (nextErrors.name) focusField("contact-name");
      else if (nextErrors.email) focusField("contact-email");
      else if (nextErrors.message) focusField("contact-message");
      return;
    }

    // --- Submit ---
    setSubmitting(true);
    setFormError(null);

    const result = await submitContactForm(
      {
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        message: values.message.trim(),
        honeypot: "",
      },
      {
        onSuccess: (data) => {
          setOutcome({
            status: data.inquiryId ? "success" : "spam",
            message: data.message,
          });
          setValues(INITIAL_VALUES);
          setSubmitting(false);
        },
        onError: (error) => {
          setSubmitting(false);
          if (error.error.details && error.error.details.length > 0) {
            // Server validation errors keyed by field path.
            const fieldErrorsMap: Record<string, string> = {};
            error.error.details.forEach((detail) => {
              if (detail.path) {
                fieldErrorsMap[detail.path] = detail.message;
              }
            });
            setFieldErrors(fieldErrorsMap);
            setFormError(null);
            const first = Object.keys(fieldErrorsMap)[0];
            if (first === "name") focusField("contact-name");
            else if (first === "email") focusField("contact-email");
            else if (first === "message") focusField("contact-message");
          } else {
            setFormError(
              error.error.message || "Unable to send your message. Please try again.",
            );
          }
        },
      },
    );

    // Safety net for network-failure case (not caught by callbacks).
    if (result.status === "network" && !outcome) {
      setSubmitting(false);
      setFormError(result.message);
    }
  };

  // Success state: replace form with success message.
  if (outcome && (outcome.status === "success" || outcome.status === "spam")) {
    return (
      <section className={cn("py-16", className)} aria-live="polite">
        <SuccessMessage
          heading="Thanks — your message has been sent."
          body="I will get back to you as soon as I can."
          ctaHref="/gallery"
          ctaLabel="Return to gallery"
        />
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "max-w-content mx-auto space-y-8 px-6",
        className,
      )}
      noValidate
    >
      <Input
        id="contact-name"
        name="name"
        label="Your name (required)"
        type="text"
        autoComplete="name"
        required
        value={values.name}
        onChange={handleChange("name")}
        error={fieldErrors.name}
      />
      <Input
        id="contact-email"
        name="email"
        label="Your email address (required)"
        type="email"
        autoComplete="email"
        required
        value={values.email}
        onChange={handleChange("email")}
        error={fieldErrors.email}
      />
      <Textarea
        id="contact-message"
        name="message"
        label="Your message (required)"
        helperText="Tell me about the image or project you have in mind."
        required
        value={values.message}
        onChange={handleChange("message")}
        error={fieldErrors.message}
      />
      <HoneypotField />

      {formError && (
        <ErrorMessage variant="form-level" message={formError} />
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth={true}
        loading={submitting}
        loadingLabel="Sending…"
        disabled={submitting}
      >
        Send message
      </Button>
    </form>
  );
}
