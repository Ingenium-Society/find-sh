---
title: "Syntax & Types"
category: "Languages"
difficulty: "beginner"
updatedAt: "2026-09-07"
order: 2
---

# TypeScript & JavaScript Syntax & Types

TypeScript extends JavaScript by adding static types.

## Variables and Types

```typescript
// Explicit typing in TypeScript
const projectName: string = "Ingenium Club";
const activeSensors: number = 4;
const isOnline: boolean = true;

// Arrays and objects
const tags: string[] = ["ai", "robotics", "web"];

interface SensorConfig {
  pin: number;
  intervalMs: number;
}

const config: SensorConfig = {
  pin: 13,
  intervalMs: 1000,
};
```

## Functions

```typescript
function calculateRate(count: number, total: number): number {
  return (count / total) * 100;
}
```
