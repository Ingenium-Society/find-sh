---
title: "HTML & CSS Essentials for Frontend"
category: "Frontend"
difficulty: "beginner"
updatedAt: "2026-09-07"
---

# HTML & CSS Essentials for Frontend Development

Frontend development starts with structuring content in **HTML** and styling it with **CSS**.

## 1. Semantic HTML Structure

HTML provides the skeletal structure of a web page. Semantic tags give meaning to your layout:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ingenium Frontend</title>
</head>
<body>
  <header>
    <nav>
      <a href="#home">Home</a>
      <a href="#tutorials">Tutorials</a>
    </nav>
  </header>

  <main>
    <section>
      <h1>Welcome to Ingenium Club</h1>
      <p>Practical frontend development for student engineers.</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Ingenium Society</p>
  </footer>
</body>
</html>
```

## 2. Modern CSS & Tailwind Styling

CSS controls the visual presentation. Modern web apps (like this tutorial site) frequently use **Tailwind CSS** utility classes for rapid, responsive design:

```html
<!-- Example using Tailwind CSS utility classes -->
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
  <h2 class="text-xl font-bold text-slate-900">Frontend Component</h2>
  <p class="mt-2 text-slate-600">Styled effortlessly with utility classes.</p>
</div>
```
