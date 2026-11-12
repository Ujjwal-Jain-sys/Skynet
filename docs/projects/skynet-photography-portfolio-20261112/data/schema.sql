---
owner: database-architect
phase: database
status: review
updated: 2026-11-12T00:00:00Z
---

-- =============================================================================
-- schema.sql — skynet-photography-portfolio-20261112
--
-- Concrete, constrained, normalized schema for a landscape & nature photography
-- portfolio site with a contact form.
--
-- Database: PostgreSQL
-- Owner: database-architect
--
-- Structure:
--   Migration 001 — galleries table (photo categories) + set_updated_at() function
--   Migration 002 — photos table
--   Migration 003 — contact_inquiries table
--
-- Each migration is ordered, creates one logical unit, and is reversible (down
-- section). Migrations must be applied in numeric order; rolled back in reverse
-- numeric order. Never edit an applied migration.
--
-- Out of scope: no e-commerce tables, no user-account tables, no CMS tables,
-- no comments/likes/social-login tables.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Migration 001: galleries table (photo categories)
--   Up:    create pgcrypto extension (for gen_random_uuid), set_updated_at()
--          function, galleries table, unique constraints, updated_at trigger
--   Down:  drop trigger, drop galleries table, drop set_updated_at() function
--          (function is dropped here because it is defined in this migration;
--           migrations 002/003 must be rolled back first so nothing references it)
-- -----------------------------------------------------------------------------

