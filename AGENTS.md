# AGENTS.md — Ingenium Software & AI Tutorial Site

Instructions for any coding agent (or human) working in this repo. Read this before starting any task.

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.


## What this project is

A tutorial/reference site for the Software & AI division of Ingenium Society Club. Members browse practical, code-focused tutorials through a file-explorer-style UI: a collapsible folder tree on the left, rendered content on the right — similar to VS Code or Obsidian.

This is **not** a from-scratch beginner curriculum. Tutorials assume the reader is a student who wants practical, hands-on material, not exhaustive theory.

## Hard constraints — do not deviate without asking

- **No database.** Content lives entirely as `.md` files on disk inside `/content`, versioned in this git repo. Updates happen by committing new/edited files, not through an admin panel.
- **No MDX.** Plain markdown only. No embedded React components inside content files. If a future task asks for interactivity, flag it — it changes the pipeline.
- **Static generation only.** Content is read from disk and parsed at *build time* (`generateStaticParams` / server components at build), never at runtime. This repo deploys to Vercel as a static/SSG site — don't add code that does `fs.readFile` on a live serverless request path.
- **Next.js App Router + TypeScript.** No Pages Router.
- **Content and code stay separate.** All tutorial markdown lives under `/content` at the repo root — never inside `/src`.

## Directory structure

```
/content                          # all tutorial markdown — arbitrary nesting depth allowed
  /python-fundamentals/
    index.md                      # shown when the folder itself is opened
    syntax-basics.md
    working-with-libraries.md
  what-is-git.md                  # flat top-level files are allowed too

/src
  /app
    /tutorials/[...slug]/page.tsx # catch-all route — resolves any content path
    layout.tsx                    # split-pane shell (tree + preview)
  /components
    FileTree.tsx                  # recursive, collapsible tree, highlights active route
    MarkdownRenderer.tsx
  /lib
    content.ts                    # walks /content, builds nav tree + parses frontmatter

/public
```

## Routing / slug convention

File path maps 1:1 to URL: `content/python-fundamentals/syntax-basics.md` → `/tutorials/python-fundamentals/syntax-basics`. Filenames and folder names are kebab-case — no separate slug field needed.

Folder-only routes: if `index.md` exists in that folder, render it; otherwise show a lightweight "select a file" placeholder. Do not error.

## Frontmatter schema (required on every `.md` file)

```yaml
---
title: "What is Git?"
category: "Tools"
difficulty: "beginner"   # beginner | intermediate | advanced
updatedAt: "2026-09-07"
order: 1                 # optional — controls sidebar position among siblings; ascending, lower = earlier. Omit to sort alphabetically after ordered items.
---
```
Do not invent additional required fields without updating this file.

## Libraries to use

- `gray-matter` — frontmatter parsing
- `remark` + `remark-rehype` + `rehype-stringify` — markdown → HTML pipeline
- `rehype-pretty-code` (Shiki-based) — code block syntax highlighting
- `rehype-slug` + `rehype-autolink-headings` — heading anchors / per-page TOC
- `Pagefind` — static search, added post-build (stretch goal, not part of MVP)
- Tailwind CSS + `@tailwindcss/typography` for rendered markdown styling

Do not introduce Contentlayer, Velite, Nextra, or any CMS/database library without explicit approval — this was a deliberate decision, not an oversight.

## UI behavior notes

- Tree state (expand/collapse) is local `useState` per node — no tree library needed at this scale.
- Active file is highlighted using `usePathname()` compared against each node's route.
- Clicking a folder toggles expand/collapse; it does not navigate unless it has an `index.md`.
- Mobile: sidebar should collapse into a drawer/toggle rather than permanently splitting the screen.

## Workflow

Work through `TASKS.md` in order, top to bottom. Mark items done as you complete them. Stop and ask before making an architectural decision that isn't already specified above.
