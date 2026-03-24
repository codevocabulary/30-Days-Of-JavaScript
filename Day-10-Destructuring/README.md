# 📘 Day 10 — Destructuring

> **Level:** 🟡 Intermediate | **Estimated Time:** 1.5 hours

---

## 🎯 What You'll Learn

- Array destructuring — extract values by position
- Object destructuring — extract values by key name
- Renaming, default values, and nested destructuring
- Destructuring in function parameters
- Destructuring in loops

---

## 📖 Concepts Covered

### 1. Array Destructuring

```js
const [a, b, c] = [1, 2, 3];     // a=1, b=2, c=3
const [x, , z]  = [1, 2, 3];     // skip middle → x=1, z=3
const [p = 0, q = 0, r = 0] = [1, 2]; // default values → r=0
const [first, ...rest] = [1,2,3,4];   // rest → [2,3,4]

// Swap variables without temp variable!
let m = 1, n = 2;
[m, n] = [n, m];  // m=2, n=1
```

---

### 2. Object Destructuring

```js
const user = { name: "Alice", age: 30, city: "NY" };

const { name, age } = user;                    // basic
const { name: userName } = user;              // rename to userName
const { salary = 50000 } = user;              // default if missing
const { name: n, ...rest } = user;            // rest → {age:30, city:"NY"}

// Nested
const { address: { city, zip } } = user;      // nested object
```

---

### 3. Function Parameter Destructuring

```js
// Instead of: function f(config) { config.host }
function connect({ host = "localhost", port = 3000, ssl = false }) {
  return `${ssl?"https":"http"}://${host}:${port}`;
}
connect({ port: 8080, ssl: true }); // "https://localhost:8080"

// React-style:
function UserCard({ name, avatar = "/default.png", bio = "No bio" }) {
  return `${name}: ${bio}`;
}
```

---

### 4. In Loops

```js
const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];

for (const { id, name } of users) {
  console.log(`${id}: ${name}`);
}

for (const [key, value] of Object.entries({ a: 1, b: 2 })) {
  console.log(`${key} = ${value}`);
}
```

---

## 💡 Key Takeaways

- Destructuring is just a shortcut — `const { a } = obj` is `const a = obj.a`
- Array destructuring is position-based; object is name-based
- You can combine renaming and defaults: `{ name: label = "Unknown" }`
- Destructuring function parameters makes APIs self-documenting
- The variable swap trick `[a, b] = [b, a]` is idiomatic JS

---

## 📝 Exercises

1. Destructure nested `{ location: { address: { street } } }`
2. Write a `connect({ host, port, ssl })` function with defaults
3. Swap `arr[1]` and `arr[3]` in `[10, 20, 30, 40, 50]` using destructuring

---

## ⏭️ Next Up

**[Day 11 — Spread & Rest →](../Day-11-Spread-Rest/)**
