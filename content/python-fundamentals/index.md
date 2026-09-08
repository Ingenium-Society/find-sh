---
title: "Python Fundamentals"
category: "Languages"
difficulty: "beginner"
updatedAt: "2026-09-08"
---

# Python Fundamentals

Python is a general-purpose programming language known for readable syntax and a huge ecosystem of libraries. It's one of the easiest languages to start with because the code reads almost like plain English.

```python
name = "Ingenium"
print(f"Hello, {name}!")
```

## Why it matters for club work

- **Data processing** — parsing logs, cleaning CSV exports, or crunching numbers for a report is faster in Python than almost anything else.
- **Scripting and automation** — small scripts to rename files, scrape data, or batch-process results save huge amounts of manual work.
- **AI/ML** — nearly every machine learning library (PyTorch, TensorFlow, scikit-learn) is Python-first.

## Getting set up

1. Install Python from [python.org](https://www.python.org/downloads/).
2. Verify: `python --version` (or `python3 --version`).
3. Write a file `hello.py` and run it: `python hello.py`.

## What's in this section

- **Syntax Basics** — variables, conditionals, loops, functions.
- **Environment Management** — why "just install it globally" causes problems later, virtual environments, and switching Python versions.
- **Project Structure** — how a real Python project is laid out once it's more than one file.
- **Running Python Scripts** — `python file.py` vs `python -m`, and the `if __name__ == "__main__":` pattern.
- **Dependency Files** — `requirements.txt`, `pyproject.toml`, and lockfiles.
- **Package Managers: uv & pip** — installing and managing libraries.
- **Virtual Environments** — isolating dependencies per project.
- **Working with Libraries** — using `pip`-installed packages in your code.
