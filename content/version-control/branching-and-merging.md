---
title: "Branching and Merging"
category: "Version Control"
difficulty: "intermediate"
updatedAt: "2026-09-21"
order: 3
---

# Branching and Merging

A branch is a movable pointer to a commit. That's the whole definition — and because it's that simple, creating one costs nothing and takes no time.

Branching is how you try something without risking what already works.

## Why branches exist

You have a working project on `main`. You want to add a feature. Two options:

**Edit directly on `main`.** If it works, fine. If it doesn't, you now have a half-finished feature mixed into your working code, and untangling it means remembering which lines were which.

**Make a branch.** `main` stays exactly as it was. You experiment freely. If the experiment fails, delete the branch and nothing was lost.

The second option is better in every case where you're not certain the change will work — which is most of the time.

## Seeing where you are

```bash
git branch
```

```
* main
```

The `*` marks your current branch. Right now there's only one, created automatically by `git init`.

## Creating and switching

```bash
git switch -c add-summary-table
```

`-c` means create. This makes a new branch and moves you onto it in one step.

```
Switched to a new branch 'add-summary-table'
```

Now `git branch` shows both:

```
* add-summary-table
  main
```

Switch between them:

```bash
git switch main
git switch add-summary-table
```

When you switch, **the files on disk change** to match that branch. This surprises people the first time. If `main` doesn't have a file you created on your branch, that file disappears from your folder when you switch — and reappears when you switch back. Nothing is lost; you're just looking at a different snapshot.

Commit your work before switching. Git will refuse if you have conflicting uncommitted changes, but it's cleaner not to create the situation.

> You'll see `git checkout -b name` and `git checkout main` in older tutorials. Both still work. `git switch` was introduced because `checkout` did too many unrelated things — switching branches *and* restoring files — which made it easy to run the wrong one and lose work. Prefer `switch`.

## Merging

You've finished on your branch. Get it into `main`:

```bash
git switch main
git merge add-summary-table
```

Two things can happen.

**Fast-forward** — if `main` hasn't moved since you branched, Git just slides the pointer forward:

```
Updating 7b2e104..a3f9c21
Fast-forward
 report.py | 12 ++++++++++++
 1 file changed, 12 insertions(+)
```

No new commit. The history stays a straight line.

**Merge commit** — if `main` *has* moved (someone else merged something, or you committed on both branches), Git creates a new commit joining the two:

```
Merge made by the 'ort' strategy.
 report.py | 12 ++++++++++++
 1 file changed, 12 insertions(+)
```

Both histories are preserved. This is normal and not a problem.

## Merge conflicts

A conflict happens when both branches changed **the same lines of the same file**. Git can't know which version you want, so it stops and asks.

```
CONFLICT (content): Merge conflict in report.py
Automatic merge failed; fix conflicts and then commit the result.
```

Open the file and you'll see markers:

```python
def total(rows):
<<<<<<< HEAD
    return sum(r["count"] for r in rows)
=======
    return sum(r["count"] for r in rows if r["count"] > 0)
>>>>>>> add-summary-table
```

Reading the markers:

| Marker | Means |
|---|---|
| `<<<<<<< HEAD` | start of what's on your **current** branch |
| `=======` | separator |
| `>>>>>>> branch-name` | end of what's on the **other** branch |

**Resolving it is just editing.** Decide what the code should actually be, delete all three marker lines, and keep the result:

```python
def total(rows):
    return sum(r["count"] for r in rows if r["count"] > 0)
```

Then:

```bash
git add report.py
git commit
```

Git pre-fills the commit message for a merge. Save and close it.

**Conflicts are not errors.** They mean Git correctly noticed two people changed the same thing and declined to guess. Resolving one is a normal part of collaborating.

If you get lost mid-conflict:

```bash
git merge --abort
```

That puts everything back exactly as it was before you started merging. Use it freely — there's no penalty.

## Cleaning up

After merging, delete the branch:

```bash
git branch -d add-summary-table
```

`-d` is safe: it refuses to delete a branch with unmerged commits, so you can't lose work by accident. If you genuinely want to discard unmerged work, that's `-D` — capital, and deliberate.

## When to branch

The habit that matters most for a club project: **branch for anything you're not certain about.**

| Situation | Branch? |
|---|---|
| Adding a feature | yes |
| Fixing a bug | yes |
| Fixing a typo in the README | not worth it |
| Experimenting | yes — this is the main use |
| Updating a dependency | yes |

One branch per idea. A branch doing three unrelated things is hard to review and hard to merge.

Name branches descriptively — `fix-totals-row`, not `patch1`. The name shows up in pull requests and in `git log --graph`, and it's the only hint about what the branch contains.

## Quick reference

| I want to... | Command |
|---|---|
| List branches | `git branch` |
| Create and switch | `git switch -c name` |
| Switch | `git switch name` |
| Merge into current branch | `git merge branch-name` |
| Abort a conflicted merge | `git merge --abort` |
| Delete a merged branch | `git branch -d name` |
| Force-delete a branch | `git branch -D name` |
| See branch structure | `git log --oneline --graph --all` |
