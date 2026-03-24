# 📘 Day 27 — Map & Set

> **Level:** 🔴 Expert | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.js` for full coverage of:
Set for unique values, Set operations (union/intersection), Map vs Object, word frequency, LRU cache, graph

---

## 📖 Quick Reference

Open `index.js` — every section is clearly marked with numbered headings and inline comments explaining each concept as you go.

### Set — Unique Values

```js
const set = new Set([1, 2, 2, 3, 3]); // {1, 2, 3}
set.add(4);
set.has(2);     // true
set.delete(1);
set.size;       // 3

// Remove duplicates from array
const unique = [...new Set([1,1,2,2,3])]; // [1,2,3]

// Set operations
const A = new Set([1,2,3,4]);
const B = new Set([3,4,5,6]);
const union        = new Set([...A, ...B]);                    // {1,2,3,4,5,6}
const intersection = new Set([...A].filter(x => B.has(x)));   // {3,4}
const difference   = new Set([...A].filter(x => !B.has(x)));  // {1,2}
```

### Map — Any Key Type

```js
const map = new Map();
map.set("key", "value");
map.set(42, "number key");
map.set(obj, "object key!");  // ← objects can be keys!
map.get("key");   // "value"
map.has(42);      // true
map.size;         // 3

// Init from entries
const m = new Map([["a",1], ["b",2]]);
[...m.keys()]    // ["a","b"]
[...m.values()]  // [1,2]
[...m.entries()] // [["a",1],["b",2]]
for (const [k,v] of m) console.log(k, v);
```

---

## 💡 Key Takeaways

- `Set` guarantees uniqueness — great for deduplication and membership tests
- `Map` supports any key type — unlike plain objects that coerce keys to strings
- Both preserve insertion order and have O(1) lookups
- Use `Map` over objects when keys are dynamic, non-string, or frequently added/removed
- `Map.size` is direct; `Object.keys(obj).length` requires creating a temporary array

---

## 📝 Exercises

1. Implement an LRU (Least Recently Used) cache using `Map`
2. Find the first non-repeating character in a string using `Map`
3. Group anagrams: `["eat","tea","tan","ate","nat","bat"]` → grouped arrays
4. Two Sum: find indices of two numbers that add to target — use `Map` for O(n)

---

## ⏭️ Next Up

**[Day 28 — WeakMap & WeakSet →](../Day-28-WeakMap-WeakSet/)**
