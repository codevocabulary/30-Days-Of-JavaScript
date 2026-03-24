# 📘 Day 18 — Async / Await

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- `async`/`await` as syntactic sugar over Promises
- Writing async code that reads like synchronous code
- `try`/`catch`/`finally` for error handling
- Sequential vs parallel execution and why it matters
- `async` in loops, IIFE, and top-level `await`

---

## 📖 Concepts Covered

### 1. Basic Syntax

```js
// Promise chain version:
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(r => r.json());
}

// Async/await version — cleaner, same behavior:
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json(); // still returns a Promise!
}
```

`async` functions **always return a Promise**.
`await` pauses execution inside the function until the Promise settles.

---

### 2. Error Handling

```js
async function loadUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Failed:", error.message);
    return null; // or re-throw: throw error;
  } finally {
    console.log("Always runs");
  }
}
```

---

### 3. Sequential vs Parallel ⚡

```js
// ❌ Sequential — 3 seconds total (waits one by one)
async function slow() {
  const a = await fetchA(); // wait 1s
  const b = await fetchB(); // wait 1s
  const c = await fetchC(); // wait 1s
}

// ✅ Parallel — ~1 second total (all start at once)
async function fast() {
  const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);
}
```

> 🚀 Use `Promise.all()` whenever requests don't depend on each other.

---

### 4. Async in Loops

```js
const ids = [1, 2, 3, 4, 5];

// ❌ forEach + async doesn't wait properly
ids.forEach(async id => {
  const user = await fetchUser(id); // not actually awaited!
});

// ✅ for...of — sequential
for (const id of ids) {
  const user = await fetchUser(id);
}

// ✅ Promise.all + map — parallel
const users = await Promise.all(ids.map(id => fetchUser(id)));
```

---

### 5. Async IIFE

```js
// When you can't use top-level await (non-module scripts)
(async () => {
  const data = await fetchData();
  console.log(data);
})();
```

---

## 💡 Key Takeaways

- `async`/`await` is just a cleaner syntax for promises — they're equivalent
- `await` can only be used inside an `async` function (or top-level in modules)
- Multiple independent `await` calls in sequence is a performance anti-pattern — use `Promise.all()`
- `async` functions always return a `Promise` even if you return a plain value
- Error handling with `try/catch` is much cleaner than `.catch()` chains

---

## 📝 Exercises

1. Fetch and display 5 random users from `jsonplaceholder.typicode.com`
2. Add timeout: if fetch takes >2 seconds, reject with "Timeout"
3. Compare sequential vs parallel fetch time and log the difference
4. Write `withRetry(fn, maxRetries)` with exponential backoff

---


## ⏭️ Next Up

**[Day 19 — Fetch API & HTTP →](../Day-19-Fetch-API/)**
