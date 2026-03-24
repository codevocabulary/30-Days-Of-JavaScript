# 📘 Day 26 — Iterators & Generators

> **Level:** 🔴 Expert | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.js` for full coverage of:
Iterator protocol, Symbol.iterator, function* generators, yield, infinite sequences, async generators

---

## 📖 Quick Reference

Open `index.js` — every section is clearly marked with numbered headings and inline comments explaining each concept as you go.

### Iterator Protocol

```js
// An object is an iterator if it has next() returning {value, done}
const range = {
  [Symbol.iterator]() {           // makes it iterable
    let i = 1;
    return {
      next() {
        return i <= 5
          ? { value: i++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
};

for (const n of range) console.log(n); // 1 2 3 4 5
[...range]                             // [1,2,3,4,5]
const [a, b] = range;                  // destructuring works too!
```

### Generator Syntax

```js
function* gen() {
  yield 1;   // pause, return 1
  yield 2;   // pause, return 2
  yield 3;   // pause, return 3
}

const g = gen();
g.next(); // { value: 1, done: false }
g.next(); // { value: 2, done: false }
g.next(); // { value: 3, done: false }
g.next(); // { value: undefined, done: true }

// Infinite generator
function* naturals() {
  let n = 1;
  while (true) yield n++;
}
// Only computes values when asked!
```

---

## 💡 Key Takeaways

- Any object with `[Symbol.iterator]()` works with `for...of`, spread, destructuring
- Generators can be **infinite** — they only compute the next value when `next()` is called (lazy)
- `yield*` delegates to another iterable (great for recursive generators)
- Async generators (`async function*` + `for await...of`) handle streams of async data
- Generators enable lazy pipelines — process huge data without loading it all into memory

---

## 📝 Exercises

1. Create an iterable `LinkedList` class
2. Write a generator that yields prime numbers infinitely
3. Implement a lazy `range` with chainable `.map()`, `.filter()`, `.take()`

---

## ⏭️ Next Up

**[Day 27 — Map & Set →](../Day-27-Map-Set/)**
