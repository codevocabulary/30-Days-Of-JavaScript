# 📘 Day 17 — Promises

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Why promises exist (callback hell problem)
- Promise states: pending → fulfilled / rejected
- Creating promises with `new Promise()`
- Consuming with `.then()`, `.catch()`, `.finally()`
- `Promise.all`, `Promise.allSettled`, `Promise.race`, `Promise.any`

---

## 📖 Concepts Covered

### 1. The Problem: Callback Hell

```js
// ❌ Deeply nested callbacks — "Pyramid of Doom"
getUser(1, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      // ... more nesting
    });
  });
});
```

---

### 2. Creating a Promise

```js
const promise = new Promise((resolve, reject) => {
  // async work here
  if (success) resolve(value);   // → fulfilled
  else reject(new Error("oops")); // → rejected
});
```

**Three states:**
- `pending` — initial state, not yet settled
- `fulfilled` — resolved successfully with a value
- `rejected` — failed with a reason (Error)

---

### 3. Consuming with .then() / .catch()

```js
fetchUser(1)
  .then(user => {
    console.log(user.name);   // success
    return fetchPosts(user.id); // return new promise to chain!
  })
  .then(posts => console.log(posts.length))
  .catch(err => console.error(err.message)) // catches any error above
  .finally(() => console.log("done"));       // always runs
```

---

### 4. Promise Combinators

| Method | Behavior |
|--------|----------|
| `Promise.all([...])` | Waits for ALL. Rejects if ANY rejects. |
| `Promise.allSettled([...])` | Waits for ALL. Never rejects. Reports each status. |
| `Promise.race([...])` | Resolves/rejects with the FIRST settled. |
| `Promise.any([...])` | Resolves with FIRST fulfilled. Rejects only if ALL reject. |

```js
// Run in parallel — much faster than sequential!
const [user, posts, comments] = await Promise.all([
  fetchUser(1),
  fetchPosts(1),
  fetchComments(1)
]);
```

---

### 5. Timeout Pattern

```js
function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout!")), ms)
  );
}

Promise.race([fetchData(), timeout(5000)])
  .then(data => console.log(data))
  .catch(err => console.log(err.message)); // "Timeout!" if slow
```

---

## 💡 Key Takeaways

- A promise can only settle once — calling resolve/reject multiple times has no effect
- Always return the next promise in `.then()` to properly chain them
- `.catch()` handles rejection from ANY previous `.then()` in the chain
- Use `Promise.all()` for parallel operations; sequential is rarely needed
- Promises are the foundation of `async/await` (Day 18)

---

## 📝 Exercises

1. Create a `sleep(ms)` function that resolves after N milliseconds
2. Write a `retry(fn, times)` function that retries a failing promise
3. Implement `Promise.all` from scratch
4. Write a promisified version of `setTimeout`

---

## ⏭️ Next Up

**[Day 18 — Async / Await →](../Day-18-AsyncAwait/)**
