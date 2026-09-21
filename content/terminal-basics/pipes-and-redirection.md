---
title: "Pipes and Redirection"
category: "Terminal"
difficulty: "intermediate"
updatedAt: "2026-09-21"
order: 5
---

# Pipes and Redirection

Every command has an input and an output. Pipes and redirection let you connect them, which is how you build things out of small tools instead of looking for one big tool.

## The two output streams

A command can print two different things, and they are separate:

| Stream | Number | Contains |
|---|---|---|
| **stdout** | `1` | the actual result |
| **stderr** | `2` | errors and warnings |

This matters more than it sounds. Normally both go to your screen, so they look like one stream. They aren't, and once you start saving output to files, the difference becomes visible:

```bash
python script.py > output.txt
```

Only stdout goes into `output.txt`. Errors still print to your screen — which is usually what you want, because a file full of nothing but an error message is worse than seeing the error.

To capture errors too:

```bash
python script.py > output.txt 2>&1
```

`2>&1` means "send stream 2 to wherever stream 1 is going." Read it as "errors, go where the output went."

## Redirecting to files

```bash
ls > files.txt              # write stdout to a file (overwrites)
ls >> files.txt             # append instead
ls 2> errors.txt            # write only errors
ls > out.txt 2> err.txt     # keep them separate
```

The `>` vs `>>` distinction is the same one from [Working with Files](/tutorials/terminal-basics/working-with-files): `>` destroys, `>>` appends.

## Reading from a file

```bash
sort < names.txt
```

This is `<` — feed a file in as input instead of typing it. In practice you rarely need it, because most commands accept a filename directly:

```bash
sort names.txt
```

## Pipes

The pipe `|` sends one command's stdout into another command's stdin. This is the idea that makes the terminal worth learning.

```bash
ls -la | grep ".md"
```

`ls -la` lists everything. `grep ".md"` filters it down to lines containing `.md`. You've just combined two simple tools into one that answers a question neither could answer alone.

Chain as many as you need:

```bash
cat server.log | grep "ERROR" | head -n 20
```

Read it left to right as a sentence: take the log, keep the error lines, show me the first twenty.

## The tools worth knowing

These five cover most of what you'll actually do:

```bash
grep "pattern" file.txt         # lines containing a pattern
grep -i "error" file.txt        # case-insensitive
grep -r "TODO" ./src            # search recursively through a folder
grep -v "DEBUG" file.txt        # lines NOT containing the pattern
```

```bash
sort file.txt                   # sort lines alphabetically
sort -n numbers.txt             # sort numerically (not as text)
uniq file.txt                   # collapse adjacent duplicate lines
sort file.txt | uniq -c         # count occurrences of each line
```

`uniq` only removes **adjacent** duplicates, which is why it's almost always paired with `sort` first.

```bash
wc -l file.txt                  # count lines
wc -w file.txt                  # count words
```

```bash
head -n 10 file.txt             # first 10 lines
tail -n 10 file.txt             # last 10 lines
tail -f server.log              # follow a file as it grows
```

## A realistic example

You have a log file and you want to know which errors are most common:

```bash
grep "ERROR" server.log | sort | uniq -c | sort -rn | head -n 5
```

Step by step:

| Step | What it does |
|---|---|
| `grep "ERROR" server.log` | keep only error lines |
| `sort` | group identical lines together |
| `uniq -c` | count each group |
| `sort -rn` | sort by count, highest first |
| `head -n 5` | show the top five |

That's five tools, none of which does anything impressive, producing an answer that would take real work in a spreadsheet.

## Quick reference

| I want to... | Command |
|---|---|
| Save output to a file | `cmd > file.txt` |
| Append output | `cmd >> file.txt` |
| Save output and errors | `cmd > file.txt 2>&1` |
| Feed one command into another | `cmd1 \| cmd2` |
| Filter lines | `grep "pattern"` |
| Filter out lines | `grep -v "pattern"` |
| Search a whole folder | `grep -r "pattern" ./src` |
| Count matching lines | `cmd \| wc -l` |
| Count duplicates | `sort \| uniq -c` |
| Watch a log live | `tail -f file.log` |
