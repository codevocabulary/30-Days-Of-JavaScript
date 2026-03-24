# 📘 Day 07 — Scope & Hoisting

> **Level:** 🟡 Intermediate | **Estimated Time:** 1.5–2 hours

---

## 🎯 What You'll Learn

- Global, function, and block scope
- How the scope chain works
- Hoisting — what it is and how it affects `var`, `let`, `const`, and functions
- The Temporal Dead Zone (TDZ) for `let`/`const`
- Introduction to closures (deep dive on Day 24)

---

## 📖 Concepts Covered

### 1. Three Types of Scope

```js
let globalVar = "everywhere"; // Global scope

function myFunc() {
  let funcVar = "inside function"; // Function scope
  console.log(globalVar); // ✅ can see global
}
// console.log(funcVar); // ❌ ReferenceError

if (true) {
  let blockVar = "inside block"; // Block scope (let/const)
  var notBlock  = "leaks out!";  // var ignores block scope!
}
// console.log(blockVar); // ❌ ReferenceError
console.log(notBlock);    // ✅ "leaks out!" — var escapes blocks
```

---

### 2. Scope Chain

```js
let x = "global";

function outer() {
  let x = "outer"; // shadows global x
  function inner() {
    let x = "inner"; // shadows outer x
    console.log(x); // "inner" — closest scope wins
  }
  inner();
  console.log(x); // "outer"
}
console.log(x); // "global"
```

JS looks for variables from **innermost scope outward** until found or `ReferenceError`.

---

### 3. Hoisting

**`var` hoisting — declaration moves to top, value stays:**
```js
console.log(x); // undefined (NOT an error!)
var x = 5;
console.log(x); // 5
// Internally JS does: var x; console.log(x); x = 5;
```

**`let`/`const` hoisting — hoisted but NOT initialized (TDZ):**
```js
// console.log(y); // ❌ ReferenceError: Cannot access before initialization
let y = 5;
```

**Function declaration hoisting — entire body hoisted:**
```js
sayHello(); // ✅ Works! Function declarations are fully hoisted
function sayHello() { console.log("Hello!"); }

// sayHi(); // ❌ Cannot call before — it's an expression
const sayHi = () => console.log("Hi!");
```

---

### 4. Temporal Dead Zone (TDZ)

```js
function example() {
  // TDZ starts for 'myVar'
  console.log("before declaration");
  // console.log(myVar); // ❌ ReferenceError — in TDZ!
  let myVar = 10;        // TDZ ends here
  console.log(myVar);    // ✅ 10
}
```

---

### 5. The Famous Loop Bug

```js
// ❌ var in loops — all callbacks share the SAME variable
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // prints 3, 3, 3
}

// ✅ let creates a new binding per iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // prints 0, 1, 2
}
```

---

## 💡 Key Takeaways

- `var` is function-scoped and hoisted with `undefined`; avoid it
- `let`/`const` are block-scoped and in TDZ before declaration
- Function declarations are fully hoisted; function expressions are not
- Always use `let`/`const` to avoid hoisting surprises and the loop bug
- The scope chain explains why inner functions can access outer variables

---

## 📝 Exercises

1. Predict the output (without running) of the var hoisting example in `index.js`
2. Fix the loop bug — make it print `0, 1, 2, 3, 4` instead of `5, 5, 5, 5, 5`
3. Create a `makeIdGenerator()` using closure that returns unique IDs: 1, 2, 3...

---

## ⏭️ Next Up

**[Day 08 — Arrow Functions →](../Day-08-Arrow-Functions/)**
