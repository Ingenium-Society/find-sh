---
title: "Environment Variables and PATH"
category: "Tools"
difficulty: "intermediate"
updatedAt: "2026-09-08"
order: 3
---

# Environment Variables and PATH

"Command not found" is one of the most common terminal errors beginners hit, and it almost always comes down to `PATH`.

## What `PATH` is

`PATH` is an environment variable holding a list of folders. When you type a command like `python`, the shell searches every folder listed in `PATH`, in order, looking for a program with that name. If it's not found in any of them, you get "command not found" (bash/zsh) or "is not recognized" (PowerShell) — even if the program is genuinely installed somewhere on your machine, just not in a folder `PATH` knows about.

## Viewing your current PATH

| bash / zsh | PowerShell |
|---|---|
| `echo $PATH` | `$env:PATH` |

The output is a list of folders separated by `:` (bash/zsh) or `;` (PowerShell).

## Setting environment variables — this session only

| bash / zsh | PowerShell |
|---|---|
| `export API_KEY="abc123"` | `$env:API_KEY = "abc123"` |

Both of these only last until you close the terminal window. For anything a program needs every time, see the permanent options below.

## Reading an environment variable

| bash / zsh | PowerShell |
|---|---|
| `echo $API_KEY` | `echo $env:API_KEY` |

## Adding something to PATH temporarily

```bash
export PATH="$PATH:/new/folder/to/add"
```
```powershell
$env:PATH += ";C:\new\folder\to\add"
```

## Making a change permanent

- **macOS/Linux (bash/zsh)**: add the `export` line to your shell's startup file — `~/.zshrc` (zsh, macOS default) or `~/.bashrc` (bash). It runs automatically every time you open a terminal.
- **Windows (PowerShell)**: either add the `$env:` line to your PowerShell profile script (`$PROFILE`), or set it permanently through System Properties → Environment Variables, which applies system-wide rather than per-terminal.

## Why this comes up constantly with dev tools

Installers for Python, Node, or Git sometimes ask "add to PATH?" during setup — always say yes. If you skipped it, or installed something manually without an installer, that's almost always why the tool "isn't installed" as far as your terminal is concerned, even though the files exist on disk.

## Quick reference

| I want to... | bash/zsh | PowerShell |
|---|---|---|
| See current PATH | `echo $PATH` | `$env:PATH` |
| Set a variable (this session) | `export NAME=value` | `$env:NAME = "value"` |
| Read a variable | `echo $NAME` | `echo $env:NAME` |
| Fix "command not found" permanently | Edit `~/.zshrc` / `~/.bashrc` | Edit `$PROFILE` or System Environment Variables |
