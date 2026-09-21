# TASKS.md — Ingenium Software & AI Tutorial Site

Work through in order. Check off each item as completed. Each task should be independently runnable/verifiable before moving to the next.

## 1. Project scaffold
- [x] Create Next.js app (App Router, TypeScript, Tailwind CSS enabled)
- [x] Install `@tailwindcss/typography` plugin
- [x] Create `/content` directory at repo root (outside `/src`)
- [x] Confirm dev server runs with a blank home page

## 2. Content pipeline
- [x] Install `gray-matter`, `remark`, `remark-rehype`, `rehype-stringify`, `rehype-pretty-code`, `rehype-slug`, `rehype-autolink-headings`
- [x] Write `/src/lib/content.ts`:
  - [x] Recursively walk `/content`, returning a nested tree (folders + files) with each file's parsed frontmatter (`title`, `category`, `difficulty`, `updatedAt`)
  - [x] Provide a function that returns a flat list of all valid slugs (for `generateStaticParams`)
  - [x] Provide a function that, given a slug array, reads and parses one specific `.md` file into `{ frontmatter, htmlContent }`, running it through the remark/rehype pipeline
  - [x] Handle the folder-with-`index.md` case and the "no index.md" placeholder case

## 3. Routing
- [x] Build `/src/app/tutorials/[...slug]/page.tsx` as a catch-all route
- [x] Use `generateStaticParams` to pre-render every valid content path
- [x] Render parsed HTML with `dangerouslySetInnerHTML` (safe here — content is trusted, first-party)
- [x] Handle missing/invalid slugs with `notFound()`

## 4. Layout — split pane shell
- [x] Build `/src/app/tutorials/layout.tsx` with a two-column grid: fixed-width sidebar (tree) + flexible content pane
- [x] Sidebar and content pane both scroll independently

## 5. FileTree component
- [x] Build `/src/components/FileTree.tsx` as a recursive component (folder node renders its children by calling itself)
- [x] Local `useState` per folder node for expand/collapse
- [x] Files render as `<Link>` to their `/tutorials/...` route
- [x] Highlight the currently active file using `usePathname()`
- [x] Sort: explicit `order` frontmatter first (ascending, missing = last), then folders before files, then alphabetical

## 6. Markdown rendering & styling
- [x] Wrap rendered content in the Tailwind `prose` class for readable typography
- [x] Verify code blocks render with syntax highlighting via `rehype-pretty-code`
- [x] Verify headings get anchor links via `rehype-slug` + `rehype-autolink-headings`

## 7. Mobile responsiveness
- [x] Sidebar collapses into a toggleable drawer below a breakpoint (e.g. `md`)
- [x] Verify navigation still works and active-state highlighting persists on mobile

## 8. Content — foundation curriculum (v2)
Replaced the original topic-library content on 2026-09-21. The site is now a sequenced
curriculum built around the toolchain that real projects need, not a reference library.
Old content is recoverable from git history (`git show 1266b4e -- content/`).

- [x] Remove all v1 content (37 files)
- [x] `content/terminal-basics/` — 6 pages + index
- [x] `content/virtual-environments/` — 4 pages + index
- [x] `content/package-managers/` — 4 pages + index
- [x] `content/version-control/` — 5 pages + index
- [x] `content/first-project/` — 4 pages + index (the payoff: clone, run, change, ship)
- [x] Rewrite `content/index.md` around the new sequencing
- [x] Verify all 30 routes render and every frontmatter block validates

## 9. Content — what comes next
- [x] A language, sequenced after the toolchain — `content/python/` (order 7), 7 pages + index.
      Framed as "enough Python to write scripts that do things", not a language course.
      Deliberately skips OOP, decorators, generators, metaclasses.
- [ ] AI engineering — calling LLM APIs, structured output, embeddings/RAG, evals. This is the
      last major gap and the one the division's name points at.
- [ ] Calling APIs (Python + JS) — deleted with v1 content; `files-and-json` covers the
      response-handling patterns, so this is now about requests, auth and rate limits.
- [ ] Decide whether `track` / `prereqs` frontmatter fields are needed to express the sequence
      in the UI rather than only in prose
- [ ] Decide whether `category` should drive grouping/filtering — it is currently set on every
      file and never used

## 10. Stretch goals (do not start until 1–8 are done)
- [ ] Integrate Pagefind for static search over the built site
- [ ] Add a landing/index page listing tutorials grouped by `category`
- [ ] Add "last updated" display on each page using `updatedAt`

## 11. Deploy
- [ ] Push to GitHub
- [ ] Connect repo to Vercel
- [ ] Verify a production build succeeds and all tutorial routes are reachable

## 12. Interactive content — MDX
Supersedes the original "No MDX" constraint in `AGENTS.md`, at the owner's request on
2026-09-21. `AGENTS.md` has been updated to document the new pipeline.

- [x] Install `next-mdx-remote` (chosen over `@next/mdx` — Turbopack can't pass
      non-serializable plugin options, so `rehype-pretty-code` would lose its theme)
- [x] Extend `src/lib/content.ts` to handle `.md` and `.mdx` on the same slug space
- [x] Enable `allowDangerousHtml` on the `.md` pipeline so raw HTML works there too
- [x] Build `Callout`, `CommandTabs`, `CheckYourself` + `CodeEnhancer` (copy buttons)
- [x] Register components globally via `src/lib/mdx-components.ts`
- [x] Convert the pages where interactivity earns its place (8 of 29):
      `uv`, `pip-and-requirements-txt`, `environment-variables-and-path`, `what-is-a-terminal`,
      `working-with-files`, `python-virtual-environments`, `node-and-node-modules`,
      `undoing-changes`
- [ ] Convert remaining pages opportunistically — only where a component adds something.
      Reference-style pages (long lists of errors, tables) should stay `.md`; `Callout`s on
      every entry would be noise.

## 13. Lockfile — RESOLVED
`package-lock.json` initially did not list `next-mdx-remote` or its subtree, because `npm install`
and `pnpm add` are both blocked by the sandbox's file broker (see the
`node-project-install-in-sandbox` skill). The packages were resolved and extracted by hand.

- [x] Regenerated the lockfile with `npm install --package-lock-only`, which only needs registry
      metadata and does not run npm's bin-linking step. Lockfile now has 624 packages with
      `next-mdx-remote@6.0.0` and its full MDX subtree pinned. `npm ci` will work on Vercel.

