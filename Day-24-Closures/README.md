# 📘 Day 24 — Closures

> **Level:** 🔴 Expert | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.js` for full coverage of:
What closures are, private state, function factories, memoization, the loop bug fix, module pattern

---

## 📖 Quick Reference

Open `index.js` — every section is clearly marked with numbered headings and inline comments explaining each concept as you go.

### What is a Closure?

A **closure** is a function that **remembers** variables from its outer scope even after the outer function has returned.

```js
function makeCounter() {
  let count = 0; // "closed over" — persists in memory

  return {
    increment() { count++; },
    decrement() { count--; },
    getCount()  { return count; }
  };
}

const counter = makeCounter();
counter.increment(); // count = 1
counter.increment(); // count = 2
counter.getCount();  // 2
// 'count' is private — can't access it directly!
```

### Common Patterns

```js
// 1. Function factory
const multiplier = factor => n => n * factor;
const double = multiplier(2); // "remembers" factor=2
double(5); // 10

// 2. Memoization
function memoize(fn) {
  const cache = {}; // persists across calls
  return (...args) => {
    const key = JSON.stringify(args);
    return cache[key] ??= fn(...args);
  };
}

// 3. Module pattern (IIFE + closure)
const TodoList = (() => {
  let todos = []; // private
  return {
    add: text => todos.push(text),
    getAll: () => [...todos]
  };
})();
```

---

## 💡 Key Takeaways

- Every function in JS forms a closure over its outer scope
- Closures enable **private state** without classes
- The classic loop bug: `var` shares one binding; `let` creates one per iteration
- Closures power: memoization, partial application, the module pattern, event handlers
- Memory note: closures keep outer variables alive — be mindful with large data

---

## 📝 Exercises

1. Create `makeLogger(prefix)` → `log("message")` prints `"[prefix] message"`
2. Write `once(fn)` — ensures `fn` only runs once; subsequent calls return cached result
3. Implement a rate limiter: only allow N calls per interval using closures

---

## ⏭️ Next Up

**[Day 25 — Higher-Order Functions →](../Day-25-Higher-Order-Functions/)**
