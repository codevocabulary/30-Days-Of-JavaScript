# 📘 Day 09 — Array Methods (map, filter, reduce & more)

> **Level:** 🟡 Intermediate | **Estimated Time:** 2–2.5 hours

---

## 🎯 What You'll Learn

- `map()` — transform every element into a new array
- `filter()` — keep only elements that pass a test
- `reduce()` — combine all elements into a single value
- `forEach()` — run a function for each element (no return)
- `find()`, `findIndex()`, `some()`, `every()`
- Chaining array methods together
- `flatMap()`, `Array.from()`, and other utilities

---

## 📖 Concepts Covered

### 1. map() — Transform Elements

```js
// Returns a NEW array of the same length — never modifies original
const nums = [1, 2, 3, 4];
const doubled  = nums.map(n => n * 2);     // [2, 4, 6, 8]
const asString = nums.map(n => `#${n}`);   // ["#1","#2","#3","#4"]

// With objects
const names = users.map(u => u.name);      // extract one field
const cards = users.map(u => ({            // transform shape
  id: u.id,
  label: `${u.firstName} ${u.lastName}`
}));
```

---

### 2. filter() — Select Elements

```js
// Returns a NEW array — could be shorter (or empty)
const nums = [1, 2, 3, 4, 5, 6];
const evens     = nums.filter(n => n % 2 === 0);   // [2, 4, 6]
const bigOnes   = nums.filter(n => n > 3);          // [4, 5, 6]

const adults    = users.filter(u => u.age >= 18);
const inStock   = products.filter(p => p.available);
```

---

### 3. reduce() — Combine to Single Value

```js
// reduce(callback, initialValue)
// callback: (accumulator, currentValue, index, array) => newAccumulator

const nums = [1, 2, 3, 4, 5];
const sum  = nums.reduce((acc, n) => acc + n, 0);   // 15
const max  = nums.reduce((m, n) => n > m ? n : m);  // 5

// Build an object
const freq = ["a","b","a","c","b","a"].reduce((acc, ch) => {
  acc[ch] = (acc[ch] || 0) + 1;
  return acc;
}, {});
// { a: 3, b: 2, c: 1 }

// Group by a property
const grouped = items.reduce((groups, item) => {
  const key = item.category;
  if (!groups[key]) groups[key] = [];
  groups[key].push(item);
  return groups;
}, {});
```

---

### 4. forEach() — Side Effects Only

```js
// Like map but returns undefined — use for side effects
users.forEach((user, index) => {
  console.log(`${index}: ${user.name}`);
});

// ⚠️ Cannot use break or return to stop early
// ⚠️ Cannot be chained
```

---

### 5. Chaining Methods

```js
const result = products
  .filter(p => p.inStock)
  .filter(p => p.price < 500)
  .map(p => p.name)
  .sort();

// Each method returns a new array, so they chain cleanly
```

---

### 6. find() and findIndex()

```js
// find — returns the FIRST matching element (or undefined)
const admin = users.find(u => u.role === "admin");

// findIndex — returns INDEX of first match (-1 if not found)
const idx = users.findIndex(u => u.id === targetId);
```

---

### 7. some() and every()

```js
// some — true if AT LEAST ONE element passes
const hasAdmin   = users.some(u => u.role === "admin");

// every — true if ALL elements pass
const allAdults  = users.every(u => u.age >= 18);
```

---

### 8. flatMap()

```js
// map() + flat(1) in one step
const sentences = ["Hello World", "Foo Bar"];
const words = sentences.flatMap(s => s.split(" "));
// ["Hello", "World", "Foo", "Bar"]
```

---

## 💡 Key Takeaways

- `map`, `filter`, `reduce` are the trio every JS developer must master
- None of these methods mutate the original array — they return new ones
- `reduce` is the most powerful — it can implement `map` and `filter` too
- Chain multiple methods for readable data transformations
- Use `forEach` only for side effects (logging, DOM updates, etc.)

---

## 📝 Exercises

1. Get names of students who passed (score ≥ 60) from `[{name, score}]`
2. Implement your own `map()` function using `reduce`
3. Flatten `[[1,2],[3,4],[5,6]]` to `[1,2,3,4,5,6]` using `reduce`
4. Find the second largest number in an array (without sorting)
5. Group `["apple","ant","banana","bear","cherry","cat"]` by first letter

---


## ⏭️ Next Up

**[Day 10 — Destructuring →](../Day-10-Destructuring/)**
