---
title: "DOM Manipulation & Events"
category: "Frontend"
difficulty: "beginner"
updatedAt: "2026-09-07"
---

# DOM Manipulation & Event Handling

The **DOM (Document Object Model)** is the browser's programming interface for HTML documents. JavaScript allows you to dynamically update content and respond to user interactions.

## Selecting and Updating Elements

```typescript
// Select an element by ID or CSS selector
const button = document.querySelector("#submit-btn") as HTMLButtonElement;
const heading = document.querySelector("h1") as HTMLHeadingElement;

// Change text content dynamically
if (heading) {
  heading.textContent = "Interactive Frontend Updated!";
}
```

## Handling User Events

```typescript
// Listen for user clicks
button?.addEventListener("click", (event: MouseEvent) => {
  event.preventDefault();
  alert("Button clicked! Form submitted.");
});
```
