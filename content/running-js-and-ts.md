---
title: "Running JS & TS"
category: "Languages"
difficulty: "beginner"
updatedAt: "2026-09-08"
---

# Running JS & TS

JavaScript runs natively in Node.js. TypeScript is different — it isn't valid JavaScript on its own, so something has to turn it into JS first. Exactly how depends on your Node version.

## Running plain JavaScript

```bash
node index.js
```
Always works, no setup needed.

## Running package.json scripts

Real projects define reusable commands in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```
Run them with:
```bash
npm run dev
```
This is how you start this tutorial site's dev server locally.

## Running TypeScript — it depends on your Node version

Since Node.js version 22.18.0, "type stripping" is enabled by default, letting you run TypeScript files directly as long as the code only uses "erasable" TypeScript syntax — type annotations, interfaces, type aliases — nothing that needs actual code generation.

```bash
node index.ts
```

**What still won't run this way:** syntax that requires transformation, like `enum` and `namespace`, since those aren't purely type annotations — they generate real JavaScript behavior, not just information for the type checker.

**Version cheat sheet:**

| Node version | Behavior |
|---|---|
| Below 22.6 | No native TS support — use `tsx` or `ts-node` (below) |
| 22.6 – 22.17 | Works with `--experimental-strip-types` flag |
| 22.18+ / 23.6+ | Works with plain `node file.ts`, no flag needed, erasable syntax only |

Check your version with `node --version` before assuming either way.

**Important:** Node does not type-check your code when running it this way — it only strips the annotations. Run `tsc --noEmit` separately (or rely on your editor's TypeScript integration) to actually catch type errors.

## Older Node / need full TypeScript features (enums, decorators, etc.)

Use a runner that fully transpiles first:

```bash
npx tsx index.ts
```
`tsx` (unrelated to Next.js `.tsx` files, despite the name) is a fast, zero-config TypeScript runner that supports the full language, not just erasable syntax.

## Compiling TypeScript to JavaScript for deployment

For production, TypeScript is normally compiled ahead of time rather than run directly:

```bash
npx tsc          # reads tsconfig.json, outputs .js files
node dist/index.js
```

Frameworks like Next.js handle this compilation step for you automatically as part of `npm run build` — you never call `tsc` directly in a Next.js project.

## Quick reference

| I want to... | Command |
|---|---|
| Run a JS file | `node index.js` |
| Run a project script | `npm run <script-name>` |
| Run simple TS directly (modern Node) | `node index.ts` |
| Run any TS regardless of Node version/syntax | `npx tsx index.ts` |
| Compile TS to JS for deployment | `npx tsc` |
