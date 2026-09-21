---
title: "Your First Project"
category: "Project"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 6
---

# Your First Project

Every section before this one taught a tool. This one uses all of them at once, on a real project, to produce something real.

The project is **this website**.

## Why this one

You're already reading it, which means you already care whether it works. That's the most reliable motivation there is — and it's more useful than a contrived exercise you'd abandon halfway through.

It also exercises the entire toolchain:

| Skill | Where you use it |
|---|---|
| Terminal | cloning, installing, running the dev server |
| Package managers | `npm install` reconstructs the project from its lockfile |
| Environments | `node_modules` — the mandatory isolated environment |
| Version control | branch, commit, push |
| Collaboration | open a pull request |

And it's not a toy. This is the actual repository the club maintains. A page you add here is a page future members read.

## What you'll have at the end

- The site running locally on your machine
- A new tutorial page you wrote, appearing in the sidebar
- A pull request open against the club repository

## What you need first

- A terminal you can use — [Terminal Basics](/tutorials/terminal-basics)
- Node installed. Check:

```bash
node --version
```

If that prints `command not found`, install Node from [nodejs.org](https://nodejs.org) or via `brew install node`.

You do **not** need to know JavaScript. You won't be writing any. The site's content is markdown, and this project is about the toolchain, not the language.

## What's in this section

- **[Get It Running](/tutorials/first-project/get-it-running)** — clone, install, start the dev server
- **[Change Something](/tutorials/first-project/change-something)** — add a page and watch it appear
- **[Ship It](/tutorials/first-project/ship-it)** — branch, commit, push, open a pull request
- **[When It Breaks](/tutorials/first-project/when-it-breaks)** — the errors you'll hit, and what they mean

## A note on scope

Work through it in order. The pages build on each other, and the third one assumes the second one worked.

If you get stuck, that's expected — the last page exists for exactly that reason. Look up the error there before asking anyone. Being able to resolve your own environment problems is most of what separates someone who can build things from someone who can't.
