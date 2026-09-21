---
title: "Managing Python Versions"
category: "Environments"
difficulty: "intermediate"
updatedAt: "2026-09-21"
order: 3
---

# Managing Python Versions

`python` and `python3` are not the same command. Neither is necessarily the Python you think it is. This page is about knowing which one you're running and picking a different one on purpose.

## The `python` vs `python3` mess

On macOS and most Linux systems:

| Command | Usually means |
|---|---|
| `python` | nothing — may not exist, or may be Python 2 |
| `python3` | the Python 3 the system knows about |

```
$ python --version
zsh: command not found: python
```

That's normal and not broken. The convention is: **type `python3`**.

Windows is the opposite — `python` is correct there, and `python3` may not work.

Check what you actually have:

```bash
which -a python3
```

```
/usr/local/bin/python3
/usr/bin/python3
```

The first line is what runs when you type `python3`. The others are alternatives you could be using.

## Why the system Python is off-limits

On macOS, `/usr/bin/python3` is part of the operating system. Some system tools depend on it. If you `pip install` into it, you can break things in ways that are annoying to undo.

**Never do this:**

```bash
sudo pip install requests
```

The `sudo` is the tell. If an install needs administrator permission, you're installing in the wrong place. The right answer is almost always a virtual environment.

## Version numbers, decoded

```
Python 3.12.4
       │ │  └── patch — bug and security fixes only
       │ └───── minor — new features, released yearly
       └─────── major
```

| Change | Meaning | Risk |
|---|---|---|
| `3.12.4` → `3.12.5` | patch | effectively none |
| `3.12` → `3.13` | minor | some, usually fine |
| `3.12` → `2.7` | major | your code will not run |

Two projects can need different **minor** versions, and that's a real problem virtual environments alone don't solve — `venv` copies whichever Python created it. You need a version manager to have 3.11 and 3.13 side by side.

## Checking version requirements

A project usually states what it needs:

```
# pyproject.toml
requires-python = ">=3.11"
```

```
$ python3 --version
Python 3.9.6
```

That project won't work. Rather than debugging the syntax errors that follow, install the right version.

## Installing and switching versions

**`uv`** is the current best answer for this — one tool for Python versions and environments:

```bash
# install a specific Python
uv python install 3.12

# list what's available
uv python list

# pin this project to a version
uv python pin 3.12
```

`uv` downloads a standalone Python, so it doesn't touch your system one at all.

**`pyenv`** is the older, widely-used alternative:

```bash
pyenv install 3.12.4
pyenv global 3.12.4          # default for your whole machine
pyenv local 3.12.4           # default for this folder
```

`pyenv local` writes a `.python-version` file in the current folder, which you can commit — so everyone on the project gets the same version automatically.

## Seeing which version a project actually uses

```bash
python3 --version            # if run from an active venv
```

But once you're inside a `.venv`, the version is fixed to whatever created it. If the project needs something different, delete and recreate:

```bash
deactivate
rm -r .venv
python3.12 -m venv .venv
source .venv/bin/activate
```

Recreating is cheap. It's one command and a dependency install. Don't hesitate to throw an environment away — a corrupted or wrong-version environment is not worth repairing.

## A rule that saves time

When something behaves inexplicably — an import that should work, a syntax error on valid code — check the version before you check anything else:

```bash
python3 --version
which python3
```

Five seconds, and it rules out an entire class of problem.

## Quick reference

| I want to... | Command |
|---|---|
| Check the version | `python3 --version` |
| See all installed Pythons | `which -a python3` |
| See which one runs | `which python3` |
| Install a version (uv) | `uv python install 3.12` |
| Pin a version (uv) | `uv python pin 3.12` |
| Install a version (pyenv) | `pyenv install 3.12.4` |
| Set per-folder version (pyenv) | `pyenv local 3.12.4` |
| Rebuild an environment | `rm -r .venv && python3 -m venv .venv` |
