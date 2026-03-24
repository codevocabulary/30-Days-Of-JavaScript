# 📘 Day 19 — Fetch API & HTTP

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Making HTTP requests with the modern `fetch()` API
- Full CRUD: GET, POST, PUT, PATCH, DELETE
- Handling JSON responses and checking `response.ok`
- Query parameters with `URLSearchParams`
- File uploads with `FormData`
- Cancelling requests with `AbortController`
- Building a reusable `request()` wrapper

---

## 📖 Concepts Covered

### 1. Basic Fetch

```js
const res  = await fetch("https://api.example.com/users");
const data = await res.json();

// ⚠️ fetch only rejects on NETWORK errors — always check response.ok!
if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
```

---

### 2. Full CRUD

```js
// GET
const users = await fetch("/api/users").then(r => r.json());

// POST — create
const newUser = await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice", email: "alice@example.com" })
}).then(r => r.json());

// PUT — replace
await fetch(`/api/users/${id}`, { method: "PUT", body: ... });

// PATCH — partial update
await fetch(`/api/users/${id}`, { method: "PATCH", body: ... });

// DELETE
await fetch(`/api/users/${id}`, { method: "DELETE" });
```

---

### 3. Query Parameters

```js
const params = new URLSearchParams({ page: 1, limit: 10, search: "alice" });
const url = `/api/users?${params}`; // "/api/users?page=1&limit=10&search=alice"
const users = await fetch(url).then(r => r.json());
```

---

### 4. File Uploads

```js
const formData = new FormData();
formData.append("file", fileInput.files[0]);
formData.append("caption", "My photo");

await fetch("/upload", {
  method: "POST",
  body: formData  // DON'T set Content-Type — browser sets it with boundary
});
```

---

### 5. AbortController — Cancel Requests

```js
const controller = new AbortController();

// Cancel after 5 seconds
const timer = setTimeout(() => controller.abort(), 5000);

try {
  const res = await fetch("/api/data", { signal: controller.signal });
  clearTimeout(timer);
  return res.json();
} catch (err) {
  if (err.name === "AbortError") throw new Error("Request timed out");
  throw err;
}
```

---

### 6. Reusable Request Wrapper

```js
async function request(url, { method = "GET", body, headers = {} } = {}) {
  const config = {
    method,
    headers: { "Content-Type": "application/json", ...headers }
  };
  if (body) config.body = JSON.stringify(body);

  const res = await fetch(url, config);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Usage
const users = await request("/api/users");
const newUser = await request("/api/users", { method: "POST", body: data });
```

---

## 💡 Key Takeaways

- `fetch` doesn't throw on 4xx/5xx — always check `response.ok`
- Use `response.json()` for JSON, `.text()` for text, `.blob()` for files
- `FormData` handles file uploads automatically — don't set `Content-Type` manually
- `AbortController` is essential for timeout handling and cancelling stale requests
- A reusable wrapper prevents duplicating headers and error handling everywhere

---

## 📝 Exercises

1. Build paginated data fetching with `?_page=N&_limit=10`
2. Add request/response interceptors to the wrapper
3. Implement a 1-minute cache — don't re-fetch the same URL within 60 seconds
4. Create a `fetchWithRetry` that retries 3 times on network failure

---


## ⏭️ Next Up

**[Day 20 — Error Handling →](../Day-20-Error-Handling/)**
