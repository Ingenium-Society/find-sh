---
title: "What is Git?"
category: "Tools"
difficulty: "beginner"
updatedAt: "2026-09-07"
order: 1
---

# What is Git?

Git is a **version control system** — it tracks changes to files over time, so you can see history, undo mistakes, and let multiple people work on the same project without overwriting each other's work.

**GitHub** is a separate thing: a website that hosts Git repositories online. Git is the tool; GitHub is where you can store and share the result. This distinction trips people up constantly — Git works fine with no internet connection at all; GitHub is just the most common remote host for it.

This matters directly for this tutorial site: every content update happens by committing a markdown file change and pushing it to GitHub, which triggers a rebuild.

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
