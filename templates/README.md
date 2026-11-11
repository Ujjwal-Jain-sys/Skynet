# Skynet Templates

Reusable website templates that Skynet departments can scaffold for users.

## Purpose

Templates give the UI/UX and frontend departments a starting point instead of
building every site from scratch. Each template includes:

- Page structure (sitemap)
- Component specs
- Copy placeholders
- Design tokens (optional override)

## Layout

```
templates/
├─ landing-page/        # single-page marketing site
├─ portfolio/           # creative portfolio / showcase
├─ ecommerce/           # online store
├─ blog/                # content publication
└─ saas/                # software-as-a-service marketing site
```

Each template folder contains:

```
<name>/
├─ template.json        # metadata (name, description, category, pages)
├─ sitemap.md           # page inventory
├─ design/
│  ├─ tokens.json       # design tokens
│  └─ components.md     # component specs
├─ content/
│  └─ placeholders.md   # copy placeholders
└─ code/                # starter frontend code (optional)
```

## Adding a template

1. Create `templates/<name>/`
2. Add `template.json` with required fields
3. Register the template in the web UI's template picker
