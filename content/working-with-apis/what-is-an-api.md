---
title: "What is an API?"
category: "Concepts"
difficulty: "beginner"
updatedAt: "2026-09-08"
order: 1
---

# What is an API?

An **API** (Application Programming Interface) is a defined way for one program to ask another program for data or to trigger an action. On the web, this almost always means: your code (the **client**) sends a request over the internet to someone else's server, and gets a response back.

## The client/server request-response cycle

1. Your code sends a **request** to a URL, specifying what you want.
2. The **server** processes it — looks something up, saves something, runs some logic.
3. The server sends back a **response**, usually as JSON.

This is the same pattern whether you're calling a weather API, a payment API, or your own school's data — only the specifics change.

## HTTP methods — what kind of request

| Method | Meaning | Example |
|---|---|---|
| `GET` | Retrieve data | Fetch a list of upcoming events |
| `POST` | Create something new | Submit a new attendance record |
| `PUT` / `PATCH` | Update existing data | Edit a member's profile |
| `DELETE` | Remove data | Delete a cancelled event |

Most beginner projects only need `GET` and `POST`.

## JSON — the format almost everything speaks

APIs almost universally send data as **JSON** (JavaScript Object Notation) — plain text structured as nested key-value pairs:

```json
{
  "name": "World Engineering Day",
  "date": "2027-03-04",
  "attendees": 120
}
```
Every mainstream language — Python, JavaScript, and beyond — has built-in or trivial JSON parsing, which is exactly why it became the standard.

## Status codes — how you know what happened

The response includes a numeric **status code** telling you the outcome:

| Code range | Meaning |
|---|---|
| `200–299` | Success |
| `300–399` | Redirect |
| `400–499` | Client error (you asked wrong — bad request, not found, unauthorized) |
| `500–599` | Server error (something broke on their end) |

Checking the status code before trusting the response body is a habit worth building early — a failed request often still returns *something*, just not what you expected.

## Authentication

Many APIs require proof of who's asking, usually an **API key** — a secret string included with your request. See "API Keys and Secrets" in this section for how to handle these safely, especially in a public GitHub repo like this project's.

## Where to go next

This page covers the concept; the language-specific tutorials in this section ("Calling APIs in Python" and "Calling APIs in JavaScript") show the actual code for making these requests.
