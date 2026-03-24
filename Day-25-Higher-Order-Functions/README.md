# 📘 Day 25 — Higher-Order Functions

> **Level:** 🔴 Expert | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.js` for full coverage of:
Functions as arguments/return values, composition, pipe, curry, partial application, debounce, throttle, once

---

## 📖 Quick Reference

Open `index.js` — every section is clearly marked with numbered headings and inline comments explaining each concept as you go.

### Core HOF Concepts

```js
// 1. Functions as arguments
[1,2,3].map(x => x * 2);          // map takes fn
[1,2,3].filter(x => x > 1);       // filter takes fn
[1,2,3].reduce((a,b) => a+b, 0);  // reduce takes fn

// 2. Functions as return values — factory
const greaterThan = n => x => x > n;
const isAdult = greaterThan(17);
[14, 18, 25].filter(isAdult); // [18, 25]

// 3. pipe — compose left to right
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const slugify = pipe(
  s => s.trim(),
  s => s.toLowerCase(),
  s => s.replace(/\s+/g, "-")
);
slugify("  Hello World  "); // "hello-world"
```

### Essential HOF Utilities

```js
// Curry — f(a,b,c) → f(a)(b)(c)
const curry = fn => {
  return function curried(...args) {
    return args.length >= fn.length
      ? fn(...args)
      : (...more) => curried(...args, ...more);
  };
};

// Memoize
const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    return cache.has(key) ? cache.get(key) : cache.set(key, fn(...args)).get(key);
  };
};

// Debounce / Throttle / Once
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const once     = fn => { let done, res; return (...a) => done ? res : (done=true, res=fn(...a)); };
```

---

## 💡 Key Takeaways

- HOFs make code more reusable, composable, and declarative
- `pipe` and `compose` eliminate intermediary variables for transformations
- Currying enables partial application — specialize generic functions
- Debounce = "only fire after N ms of silence"; Throttle = "fire at most once per N ms"
- These patterns are fundamental to functional programming in JS

---

## 📝 Exercises

1. Implement `flatMap` using `reduce` + `flat`
2. Write `zipWith(fn, a, b)`: `zipWith(add, [1,2], [3,4])` → `[4,6]`
3. Write `groupBy(fn, arr)`: `groupBy(x=>x%2, [1,2,3,4])` → `{0:[2,4], 1:[1,3]}`

---

## ⏭️ Next Up

**[Day 26 — Iterators & Generators →](../Day-26-Iterators-Generators/)**
