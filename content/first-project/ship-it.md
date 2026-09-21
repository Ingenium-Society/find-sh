---
title: "Ship It"
category: "Project"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 3
---

# Ship It

Your page works locally. Now get it into the real repository so everyone can read it.

This is the last step, and it's the one that turns "I followed a tutorial" into "I contributed to a project."

## First: you need your own copy

You cloned `Ingenium-Society/find-sh` directly. You can read it and run it, but you **cannot push to it** — it's the club's repository, and you don't have write access.

That's not a restriction to work around. It's how open collaboration works: you make your own copy, change that, then ask for your changes to be pulled in.

**Fork it.** On GitHub, go to [github.com/Ingenium-Society/find-sh](https://github.com/Ingenium-Society/find-sh) and click **Fork** (top right). You now have your own copy at `github.com/YOUR-USERNAME/find-sh`.

## Point your local copy at your fork

Your local repository still points at the club's. Rename that to `upstream`, and add your fork as `origin`:

```bash
git remote rename origin upstream
git remote add origin https://github.com/YOUR-USERNAME/find-sh.git
git remote -v
```

```
origin    https://github.com/YOUR-USERNAME/find-sh.git (fetch)
origin    https://github.com/YOUR-USERNAME/find-sh.git (push)
upstream  https://github.com/Ingenium-Society/find-sh.git (fetch)
upstream  https://github.com/Ingenium-Society/find-sh.git (push)
```

`origin` is where your work goes. `upstream` is where everyone else's work comes from. Your local changes are untouched — only the destinations changed.

## Make a branch

Never commit straight to `main`. A branch keeps your change separate and lets you have more than one contribution in progress.

```bash
git switch -c add-markdown-basics
```

Name it after what it does. That name is the first thing a reviewer sees.

## Commit

Check what you changed:

```bash
git status
git diff
```

You should see only your new file. If you see anything else — a `.env`, `node_modules`, editor files — stop and check `.gitignore` before committing. See [Git Basics](/tutorials/version-control/git-basics).

Stage and commit:

```bash
git add content/markdown-basics/
git commit -m "Add markdown basics section"
```

Write a message that says what the change does. "Add markdown basics section" is good. "update" is not.

## Push

```bash
git push -u origin add-markdown-basics
```

```
remote:
remote: Create a pull request for 'add-markdown-basics' on GitHub by visiting:
remote:      https://github.com/YOUR-USERNAME/find-sh/pull/new/add-markdown-basics
remote:
```

If you're prompted for a password, your GitHub password won't work. You need a personal access token or an SSH key — see [Collaborating with Remotes](/tutorials/version-control/collaborating-with-remotes).

## Open the pull request

Click the link GitHub printed, or go to the repository and click **Compare & pull request**.

Write a description covering:

- **What** you added
- **Why** it belongs on the site
- **Anything you're unsure about** — reviewers would rather hear it now

Then submit.

## What happens next

Someone reviews it. They might approve and merge it straight away, or leave comments asking for changes.

**Comments are not rejection.** They're the normal process. If changes are requested:

```bash
# make the edits
git add content/markdown-basics/
git commit -m "Clarify the headings example"
git push
```

That's it — the pull request updates itself. You don't open a new one.

Once merged, your page is live on the site, and your name is permanently in the project's history.

## The whole flow, in one block

```bash
# fork on GitHub first, then:
git remote rename origin upstream
git remote add origin https://github.com/YOUR-USERNAME/find-sh.git

git switch -c my-change
# ... edit files ...
git add .
git commit -m "Describe the change"
git push -u origin my-change
# ... open the pull request ...
```

That's the loop for contributing to any project on GitHub. The commands don't change; only the repository does.

## Next time

Before starting something new, sync with the club's latest code:

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

Then branch again. Skipping this is how you end up with conflicts against changes that were merged weeks ago.

## Next

**[When It Breaks](/tutorials/first-project/when-it-breaks)** — what to do when a command fails.
