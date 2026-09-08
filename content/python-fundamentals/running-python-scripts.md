---
title: "Running Python Scripts"
category: "Languages"
difficulty: "beginner"
updatedAt: "2026-09-08"
---

# Running Python Scripts

There's more than one way to run Python code, and picking the right one avoids a lot of confusing errors.

## `python file.py` vs `python -m module`

```bash
# Runs the file directly by path
python src/my_project/main.py

# Runs a module by import name — Python resolves the path for you
python -m my_project.main
```

`-m` runs the file as part of your package, with imports resolved the same way they will be when your code is actually installed/used elsewhere. Plain `python file.py` runs it standalone, which can behave subtly differently with relative imports. When in doubt, especially inside a `src/`-structured project, prefer `-m`.

## The `if __name__ == "__main__":` pattern

Every Python file has a built-in variable called `__name__`. When a file is run directly, `__name__` is set to `"__main__"`. When that same file is *imported* by another file, `__name__` is set to the module's name instead.

```python
def greet(name):
    return f"Hello, {name}!"

if __name__ == "__main__":
    print(greet("Ingenium"))
```

Why this matters: if another file does `from this_file import greet`, you don't want the `print(...)` line to run automatically just because it got imported. Wrapping "code that should only run when this file is executed directly" in that `if` block is the standard way to prevent that.

## Reading command-line arguments

For scripts that take input from the terminal, use `argparse` (built into Python, no install needed):

```python
import argparse

parser = argparse.ArgumentParser(description="Greet someone")
parser.add_argument("name", help="Name to greet")
parser.add_argument("--loud", action="store_true", help="Shout the greeting")

args = parser.parse_args()

message = f"Hello, {args.name}!"
if args.loud:
    message = message.upper()

print(message)
```

```bash
python greet.py Ingenium
python greet.py Ingenium --loud
```

`argparse` also auto-generates a `--help` flag and error messages for free — always more robust than manually parsing `sys.argv`.

## Quick reference

| I want to... | Use |
|---|---|
| Run a standalone script | `python file.py` |
| Run a file as part of a package with correct imports | `python -m package.module` |
| Prevent code from running on import | `if __name__ == "__main__":` |
| Accept input from the command line | `argparse` |
