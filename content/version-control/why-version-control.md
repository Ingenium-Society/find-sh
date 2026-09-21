---
title: "Why Version Control"
category: "Version Control"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 1
---

# Why Version Control

Most people meet Git as a list of commands to memorise. That's backwards. The commands are simple; the reason they exist is what's worth understanding first.

## The problem without it

You're writing a script. It works. You want to try a different approach, but you don't want to lose the working version.

So you do this:

```
report.py
report-v2.py
report-v2-final.py
report-v2-final-actually.py
report-working.py
report-backup.py
```

Everyone has done this. It fails in predictable ways:

- **You can't tell what changed.** Two files differ, but finding the difference means reading both.
- **You can't go back to a specific point.** "The version from Tuesday, before I broke the sorting" is not a file you kept.
- **You can't combine two versions.** If a friend fixed a bug in `report-v2.py` and you added a feature to `report-working.py`, merging them is manual work.
- **You can't say why.** The filename records nothing about your reasoning.

## What Git gives you instead

One file. Every version. A message explaining each one.

```
report.py
```

```bash
git log --oneline
```

```
a3f9c21 Fix off-by-one in the totals row
7b2e104 Sort by attendance, descending
4c1d88a Add CSV parsing
9e0b3f7 Initial commit
```

Each line is a **commit** — a snapshot of the entire project at that moment, plus a message.

Now the questions have answers:

| Question | How Git answers it |
|---|---|
| What changed between Tuesday and now? | `git diff <commit> <commit>` |
| Go back to the working version | `git checkout <commit>` |
| Who wrote this line? | `git blame file.py` |
| Why does this line exist? | `git log -p file.py` |
| Combine my work with theirs | `git merge` |

## What a commit actually is

A commit is not a diff. It's a **complete snapshot** of every file in the project at that moment, plus:

- the author and timestamp
- a message
- a pointer to the previous commit

Git stores these efficiently — if a file didn't change, the snapshot reuses the existing copy. So the history is complete but the disk cost is small.

The chain of commits is the **history**:

```
9e0b3f7  ←  4c1d88a  ←  7b2e104  ←  a3f9c21
initial     csv         sort         fix
```

Each one points backwards. That's why "go back to a specific point" is one command — you're just moving a pointer.

## The three places a file can be

This is the model that makes Git's commands stop feeling arbitrary.

| Place | What it means |
|---|---|
| **Working directory** | the files as they are right now on disk |
| **Staging area** | changes you've marked to include in the next commit |
| **Repository** | changes you've committed |

A file moves through them:

```
edit a file   →  git add  →  git commit  →
working dir      staging     repository
```

The staging area is the part that confuses beginners. Why not just commit everything?

Because you often change several things at once and want to commit them **separately**, with clear messages. You fixed a bug and also updated the README — those are two commits, not one. Staging is how you split them.

Once this clicks, `git add` stops being a ritual you type before `git commit` and becomes a tool you use deliberately.

## What Git is not

**It is not a backup.** A repository on one laptop is one laptop's worth of redundancy. Pushing to GitHub helps, but Git's purpose is history, not durability.

**It is not automatic.** Nothing is recorded until you commit. Edit a file and never commit it, and that edit exists nowhere else — no undo, no history.

**It is not only for code.** It works on any text files. People use it for notes, essays, configuration, and legal documents. Binary files (images, video) work but bloat the repository, because Git can't diff them efficiently.

## A habit worth forming

Commit **early and often**, in small pieces, with messages that explain *why*.

A commit that says `fix bug` tells future-you nothing. A commit that says `fix off-by-one in totals row — was skipping the last row` tells future-you exactly what to look at when the totals break again.

You will read your own history more than anyone else's. Write it for that reader.

## Next

**[Git Basics](/tutorials/version-control/git-basics)** — creating a repository and making your first commit.
