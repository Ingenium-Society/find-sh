---
title: "Productivity Habits"
category: "Tools"
difficulty: "beginner"
updatedAt: "2026-09-08"
---

# Productivity Habits

These are the small habits that separate "can technically use a terminal" from "fast at a terminal." All work in both bash/zsh and PowerShell unless noted.

## Tab completion

Start typing a command, file, or folder name and press `Tab`. The shell completes it — or, if multiple things match, pressing `Tab` twice shows the options. Use this constantly; it prevents typos and saves you from typing long paths out by hand.

```bash
cd content/py<Tab>   # completes to content/python-fundamentals/
```

## Searching your command history

Rather than pressing the up arrow repeatedly to find a command you ran earlier:

| bash / zsh | PowerShell |
|---|---|
| `Ctrl+R`, then type part of the command | `Ctrl+R` (PSReadLine, default in modern PowerShell) |

Keep pressing `Ctrl+R` to cycle through further matches.

## Running the last command again

| bash / zsh | PowerShell |
|---|---|
| `!!` | `↑` then Enter, or `r` in some configs |

## Jumping to the start/end of a line you're typing

Useful when you've typed a long command and need to fix something at the beginning:

| Action | bash / zsh | PowerShell |
|---|---|---|
| Start of line | `Ctrl+A` | `Home` |
| End of line | `Ctrl+E` | `End` |
| Clear the line | `Ctrl+U` | `Escape` |

## Aliases — shortcuts for commands you type often

**bash/zsh** — add to `~/.zshrc` or `~/.bashrc`:
```bash
alias gs="git status"
alias gp="git push"
```

**PowerShell** — add to your profile (`$PROFILE`):
```powershell
Set-Alias gs git    # PowerShell aliases work slightly differently — often easier as a function:
function gs { git status }
```

After editing either startup file, reload it (`source ~/.zshrc`) or just open a new terminal window for changes to take effect.

## Clearing the screen

| bash / zsh | PowerShell |
|---|---|
| `clear` or `Ctrl+L` | `cls` or `Ctrl+L` |

## Stopping a running command

`Ctrl+C` — works the same in both. Useful when a script is stuck in a loop or you started a dev server and want to shut it down.

## The one habit worth building above all others

Read error messages top to bottom before re-running anything. Terminal errors usually tell you exactly what went wrong and where — the instinct to immediately retry the same command rarely fixes the underlying issue.
