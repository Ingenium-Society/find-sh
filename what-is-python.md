---
title: "What is Python?"
category: "Languages"
difficulty: "beginner"
updatedAt: "2026-09-07"
---

# What is Python?

Python is a general-purpose programming language known for readable syntax and a huge ecosystem of libraries. It's one of the easiest languages to start with because the code reads almost like plain English.

```python
name = "Ingenium"
print(f"Hello, {name}!")
```

## Why it matters for engineering projects

Python shows up constantly in practical club work:

- **Data processing** — parsing logs, cleaning CSV exports, or crunching numbers for a report is faster in Python than almost anything else.
- **Scripting and automation** — small scripts to rename files, scrape data, or batch-process results save huge amounts of manual work.
- **Automation** — quick scripts to rename files, scrape data, or batch-process images.
- **AI/ML** — nearly every machine learning library (PyTorch, TensorFlow, scikit-learn) is Python-first.

## Getting set up

1. Install Python from [python.org](https://www.python.org/downloads/) (check "Add to PATH" on Windows).
2. Verify it worked: open a terminal and run `python --version` (or `python3 --version` on macOS/Linux).
3. Write a file, e.g. `hello.py`, and run it with `python hello.py`.

## Core syntax you'll actually use

```python
# Variables — no type declaration needed
count = 5
label = "sensors"

# Conditionals
if count > 3:
    print("Above threshold")
else:
    print("Below threshold")

# Loops
for i in range(count):
    print(i)

# Functions
def add(a, b):
    return a + b

# Lists and dictionaries
sensors = ["temp", "humidity", "light"]
config = {"pin": 4, "interval_ms": 500}
```

## Installing libraries

Python's package manager is `pip`, bundled with Python itself:

```bash
pip install requests
```

For anything beyond a quick script, use a **virtual environment** so project dependencies don't collide with each other:

```bash
python -m venv venv
source venv/bin/activate      # macOS/Linux
venv\Scripts\activate         # Windows
pip install requests
```

## Where to go next

Once comfortable with the basics above, the most useful next steps for club projects are: reading/writing files, working with APIs (`requests` library), and — if working on hardware — looking into MicroPython for board-level scripting.
