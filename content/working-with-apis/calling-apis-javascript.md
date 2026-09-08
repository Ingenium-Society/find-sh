---
title: "Calling APIs in JavaScript"
category: "Languages"
difficulty: "intermediate"
updatedAt: "2026-09-08"
order: 5
---

# Calling APIs in JavaScript

`fetch` is built into both browsers and modern Node.js — no library install needed for basic use.

## A basic GET request

```javascript
const response = await fetch("https://api.example.com/events");
const data = await response.json();
console.log(data);
```
Note the two `await`s: one to get the response object itself, a second because parsing the body as JSON is *also* asynchronous.

## `async`/`await` context

`await` only works inside a function marked `async`:

```javascript
async function getEvents() {
  const response = await fetch("https://api.example.com/events");
  const data = await response.json();
  return data;
}
```

## Sending query parameters

```javascript
const url = new URL("https://api.example.com/events");
url.searchParams.set("year", "2027");
url.searchParams.set("limit", "10");

const response = await fetch(url);
```

## Sending a POST request with a JSON body

```javascript
const response = await fetch("https://api.example.com/attendance", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ student_id: "12345", status: "present" })
});
```
Unlike Python's `requests`, `fetch` doesn't auto-set headers or serialize the body for you — both lines above are required.

## Adding authentication headers

```javascript
const response = await fetch("https://api.example.com/private-data", {
  headers: { "Authorization": "Bearer YOUR_API_KEY" }
});
```
See "API Keys and Secrets" in this section — never hardcode a real key directly in committed code.

## Checking for errors properly

A key gotcha: `fetch` does **not** throw an error on a 404 or 500 response — only on true network failure. You have to check `response.ok` yourself:

```javascript
async function getEvents() {
  try {
    const response = await fetch("https://api.example.com/events");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return null;
  }
}
```

## A complete small example

```javascript
async function getWeather(city) {
  const API_KEY = process.env.WEATHER_API_KEY; // loaded from environment, see API Keys tutorial

  try {
    const url = new URL("https://api.weatherapi.com/v1/current.json");
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("q", city);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();
    return data.current.temp_c;
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return null;
  }
}

const temp = await getWeather("Yogyakarta");
console.log(temp);
```

## Quick reference

| I want to... | Code |
|---|---|
| Simple GET | `await fetch(url)` |
| Parse response as JSON | `await response.json()` |
| Check for HTTP errors | `if (!response.ok) { ... }` |
| POST with JSON body | `fetch(url, { method: "POST", headers: {...}, body: JSON.stringify(data) })` |
| Add auth header | `fetch(url, { headers: { Authorization: "Bearer ..." } })` |
