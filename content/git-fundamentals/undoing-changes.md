---
title: "Undoing Changes"
category: "Tools"
difficulty: "intermediate"
updatedAt: "2026-09-08"
---

# Undoing Changes

Mistakes happen constantly with Git — the good news is almost everything is recoverable. Which command to use depends on exactly what you're trying to undo.

## Discard uncommitted changes to a file

You edited a file but haven't staged or committed it, and want to throw the edits away:

```bash
git checkout -- wiring-guide.md     # older syntax
git restore wiring-guide.md         # newer, clearer syntax
```

## Unstage a file (but keep the edits)

You ran `git add` by mistake and want to un-stage it without losing your changes:

```bash
git restore --staged wiring-guide.md
```

## Fix your last commit message or add a forgotten file

```bash
git add forgotten-file.md
git commit --amend -m "Corrected commit message"
```
⚠️ Only amend commits that **haven't been pushed yet**. Amending a pushed commit rewrites history and will cause problems for anyone who already pulled it.

## Undo a commit but keep the changes in your working directory

Useful when you committed too early and want to re-group the changes:

```bash
git reset --soft HEAD~1
```

## Undo a commit and discard the changes entirely

```bash
git reset --hard HEAD~1
```
⚠️ This permanently deletes those changes. There's no undo for `--hard` once it runs, so double check `git log` first if you're unsure.

## Undo a commit that's already been pushed/shared

Don't rewrite shared history with `reset`. Instead, use `revert`, which creates a **new** commit that undoes the old one — safe for shared branches:

```bash
git revert <commit-hash>
```

## Temporarily shelve unfinished work

Need to switch branches but aren't ready to commit? `stash` sets your changes aside without committing them:

```bash
git stash              # save current changes, revert working directory to last commit
git stash list          # see what's stashed
git stash pop           # reapply the most recent stash and remove it from the list
```

## Finding a commit hash

Most of the commands above need a commit hash (or `HEAD~N` for "N commits ago"). Find one with:

```bash
git log --oneline
```

## Quick reference

| I want to... | Command |
|---|---|
| Discard uncommitted edits to a file | `git restore <file>` |
| Unstage a file | `git restore --staged <file>` |
| Fix my last commit | `git commit --amend` |
| Undo last commit, keep changes | `git reset --soft HEAD~1` |
| Undo last commit, discard changes | `git reset --hard HEAD~1` |
| Undo a pushed commit safely | `git revert <hash>` |
| Set changes aside temporarily | `git stash` / `git stash pop` |
