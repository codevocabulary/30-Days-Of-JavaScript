# 📘 Day 28 — WeakMap & WeakSet

> **Level:** 🔴 Expert | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.js` for full coverage of:
Weak references, GC-friendly caches, private class data, circular reference detection, when to use

---

## 📖 Quick Reference

Open `index.js` — every section is clearly marked with numbered headings and inline comments explaining each concept as you go.

### WeakMap vs Map

| Feature | Map | WeakMap |
|---------|-----|---------|
| Key types | Any | Objects only |
| Iterable | ✅ | ❌ |
| `.size` | ✅ | ❌ |
| Prevents GC | ✅ | ❌ (weak reference) |
| Use case | General | Private data, caches |

```js
const _private = new WeakMap(); // private data store

class Person {
  constructor(name, ssn) {
    _private.set(this, { ssn }); // keyed by 'this' instance
    this.name = name;            // public
  }
  checkSSN(ssn) { return _private.get(this).ssn === ssn; }
}

// When person instance is GC'd, private data is too — no leak!
```

### WeakSet Use Cases

```js
const visited   = new WeakSet();  // track visited objects
const rendered  = new WeakSet();  // track rendered components
const processed = new WeakSet();  // prevent double-processing

function process(node) {
  if (visited.has(node)) return;  // already done
  visited.add(node);
  // ... process node
}
// When node is removed/GC'd, it's auto-cleaned from WeakSet
```

---

## 💡 Key Takeaways

- WeakMap/WeakSet hold **weak references** — they don't prevent garbage collection
- Perfect for associating data with objects **you don't own** (DOM nodes, 3rd party objects)
- Not iterable — you can't loop over them or check their size
- Use WeakMap for private class data when private `#fields` aren't available
- Use WeakSet for marking/tagging objects without memory leak risk

---

## 📝 Exercises

1. Use `WeakMap` to add private `#balance` and `#pin` to a `BankCard` class
2. Build a GC-friendly property cache using `WeakMap`
3. Use `WeakSet` to implement an object sealing system (prevent property addition)

---

## ⏭️ Next Up

**[Day 29 — Design Patterns →](../Day-29-Design-Patterns/)**
