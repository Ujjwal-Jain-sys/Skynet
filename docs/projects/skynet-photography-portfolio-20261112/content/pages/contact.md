---
owner: content-writer
phase: content
status: review
updated: 2026-11-12T20:00:00Z
---

# Page: /contact — Contact

## Page summary

| Field | Value |
|---|---|
| Path | /contact |
| Audience | Visitors ready to send an inquiry |
| Goal | Submit the contact form successfully |
| Primary message | Send an inquiry — your name, email, and message, delivered to the photographer |
| Primary CTA | Send message |
| Secondary CTA | Return to gallery → /gallery (shown after success) |
| Static / Dynamic | Static form; dynamic submission handling |
| SEO intent | Informational / conversion ("contact photographer", "photography inquiry") |
| Status | review |

## Header

- Brand link (logo): "[Photographer name]" → /
- Nav links: Gallery, About, Contact (current)

## Contact heading and intro

- Heading (h1): Contact
- Body: Have a question about an image, or interested in licensing or a commission? Send me a message and I will get back to you.

## Contact form

### Form fields

- Name field
  - Label: Your name (required)
  - Control type: text
  - Assistive text: none
  - Inline error (required): Name is required.
- Email field
  - Label: Your email address (required)
  - Control type: email
  - Assistive text: none
  - Inline error (required): Please enter a valid email address.
- Message field
  - Label: Your message (required)
  - Control type: textarea
  - Assistive text: Tell me about the image or project you have in mind.
  - Inline error (required): Message is required.

### Submit button

- Default label: Send message
- Submitting (loading) label: Sending… (button disabled, aria-busy="true")

### Form-level error (service failure)

- Message: Unable to send your message. Please try again. (Form data retained for retry.)

### Success state (form replaced)

- Icon: check mark (decorative, aria-hidden)
- Heading (h2): Thanks — your message has been sent.
- Body: I will get back to you as soon as I can.
- CTA button: Return to gallery → /gallery

## Form behaviour notes

- Tab order: Name → Email → Message → Send message
- On validation failure, focus moves to the first invalid field
- All errors identify the field and describe the fix; no blame language
- Visitor email addresses are never exposed in client-side source (sent server-side)
- Honeypot field present, hidden from users and assistive technology

## Footer

- Nav links: Home, Gallery, About, Contact
- Credit: [Photographer name] · © 2026

## SEO meta

- Title: Contact — Landscape & nature photography portfolio
- Description: Get in touch about landscape and nature photography. Licensing, commissions, and image questions welcome.
- Primary keyword: contact photographer
