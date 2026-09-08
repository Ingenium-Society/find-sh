---
title: "Collaborating with Remotes"
category: "Tools"
difficulty: "intermediate"
updatedAt: "2026-09-08"
order: 4
---

# Collaborating with Remotes

A **remote** is a version of your repository hosted elsewhere — almost always GitHub for this club. Understanding forks vs. clones, and how to keep everything in sync, is what makes group contribution actually work.

## Clone vs. Fork

- **Clone** — a direct copy of a repo you already have write access to (e.g. you're a member of the `Ingenium-Society` GitHub org). You push directly back to the same repo.
- **Fork** — your own personal copy of someone else's repo on GitHub. Used when you don't have write access, or want to propose changes without touching the original directly. You push to your fork, then open a Pull Request asking the original repo to pull in your changes.

```bash
# Cloning (you have direct write access)
git clone https://github.com/Ingenium-Society/find-sh.git

# After forking on GitHub, clone YOUR fork
git clone https://github.com/your-username/find-sh.git
```

## Working with a fork: keeping it in sync

Forks go stale — the original repo (`upstream`) moves on while your fork stays frozen at the point you forked it. Add the original as a second remote called `upstream`:

```bash
git remote add upstream https://github.com/Ingenium-Society/find-sh.git
git remote -v          # confirm you now have both "origin" (your fork) and "upstream"
```

Sync your fork before starting new work:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main   # update your fork on GitHub too
```

## Opening a Pull Request (PR)

1. Push your branch (on a clone: your branch on the shared repo; on a fork: your branch on your fork).
2. On GitHub, click "Compare & pull request."
3. Write a clear description: what changed and why.
4. A maintainer/advisor reviews, comments, and merges once it looks good.

## Handling review feedback

If a reviewer asks for changes, just keep committing to the same branch — the PR updates automatically:

```bash
# make the requested edits
git add .
git commit -m "Address review feedback"
git push
```

## Resolving conflicts against the target branch

If `main` moved on while your PR was open, GitHub may show a conflict. Bring your branch up to date locally and resolve it there rather than on GitHub's web editor:

```bash
git checkout your-branch
git fetch origin
git merge origin/main
# resolve conflicts as covered in "Undoing Changes" / branching guide
git add .
git commit
git push
```

## Quick reference

| Situation | What to do |
|---|---|
| You have write access to the repo | Clone it directly |
| You don't have write access | Fork it, clone your fork |
| Your fork is out of date | Add `upstream` remote, `fetch` + `merge` |
| Ready to propose changes | Push your branch, open a PR |
| Reviewer requests changes | Commit + push to the same branch |
