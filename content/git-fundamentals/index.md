---
title: "Git Fundamentals"
category: "Tools"
difficulty: "beginner"
updatedAt: "2026-09-08"
order: 3
---

# Git Fundamentals

Git is a **version control system** — it tracks changes to files over time, so you can see history, undo mistakes, and let multiple people work on the same project without overwriting each other's work.

**GitHub** is a separate thing: a website that hosts Git repositories online. Git is the tool; GitHub is where you can store and share the result. Git works fine with no internet connection at all — GitHub is just the most common remote host for it.

This matters directly for this site: every content update happens by committing a markdown file change and pushing it to GitHub, which triggers a rebuild.

## Core concepts

- **Repository (repo)** — a project folder that Git is tracking.
- **Commit** — a saved snapshot of changes, with a message describing what changed.
- **Branch** — an independent line of work, so you can experiment without touching the main codebase.
- **Push / Pull** — sending your commits to GitHub (`push`) or fetching others' commits down to your machine (`pull`).
- **Clone** — downloading a copy of an existing repo to your machine.

## Getting set up

1. Install Git from [git-scm.com](https://git-scm.com/downloads).
2. Verify: `git --version`
3. Set your identity (used in every commit you make):
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## The commands you'll actually use daily

```bash
# Get a copy of an existing repo
git clone https://github.com/your-org/your-repo.git

# Check what's changed
git status

# Stage changes
git add syntax-basics.md
git add .              # stage everything changed

# Commit staged changes with a message
git commit -m "Add syntax basics section to Python guide"

# Send commits to GitHub
git push

# Get the latest changes from GitHub
git pull
```

## A typical workflow for updating this site

```bash
git pull                                  # make sure you're up to date
# edit or add a .md file in /content
git add content/python-fundamentals/syntax-basics.md
git commit -m "Add syntax basics section to Python guide"
git push                                  # triggers a rebuild on the live site
```

## Common gotcha

`git add` and `git commit` only affect your local machine. Nothing reaches GitHub — and nothing shows up on the live site — until you run `git push`.

Explore the sub-tutorials in this folder for branching, undoing mistakes, and working with remotes/forks.
