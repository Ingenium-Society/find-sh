---
title: "What is a Package Manager?"
category: "Dependencies"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 1
---

# What is a Package Manager?

A **registry** is a public library of code. A **package manager** is the tool that fetches from it and keeps a record of what it fetched.

Every language has both. They're the same idea with different names.

## The registries

| Ecosystem | Registry | Tool | Config file |
|---|---|---|---|
| Python | PyPI | `pip`, `uv` | `requirements.txt`, `pyproject.toml` |
| JavaScript | npm | `npm`, `pnpm`, `bun` | `package.json` |
| Rust | crates.io | `cargo` | `Cargo.toml` |
| Go | proxy.golang.org | `go mod` | `go.mod` |

The pattern is consistent enough that learning one transfers. Learn `pip` well and `npm` is an afternoon.

## Semantic versioning

Versions look like this:

```
2.32.1
│  │  └── PATCH — bug fixes only
│  └───── MINOR — new features, backwards compatible
└──────── MAJOR — breaking changes
```

This is a **contract**, not a law. Most packages follow it. Some don't, which is why lockfiles exist.

What the contract promises:

| Change | You can upgrade without reading release notes? |
|---|---|
| Patch | Yes |
| Minor | Usually yes |
| Major | **No.** Read the migration guide. |

## Version specifiers

When you write a dependency, you can be vague or precise:

| Specifier | Means | Risk |
|---|---|---|
| `requests` | newest available | highest |
| `requests==2.32.1` | exactly this | lowest |
| `requests>=2.28` | at least 2.28 | medium |
| `requests>=2.28,<3` | 2.x only, never 3.x | medium |
| `requests~=2.32` | 2.32 and up, not 2.33 | low |

`~=` is worth knowing — it means "this minor version and its patches, but not the next minor." It's a reasonable middle ground: you get bug fixes without surprise features.

**The general rule:** pin exactly (`==`) in applications, allow ranges (`>=`) in libraries. An application that breaks because a dependency changed is your problem. A library that pins exactly forces that constraint on everyone who uses it.

## Why not just copy the code?

You could paste a function from Stack Overflow into your project and skip the dependency entirely. Sometimes that's correct. Usually it isn't.

| Copying code | Using a package |
|---|---|
| You own the bugs | Maintainers fix them |
| No security updates | Patched upstream |
| You re-implement edge cases | Already handled |
| No version record | Lockfile records it |
| Fine for 10 lines | Better for anything substantial |

The honest middle ground: **if it's small and you understand it, copy it. If it's large, security-sensitive, or you'd have to maintain it, use the package.**

## Where packages come from, and the trust question

Anything on PyPI or npm can be installed by anyone. There is no review. Some consequences:

- **Typosquatting is real.** `reqeusts` and `requests` both exist. One is a real package; the other may be malware. Copy-pasting package names from a blog post is how people get compromised.
- **Installing a package runs its install scripts.** With npm in particular, `npm install` executes code from the package. On a project you don't trust, that's a real risk.
- **Popularity isn't safety**, but an abandoned package with one maintainer and no commits in three years is a liability.

Practical habits: install by typing the name yourself rather than pasting it, check the package's weekly downloads and last publish date, and don't install things you can't explain the purpose of.

## What a package manager is not

It is **not** a virtual environment. They're related but distinct:

- The **environment** is where packages live (`.venv/`, `node_modules/`)
- The **package manager** is what puts them there and records which ones

That's why Python's story is more confusing than JavaScript's — you have to manage both separately. See [Virtual Environments](/tutorials/virtual-environments) for the other half.

## Next

**[pip and requirements.txt](/tutorials/package-managers/pip-and-requirements-txt)** — the baseline Python workflow.

**[uv](/tutorials/package-managers/uv)** — the tool to use instead.

**[npm and package.json](/tutorials/package-managers/npm-and-package-json)** — the JavaScript side.
