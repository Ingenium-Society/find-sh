---
title: "API Keys and Secrets"
category: "Concepts"
difficulty: "intermediate"
updatedAt: "2026-09-08"
---

# API Keys and Secrets

This matters more than it might seem: **this project's repo is public on GitHub.** Anything committed to it — including old commits — is visible to anyone, forever, even if you delete the line later. A leaked API key in a public repo will typically get found and abused within minutes by automated scanners, not eventually.

## The rule

Never write a real API key, password, or token directly into a `.py`, `.js`, or `.ts` file that gets committed. Always load secrets from somewhere outside the code itself.

## Using environment variables

Store the key as an environment variable instead of hardcoding it — see "Environment Variables and PATH" in the Command Line Basics section for the underlying concept.

**Python:**
```python
import os
API_KEY = os.environ["WEATHER_API_KEY"]
```

**JavaScript/Node:**
```javascript
const API_KEY = process.env.WEATHER_API_KEY;
```

## Using a `.env` file for local development

Typing `export` every time you open a terminal is tedious. A `.env` file holds these locally:

```
WEATHER_API_KEY=abc123yourrealkey
```

**Python** — install `python-dotenv`:
```bash
pip install python-dotenv
```
```python
from dotenv import load_dotenv
import os

load_dotenv()  # reads .env into the environment
API_KEY = os.environ["WEATHER_API_KEY"]
```

**Node.js** — modern versions support this natively:
```bash
node --env-file=.env index.js
```
Or with a framework like Next.js, `.env.local` is picked up automatically — no extra code needed.

## The single most important step: `.gitignore`

`.env` must never be committed. Add it to `.gitignore` **before** you ever create the file:

```
.env
.env.local
```

If you already accidentally committed a real key: **treat the key as compromised.** Deleting the line in a new commit is not enough — old commits still contain it in the repo's history. Go to wherever the API key was issued and regenerate/revoke it immediately, then remove it going forward.

## Sharing what teammates need without sharing the actual secret

Commit a `.env.example` file with the variable names but placeholder values, so others know what to set up themselves:

```
WEATHER_API_KEY=your_key_here
```
This file is safe to commit — it contains no real secrets, just documentation of what's expected.

## Quick reference

| Do | Don't |
|---|---|
| Load keys via `os.environ` / `process.env` | Paste the real key directly into a `.py`/`.js` file |
| Add `.env` to `.gitignore` immediately | Commit `.env` "just this once" |
| Commit a `.env.example` with placeholders | Assume deleting a line removes it from Git history |
| Regenerate a key if it's ever exposed | Just remove the exposed key and hope no one saw it |
