---
title: "What is an API Key?"
category: "Security"
difficulty: "beginner"
updatedAt: "2026-09-07"
---

# What is an API Key?

An **API Key** (Application Programming Interface Key) is a unique secret token used to authenticate a user, developer, or application calling an API (e.g., OpenAI, GitHub, Supabase).

## Why API Keys Matter

- **Authentication & Authorization** — identifies who is making the request and what permissions they have.
- **Rate Limiting & Billing** — tracks usage quotas to prevent abuse and manage API costs.

## Security Best Practices (Crucial!)

1. **Never hardcode API keys** in your source code or client-side JavaScript (`.js` / `.ts` files running in the browser).
2. **Use environment variables** (`.env` or `.env.local`) and add them to `.gitignore`.
3. **Revoke compromised keys immediately** if accidentally committed to public GitHub repositories.

```env
# Example .env.local file
OPENAI_API_KEY=sk-proj-abcdef1234567890
```
