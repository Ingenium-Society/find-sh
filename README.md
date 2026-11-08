# Ingenium Software & AI Tutorials

[![Live Site](https://img.shields.io/badge/live-find--sh.vercel.app-black?logo=vercel)](https://find-sh.vercel.app/)
[![Next.js](https://img.shields.io/badge/built%20with-Next.js-000000?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000?logo=vercel)](https://vercel.com/)

Official learning materials, reference guides, and documentation for the **Software & AI Engineering** division of **Ingenium Society Club**.

**🌐 Live website: [find-sh.vercel.app](https://find-sh.vercel.app/)**

---

## About

Ingenium Society Club is a student engineering club where members learn by building real projects, from identifying a problem to designing, prototyping, and testing a solution. This repository is the Software & AI division's knowledge base: practical, code-focused tutorials that support club projects and engineering workflows.

Members can browse the tutorials through a file-explorer-style interface with a collapsible folder tree and rendered Markdown previews.

## Features

- **File-explorer navigation**: a collapsible folder tree to move through topics quickly
- **Rendered Markdown**: tutorials are written as plain `.md` files and displayed as formatted pages
- **Content as code**: adding or updating a tutorial is just a commit to the repository
- **Always available**: hosted on Vercel, no setup needed for readers

## Tech Stack

| Area      | Technology                                   |
| --------- | -------------------------------------------- |
| Framework | [Next.js](https://nextjs.org/)               |
| Language  | [TypeScript](https://www.typescriptlang.org/) |
| Styling   | [Tailwind CSS](https://tailwindcss.com/) (via PostCSS) |
| Linting   | [ESLint](https://eslint.org/)                |
| Hosting   | [Vercel](https://vercel.com/)                |

## Project Structure

```
find-sh/
├── content/        # Tutorial Markdown files (the site's content)
├── public/         # Static assets
├── src/            # Application source code
├── TASKS.md        # Planned work and progress
├── AGENTS.md       # Guidelines for AI coding assistants
└── CLAUDE.md       # Guidelines for Claude Code
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (current LTS recommended)
- npm (included with Node.js)

### Run locally

```bash
# 1. Clone the repository
git clone https://github.com/Ingenium-Society/find-sh.git
cd find-sh

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run build   # Create a production build
npm run start   # Serve the production build
npm run lint    # Run ESLint
```

## Content & Contributions

All tutorials live in the [`/content`](./content) folder as Markdown files. The folder structure you create there becomes the folder tree shown on the website.

### Adding a tutorial

1. Create a branch: `git checkout -b add-your-topic`
2. Add a Markdown file inside `/content` (use a clear, lowercase, hyphenated filename, e.g. `intro-to-apis.md`)
3. Preview it locally with `npm run dev`
4. Commit and push, then open a pull request for review

### Writing guidelines

- Keep tutorials **practical**: explain the concept briefly, then show code
- Use fenced code blocks with a language tag (e.g. ` ```python `)
- Break long topics into short sections with clear headings
- Link to official documentation where it helps

## Deployment

The site is deployed on [Vercel](https://vercel.com/) at **[find-sh.vercel.app](https://find-sh.vercel.app/)**. Changes merged into `main` are published automatically.

## About the Club

| | |
| --- | --- |
| **Club** | Ingenium Society Club |
| **Division** | Software & AI Engineering |
| **School** | SMA Global Darussalam Academy |

## License

No license has been specified yet. Until one is added, all rights are reserved by the authors. If you'd like others to reuse this material, consider adding a license such as [MIT](https://choosealicense.com/licenses/mit/) (code) or [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (tutorial content).
