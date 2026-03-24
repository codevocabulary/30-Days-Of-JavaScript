# 📘 Day 29 — Design Patterns

> **Level:** 🔴 Expert | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.js` for full coverage of:
Singleton, Observer/EventEmitter, Factory, Decorator, Strategy, Proxy, Builder

---

## 📖 Quick Reference

Open `index.js` — every section is clearly marked with numbered headings and inline comments explaining each concept as you go.

### Patterns Covered

| Pattern | Problem Solved | Real-World Use |
|---------|---------------|----------------|
| **Singleton** | Only one instance needed | Database connection, config |
| **Observer** | Notify subscribers of events | Event emitters, Redux store |
| **Factory** | Create objects by type string | UI components, DB models |
| **Decorator** | Add behavior without modifying | Logging, timing, caching |
| **Strategy** | Swap algorithms at runtime | Sorting, validation, auth |
| **Proxy** | Intercept property access | Validation, logging, reactivity |

```js
// Observer — most used pattern in JS
class EventEmitter {
  #events = {};
  on(ev, fn)  { (this.#events[ev] ??= []).push(fn); return () => this.off(ev,fn); }
  off(ev, fn) { this.#events[ev] = this.#events[ev]?.filter(f=>f!==fn); }
  emit(ev, ...args) { this.#events[ev]?.forEach(fn => fn(...args)); }
}

// Strategy — swap behaviors at runtime
const sorters = {
  byName:  (a,b) => a.name.localeCompare(b.name),
  byAge:   (a,b) => a.age - b.age,
  byScore: (a,b) => b.score - a.score  // descending
};
users.sort(sorters.byScore);
users.sort(sorters.byName);
```

---

## 💡 Key Takeaways

- Design patterns are **vocabulary** — they give names to proven solutions
- Don't over-engineer: only apply a pattern when it solves a real problem
- JavaScript's flexibility means many patterns (Singleton, Module) can be achieved with closures
- The Observer pattern is everywhere: DOM events, Node's EventEmitter, Vue/React reactivity
- The Proxy pattern is the foundation of Vue 3's reactivity system

---

## 📝 Exercises

1. Implement a Pub/Sub system with `subscribe`, `unsubscribe`, `publish`
2. Build an undo/redo text editor using the Command pattern
3. Implement the Builder pattern for constructing complex SQL-like queries
4. Create a Middleware pipeline (like Express.js) from scratch

---

## ⏭️ Next Up

**[Day 30 — Final Project →](../Day-30-Final-Project/)**
