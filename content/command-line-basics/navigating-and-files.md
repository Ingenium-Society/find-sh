---
title: "Navigating and Files"
category: "Tools"
difficulty: "beginner"
updatedAt: "2026-09-08"
order: 1
---

# Navigating and Files

The same handful of operations — see where you are, move around, create/delete things — cover most of what you'll do in a terminal day to day.

## Where am I / what's here

| Action | bash / zsh | PowerShell |
|---|---|---|
| Print current directory | `pwd` | `pwd` (or `Get-Location`) |
| List files in current directory | `ls` | `ls` (or `Get-ChildItem`) |
| List with details (size, date) | `ls -la` | `ls -la` (or `Get-ChildItem -Force`) |

PowerShell actually aliases many Unix-style names (`ls`, `pwd`, `cd`) to its own longer cmdlets, so the short commands above work in both — good news for switching between them.

## Moving around

| Action | bash / zsh | PowerShell |
|---|---|---|
| Change directory | `cd path/to/folder` | `cd path\to\folder` |
| Go up one level | `cd ..` | `cd ..` |
| Go to home directory | `cd ~` | `cd ~` |
| Go to previous directory | `cd -` | `cd -` (PowerShell 7+) |

Note the slash direction difference — bash/zsh use `/`, native Windows paths use `\`. Modern PowerShell tolerates `/` in most cases, but scripts you find online written for Windows will usually use `\`.

## Creating things

| Action | bash / zsh | PowerShell |
|---|---|---|
| Create a folder | `mkdir new-folder` | `mkdir new-folder` (or `New-Item -ItemType Directory`) |
| Create an empty file | `touch file.txt` | `New-Item file.txt` |

## Copying, moving, renaming

| Action | bash / zsh | PowerShell |
|---|---|---|
| Copy a file | `cp source.txt dest.txt` | `cp source.txt dest.txt` (or `Copy-Item`) |
| Copy a folder recursively | `cp -r source-folder dest-folder` | `cp -r source-folder dest-folder` |
| Move / rename | `mv old.txt new.txt` | `mv old.txt new.txt` (or `Move-Item`) |

## Deleting — the dangerous one

| Action | bash / zsh | PowerShell |
|---|---|---|
| Delete a file | `rm file.txt` | `rm file.txt` (or `Remove-Item`) |
| Delete a folder and contents | `rm -rf folder-name` | `rm -r -force folder-name` |

⚠️ There is no Recycle Bin / Trash for terminal deletion. `rm -rf` and `Remove-Item -Force` permanently delete — double check the path before hitting enter, especially with wildcards.

## Viewing a file's contents quickly

| Action | bash / zsh | PowerShell |
|---|---|---|
| Print whole file | `cat file.txt` | `cat file.txt` (or `Get-Content`) |
| First 10 lines | `head file.txt` | `Get-Content file.txt -Head 10` |
| Last 10 lines | `tail file.txt` | `Get-Content file.txt -Tail 10` |
