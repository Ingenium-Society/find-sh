---
title: "Working with Libraries"
category: "Languages"
difficulty: "beginner"
updatedAt: "2026-09-07"
---

# Working with Python Libraries

Python's package manager is `pip`, bundled with Python itself.

## Installing Packages

```bash
pip install requests
```

## Using Virtual Environments

For anything beyond a quick script, use a virtual environment so project dependencies don't collide:

```bash
python -m venv venv
source venv/bin/activate      # macOS/Linux
venv\Scripts\activate         # Windows
pip install requests
```
