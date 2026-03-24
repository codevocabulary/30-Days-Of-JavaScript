# 📘 Day 22 — LocalStorage & SessionStorage

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.js` for full coverage of:
setItem/getItem/removeItem, JSON serialization, expiring storage, cart persistence, storage events

---

## 📖 Quick Reference

Open `index.js` — every section is clearly marked with numbered headings and inline comments explaining each concept as you go.

### API Quick Reference

```js
// Store
localStorage.setItem("key", "value");      // strings only!
localStorage.setItem("obj", JSON.stringify(obj)); // serialize objects

// Read
localStorage.getItem("key");               // string or null
JSON.parse(localStorage.getItem("obj"));   // deserialize

// Delete
localStorage.removeItem("key");
localStorage.clear();                      // delete ALL

// Info
localStorage.length;
localStorage.key(index);                   // key at index

// sessionStorage — same API, but clears when tab closes
sessionStorage.setItem("draft", value);
```

### Storage vs sessionStorage

| Feature | localStorage | sessionStorage |
|---------|-------------|----------------|
| Lifetime | Forever | Tab session |
| Scope | Same origin | Same tab + origin |
| Capacity | ~5 MB | ~5 MB |
| Events | `storage` event in other tabs | No |

---

## 💡 Key Takeaways

- Only stores **strings** — always `JSON.stringify()` objects and `JSON.parse()` on read
- `localStorage` persists across sessions; `sessionStorage` clears on tab close
- The `storage` event fires in **other tabs** (not the one that made the change)
- Wrap in try/catch — storage can be blocked (private mode) or full
- Build a wrapper class to handle JSON, expiry, and errors in one place

---

## 📝 Exercises

1. Build a notes app that persists notes (add, edit, delete) to localStorage
2. Implement user preferences that load on startup and save on change
3. Build a "recently viewed" list keeping the last 10 unique items

---

## ⏭️ Next Up

**[Day 23 — Regular Expressions →](../Day-23-Regex/)**
