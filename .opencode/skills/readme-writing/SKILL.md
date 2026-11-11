---
name: README Writing
description: Write beautiful, easy-to-understand README files that welcome non-technical users and clearly explain a project
---

# README Writing

A great README is the project's front door. It should welcome visitors, answer their first questions in plain language, and point them to the next step — all without jargon.

## When to use

Whenever creating or updating a `README.md` for a project, repository, or package.

## Structure (in order)

1. **Project title** — H1, clear and specific. Add a one-line tagline underneath.
2. **What it is** — 2–3 sentences in plain language: what does this do, who is it for, what problem does it solve? No jargon.
3. **Key features** — 4–6 bullet benefits, not technical specs. Lead with outcomes.
4. **Quick start** — the shortest path to "hello world." Copy-pasteable commands.
5. **How it works** — short, numbered steps. Show the user journey.
6. **Project layout** — a simple tree of the most important folders/files.
7. **Next steps** — one clear action (e.g., "Run `/skynet-build <your idea>`").
8. **Support / questions** — where to get help.

## Writing principles

- **Plain language first.** Write for a smart non-technical person. Avoid acronyms unless you define them.
- **One idea per sentence.** Short paragraphs. Plenty of whitespace.
- **Show, don't just tell.** Include a tiny example or screenshot placeholder.
- **Copy-pasteable.** Every command should work exactly as written.
- **No "it's obvious."** Nothing is obvious to a first-time visitor.
- **Outcomes over activities.** Say "your site is live" not "CI runs the deploy pipeline."

## Visual formatting

- Use H1 for the title, H2 for major sections, H3 sparingly.
- Use code blocks (fenced with language tags) for commands and snippets.
- Use bullet lists for features and steps.
- Use a table for the project layout or phase overview.
- Use bold for key terms, but sparingly.
- Add a horizontal rule (`---`) between major sections if the page is long.

## Anti-patterns

- Dumping every technical detail upfront.
- Assuming the reader knows Git, Docker, or the command line.
- Using "foo/bar" placeholders without explaining them.
- Long walls of text without headings.
- Listing requirements before explaining what the project does.

## Example mini-template

```markdown
# Project Name

One sentence: what it is and who it's for.

## What it does

- Benefit one (outcome-focused)
- Benefit two
- Benefit three

## Try it in 30 seconds

```bash
# copy-pasteable first command
```

## How it works

1. Step one (what the user does)
2. Step two (what happens)
3. Step three (result)

## Project layout

```
repo/
├─ README.md      # this file
└─ src/           # source code
```

## Next step

Run the quick start above, then [read the docs](docs/).
```

## Rules

- Every README must answer: What is this? Who is it for? What do I do first?
- If a section doesn't help a first-time visitor, cut it or move it to docs/.
- Keep it under one screen scroll where possible; link deeper details.
