---
title: "npm and package.json"
category: "Dependencies"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 4
---

# npm and package.json

`npm` is JavaScript's package manager, `package.json` is where a project declares what it needs, and `package-lock.json` records what it got. Together they're the JavaScript equivalent of `pyproject.toml` plus `uv.lock` — except npm has been doing it this way since long before Python settled on an answer.

## Starting a project

```bash
mkdir my-project
cd my-project
npm init -y
```

`-y` accepts all the defaults instead of asking you ten questions. You get a `package.json`:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

In practice you rarely run `npm init` by hand — frameworks scaffold it for you (`npx create-next-app`, `npm create vite@latest`).

## Installing packages

```bash
npm install express             # runtime dependency
npm install --save-dev jest     # dev-only dependency
npm install -g vercel           # global tool
```

`npm install` writes to `package.json` automatically. There is no `freeze` step and no separate file to maintain — this is genuinely better than the pip workflow.

Short forms you'll see in the wild:

```bash
npm i express          # install
npm i -D jest          # install --save-dev
npm i -g vercel        # install --global
```

## dependencies vs devDependencies

This distinction doesn't exist in Python's `requirements.txt`, and it's worth understanding:

| | `dependencies` | `devDependencies` |
|---|---|---|
| Needed to run the app | yes | no |
| Examples | express, react | jest, eslint, typescript |
| Installed in production | yes | no |
| Installed with `npm ci --omit=dev` | yes | skipped |

Getting this wrong isn't fatal, but putting `typescript` in `dependencies` means your production server installs a compiler it will never use. Use `-D` for anything that only runs on your machine during development: test runners, linters, formatters, type checkers, bundlers.

The test: **if the app would crash without it at runtime, it's a dependency. Otherwise it's a devDependency.**

## Scripts

The `scripts` block is the most underused part of `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint .",
    "test": "jest"
  }
}
```

Run them with:

```bash
npm run dev
npm run build
npm test          # "test" is special — "run" is optional
```

Two reasons this matters more than it looks:

1. **It's documentation.** A new member reads `package.json` and knows how to start the project. No README archaeology.
2. **It runs local binaries.** `npm run lint` finds `eslint` inside `node_modules/.bin/` without you installing it globally or typing a path.

## The lockfile

`package-lock.json` is generated automatically on install. It records the exact version of every package in the tree — often hundreds of entries.

**Commit it.** This is the single most important file for reproducibility, and it's commonly and wrongly git-ignored by people who assume it's generated junk. It isn't. It's the record that makes `npm ci` deterministic.

| Command | Behaviour |
|---|---|
| `npm install` | reads lockfile, may update it if `package.json` changed |
| `npm ci` | deletes `node_modules`, installs strictly from lockfile, fails on mismatch |

Use `npm install` while developing. Use `npm ci` in CI and on fresh clones where you want exactly what's recorded.

## Setting up a cloned project

```bash
git clone https://github.com/some/project.git
cd project
npm install
```

That's the whole setup. `npm install` reads `package.json` and `package-lock.json` and reconstructs `node_modules` exactly.

If it fails, the most common causes:

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

Two packages want incompatible versions of a shared dependency. The tempting fix is `--force` or `--legacy-peer-deps`. Both suppress the error rather than resolving it, and both produce a `node_modules` that may not work. Try deleting `node_modules` and the lockfile and reinstalling first — if that fails, the conflict is real and needs a version change, not a flag.

```
npm ERR! Missing script: "dev"
```

You're in the wrong folder, or the project genuinely has no `dev` script. Check the `scripts` block.

## Which package manager?

npm ships with Node. Alternatives exist and are all reasonable:

| Tool | Command | Notable for |
|---|---|---|
| npm | `npm install` | the default, always available |
| pnpm | `pnpm install` | fast, shares packages across projects |
| bun | `bun install` | very fast, also a runtime |
| yarn | `yarn` | historically popular, less so now |

**Use whatever the project's lockfile says.** If you see `pnpm-lock.yaml`, use pnpm. If you see `package-lock.json`, use npm. Mixing tools in one repo produces two lockfiles and a `node_modules` nobody can reproduce. This is the JavaScript equivalent of the isolation problem — same principle, different layer.

## Quick reference

| I want to... | Command |
|---|---|
| Start a project | `npm init -y` |
| Install a dependency | `npm install name` |
| Install a dev dependency | `npm install --save-dev name` |
| Install globally | `npm install -g name` |
| Install from package.json | `npm install` |
| Reproducible install | `npm ci` |
| Remove a package | `npm uninstall name` |
| List installed | `npm list --depth=0` |
| Check for outdated | `npm outdated` |
| Update within ranges | `npm update` |
| Run a script | `npm run name` |
| Run a one-off tool | `npx name` |
| See where a package lives | `npm ls name` |
