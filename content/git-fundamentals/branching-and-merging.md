---
title: "Branching & Merging"
category: "Tools"
difficulty: "beginner"
updatedAt: "2026-09-08"
order: 2
---

# Branching & Merging

A **branch** is an independent line of work off your main codebase. Branches let you build a feature, fix a bug, or write a new tutorial without touching `main` until it's ready.

## Why bother branching

Committing straight to `main` works fine solo, but breaks down the moment more than one person touches the repo — someone's half-finished change can block or conflict with someone else's. Branching isolates work until it's ready to combine.

## Creating and switching branches

```bash
# Create a new branch and switch to it in one step
git checkout -b add-git-tutorial

# Or, on newer Git versions
git switch -c add-git-tutorial

# Switch back to an existing branch
git checkout main
git switch main

# List all branches (current one is marked with *)
git branch
```

## Making changes on a branch

Work exactly as normal — add, commit — it just stays isolated to this branch until merged:

```bash
git add content/git-fundamentals/branching-and-merging.md
git commit -m "Add branching and merging tutorial"
git push -u origin add-git-tutorial   # -u links this branch to GitHub the first time
```

## Merging back into main

Two common ways:

**Locally, with `git merge`:**
```bash
git checkout main
git pull                          # make sure main is up to date first
git merge add-git-tutorial
git push
```

**Or, more commonly for team projects — open a Pull Request on GitHub.** Push your branch, then use GitHub's "Compare & pull request" button. This lets others review the diff before it merges into `main`, and is the standard workflow for anything beyond a solo quick fix.

## Merge conflicts

A conflict happens when the same lines were changed differently on two branches. Git will mark the conflicting section directly in the file:

```
<<<<<<< HEAD
This is the version on main.
=======
This is the version on your branch.
>>>>>>> add-git-tutorial
```

To resolve: edit the file to keep the version you want (or a combination), delete the `<<<<<<<`, `=======`, `>>>>>>>` markers, then:

```bash
git add <the-file-you-fixed>
git commit
```

Conflicts feel alarming the first time — they're normal, and the file always tells you exactly where to look.

## Deleting a branch once merged

```bash
git branch -d add-git-tutorial              # local
git push origin --delete add-git-tutorial   # remote, on GitHub
```
