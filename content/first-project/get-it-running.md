---
title: "Get It Running"
category: "Project"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 1
---

# Get It Running

Three commands between you and a local copy of this site.

## 1. Pick a folder

Somewhere you keep projects. Create one if you don't have it:

```bash
mkdir -p ~/projects
cd ~/projects
```

Check you're in the right place before cloning. Everything from here happens inside this folder.

```bash
pwd
```

```
/Users/you/projects
```

## 2. Clone the repository

```bash
git clone https://github.com/Ingenium-Society/find-sh.git
cd find-sh
```

You now have the full project — every file, and the complete history of every change anyone has ever made to it.

Look at what you got:

```bash
ls
```

```
AGENTS.md  content  package.json  public  README.md  src  TASKS.md
```

Two things to notice, because they explain what comes next:

- **`content/`** — every tutorial on this site is a markdown file in here. This is where you'll be working.
- **`package.json`** — the dependency manifest. It says what the project needs, but nothing is installed yet.

There is deliberately **no `node_modules` folder**. It's git-ignored, because it's hundreds of megabytes of regenerable code.

## 3. Install the dependencies

```bash
npm install
```

```
added 400 packages in 12s
```

This reads `package.json` and `package-lock.json` and reconstructs `node_modules` exactly — the same versions the maintainers use. This is the lockfile doing its job: everyone who runs this command gets an identical set of dependencies.

Check it worked:

```bash
ls node_modules | wc -l
```

A few hundred folders. That's normal. See [Node and node_modules](/tutorials/virtual-environments/node-and-node-modules) if the size surprises you.

## 4. Start the development server

```bash
npm run dev
```

```
▲ Next.js 16.3.4 (Turbopack)
- Local:  http://localhost:3000
✓ Ready in 3.2s
```

Open **http://localhost:3000** in a browser. You're looking at this site, running on your machine.

The first load can take a while — the server compiles pages on demand the first time each one is requested. Subsequent loads are fast.

## What just happened

You ran a real project. Four steps, no code written, and the whole toolchain from the previous sections was involved:

| Step | Tool |
|---|---|
| `cd ~/projects` | [Terminal](/tutorials/terminal-basics/navigating-the-filesystem) |
| `git clone` | [Version control](/tutorials/version-control/collaborating-with-remotes) |
| `npm install` | [Package manager](/tutorials/package-managers/npm-and-package-json) |
| `node_modules` | [Isolated environment](/tutorials/virtual-environments/node-and-node-modules) |
| `npm run dev` | a script defined in `package.json` |

That sequence — clone, install, run — is how you get *any* project started. Different languages use different commands, but the shape never changes.

## Stopping and restarting

`npm run dev` runs in the foreground and keeps running. To stop it, press `Ctrl + C`.

Next time you come back to the project, you only need two commands:

```bash
cd ~/projects/find-sh
npm run dev
```

You don't clone again and you don't reinstall. `node_modules` is still there.

If you pull in new changes and `package.json` has been updated, run `npm install` again to pick up any new dependencies.

## What to try before moving on

The dev server watches your files. Edit something and the browser updates on its own — no restart.

Open `content/index.md` in any text editor and change a word in the first paragraph. Save. Look at the browser.

That's the whole editing loop, and it's what the next page builds on.

## Next

**[Change Something](/tutorials/first-project/change-something)** — add a page of your own to the site.
