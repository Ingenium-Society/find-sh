---
title: "Environment Management"
category: "Languages"
difficulty: "intermediate"
updatedAt: "2026-09-08"
---

# Environment Management

Every Python install has one "global" set of packages by default. The moment you work on more than one project, this becomes a problem.

## Why "just install it globally" breaks down

Say Project A needs `numpy==1.24` and Project B needs `numpy==2.0`. If both packages live in the same global Python install, only one version can exist at a time — installing one for Project B silently breaks Project A. This is called **dependency conflict**, and it's the single most common reason "it worked yesterday" stops being true.

The fix: give every project its own isolated set of packages. That's what a **virtual environment** does (see the dedicated tutorial in this section for hands-on commands).

## System Python vs. project Python

Your operating system may already have a Python installed for its own internal use (common on macOS/Linux). **Don't install project packages into this one** — treat it as off-limits. Always create a fresh virtual environment per project instead of touching the system install.

## Managing multiple Python versions

Sometimes you need more than one *version* of Python itself — one project needs Python 3.10, another needs 3.12. A few options:

- **`uv`** (recommended, see the package manager tutorial) can also install and switch Python versions directly: `uv python install 3.12`
- **`pyenv`** (macOS/Linux) — the traditional tool for this, lets you install multiple Python versions side by side and set a per-project version via a `.python-version` file.
- Windows users: the [python.org installer](https://www.python.org/downloads/) lets multiple versions coexist; use the `py` launcher (`py -3.10`, `py -3.12`) to pick one.

## A sane default workflow

For any new project:

```bash
mkdir my-project && cd my-project
python -m venv venv          # or: uv venv
source venv/bin/activate     # macOS/Linux
venv\Scripts\activate        # Windows
pip install <whatever you need>
```

Repeat this per project. Never share one virtual environment across multiple unrelated projects — the isolation is the entire point.

## Quick reference

| Problem | Solution |
|---|---|
| Two projects need different package versions | Separate virtual environment per project |
| Two projects need different Python versions | `pyenv`, `uv python install`, or the `py` launcher (Windows) |
| "It works on my machine but not theirs" | Check the dependency file (`requirements.txt`/`pyproject.toml`) is actually up to date and committed |
