---
title: "Calling APIs in Python"
category: "Languages"
difficulty: "intermediate"
updatedAt: "2026-09-08"
order: 4
---

# Calling APIs in Python

The `requests` library is the standard way to call APIs in Python. It isn't built in, so install it first:

```bash
pip install requests
```

## A basic GET request

```python
import requests

response = requests.get("https://api.example.com/events")

print(response.status_code)   # e.g. 200
data = response.json()        # parses the JSON response into a Python dict/list
print(data)
```

## Sending query parameters

```python
response = requests.get(
    "https://api.example.com/events",
    params={"year": 2027, "limit": 10}
)
# Automatically becomes: https://api.example.com/events?year=2027&limit=10
```

## Sending a POST request with a JSON body

```python
response = requests.post(
    "https://api.example.com/attendance",
    json={"student_id": "12345", "status": "present"}
)
```
Using `json=` (rather than manually building a string) automatically sets the right headers and serializes the dictionary for you.

## Adding authentication headers

Most APIs expect a key in the request headers:

```python
headers = {"Authorization": "Bearer YOUR_API_KEY"}
response = requests.get("https://api.example.com/private-data", headers=headers)
```
See "API Keys and Secrets" in this section for how `YOUR_API_KEY` should actually be stored — never hardcode it directly in a file that gets committed to Git.

## Checking for errors properly

Don't assume success — check before using the response:

```python
response = requests.get("https://api.example.com/events")

if response.status_code == 200:
    data = response.json()
else:
    print(f"Request failed: {response.status_code}")
```

Or, let `requests` raise an exception automatically on failure:

```python
try:
    response = requests.get("https://api.example.com/events")
    response.raise_for_status()   # raises an exception for 4xx/5xx responses
    data = response.json()
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")
```

## A complete small example

```python
import requests

API_KEY = "..."  # loaded from environment, not hardcoded — see API Keys tutorial

def get_weather(city: str) -> dict | None:
    try:
        response = requests.get(
            "https://api.weatherapi.com/v1/current.json",
            params={"key": API_KEY, "q": city}
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch weather: {e}")
        return None

result = get_weather("Yogyakarta")
if result:
    print(result["current"]["temp_c"])
```

## Quick reference

| I want to... | Code |
|---|---|
| Simple GET | `requests.get(url)` |
| GET with query params | `requests.get(url, params={...})` |
| POST with JSON body | `requests.post(url, json={...})` |
| Add auth header | `requests.get(url, headers={"Authorization": "Bearer ..."})` |
| Parse response as JSON | `response.json()` |
| Raise on error status | `response.raise_for_status()` |
