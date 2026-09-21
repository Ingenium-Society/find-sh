---
title: "Why Isolation Matters"
category: "Environments"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 1
---

# Why Isolation Matters

This page is the failure modes. Read it once so you recognise them when they happen, instead of spending an evening debugging something with no visible cause.

## Failure 1: two projects, one package

You have Project A working with `requests==2.28.0`. You start Project B, which needs a newer version, so you upgrade globally.

```bash
pip install --upgrade requests
```

Project A now fails. Nothing in Project A's code changed. The package underneath it did.

```
AttributeError: module 'requests' has no attribute 'get'
```

You'll waste an hour looking at Project A's code before you think to check the version.

## Failure 2: the version you can't reproduce

Your project works on your laptop. You push it. A club member clones it and runs it:

```
ModuleNotFoundError: No module named 'requests'
```

They never installed it, because nothing told them to. You installed it months ago, in one command, and forgot.

This is what a dependency file solves — it's the written record of what the project needs. See [Package Managers](/tutorials/package-managers).

## Failure 3: it works on your laptop, not theirs

The nastiest one, because everything is installed correctly on both machines. The versions differ.

```
TypeError: expected str, bytes or os.PathLike object, not NoneType
```

Same code. Same package. Different version. The library changed how it handles a missing argument between 2.28 and 2.32, and your code depended on the old behaviour without you knowing.

You cannot debug this by reading your own code. You can only prevent it, by pinning versions.

## Failure 4: the dependency of a dependency

You install one package:

```bash
pip install pandas
```

Pip installs pandas **and twelve other packages** pandas needs. You didn't ask for them. You don't know they're there.

Now one of them gets upgraded for an unrelated reason, and pandas breaks. The package in the traceback isn't one you've ever typed.

This is why "I only installed one thing" is never quite true.

## Failure 5: you can't tell which Python you're using

macOS ships with a system Python. You may also have Homebrew's, and one from python.org, and one inside a virtual environment.

```bash
which python3
```

```
/usr/bin/python3
```

That's the system one. Install a package into it and it goes somewhere you'll never find again — and on some systems, modifying the system Python can break tools that depend on it.

## What isolation actually gives you

| Without isolation | With isolation |
|---|---|
| One global package set | One set per project |
| Upgrading breaks other projects | Upgrading affects one project |
| No record of what's needed | A dependency file in the repo |
| `which python3` is ambiguous | You know exactly which one |
| "Works on my machine" | Reproducible anywhere |

## The mental model

Think of each project as a box. The box contains your code, and it contains its own copy of every package the code imports.

When you work on the project, you step into its box. Commands you run then see only that box's packages — not the ones from your other projects, not the ones on your system.

That's the whole idea. Everything in the next two pages is just mechanics for getting in and out of the box.

## Next

**[Python Virtual Environments](/tutorials/virtual-environments/python-virtual-environments)** — creating and using the box in Python.

**[Node and node_modules](/tutorials/virtual-environments/node-and-node-modules)** — how JavaScript solves the same problem by making the box mandatory.
