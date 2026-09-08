---
title: "Redirection and Pipes"
category: "Tools"
difficulty: "intermediate"
updatedAt: "2026-09-08"
order: 2
---

# Redirection and Pipes

Real terminal productivity comes from combining small commands rather than running them one at a time. Redirection and pipes are how you do that.

## Redirecting output to a file

| Action | bash / zsh | PowerShell |
|---|---|---|
| Write output to a file (overwrite) | `command > output.txt` | `command > output.txt` |
| Append output to a file | `command >> output.txt` | `command >> output.txt` |

```bash
python my_script.py > results.txt        # save script output instead of printing it
git log --oneline > history.txt
```

## Piping — sending one command's output into another

The pipe (`|`) takes the output of the command on the left and feeds it as input to the command on the right. Both shells use the same symbol:

```bash
# bash/zsh — find lines containing "error" in a log file
cat server.log | grep "error"

# PowerShell — same idea, filters objects instead of raw text
Get-Content server.log | Select-String "error"
```

Chain as many as you like:

```bash
# List files, filter to .py files, count them
ls | grep ".py" | wc -l
```

```powershell
# PowerShell equivalent
Get-ChildItem | Where-Object { $_.Name -like "*.py" } | Measure-Object | Select-Object -ExpandProperty Count
```

Note the difference in philosophy: bash pipes plain **text** between commands; PowerShell pipes **structured objects** (with properties), which is why its filtering syntax looks different even though the concept is identical.

## Chaining commands with `&&`

Run a second command only if the first one succeeds:

```bash
git add . && git commit -m "Update tutorial" && git push
```
```powershell
git add . ; if ($?) { git commit -m "Update tutorial" ; if ($?) { git push } }
# or, in PowerShell 7+:
git add . && git commit -m "Update tutorial" && git push
```
PowerShell 7+ supports `&&` directly, matching bash. Older Windows PowerShell (5.1, pre-installed on Windows) does not — worth checking your version if `&&` doesn't seem to work.

## Practical example: filtering command output

```bash
# Find all markdown files modified today, bash/zsh
find . -name "*.md" -newermt "today"
```
```powershell
# PowerShell equivalent
Get-ChildItem -Filter *.md -Recurse | Where-Object { $_.LastWriteTime.Date -eq (Get-Date).Date }
```

## Quick reference

| Symbol | Meaning |
|---|---|
| `>` | Redirect output to a file, overwriting it |
| `>>` | Redirect output to a file, appending |
| `\|` | Pipe: send output of one command into another |
| `&&` | Run the next command only if the previous one succeeded |
