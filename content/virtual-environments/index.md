---
title: "Virtual Environments"
category: "Environments"
difficulty: "beginner"
updatedAt: "2026-09-21"
order: 3
---

# Virtual Environments

A virtual environment is a private set of dependencies that belongs to one project. Instead of installing packages into your computer, you install them into a folder inside the project.

That's it. The concept is genuinely that simple, and it solves a problem that will otherwise waste days of your life.

## The problem it solves

Suppose you install a library globally:

```bash
pip install requests==2.28.0
```

Project A works. Three weeks later, Project B needs a newer version:

```bash
pip install requests==2.32.0
```

Now Project A is broken. Its code assumed the older behaviour. You didn't touch Project A — but you broke it anyway, because both projects share one global set of packages.

Worse, the error is confusing. Nothing in Project A's code changed, so nothing in Project A's code looks wrong.

Scale that up. Two projects, ten packages, and a package that another package depends on. This is **dependency hell**, and it is the single most common reason a beginner's project stops working for no visible reason.

A virtual environment ends it by giving each project its own folder of packages. Project A gets `requests 2.28.0`, Project B gets `2.32.0`, and they never meet.

## What's in this section

- **[Why Isolation Matters](/tutorials/virtual-environments/why-isolation-matters)** — the failure modes, in detail, with the errors you'll actually see
- **[Python Virtual Environments](/tutorials/virtual-environments/python-virtual-environments)** — creating, activating, and using `venv`
- **[Managing Python Versions](/tutorials/virtual-environments/managing-python-versions)** — `python` vs `python3`, and why the system Python is off-limits
- **[Node and node_modules](/tutorials/virtual-environments/node-and-node-modules)** — how JavaScript does the same job differently

## The rule

**Never install project dependencies globally.**

Every project gets its own environment. If you find yourself running `pip install` without an active environment, stop — you're probably about to break something you already built.

There are two legitimate exceptions: tools you run *from* the terminal (`git`, `uv`, `ruff`) can be installed globally, because they aren't imported by your code. Anything your code does `import` needs to be in the project's environment.
