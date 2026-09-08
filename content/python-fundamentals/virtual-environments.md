---
title: "Virtual Environments"
category: "Languages"
difficulty: "beginner"
updatedAt: "2026-09-07"
order: 3
---

# Virtual Environments

A **virtual environment** isolates your Python project's dependencies from your global system Python installation. This prevents package version clashes between different projects.

## Creating a Virtual Environment

### macOS / Linux (Unix-like OS)
Open your terminal in your project directory and run:

```bash
python3 -m venv venv
```

### Windows (PowerShell / Command Prompt)
```powershell
python -m venv venv
```

---

## Activating the Virtual Environment

Before installing packages or running your code within the project, you must activate the environment:

### macOS / Linux (`bash` / `zsh`)
```bash
source venv/bin/activate
```

### Windows (`Command Prompt`)
```cmd
venv\Scripts\activate.bat
```

### Windows (`PowerShell`)
```powershell
venv\Scripts\Activate.ps1
```

Once activated, your terminal prompt will typically show `(venv)` prefixing your path, and running `python` or `pip`/`uv` will use the isolated project environment.

To deactivate and exit the virtual environment, simply run:
```bash
deactivate
```
