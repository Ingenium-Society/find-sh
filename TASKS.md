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
- [x] Sort: folders before files, alphabetical within each group

## 6. Markdown rendering & styling
- [x] Wrap rendered content in the Tailwind `prose` class for readable typography
- [x] Verify code blocks render with syntax highlighting via `rehype-pretty-code`
- [x] Verify headings get anchor links via `rehype-slug` + `rehype-autolink-headings`

## 7. Mobile responsiveness
- [x] Sidebar collapses into a toggleable drawer below a breakpoint (e.g. `md`)
- [x] Verify navigation still works and active-state highlighting persists on mobile

## 8. Content — initial materials
- [x] Add `content/what-is-python.md`
- [x] Add `content/typescript-and-javascript.md`
- [x] Add `content/what-is-git.md`
- [x] Add `content/what-is-vscode.md`
- [x] Confirm all four appear correctly in the tree and render properly

## 9. Stretch goals (do not start until 1–8 are done)
- [ ] Integrate Pagefind for static search over the built site
- [ ] Add a landing/index page listing tutorials grouped by `category`
- [ ] Add "last updated" display on each page using `updatedAt`

## 10. Deploy
- [ ] Push to GitHub
- [ ] Connect repo to Vercel
- [ ] Verify a production build succeeds and all tutorial routes are reachable
