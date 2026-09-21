---
title: "Package Managers"
category: "Dependencies"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 4
---

# Package Managers

A package manager downloads code someone else wrote, puts it where your project can find it, and — critically — **writes down exactly which version it installed** so the next person gets the same thing.

That last part is the one beginners underestimate. Anyone can download a file. The valuable part is the record.

## What they actually do

When you run `pip install requests` or `npm install express`, four things happen:

1. **Resolve** — figure out which packages are needed, including the ones your package depends on
2. **Download** — fetch them from a registry
3. **Install** — place them where your code can import them
4. **Record** — note the exact versions in a lockfile

Step 4 is why a package manager exists. Steps 1–3 could be done by hand, badly, and step 4 is the part you can't do by hand at all.

## The files involved

Every project has two kinds of dependency file, and mixing them up causes most dependency problems:

| File | Says | Analogy |
|---|---|---|
| `requirements.txt`, `package.json`, `pyproject.toml` | what you asked for | a shopping list |
| `uv.lock`, `package-lock.json` | what you actually got | the receipt |

The shopping list says "some version of `requests`, at least 2.28."

The receipt says "requests 2.32.3, urllib3 2.2.1, certifi 2024.7.4, charset-normalizer 3.3.2, idna 3.7" — the exact tree, with exact versions.

**Both go in git.** Installing from the shopping list alone gives you whatever is newest that day, which means your project silently changes underneath you.

## Why this matters more than it looks

Without a lockfile, `pip install -r requirements.txt` on your machine and on a club member's machine can install different code. If a dependency released a breaking change last week, their install breaks and yours doesn't.

The lockfile makes the install reproducible. Same input, same output, every machine, every time.

## What's in this section

- **[What is a Package Manager?](/tutorials/package-managers/what-is-a-package-manager)** — registries, semantic versioning, and what a version specifier means
- **[pip and requirements.txt](/tutorials/package-managers/pip-and-requirements-txt)** — the baseline Python workflow, and where it breaks down
- **[uv](/tutorials/package-managers/uv)** — the modern Python tool that replaces pip, venv, and pip-tools
- **[npm and package.json](/tutorials/package-managers/npm-and-package-json)** — the JavaScript workflow, dependencies vs devDependencies

## The short version

| Task | Python | JavaScript |
|---|---|---|
| Install a package | `pip install name` | `npm install name` |
| Install dev-only | `pip install name` (no distinction) | `npm install --save-dev name` |
| Install from file | `pip install -r requirements.txt` | `npm install` |
| Add to dependency file | `pip freeze > requirements.txt` | automatic |
| Reproducible install | `uv sync` | `npm ci` |
| Update a package | `pip install --upgrade name` | `npm update name` |

If you're starting a new Python project today, use **`uv`** and skip `pip` entirely. The `pip` page is here because you'll meet it in existing projects and need to read it, not because you should choose it.
