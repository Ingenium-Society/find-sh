---
title: "Version Control"
category: "Version Control"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 5
---

# Version Control

Git records the history of a project — every change, who made it, when, and why. It's how you undo mistakes, work on two ideas at once without them interfering, and collaborate without emailing zip files.

It comes **after** the toolchain in this curriculum, not before. That's deliberate: Git is most useful once you have a project worth versioning, and least useful as an abstract concept on its own.

## Why it matters for club work

- **This site is a Git repository.** The [welcome page](/tutorials) tells you to open a pull request if something is missing. That instruction is meaningless until you can do it — this section is what makes it meaningful.
- **Undo becomes free.** Deleted a file you needed? Changed something and broke it? The history has it. Nothing committed is ever really lost.
- **Working together stops being painful.** Two people can edit the same project on separate branches and merge the results, without overwriting each other.
- **It's the entry ticket to every project.** You cannot meaningfully contribute to an existing codebase without it. It's the first thing you need after the toolchain.

## What's in this section

- **[Why Version Control](/tutorials/version-control/why-version-control)** — the problems it solves, and what a repository actually is
- **[Git Basics](/tutorials/version-control/git-basics)** — `init`, `status`, `add`, `commit`, `log`, and `.gitignore`
- **[Branching and Merging](/tutorials/version-control/branching-and-merging)** — working on something without breaking what already works
- **[Collaborating with Remotes](/tutorials/version-control/collaborating-with-remotes)** — clone, pull, push, and the pull request workflow
- **[Undoing Changes](/tutorials/version-control/undoing-changes)** — how to get out of the mistakes you will definitely make

## Git vs GitHub

Not the same thing, and the confusion causes real problems.

| | Git | GitHub |
|---|---|---|
| What it is | a program on your computer | a website that hosts Git repositories |
| Works offline | yes | no |
| Owned by | nobody — it's open source | Microsoft |
| Required | to use Git | to collaborate on GitHub |

Git works entirely on your machine with no account and no internet. GitHub is one of several places you can put a repository so other people can reach it — GitLab and Codeberg do the same job.

You can use Git without GitHub forever. You cannot use GitHub without Git.

## The mental model

A Git repository is a folder with a hidden `.git` directory inside it. That directory contains the entire history — every version of every file, going back to the first commit.

Your project folder is just the **current** version. The `.git` folder is all the previous ones.

```
my-project/
├── .git/          ← the entire history, hidden
├── src/
└── README.md
```

Because the history is a normal folder on your disk, everything works offline, and you can copy a repository by copying the folder. That's the whole mechanism.

## Before you start

Tell Git who you are. Once per machine, ever:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Check it took:

```bash
git config --global --list
```

Use the same email as your GitHub account, or your commits won't be linked to your profile. This doesn't authenticate you to anything — it just labels your commits. You'll set up authentication separately in [Collaborating with Remotes](/tutorials/version-control/collaborating-with-remotes).
