---
title: "Python Package Managers: uv & pip"
category: "Languages"
difficulty: "beginner"
updatedAt: "2026-09-07"
order: 4
---

# Python Package Managers: uv & pip

Managing dependencies in Python has evolved. While `pip` is the built-in standard package installer, **`uv`** (by Astral) is a lightning-fast Rust-based package manager that replaces `pip`, `pip-tools`, and `virtualenv` with 10–100x speed improvements.

---

## 1. Using `uv` (Recommended)

`uv` is extremely fast and drop-in compatible with `pip`.

### Installing `uv`
- **macOS / Linux:**
  ```bash
  curl -sSf https://astral.sh/uv/install.sh | sh
  ```
- **Windows (PowerShell):**
  ```powershell
  powershell -c "irm https://astral.sh/uv/install.sh | iex"
  ```
- Or via `pip`:
  ```bash
  pip install uv
  ```

### Creating an Environment and Installing Packages with `uv`
```bash
# Create virtual environment (.venv)
uv venv

# Activate it (Unix)
source .venv/bin/activate

# Activate it (Windows PowerShell)
.venv\Scripts\Activate.ps1

# Install packages lightning-fast
uv pip install requests numpy
```

---

## 2. Using Traditional `pip`

If you are using standard `pip`:

```bash
# Install a package
pip install requests

# Save installed packages to requirements.txt
pip freeze > requirements.txt

# Install from requirements.txt
pip install -r requirements.txt
```