-- Migration 001 — UP
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = clock_timestamp();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE public.galleries (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text        NOT NULL,
    slug        text        NOT NULL UNIQUE,
    description text,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.galleries IS
    'Photo categories/galleries (e.g. Mountains, Forests, Water, Skies). Traces to FR-015, US-07.';
COMMENT ON COLUMN public.galleries.id IS 'Surrogate UUID primary key (public-facing, never sequential).';
COMMENT ON COLUMN public.galleries.name IS 'Human-readable category name.';
COMMENT ON COLUMN public.galleries.slug IS 'URL-friendly category key; unique.';
COMMENT ON COLUMN public.galleries.description IS 'Optional category description.';
COMMENT ON COLUMN public.galleries.created_at IS 'Row creation time.';
COMMENT ON COLUMN public.galleries.updated_at IS 'Row last-update time, maintained by set_updated_at() trigger.';

CREATE TRIGGER trigger_galleries_updated_at
    BEFORE UPDATE ON public.galleries
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- Migration 001 — DOWN
-- DROP TRIGGER IF EXISTS trigger_galleries_updated_at ON public.galleries;
-- DROP TABLE IF EXISTS public.galleries;
-- DROP FUNCTION IF EXISTS public.set_updated_at();


-- -----------------------------------------------------------------------------
-- Migration 002: photos table
--   Up:    photos table with FK to galleries, constraints, indexes,
--          updated_at trigger (uses set_updated_at() from migration 001)
--   Down:  drop trigger, drop photos table
-- -----------------------------------------------------------------------------

-- Migration 002 — UP
CREATE TABLE public.photos (
    id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    gallery_id    uuid                                     REFERENCES public.galleries(id) ON DELETE SET NULL,
    title         text        NOT NULL,
    slug          text        NOT NULL UNIQUE,
    caption       text,
    location      text,
    date_taken    timestamptz,
    image_url     text        NOT NULL,
    thumbnail_url text        NOT NULL,
    width         integer,
    height        integer,
    is_published  boolean     NOT NULL DEFAULT true,
    sort_order    integer     NOT NULL DEFAULT 0,
    created_at    timestamptz NOT NULL DEFAULT now(),
    updated_at    timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.photos IS
    'Portfolio photos: metadata, image/thumbnail URLs, caption, location, date taken, publish flag, sort order. Traces to FR-002..FR-005, FR-016, US-02..US-04.';
COMMENT ON COLUMN public.photos.id IS 'Surrogate UUID primary key (public-facing, never sequential).';
COMMENT ON COLUMN public.photos.gallery_id IS 'FK to galleries; nullable (photo may be uncategorized). ON DELETE SET NULL so deleting a gallery never deletes photos.';
COMMENT ON COLUMN public.photos.title IS 'Photo title.';
COMMENT ON COLUMN public.photos.slug IS 'URL key for /photo/[slug]; unique.';
COMMENT ON COLUMN public.photos.caption IS 'Photo caption shown on detail page (FR-016).';
COMMENT ON COLUMN public.photos.location IS 'Location metadata (FR-016).';
COMMENT ON COLUMN public.photos.date_taken IS 'Date the photo was taken (FR-016).';
COMMENT ON COLUMN public.photos.image_url IS 'Full-size image storage path/URL (optimized per breakpoint, NFR-004).';
COMMENT ON COLUMN public.photos.thumbnail_url IS 'Thumbnail storage path/URL for lazy-loaded grid (FR-006).';
COMMENT ON COLUMN public.photos.width IS 'Image width in pixels (responsive serving).';
COMMENT ON COLUMN public.photos.height IS 'Image height in pixels (responsive serving).';
COMMENT ON COLUMN public.photos.is_published IS 'Whether the photo appears in the public gallery.';
COMMENT ON COLUMN public.photos.sort_order IS 'Display ordering within a gallery.';
COMMENT ON COLUMN public.photos.created_at IS 'Row creation time.';
COMMENT ON COLUMN public.photos.updated_at IS 'Row last-update time, maintained by set_updated_at() trigger.';

CREATE INDEX idx_photos_gallery_id ON public.photos(gallery_id);
CREATE INDEX idx_photos_published_sort ON public.photos(is_published, sort_order);
CREATE INDEX idx_photos_created_at_desc ON public.photos(created_at DESC);

CREATE TRIGGER trigger_photos_updated_at
    BEFORE UPDATE ON public.photos
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- Migration 002 — DOWN
-- DROP TRIGGER IF EXISTS trigger_photos_updated_at ON public.photos;
-- DROP TABLE IF EXISTS public.photos;


-- -----------------------------------------------------------------------------
-- Migration 003: contact_inquiries table
--   Up:    contact_inquiries table with check constraint on status, indexes,
--          updated_at trigger (uses set_updated_at() from migration 001)
--   Down:  drop trigger, drop contact_inquiries table
-- -----------------------------------------------------------------------------

-- Migration 003 — UP
CREATE TABLE public.contact_inquiries (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text        NOT NULL,
    email       text        NOT NULL,
    message     text        NOT NULL,
    honeypot    text,
    status      text        NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new', 'read', 'replied', 'archived')),
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.contact_inquiries IS
    'Contact-form submissions: name, email, message, honeypot spam field, lifecycle status. Traces to FR-008..FR-014, US-06, NFR-005, NFR-006.';
COMMENT ON COLUMN public.contact_inquiries.id IS 'Surrogate UUID primary key (public-facing, never sequential).';
COMMENT ON COLUMN public.contact_inquiries.name IS "Visitor's name (validated present, FR-009).";
COMMENT ON COLUMN public.contact_inquiries.email IS "Visitor's email (validated syntactically, FR-010). Handled server-side only; never exposed in client source (NFR-006).";
COMMENT ON COLUMN public.contact_inquiries.message IS "Inquiry message (validated present, FR-009).";
COMMENT ON COLUMN public.contact_inquiries.honeypot IS 'Spam-protection honeypot field (NFR-005); empty for humans, filled by bots.';
COMMENT ON COLUMN public.contact_inquiries.status IS 'Inquiry lifecycle: new, read, replied, archived.';
COMMENT ON COLUMN public.contact_inquiries.created_at IS 'Submission time.';
COMMENT ON COLUMN public.contact_inquiries.updated_at IS 'Row last-update time, maintained by set_updated_at() trigger.';

CREATE INDEX idx_contact_inquiries_created_at_desc ON public.contact_inquiries(created_at DESC);
CREATE INDEX idx_contact_inquiries_status ON public.contact_inquiries(status);

CREATE TRIGGER trigger_contact_inquiries_updated_at
    BEFORE UPDATE ON public.contact_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- Migration 003 — DOWN
-- DROP TRIGGER IF EXISTS trigger_contact_inquiries_updated_at ON public.contact_inquiries;
-- DROP TABLE IF EXISTS public.contact_inquiries;


-- =============================================================================
-- Rollback order (reverse of application):
--   1. Migration 003 down (drop contact_inquiries trigger + table)
--   2. Migration 002 down (drop photos trigger + table)
--   3. Migration 001 down (drop galleries trigger + table + set_updated_at() function)
-- =============================================================================
