---
title: "Async / Await & Fetch"
category: "Languages"
difficulty: "intermediate"
updatedAt: "2026-09-07"
---

# Asynchronous JavaScript: Async/Await & Fetch

Modern web apps constantly communicate with servers using HTTP requests. JavaScript handles this asynchronously using `Promises` and `async/await`.

## Making API Requests with `fetch`

```typescript
async function fetchUserData(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("GitHub User:", data.name);
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
}

fetchUserData("Ingenium-Society");
```
