# 📘 Day 08 — Arrow Functions

> **Level:** 🟡 Intermediate | **Estimated Time:** 1.5 hours

---

## 🎯 What You'll Learn

- Arrow function syntax (all variations)
- The most important difference: lexical `this` binding
- When to use arrow functions vs regular functions
- Common pitfalls to avoid

---

## 📖 Concepts Covered

### 1. Syntax Variations

```js
// Full syntax
const add = (a, b) => { return a + b; };

// Implicit return (single expression — no braces, no return)
const add = (a, b) => a + b;

// Single parameter — parens optional
const double = n => n * 2;

// No parameters — empty parens required
const greet = () => "Hello!";

// Returning an object — wrap in parentheses!
const makeObj = (name, age) => ({ name, age }); // ✅
// const makeObj = (name) => { name }; // ❌ treated as function body!
```

---

### 2. Lexical `this` — The Key Difference

Regular functions define their own `this` based on *how they're called*.
Arrow functions inherit `this` from the surrounding scope at definition time.

```js
// ❌ Problem: regular function loses 'this' in callbacks
const obj = {
  name: "Timer",
  start: function() {
    setTimeout(function() {
      console.log(this.name); // undefined — 'this' is wrong!
    }, 100);
  }
};

// ✅ Solution: arrow function inherits 'this' from start()
const obj = {
  name: "Timer",
  start: function() {
    setTimeout(() => {
      console.log(this.name); // "Timer" ✅
    }, 100);
  }
};
```

---

### 3. When to Use Arrow Functions ✅

```js
// Array callbacks
[1,2,3].map(n => n * 2);
[1,2,3].filter(n => n > 1);
[1,2,3].reduce((acc, n) => acc + n, 0);

// Short utility functions
const isEven = n => n % 2 === 0;
const clamp  = (val, min, max) => Math.min(Math.max(val, min), max);

// Callbacks that need outer 'this' (class methods with setTimeout, etc.)
class Button {
  constructor() { this.count = 0; }
  init() {
    document.addEventListener("click", () => this.count++); // ✅
  }
}
```

---

### 4. When NOT to Use Arrow Functions ❌

```js
// ❌ Object methods — 'this' won't be the object
const obj = {
  value: 42,
  getValue: () => this.value  // undefined!
};

// ✅ Use regular method syntax
const obj = {
  value: 42,
  getValue() { return this.value; } // 42 ✅
};

// ❌ Constructors — arrow functions can't be used with 'new'
const Person = (name) => { this.name = name; };
new Person("Alice"); // TypeError!

// ❌ Functions needing 'arguments' object
const fn = () => arguments; // ReferenceError!
```

---

## 💡 Key Takeaways

- Arrow functions are NOT just syntactic sugar — they behave differently with `this`
- Use arrow functions for callbacks, utilities, and any function that needs outer `this`
- Never use arrow functions for object methods or constructors
- Returning an object literal requires wrapping it in `( )` to distinguish from function body

---

## 📝 Exercises

1. Convert these to arrow functions: `function square(x)`, `function greet(name)`, `function isPositive(n)`
2. What does the `obj2.getCount()` code in `index.js` log, and why?
3. Rewrite the `Timer` function constructor so `this.seconds` increments correctly

---


## ⏭️ Next Up

**[Day 09 — Array Methods →](../Day-09-Array-Methods/)**
