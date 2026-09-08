---
title: "Project Structure"
category: "Languages"
difficulty: "intermediate"
updatedAt: "2026-09-08"
order: 7
---

# Project Structure

A single `script.py` is fine for a quick task. The moment a project grows past that, an unstructured folder of files becomes hard to navigate and easy to break. Here's a layout that scales.

## A minimal real project

```
my-project/
├── src/
│   └── my_project/
│       ├── __init__.py
│       ├── main.py
│       └── utils.py
├── tests/
│   └── test_utils.py
├── venv/                  # virtual environment — never commit this
├── .gitignore
├── pyproject.toml         # or requirements.txt
└── README.md
```

## Why `src/`

Putting your actual package inside a `src/` folder (rather than directly in the project root) avoids a common bug: without it, Python can sometimes accidentally import your *uninstalled, half-finished* local files instead of the properly installed package, masking real import errors. The `src/` layout is now the generally recommended default for anything beyond a single script.

## What `__init__.py` does

An empty `__init__.py` file marks a folder as a **package** — it tells Python "this folder can be imported from." Since Python 3.3 it's technically optional for basic imports, but keep including it; it avoids subtle import ambiguity and is still the norm in real codebases.

## Where `main.py` goes and what it's for

`main.py` is conventionally your **entry point** — the file you actually run. Logic that could be reused (helper functions, classes) belongs in other files like `utils.py`, imported into `main.py`, rather than piling everything into one file.

```python
# src/my_project/utils.py
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

```python
# src/my_project/main.py
from my_project.utils import greet

def main():
    print(greet("Ingenium"))

if __name__ == "__main__":
    main()
```

(See the "Running Python Scripts" tutorial in this section for what that last `if` block is doing.)

## `.gitignore` — don't commit these

```
venv/
__pycache__/
*.pyc
.env
```

Virtual environments and cache files are machine-specific and huge — never commit them. `.env` (API keys/secrets) should never be committed either; see the API tutorials for more on that.

## When to actually bother with this structure

For a five-line script, don't — plain `script.py` is fine. Reach for this structure once a project has multiple files that import from each other, or once more than one person is working on it.
