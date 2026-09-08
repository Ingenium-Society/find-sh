---
title: "Command Line Basics"
category: "Tools"
difficulty: "beginner"
updatedAt: "2026-09-08"
order: 2
---

# Command Line Basics

The terminal is a text-based way to control your computer — running programs, moving files, and automating tasks that would take much longer clicking through a GUI. Every tool covered elsewhere on this site (Git, Python, Node) is normally driven from one.

## Which shell are you actually using?

- **macOS / Linux** → almost always **bash** or **zsh** (zsh is the default on modern macOS). Commands in this section's tutorials work in either unless noted.
- **Windows** → **PowerShell** is the modern default (opens as "Windows PowerShell" or "Terminal"). Windows also has an older Command Prompt (`cmd.exe`) — skip it; PowerShell is more capable and is what these tutorials assume.

Everything in this section is written **side by side**: bash/zsh command next to its PowerShell equivalent, since you'll likely encounter both depending on your machine and what a teammate is using.

## Opening a terminal

- **macOS**: `Cmd+Space`, type "Terminal"
- **Windows**: search "PowerShell" in the Start menu, or open the integrated terminal in VS Code (`` Ctrl+` ``)
- **Linux**: varies by distro, usually `Ctrl+Alt+T`

## What's in this section

- **Navigating and Files** — moving around, creating/deleting files and folders
- **Redirection and Pipes** — sending output to files, chaining commands together
- **Environment Variables and PATH** — what `PATH` is and why "command not found" happens
- **Productivity Habits** — tab completion, history search, aliases

## One core habit worth building immediately

**Tab completion.** Start typing a file or folder name and press `Tab` — the shell completes it for you. Works in both bash/zsh and PowerShell. This alone eliminates most typos and saves enormous time.
