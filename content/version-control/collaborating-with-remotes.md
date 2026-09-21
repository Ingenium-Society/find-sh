---
title: "Collaborating with Remotes"
category: "Version Control"
difficulty: "intermediate"
updatedAt: "2026-09-21"
order: 4
---

# Collaborating with Remotes

A **remote** is a copy of your repository hosted somewhere else — GitHub, most likely. Everything up to now worked entirely on your machine. This page is about getting your work out and other people's work in.

The [welcome page](/tutorials) says to open a pull request if something is missing from this site. This page is how you do that.

## Cloning

To get a copy of a repository you don't have:

```bash
git clone https://github.com/Ingenium-Society/find-sh.git
cd find-sh
```

That creates the folder, downloads the full history, and sets up `origin` — the default name for "the remote I cloned from."

Check what remotes you have:

```bash
git remote -v
```

```
origin  https://github.com/Ingenium-Society/find-sh.git (fetch)
origin  https://github.com/Ingenium-Society/find-sh.git (push)
```

## Authentication

Cloning a public repository needs no login. Pushing does.

Two options:

**HTTPS with a personal access token.** Git will ask for a username and password. Your GitHub *password* will not work — GitHub removed password authentication. You need a personal access token from **Settings → Developer settings → Personal access tokens**. Treat it like a password.

**SSH keys** — set up once, then never prompted again. Better if you'll be doing this regularly:

```bash
ssh-keygen -t ed25519 -C "you@example.com"
cat ~/.ssh/id_ed25519.pub
```

Copy the output into **GitHub → Settings → SSH and GPG keys → New SSH key**. Then clone with the SSH URL:

```bash
git clone git@github.com:Ingenium-Society/find-sh.git
```

Test it:

```bash
ssh -T git@github.com
```

**Or use the `gh` CLI**, which handles authentication for you:

```bash
brew install gh
gh auth login
```

`gh` is worth installing regardless — it can create pull requests from the terminal, which is faster than the web interface.

## The three commands

| Command | Direction | What it does |
|---|---|---|
| `git fetch` | remote → you | downloads new commits, doesn't touch your files |
| `git pull` | remote → you | fetch **and** merge into your current branch |
| `git push` | you → remote | uploads your commits |

```bash
git pull                    # get the latest
git push                    # send your commits
git push -u origin my-branch   # first push of a new branch
```

`-u` sets the upstream, so afterwards plain `git push` knows where to go. You need it once per branch.

**`fetch` vs `pull`.** `fetch` is the safe one — it downloads but changes nothing, so you can look before merging:

```bash
git fetch
git log HEAD..origin/main --oneline     # what's new
git merge origin/main
```

`pull` is `fetch` + `merge` in one step. Convenient, and fine most of the time. When you're unsure what's on the remote, use `fetch` first.

## The contribution workflow

This is the flow you'll use for club projects. It's the standard fork-and-pull-request model.

**1. Fork the repository** (once, on GitHub). Click **Fork**. You now have your own copy under your account. You don't have permission to push to the club's repository directly — a fork is yours.

**2. Clone your fork:**

```bash
git clone https://github.com/YOUR-USERNAME/find-sh.git
cd find-sh
```

**3. Add the original as a second remote**, so you can pull in other people's changes:

```bash
git remote add upstream https://github.com/Ingenium-Society/find-sh.git
git remote -v
```

```
origin    https://github.com/YOUR-USERNAME/find-sh.git
upstream  https://github.com/Ingenium-Society/find-sh.git
```

**4. Make a branch for your change:**

```bash
git switch -c add-uv-tutorial
```

Never work directly on `main` in a fork you intend to contribute from. A branch keeps your `main` clean and lets you have several contributions in progress.

**5. Do the work and commit:**

```bash
git add content/package-managers/uv.md
git commit -m "Add uv tutorial to package managers section"
```

**6. Push the branch to your fork:**

```bash
git push -u origin add-uv-tutorial
```

**7. Open the pull request.** GitHub prints a link in the push output, or go to the repository and click **Compare & pull request**. Write a description of what you changed and why. Submit.

## Keeping your fork up to date

While your pull request is open, other people are merging things. Your fork drifts behind.

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

Do this before starting each new piece of work. Otherwise you're branching from a stale `main` and your changes may conflict with things that were merged weeks ago.

A fork whose `main` hasn't been updated in three months is the most common cause of painful merge conflicts in student projects.

## What happens after you open a pull request

Someone reviews it. They may:

- **Approve and merge** — your work is now in the project
- **Request changes** — you'll get comments. Push more commits to the same branch and the pull request updates automatically. No need to open a new one.
- **Close it without merging** — usually with an explanation

Review is not rejection. A pull request with comments is the process working as intended.

## Common errors

**`Updates were rejected because the remote contains work that you do not have locally`**

Someone pushed before you. Pull first, then push:

```bash
git pull
git push
```

**`fatal: refusing to merge unrelated histories`**

Usually means you ran `git init` in a folder that already had a `.git`, or you're merging a repository with a completely separate history. If you genuinely want it:

```bash
git pull --allow-unrelated-histories
```

**`Permission denied (publickey)`**

Your SSH key isn't set up or isn't loaded. Check with `ssh -T git@github.com`, and re-do the SSH setup above.

**`Support for password authentication was removed`**

You're using your GitHub password. Use a personal access token or SSH. See [Authentication](#authentication).

**`fatal: not a git repository`**

You're not inside the project folder. `cd` into it.

## The loop, end to end

```bash
git switch main
git fetch upstream
git merge upstream/main          # start from current code
git switch -c my-change          # branch
# ... edit files ...
git add .
git commit -m "Describe the change"
git push -u origin my-change     # push to your fork
# ... open the pull request on GitHub ...
```

## Quick reference

| I want to... | Command |
|---|---|
| Copy a repository | `git clone <url>` |
| See remotes | `git remote -v` |
| Add a remote | `git remote add upstream <url>` |
| Download without merging | `git fetch` |
| Download and merge | `git pull` |
| Upload commits | `git push` |
| Push a new branch | `git push -u origin branch` |
| Sync a fork | `git fetch upstream && git merge upstream/main` |
| Test SSH auth | `ssh -T git@github.com` |
| Create a PR from the terminal | `gh pr create` |
