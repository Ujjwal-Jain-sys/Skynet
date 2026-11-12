---
owner: requirements-analysis
phase: requirements
status: review
updated: 2026-11-12T15:30:00Z
---

# User Stories — skynet-photography-portfolio-20261112

## Story map backbone
The backbone (horizontal) is the sequence of visitor activities:
**Home → Gallery overview → Individual gallery / Photo detail → About → Contact**

Depth (vertical) orders stories: must-have first (walking skeleton), then should, then could.

## User stories

### US-01 — View the home page
**As a** visitor to the portfolio, **I want** to see a home page with a hero section and a clear call-to-action to the gallery, **so that** I can understand the photographer's work and enter the gallery.

- Links: FR-001, NFR-001, NFR-002
- Priority: must
- Estimate: S

**Acceptance criteria:**
- Given a visitor on the home page
- When the page loads
- Then a hero section with a value proposition is visible
- And a call-to-action button linking to the gallery overview is visible

- Given a visitor on the home page
- When they activate the gallery call-to-action with the keyboard (Enter/Space)
- Then focus moves to the gallery overview page

### US-02 — Browse the paginated thumbnail grid
**As a** visitor, **I want** to browse a paginated thumbnail grid of photos on the gallery overview, **so that** I can see the portfolio without waiting for all images to load.

- Links: FR-002, FR-006, NFR-003, NFR-004
- Priority: must
- Estimate: M

**Acceptance criteria:**
- Given a visitor on the gallery overview page
- When the page loads
- Then a thumbnail grid of photos is rendered
- And no more than 24 photos are loaded on the initial page

- Given a visitor on page 1 of the gallery overview
- When there are more photos than fit on one page
- Then a pagination control is present to navigate to additional pages

- Given a visitor on the gallery overview page
- When an image is outside the viewport
- Then the image is not loaded until it enters or approaches the viewport (lazy loading)

### US-03 — Open a photo in detail/lightbox view
**As a** visitor, **I want** to click a thumbnail to open an individual photo detail page with a lightbox-style enlarged view, **so that** I can see the photo in detail.

- Links: FR-003, FR-004, FR-016
- Priority: must
- Estimate: M

**Acceptance criteria:**
- Given a visitor on the gallery overview page
- When they click (or activate via keyboard) a photo thumbnail
- Then the photo detail page loads for that photo
- And the photo is displayed at an enlarged size in a lightbox-style view

- Given a visitor on a photo detail page
- When the page loads
- Then the photo caption and location/date metadata are visible (if present)

### US-04 — Navigate photos within the lightbox
**As a** visitor viewing a photo in the lightbox, **I want** next/previous controls and a close control, **so that** I can browse adjacent photos and return to the gallery.

- Links: FR-005, NFR-001
- Priority: must
- Estimate: S

**Acceptance criteria:**
- Given a visitor on a photo detail page in lightbox view
- When they activate the next control
- Then the next photo in the sequence is displayed

- Given a visitor on a photo detail page in lightbox view
- When they activate the previous control
- Then the previous photo in the sequence is displayed

- Given a visitor on a photo detail page in lightbox view
- When they activate the close control
- Then the lightbox closes and returns focus to the gallery overview (or the triggering thumbnail)

- Given a visitor on a photo detail page in lightbox view
- When they press the Escape key
- Then the lightbox closes

### US-05 — Read the photographer's about page
**As a** visitor, **I want** to read an about page with the photographer's biography, **so that** I can learn who created the work.

- Links: FR-007, NFR-001, NFR-002
- Priority: must
- Estimate: S

**Acceptance criteria:**
- Given a visitor navigates to the about page
- When the page loads
- Then photographer biography text is visible
- And a portrait image of the photographer is visible

### US-06 — Submit a contact form inquiry
**As a** visitor interested in the photography, **I want** to submit a contact form with my name, email, and message, **so that** I can inquire about the photographer's work.

- Links: FR-008, FR-009, FR-010, FR-011, FR-012, FR-014, NFR-001, NFR-005
- Priority: must
- Estimate: M

**Acceptance criteria:**
- Given a visitor on the contact page
- When the page loads
- Then a contact form is present with fields for name, email address, and message
- And each field has an associated label

- Given a visitor on the contact page
- When they attempt to submit the form with the name field empty
- Then an inline validation error appears on the name field
- And the form is not submitted

- Given a visitor on the contact page
- When they attempt to submit the form with an invalid email address
- Then an inline validation error appears on the email field
- And the form is not submitted

- Given a visitor on the contact page
- When they attempt to submit the form with the message field empty
- Then an inline validation error appears on the message field
- And the form is not submitted

- Given a visitor on the contact page
- When they submit the form with a valid name, valid email, and non-empty message
- Then a success message is displayed
- And an email notification containing the form data is sent to the site owner
- And the form fields are cleared

- Given a visitor on the contact page
- When they submit the form and the email service fails
- Then an inline error message is displayed
- And the form data is retained so the visitor can retry

- Given a visitor using only the keyboard
- When they tab through the contact form
- Then focus moves through name, email, message, and submit button in logical order
- And each field, validation message, and the submit button are operable via keyboard

### US-07 — Filter photos by category
**As a** visitor looking for a specific type of landscape, **I want** to filter the gallery by category, **so that** I can find photos matching my interest.

- Links: FR-015
- Priority: should
- Estimate: M

**Acceptance criteria:**
- Given a visitor on the gallery overview page
- When category filters are present
- Then selecting a category updates the thumbnail grid to show only photos in that category

- Given a visitor has applied a category filter
- When they clear the filter
- Then the thumbnail grid returns to showing all photos

### US-08 — Share a photo
**As a** visitor viewing a photo, **I want** to share the photo, **so that** I can send it to someone else.

- Links: FR-017
- Priority: could
- Estimate: S

**Acceptance criteria:**
- Given a visitor on a photo detail page
- When they activate the share control
- Then a sharing option is provided for the currently displayed photo

## Walking skeleton (MVP)
The top row of the backbone plus all `must` stories = US-01, US-02, US-03, US-04, US-05, US-06. These are the MVP input for product-strategist.
