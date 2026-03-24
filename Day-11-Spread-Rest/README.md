# 📘 Day 11 — Spread & Rest Operators (...)

> **Level:** 🟡 Intermediate | **Estimated Time:** 1.5 hours

---

## 🎯 What You'll Learn

- The `...` syntax — what it means in different contexts
- Spread: expand arrays/objects into individual elements
- Rest: collect individual elements into an array/object
- Immutable update patterns (crucial for React/Redux)

---

## 📖 Concepts Covered

### 1. Spread with Arrays

```js
const a = [1, 2, 3], b = [4, 5, 6];

[...a, ...b]           // [1,2,3,4,5,6] — combine
[...a, 99, ...b]       // [1,2,3,99,4,5,6] — insert in middle
[...a]                 // shallow copy
Math.max(...a)         // pass as individual args: Math.max(1,2,3)
[..."hello"]           // ["h","e","l","l","o"]
```

---

### 2. Spread with Objects

```js
const defaults = { color:"blue", size:"M", weight:1 };
const custom   = { color:"red", size:"L" };

{ ...defaults, ...custom }          // merge, later wins
{ ...user, age: 26 }                // copy + update (immutable!)
const { role, ...withoutRole } = user; // remove a property
```

---

### 3. Rest in Functions

```js
function sum(...numbers) {        // all args → array
  return numbers.reduce((a,b) => a+b, 0);
}
sum(1, 2, 3, 4, 5); // 15

function log(level, ...msgs) {    // first arg + rest
  msgs.forEach(m => console.log(`[${level}] ${m}`));
}
```

---

### 4. Rest in Destructuring

```js
const [head, ...tail] = [1, 2, 3, 4];  // head=1, tail=[2,3,4]
const { name, ...rest } = user;         // name + everything else
```

---

### 5. Immutable Update Pattern

```js
// Update one field without mutating — crucial for React state!
const user = { name: "Alice", age: 25, role: "user" };
const updated = { ...user, age: 26, role: "admin" };

// Update item in array
const items = [{id:1, done:false}, {id:2, done:false}];
const toggled = items.map(item =>
  item.id === 1 ? { ...item, done: true } : item
);
```

---

## 💡 Key Takeaways

- Same `...` syntax, opposite meanings: **spread** expands, **rest** collects
- Spread creates **shallow copies** — nested objects still share references
- The immutable update pattern (`{...obj, key: newValue}`) is foundational in React
- Rest must always be the **last** parameter or destructuring element

---

## 📝 Exercises

1. Merge `defaultConfig` and `userConfig` so user values win
2. Write `mergeUnique(...arrays)` that merges and removes duplicates
3. Implement a simple `curry` function using rest/spread

---

## ⏭️ Next Up

**[Day 12 — DOM Manipulation Basics →](../Day-12-DOM-Basics/)**
