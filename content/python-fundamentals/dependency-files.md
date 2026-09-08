---
title: "Dependency Files"
category: "Languages"
difficulty: "intermediate"
updatedAt: "2026-09-08"
order: 8
---

# Dependency Files

When you share a Python project, other people need to know exactly which packages (and versions) to install. That's what dependency files are for — without one, "works on my machine" is guaranteed.

## `requirements.txt` — the classic approach

A plain text list of packages, optionally pinned to versions:

```
requests==2.31.0
numpy>=1.24
pandas
```

Generate one from your current environment:
```bash
pip freeze > requirements.txt
```

Install from one:
```bash
pip install -r requirements.txt
```

Simple, but it only lists packages — no project metadata (name, version, entry points), and no separation between "packages I need" and "packages my packages need" (transitive dependencies), which can make files noisy.

## `pyproject.toml` — the modern standard

A single structured file that covers dependencies *and* project metadata (name, version, description) in one place. This is what modern tools (`uv`, `poetry`, `pip` itself) expect by default now.

```toml
[project]
name = "my-project"
version = "0.1.0"
dependencies = [
    "requests>=2.31.0",
    "numpy>=1.24",
]

[project.optional-dependencies]
dev = ["pytest", "ruff"]
```

Install everything listed:
```bash
uv sync           # if using uv
pip install .     # standard pip, installs the project + its dependencies
```

## Lockfiles — exact, reproducible versions

`pyproject.toml` often specifies *ranges* (`>=2.31.0`), which means two people running `install` on different days could get different exact versions. A **lockfile** (e.g. `uv.lock`) records the exact resolved version of every package, so every install is byte-for-byte identical.

```bash
uv lock         # generate/update the lockfile
uv sync         # install exactly what's in the lockfile
```

Commit the lockfile to Git. Don't commit `venv/`.

## Which should you use?

| Situation | Use |
|---|---|
| Quick script, sharing with one other person | `requirements.txt` is fine |
| A real project with metadata, optional dependency groups | `pyproject.toml` |
| Need everyone to get identical exact versions | `pyproject.toml` + a lockfile (`uv.lock`) |

For new club projects, default to `pyproject.toml` + `uv` — it covers all three cases above without needing to migrate later.
