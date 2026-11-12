# Wireframe — Contact (/contact)

Serves: US-06 (Submit contact form inquiry, Must — PRIMARY CONVERSION), FR-008–FR-014, NFR-001, NFR-002, NFR-005, NFR-006
Status: review | Owner: ux-architect | Updated: 2026-11-12T17:00:00Z
Aesthetic: dark minimal gallery (wireframe is low-fidelity; no colors/flags)
Security flag: form sends owner email notification; flag for Security Auditor; no visitor emails in client source (NFR-006)

## Desktop (1024px+)

```
+-----------------------------------------------------------------------+
| [Logo]        Gallery   About   Contact        [Menu ☰]               |
+-----------------------------------------------------------------------+
|                                                                       |
|  Contact                                                              |  ← H1
|                                                                       |
|  Send me an inquiry about my work.                                    |
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|  [ Name            ________________________  ]                        |
|      ^label     ^inline error if invalid                             |
|                                                                       |
|  [ Email           ________________________  ]                        |
|      ^label     ^inline error if invalid                             |
|                                                                       |
|  [ Message         ________________________  ]                        |
|      ^label     [textarea]                                           |
|               ^inline error if invalid                               |
|                                                                       |
|  [Submit inquiry →]                                                   |
|                                                                       |
+-----------------------------------------------------------------------+
|                                                                       |
|  Home   Gallery   About   Contact    |  © Photographer name          |
+-----------------------------------------------------------------------+
```

**Content blocks:** header, H1 (Contact), intro line, form with Name (text), Email (email), Message (textarea), each with visible label, inline validation error messages, submit button, footer.

**Dynamic regions:** validation errors appear inline per field; success/error state replaces or augments form after submit.

**Interactions:**
- Tab order: Name → Email → Message → Submit (logical, FR-014 AC).
- Field validation on submit (and optionally on blur): inline error appears on offending field, focus moves to first invalid field, form not submitted.
- Submit: on success → success message displayed, fields cleared, owner email notification sent. On failure → inline error "Unable to send your message. Please try again.", form data retained.
- Spam protection (NFR-005, Should — V1): honeypot field (hidden) or turnstile/reCAPTCHA check on submit.

**Success state (replaces form):**
```
+-----------------------------------------------------------------------+
|  Contact                                                              |
|                                                                       |
|      ✓ Thanks — your message has been sent.                           |
|      I'll get back to you soon.                                       |
|                                                                       |
|      [Return to gallery →]                                            |
|                                                                       |
+-----------------------------------------------------------------------+
```

**Error state (service failure, inline):**
```
+-----------------------------------------------------------------------+
|  Contact                                                              |
|                                                                       |
|  [ Name            ________________________  ]                        |
|      [Error: This field is required]                                  |
|                                                                       |
|  [Unable to send your message. Please try again.]  ← form-level error |
|                                                                       |
|  [Submit inquiry →]                                                   |
|                                                                       |
+-----------------------------------------------------------------------+
```

**Responsive:** single-column form full-width on mobile; label above input; textarea full-width.

**WCAG 2.2 AA annotations:**
- Each input has visible `<label>` associated via `for`/`id` — 1.3.1, 3.3.2
- Email input: type="email" — native validation — 3.3.2
- Required fields: `required` attribute — 3.3.2
- Inline errors associated via `aria-describedby` pointing to error id — 4.1.2, 3.3.1
- Error messages identify field and describe fix — 3.3.1, 3.3.3
- Focus moves to first invalid field on submit — 2.4.3, 3.3.3
- Submit button: visible focus, target size ≥ 24×24px — 2.4.7, 2.5.5, 2.5.8
- Success message announced to screen readers (aria-live="polite" or focus moved to it) — 4.1.3
- Form-level error announced — 4.1.3
- Honeypot field hidden from assistive tech (aria-hidden, tabindex="-1") — 4.1.2 (V1)
- Contrast ≥ 4.5:1 on labels, inputs, errors — 1.4.3
- Reflow at 320px, inputs full width — 1.4.10
- No visitor email in client source — NFR-006 (server-side send)

---

## Mobile (375px)

```
+-----------------------+
| [Logo]       [☰ Menu] |
+-----------------------+
|                       |
|    Contact            |
|                       |
+-----------------------+
|                       |
|  Name   [_________]   |
|  [error msg]          |
|                       |
|  Email  [_________]   |
|  [error msg]          |
|                       |
|  Message              |
|  [______________]     |
|  [______________]     |
|  [error msg]          |
|                       |
|  [Submit inquiry →]   |
|                       |
+-----------------------+
|                       |
|  Nav | © Photographer |
|                       |
+-----------------------+
```

**Responsive behavior:** stacked single column; all inputs full width; labels above inputs; keyboard-friendly touch targets.

---

## Component-spec expectations for UI Design

- `Header`, `Footer` (shared).
- `Form`: fieldset grouping optional; `FormField` = label + input/textarea + inline error + assistive text.
- `Input` (text/email): default/focus/error/disabled states.
- `Textarea`: default/focus/error/disabled states.
- `Button` (submit): default/hover/focus/active/disabled/loading states.
- `ErrorMessage`: inline text, associated via aria-describedby.
- `SuccessMessage`: heading + link, aria-live or focus-managed.
- `HoneypotField`: hidden input (V1).
- Tokens: input height, gap, focus ring, error color (used only for state, not wireframe).
