---
title: "Git Basics"
category: "Version Control"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 2
---

# Git Basics

Five commands cover almost everything: `status`, `add`, `commit`, `log`, `diff`.

The workflow is always the same shape — change files, look at what changed, stage what you want, commit it.

## Creating a repository

```bash
mkdir my-project
cd my-project
git init
```

```
Initialized empty Git repository in /Users/you/my-project/.git/
```

That's it. A `.git` folder now holds the history — currently empty.

You only run `git init` once per project. If you clone an existing project instead, it's already a repository and you skip this entirely.

## `git status` — the command you'll run most

```bash
git status
```

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        report.py

nothing added to commit but untracked files present
```

Read this carefully — it's Git's most useful output, and it tells you exactly what to do next. It reports three things:

| Term | Meaning |
|---|---|
| **Untracked** | Git sees the file but isn't tracking it yet |
| **Modified** | a tracked file changed since the last commit |
| **Staged** | marked to go into the next commit |

Run `git status` constantly. Before every commit, and any time you're confused. It always tells you the state of things and usually tells you the command to fix it.

## `git add` — stage changes

```bash
git add report.py          # one file
git add .                  # everything in this folder and below
git add src/               # a whole folder
```

Staging means "include this in the next commit." It doesn't save anything yet — you can keep editing after staging, and you can unstage:

```bash
git restore --staged report.py
```

## `git commit` — record a snapshot

```bash
git commit -m "Add CSV parsing and totals"
```

```
[main (root-commit) 4c1d88a] Add CSV parsing and totals
 1 file changed, 24 insertions(+)
```

The `-m` is your commit message. If you omit it, Git opens an editor and waits for you to write one — which is why `git commit` on its own sometimes appears to hang.

**Writing a good message.** One line, imperative mood, explaining what and why:

| Bad | Better |
|---|---|
| `fix` | `Fix crash when CSV has no header row` |
| `updates` | `Update dependency versions to fix build` |
| `asdfgh` | `Add attendance summary table` |

Not "Added" — "Add". The convention is that a message completes the sentence *"This commit will…"*.

For anything non-obvious, add a blank line and a longer explanation:

```bash
git commit -m "Skip empty rows when parsing CSV" -m "The export tool adds a trailing newline, which produced a spurious blank row in the output."
```

## `git log` — the history

```bash
git log --oneline
```

```
a3f9c21 Fix off-by-one in the totals row
7b2e104 Sort by attendance, descending
4c1d88a Add CSV parsing
```

That's the readable form. Plain `git log` shows the same thing with full hashes, authors, and dates.

Useful variations:

```bash
git log --oneline --graph --all     # see branch structure
git log -p report.py                # every change to one file
git log --author="Haidar"           # filter by author
```

## `git diff` — what changed

This is the command that answers "what did I actually just do."

```bash
git diff                 # unstaged changes
git diff --staged        # staged changes, i.e. what you're about to commit
git diff HEAD            # everything since the last commit
```

The output looks like this:

```diff
 def total(rows):
-    return sum(r["count"] for r in rows[:-1])
+    return sum(r["count"] for r in rows)
```

`-` is removed, `+` is added. Once you can read this, you can review any change in any project.

`git diff --staged` before every commit is a good habit. It's your last chance to notice that you staged a file you didn't mean to, or a secret you shouldn't commit.

## `.gitignore` — files Git should never track

Some files should never be committed. Create a `.gitignore` at the project root:

```gitignore
# environments — regenerated from dependency files
.venv/
node_modules/

# secrets — must never be committed
.env
*.key

# build output — regenerated
dist/
build/
.next/

# OS and editor noise
.DS_Store
*.swp
```

Rules:

- One pattern per line, `#` for comments
- A trailing `/` matches folders only
- `*` is a wildcard

**Create this before your first commit.** Once a file is committed, adding it to `.gitignore` doesn't remove it from history — see [Undoing Changes](/tutorials/version-control/undoing-changes).

## The loop, end to end

```bash
git status                          # what's changed?
git diff                            # what exactly did I change?
git add report.py                   # stage it
git diff --staged                   # confirm what I'm about to commit
git commit -m "Add CSV parsing"     # record it
git log --oneline                   # verify
```

Run that loop dozens of times and it becomes automatic. It's genuinely all there is to the basic workflow.

## Quick reference

| I want to... | Command |
|---|---|
| Create a repository | `git init` |
| See what's changed | `git status` |
| See the actual changes | `git diff` |
| See staged changes | `git diff --staged` |
| Stage one file | `git add file.py` |
| Stage everything | `git add .` |
| Unstage | `git restore --staged file.py` |
| Commit | `git commit -m "message"` |
| Compact history | `git log --oneline` |
| History of one file | `git log -p file.py` |
| Ignore files | create `.gitignore` |
