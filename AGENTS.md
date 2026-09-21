# AGENTS.md — Ingenium Software & AI Tutorial Site

Instructions for any coding agent (or human) working in this repo. Read this before starting any task.

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.


## What this project is

A teaching site for the Software & AI division of Ingenium Society Club. Members browse practical, code-focused tutorials through a file-explorer-style UI: a collapsible folder tree on the left, rendered content on the right — similar to VS Code or Obsidian.

**It is a sequenced curriculum, not a topic library.** Content is ordered so each section assumes the previous one. As of 2026-09-21 the sequence is:

1. `terminal-basics` (order 2)
2. `virtual-environments` (3)
3. `package-managers` (4)
4. `version-control` (5)
5. `first-project` (6)

Sections chain deliberately: terminal ends on `PATH` because that's what makes virtual environments legible; version control comes after the toolchain because it's a tool, not a topic. Preserve that when adding content.

`first-project` is the payoff — it walks the reader through cloning, running, modifying and contributing to **this site**. Keep it working; it's the section that turns the rest into something real.

## Hard constraints — do not deviate without asking

- **No database.** Content lives entirely as `.md` / `.mdx` files on disk inside `/content`, versioned in this git repo. Updates happen by committing new/edited files, not through an admin panel.
- **MDX is supported — use it deliberately.** Both `.md` and `.mdx` render. Plain markdown is still the default for prose; reach for `.mdx` when a page genuinely benefits from an interactive component. Don't convert a page just for the sake of it. See "MDX components" below.
- **Static generation only.** Content is read from disk and parsed at *build time* (`generateStaticParams` / server components at build), never at runtime. This repo deploys to Vercel as a static/SSG site — don't add code that does `fs.readFile` on a live serverless request path.
- **Next.js App Router + TypeScript.** No Pages Router.
- **Content and code stay separate.** All tutorial content lives under `/content` at the repo root — never inside `/src`. Components live in `/src/components` and are referenced by name from MDX.
- **MDX content is executable.** Content files can import and run code at build time. This repo accepts pull requests from members, so review MDX diffs for anything that isn't presentation.

## Directory structure

```
/content                          # all tutorial content — arbitrary nesting depth allowed
  /terminal-basics/
    index.md                      # shown when the folder itself is opened
    what-is-a-terminal.md
    navigating-the-filesystem.md
  /first-project/
    index.mdx                     # .mdx when a page needs interactive components
    get-it-running.mdx

/src
  /app
    /tutorials/[...slug]/page.tsx # catch-all route — resolves any content path
    /tutorials/page.tsx           # the /tutorials root, renders content/index.md
    /tutorials/layout.tsx         # split-pane shell (tree + preview)
  /components
    FileTree.tsx                  # recursive, collapsible tree, highlights active route
    TutorialsLayoutClient.tsx     # sidebar drawer state + shell
    ContentRenderer.tsx           # renders .md HTML output OR compiled .mdx — both pipelines
    CodeEnhancer.tsx              # client-side pass adding copy buttons to every code block
    Callout.tsx                   # MDX: note / tip / warning / danger boxes
    CommandTabs.tsx               # MDX: per-platform command switcher
    CheckYourself.tsx             # MDX: collapsible self-check question
    FileSystemExplorer.tsx        # MDX: interactive directory tree + terminal
  /lib
    content.ts                    # walks /content, builds nav tree, parses frontmatter,
                                  # renders .md to HTML and compiles .mdx
    mdx-components.ts             # registry of components available to .mdx files

/public
```

## Routing / slug convention

File path maps 1:1 to URL: `content/terminal-basics/git-basics.md` → `/tutorials/terminal-basics/git-basics`. The extension is not part of the URL — `.md` and `.mdx` resolve identically. Filenames and folder names are kebab-case — no separate slug field needed.

Folder-only routes: if `index.md` (or `index.mdx`) exists in that folder, render it; otherwise show a lightweight "select a file" placeholder. Do not error.

## Frontmatter schema (required on every content file)

Identical for `.md` and `.mdx` — both are parsed with `gray-matter` before rendering.

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

- `gray-matter` — frontmatter parsing (both formats)
- `remark` + `remark-rehype` + `rehype-stringify` — `.md` → HTML pipeline
- `next-mdx-remote` (RSC) — `.mdx` compilation, at build time only
- `rehype-pretty-code` (Shiki-based) — code block syntax highlighting
- `rehype-slug` + `rehype-autolink-headings` — heading anchors / per-page TOC
- `remark-gfm` — tables, strikethrough, task lists
- `Pagefind` — static search, added post-build (stretch goal, not part of MVP)
- Tailwind CSS + `@tailwindcss/typography` for rendered content styling

Do not introduce Contentlayer, Velite, Nextra, or any CMS/database library without explicit approval — this was a deliberate decision, not an oversight.

**Why `next-mdx-remote` and not `@next/mdx`:** this repo runs Turbopack, which cannot receive non-serializable plugin options — `rehype-pretty-code` needs a theme object, so `@next/mdx` would silently lose syntax highlighting. `next-mdx-remote` compiles in Node at build time, where JS plugin options work normally, and it keeps the existing catch-all route and `/content` layout intact. Do not swap it out.

## MDX components

Available globally in any `.mdx` file — no import needed.

| Component | Props | Use for |
|---|---|---|
| `<Callout>` | `variant`: `note` \| `tip` \| `warning` \| `danger`, `title` | Warnings that matter. Replaces bold-text paragraphs like **Never run `rm -rf`**. |
| `<CommandTabs>` | `label`, `mac`, `linux`, `windows`, `windowsNote` | Any command that differs per platform. Auto-selects the reader's OS. |
| `<CheckYourself>` | `question`; children = the answer | End-of-section recall. Deliberately unscored. |
| `<FileSystemExplorer>` | none | Interactive directory tree + terminal. Used on `navigating-the-filesystem` to show what `pwd`, `ls`, `cd` actually do. |

### When to use `.mdx`

Use it when the page needs **state** — a switcher, a reveal, a score. If the page is prose plus code blocks, plain `.md` is correct and should stay that way.

Note that raw HTML in `.md` files also works (`allowDangerousHtml` is on), so a one-off `<details>` block does not justify converting a file. Convert when you want a component.

### Adding a component

1. Write it in `/src/components/`, Tailwind classes only, no new dependencies.
2. If it needs state or event handlers, mark it `'use client'`.
3. Register it in `/src/lib/mdx-components.ts`.
4. Add a row to the table above.

Components must be dark-mode aware — the site follows `prefers-color-scheme`, so use `dark:` variants rather than hardcoding colours.

## UI behavior notes

- Tree state (expand/collapse) is local `useState` per node — no tree library needed at this scale.
- Active file is highlighted using `usePathname()` compared against each node's route.
- Clicking a folder toggles expand/collapse; it does not navigate unless it has an `index.md`.
- Mobile: sidebar should collapse into a drawer/toggle rather than permanently splitting the screen.

## Workflow

Work through `TASKS.md` in order, top to bottom. Mark items done as you complete them. Stop and ask before making an architectural decision that isn't already specified above.
