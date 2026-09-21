---
title: "Commands, Flags, and Help"
category: "Terminal"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 4
---

# Commands, Flags, and Help

Nobody memorises the terminal. Everyone looks things up. The skill isn't recall — it's knowing how to read a command and find out what it does.

## Anatomy of a command

```bash
git commit -m "add terminal section"
```

| Part | Name | Meaning |
|---|---|---|
| `git` | command | the program being run |
| `commit` | subcommand | what to do |
| `-m` | flag | an option, short form |
| `"add terminal section"` | argument | the input it operates on |

Once you can split a command into these four parts, unfamiliar commands stop being intimidating. You can look up just the piece you don't understand.

## Flags: short and long

Most flags come in two forms:

```bash
ls -a           # short form
ls --all        # long form — same thing
```

Short flags can be combined, which is why you see things like `ls -la`:

```bash
ls -l -a        # equivalent to
ls -la
```

Some flags take a value:

```bash
head -n 20 file.txt      # -n takes a number
```

**When to use which:** short forms are faster to type; long forms are self-documenting. In a script someone else will read, prefer long forms. Interactively, type whichever is shorter.

## Finding out what something does

This is the part worth actually learning.

**Before running an unfamiliar command**, ask it for help:

```bash
git --help
ls --help
```

`--help` works on nearly everything and prints a usage summary without doing anything. It's safe. Get in the habit of running it first.

For a full manual page:

```bash
man ls
```

Press `q` to quit. `man` is more detailed but paginated and slower to scan — `--help` is usually what you want.

**If `--help` prints nothing useful**, try `-h`:

```bash
python -h
```

**If you don't know the command name at all**, search for one:

```bash
man -k "copy files"
```

## Checking what you typed

Before pressing Enter on something destructive, check it with `echo`:

```bash
echo rm -r ./build/
```

```
rm -r ./build/
```

That prints the command instead of running it, so you can see exactly what would execute. It sounds trivial. It has saved people's work.

## Getting commands back

| Keys | Effect |
|---|---|
| Up arrow | previous command |
| `Ctrl + R` | search your history |
| `!!` | repeat the last command |
| `history` | print the whole history |

`Ctrl + R` is the one worth building a habit around. Start typing any part of a command you ran last week, and it finds it.

## Chaining commands

Run two commands in sequence:

```bash
mkdir build && cd build
```

`&&` means "and then, **only if the first one succeeded**." That's different from `;`, which runs the second regardless:

```bash
mkdir build ; cd build      # cd runs even if mkdir failed
```

`&&` is almost always what you want, because it stops before doing damage based on a failed assumption.

## Things that will trip you up

**Filenames are case-sensitive on macOS and Linux.** `Notes.txt` and `notes.txt` are different files. On Windows they're the same file, which means a project that works on your laptop can break on someone else's.

**Spaces split arguments.** Always quote paths containing spaces:

```bash
cd "My Projects"
```

**`sudo` is not a fix.** If a command fails with a permissions error, `sudo` will often make it "work" — by doing something as the system administrator that you probably shouldn't. Use it deliberately, not reflexively. If you find yourself reaching for it on an install, that's usually a sign your environment is set up wrong, and [Virtual Environments](/tutorials/virtual-environments) is the actual answer.

**A command that hangs isn't necessarily broken.** It may be waiting for input, or running something slow. `Ctrl + C` to escape.

## Quick reference

| I want to... | Do this |
|---|---|
| Read a command's help | `command --help` |
| Full manual | `man command` |
| Quit a manual page | `q` |
| Preview a command safely | `echo <the command>` |
| Search command history | `Ctrl + R` |
| Repeat the last command | `!!` |
| Chain only on success | `cmd1 && cmd2` |
| Chain unconditionally | `cmd1 ; cmd2` |
