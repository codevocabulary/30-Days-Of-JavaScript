# 📘 Day 06 — Functions

> **Level:** 🟢 Beginner | **Estimated Time:** 2–2.5 hours

---

## 🎯 What You'll Learn

- Function declarations vs expressions
- Parameters, arguments, and default parameters
- Rest parameters (`...args`) and the `arguments` object
- Return values and returning multiple values
- Immediately Invoked Function Expressions (IIFE)
- Functions as first-class citizens — passing and returning functions
- Recursive functions and pure vs impure functions

---

## 📖 Concepts Covered

### 1. Three Ways to Define Functions

```js
// 1. Declaration — hoisted, can call BEFORE definition
function greet(name) { return `Hello, ${name}!`; }

// 2. Expression — NOT hoisted, stored in variable
const greet2 = function(name) { return `Hello, ${name}!`; };

// 3. Arrow function — concise, no own 'this' (Day 08)
const greet3 = name => `Hello, ${name}!`;
```

---

### 2. Parameters & Default Values

```js
// Default parameters — used when argument is undefined
function greet(name = "stranger", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}
greet()              // "Hello, stranger!"
greet("Alice")       // "Hello, Alice!"
greet("Bob", "Hi")   // "Hi, Bob!"
```

---

### 3. Rest Parameters

```js
// Collect unlimited arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4, 5) // 15

// Mix regular params + rest (rest must be LAST)
function log(level, ...messages) {
  messages.forEach(msg => console.log(`[${level}] ${msg}`));
}
```

---

### 4. Return Values

```js
function minMax(arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr)
  };
}
const { min, max } = minMax([3, 1, 5, 2]);
```

---

### 5. IIFE — Immediately Invoked Function Expression

```js
// Runs immediately — creates private scope
(function() {
  const privateVar = "only here!";
  console.log(privateVar);
})();
// privateVar doesn't exist outside the IIFE

// Modern arrow IIFE
(() => console.log("Arrow IIFE"))();
```

---

### 6. Functions as First-Class Citizens

```js
// Store in variable (already know this)
const double = n => n * 2;

// Pass as argument (callback)
function applyOp(value, operation) {
  return operation(value);
}
applyOp(5, n => n * 3); // 15

// Return from function (factory pattern)
function multiplier(factor) {
  return n => n * factor; // closure — remembers factor
}
const times5 = multiplier(5);
times5(3);  // 15
times5(10); // 50
```

---

### 7. Recursive Functions

```js
// A function that calls itself — MUST have a base case!
function factorial(n) {
  if (n <= 1) return 1;         // base case — stops recursion
  return n * factorial(n - 1);  // recursive call
}
factorial(5) // 120 (5 × 4 × 3 × 2 × 1)
```

---

### 8. Pure vs Impure Functions

```js
// PURE — same input always gives same output, no side effects
function add(a, b) { return a + b; } // ✅

// IMPURE — changes or depends on external state
let total = 0;
function addToTotal(n) { total += n; } // ❌ side effect!
```

---

## 💡 Key Takeaways

- Prefer function declarations for main named functions (they're hoisted)
- Default parameters are much cleaner than `param = param || default`
- Use rest parameters (`...args`) instead of the old `arguments` object
- Functions are values — they can be stored, passed, and returned
- Recursive functions must have a base case or they'll loop infinitely
- Aim for pure functions — they're easier to test and understand

---

## 📝 Exercises

1. Write `isPrime(n)` that returns `true` if `n` is a prime number
2. Write `flatten(arr)` that flattens nested arrays using recursion
3. Write a `memoize(fn)` that caches function results
4. Write a `curry(fn)` that converts `f(a,b,c)` into `f(a)(b)(c)`
5. Write a `debounce(fn, ms)` that delays execution until N ms of inactivity

---

## ⏭️ Next Up

**[Day 07 — Scope & Hoisting →](../Day-07-Scope-Hoisting/)**
