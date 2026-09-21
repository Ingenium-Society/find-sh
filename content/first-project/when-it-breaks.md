---
title: "When It Breaks"
category: "Project"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 4
---

# When It Breaks

Something will fail. That's not a sign you're doing it wrong — it's the normal experience of working in a terminal, for everyone, including people who've been doing it for years.

What separates people who can build things is not avoiding errors. It's being able to read one.

## How to debug anything

Four steps, in order. They work on problems this page doesn't cover.

**1. Read the whole error.** Not the first line — the last one. Errors cascade: the final line is usually the actual cause, and everything above it is the chain of things that broke because of it.

**2. Find the specific part.** Errors name a file, a command, or a symbol. Locate it. `Cannot find module 'gray-matter'` names exactly what's missing.

**3. Check the obvious three.** In order:

```bash
pwd                 # am I in the right folder?
ls                  # is the file I'm expecting actually here?
node --version      # is my toolchain the version I think it is?
```

Roughly half of all errors are one of these.

**4. Search the exact error.** Copy the message, remove anything specific to your machine (usernames, paths), and search it. Someone has hit it before.

Don't guess and re-run. That's how you turn one problem into three.

## Cloning

**`fatal: destination path 'find-sh' already exists`**

You already cloned it. Either work in the existing folder, or clone somewhere else. Don't delete the folder unless you're sure there's nothing in it you need.

**`fatal: not a git repository`**

You're running a `git` command outside a repository. `pwd` to check where you are, then `cd` into the project.

**`Permission denied (publickey)`**

Your SSH key isn't set up. Either switch to the HTTPS URL, or set up SSH — see [Collaborating with Remotes](/tutorials/version-control/collaborating-with-remotes).

## Installing

**`npm ERR! code ERESOLVE`**

Two packages want incompatible versions of a shared dependency. The tempting fixes are `--force` and `--legacy-peer-deps`. Both silence the error rather than solving it, and both can leave you with a `node_modules` that doesn't work.

Try this first:

```bash
rm -rf node_modules package-lock.json
npm install
```

If it still fails, the conflict is real and needs a dependency version change — not a flag.

**`EACCES: permission denied`**

You're installing somewhere your user doesn't own. **Do not reach for `sudo`.** A global install with `sudo` creates root-owned files that cause stranger problems later. Check where npm is putting things:

```bash
npm config get prefix
```

If it points somewhere in `/usr`, that's the problem.

**`npm: command not found`**

Node isn't installed, or isn't on your `PATH`. Check:

```bash
node --version
which node
```

If Node works but npm doesn't, reinstall Node. See [Environment Variables and PATH](/tutorials/terminal-basics/environment-variables-and-path).

**`EBADENGINE` or a version warning**

The project needs a newer Node than you have. Check what it wants in `package.json` under `engines`, then upgrade Node.

**Install is very slow**

Normal the first time — it's downloading hundreds of packages. Later installs are much faster because npm caches them. If it's slow every single time, check your network rather than the project.

## Running the dev server

**`Error: listen EADDRINUSE: address already in use :::3000`**

Something is already on port 3000 — usually a dev server you forgot about. Either stop it with `Ctrl + C` in its terminal, or run on a different port:

```bash
npm run dev -- -p 3001
```

**`npm ERR! Missing script: "dev"`**

You're in the wrong folder, or `package.json` doesn't define a `dev` script. `pwd` first, then check the `scripts` block in `package.json`.

**The page loads but looks unstyled, or won't compile**

Delete the build cache and restart:

```bash
rm -rf .next
npm run dev
```

`.next` is generated output, not source. Deleting it is always safe — it's rebuilt on the next run.

**`Cannot find module '...'`**

A dependency is missing. `npm install` again. If it persists, the module isn't in `package.json` at all — someone may have installed it locally without committing the change.

**It hangs after starting**

The first page request compiles on demand and can take 30–60 seconds. Wait. If it's still hanging after a minute, `Ctrl + C` and restart.

## Your page doesn't appear

**Check the frontmatter.** A malformed block is the most common cause, and the dev server usually prints a warning in the terminal — scroll up.

Every file needs all four of these:

```yaml
---
title: "Your Title"
category: "Something"
difficulty: "beginner"
updatedAt: "2026-09-21"
---
```

Common mistakes:

| Mistake | Result |
|---|---|
| Missing a field | page skipped or renders blank |
| `difficulty: "Beginner"` | must be lowercase: `beginner` |
| Missing `---` markers | the block is treated as page text |
| Missing quotes around a title with a colon | YAML parse error |
| File saved as `.txt` or `.markdown` | ignored — only `.md` is read |

**Check the filename.** It must be lowercase, hyphenated, and end in `.md`:

```
content/markdown-basics/what-is-markdown.md     ✓
content/Markdown Basics/What Is Markdown.MD     ✗
```

**Check the folder.** A folder needs an `index.md` to have its own page. Without one it still appears in the sidebar, but clicking **View** does nothing.

**Restart the server.** It watches for changes, but occasionally misses a new folder. `Ctrl + C`, then `npm run dev`.

## Pushing

**`Updates were rejected because the remote contains work that you do not have locally`**

Someone pushed before you:

```bash
git pull
git push
```

**`Support for password authentication was removed`**

Use a personal access token or an SSH key. Your GitHub password will never work. See [Collaborating with Remotes](/tutorials/version-control/collaborating-with-remotes).

**`remote: Permission to Ingenium-Society/find-sh.git denied`**

You're trying to push to the club's repository rather than your fork. Check your remotes:

```bash
git remote -v
```

`origin` should point at **your** username, not `Ingenium-Society`. See [Ship It](/tutorials/first-project/ship-it).

## When you're truly stuck

Do these three things and you'll solve most remaining problems:

1. **Copy the exact error** and search it. Strip out your username and paths first.
2. **Read it again, slowly.** Most errors say precisely what's wrong. `Cannot find module 'gray-matter'` is not a mystery.
3. **Check what changed.** It worked a minute ago? Then something you just did broke it. `git diff` shows exactly what.

Then ask. When you do, include the command you ran, the complete error, and what you already tried. A question with those three things gets answered in minutes; "it doesn't work" gets ignored.

## The thing worth internalising

Every error in this page is a solved problem. Someone has hit it, written it up, and moved on.

Reading errors is a skill, and it's the highest-return one in this entire curriculum. Everything else is vocabulary you can look up.
