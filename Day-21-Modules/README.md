# 📘 Day 21 — ES Modules

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.js` for full coverage of:
Named/default exports, import syntax, barrel files, dynamic import(), CommonJS vs ESM

---

## 📖 Quick Reference

Open `index.js` — every section is clearly marked with numbered headings and inline comments explaining each concept as you go.

### Export Syntax

```js
export const PI = 3.14;               // named export
export function add(a, b) { ... }     // named function export
export default class Calculator { }   // default export (one per file)
export { PI, add };                   // export list at bottom
export { add as sum } from "./math.js"; // re-export with rename
```

### Import Syntax

```js
import { add, PI } from "./math.js";          // named imports
import { multiply as times } from "./math.js"; // rename on import
import * as MathUtils from "./math.js";        // namespace import
import Calculator from "./calculator.js";      // default import
import Calculator, { add } from "./calc.js";   // default + named

const module = await import("./lazy.js");      // dynamic import
```

### Barrel File Pattern

```js
// utils/index.js — re-export everything from the folder
export { add, subtract } from "./math.js";
export { formatDate, formatCurrency } from "./helpers.js";
export { default as Calculator } from "./calculator.js";

// Consumer imports from one place:
import { add, formatDate, Calculator } from "./utils";
```

---

## 💡 Key Takeaways

- Named exports: as many as you want; default export: one per file
- Barrel files (`index.js`) create clean public APIs for folders
- Dynamic `import()` enables code-splitting and lazy loading
- ESM imports are **static** and analyzed at parse time — enables tree-shaking
- CommonJS (`require`) and ESM (`import`) can coexist in Node.js with `.cjs`/`.mjs`

---

## 📝 Exercises

1. Create a `utils/` folder with `math.js`, `strings.js`, and a barrel `index.js`
2. Create a state module with `getState`, `setState`, `subscribe` for change notifications
3. Lazy-load a heavy module only when a button is clicked using dynamic `import()`

---

## ⏭️ Next Up

**[Day 22 — LocalStorage & SessionStorage →](../Day-22-LocalStorage/)**
