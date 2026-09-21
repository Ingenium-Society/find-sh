---
title: "Terminal Basics"
category: "Terminal"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 2
---

# Terminal Basics

The terminal is a text interface for telling your computer to do things. You type a command, press Enter, and it either works or it tells you why it didn't.

That's the whole idea. Everything else is vocabulary.

## Why it matters for club work

- **Every tool you'll use assumes it.** Git, Python, Node, Docker, deployment platforms — they all expect you to be comfortable typing commands. A GUI exists for some of them and not for the rest.
- **It's the fastest way to repeat yourself.** A command you ran yesterday is one press of the up-arrow away. A series of clicks is not.
- **Errors are readable.** When something breaks in a GUI you get a spinning icon. In a terminal you get a message with a file, a line number, and a reason.
- **It's the same everywhere.** Your terminal knowledge works identically on macOS, Linux, and — mostly — Windows. Your knowledge of any specific GUI does not.

## What's in this section

- **[What is a Terminal?](/tutorials/terminal-basics/what-is-a-terminal)** — shell vs terminal, how to open it, reading the prompt
- **[Navigating the Filesystem](/tutorials/terminal-basics/navigating-the-filesystem)** — `pwd`, `ls`, `cd`, absolute vs relative paths
- **[Working with Files](/tutorials/terminal-basics/working-with-files)** — creating, copying, moving, and deleting things
- **[Commands, Flags, and Help](/tutorials/terminal-basics/commands-flags-and-help)** — how to read a command you've never seen before
- **[Pipes and Redirection](/tutorials/terminal-basics/pipes-and-redirection)** — chaining commands together
- **[Environment Variables and PATH](/tutorials/terminal-basics/environment-variables-and-path)** — the reason you keep seeing `command not found`

## How to use this section

Type every command. Do not read this like an article.

The terminal is a muscle-memory skill. Reading `cd ..` and thinking "yes, that goes up a folder" feels like learning, but it isn't — you'll freeze the first time you're in a real terminal with a real problem. Run each command, watch what changes, and deliberately break things in a scratch folder where breaking them is free.

## A note on Windows

macOS and Linux share the same commands throughout this section. Windows has two options:

- **PowerShell** — built in, uses different command names (`ls` works, but `cd` behaves differently in places, and there's no `~` expansion in older versions). Each page flags the differences.
- **WSL (Windows Subsystem for Linux)** — a real Linux environment inside Windows. If you're on Windows and want the same commands as everyone else in the club, install this. It's a one-time setup and it removes an entire category of "why doesn't my command work" problems.
