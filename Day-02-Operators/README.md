# 📘 Day 02 — Operators

> **Level:** 🟢 Beginner | **Estimated Time:** 1–2 hours

---

## 🎯 What You'll Learn

- Arithmetic, assignment, comparison, and logical operators
- The difference between `==` (loose) and `===` (strict) equality
- Nullish coalescing `??` and optional chaining `?.`
- The ternary operator for compact conditionals
- Operator precedence and short-circuit evaluation

---

## 📖 Concepts Covered

### 1. Arithmetic Operators

```js
10 + 3   // 13 — addition
10 - 3   // 7  — subtraction
10 * 3   // 30 — multiplication
10 / 3   // 3.333... — division
10 % 3   // 1  — modulus (remainder)
10 ** 3  // 1000 — exponentiation
x++      // post-increment (use then add 1)
++x      // pre-increment (add 1 then use)
```

---

### 2. Assignment Operators

```js
x += 5   // x = x + 5
x -= 3   // x = x - 3
x *= 2   // x = x * 2
x /= 4   // x = x / 4
x %= 3   // x = x % 3
x **= 2  // x = x ** 2
x ??= 10 // assign only if x is null/undefined (ES2021)
```

---

### 3. Comparison Operators

```js
5 == "5"    // true  — loose (ignores type) ⚠️
5 === "5"   // false — strict (checks type) ✅
5 != "5"    // false — loose inequality
5 !== "5"   // true  — strict inequality ✅
10 > 5      // true
10 >= 10    // true
```

> 🔑 **Always prefer `===` over `==`** to avoid unexpected type coercion bugs.

---

### 4. Logical Operators

```js
true && false  // false — AND (both must be true)
true || false  // true  — OR  (at least one must be true)
!true          // false — NOT (flips the value)
```

**Short-circuit evaluation:**
```js
user && user.name   // safe: only accesses .name if user is truthy
name || "Guest"     // fallback: uses "Guest" if name is falsy
```

---

### 5. Nullish Coalescing (`??`)

Only falls back if the left side is `null` or `undefined` (not for `0`, `""`, `false`):

```js
null ?? "default"      // "default"
undefined ?? "default" // "default"
0 ?? "default"         // 0      ← different from ||
"" ?? "default"        // ""     ← different from ||
false ?? "default"     // false  ← different from ||
```

---

### 6. Optional Chaining (`?.`)

Safely access nested properties without `TypeError`:

```js
const user = { profile: null };

user.profile.avatar      // ❌ TypeError: Cannot read property of null
user?.profile?.avatar    // ✅ undefined (no crash)
user?.getName?.()        // ✅ undefined if getName doesn't exist
```

---

### 7. Ternary Operator

```js
condition ? valueIfTrue : valueIfFalse

const age = 20;
const status = age >= 18 ? "adult" : "minor"; // "adult"
```

---

### 8. Operator Precedence

Higher precedence runs first (like in math):
```js
2 + 3 * 4    // 14 — * runs before +
(2 + 3) * 4  // 20 — parentheses override
```

---

## 💡 Key Takeaways

- Always use `===` / `!==` instead of `==` / `!=`
- Use `??` for null/undefined fallbacks; use `||` for falsy fallbacks
- `?.` prevents crashes when accessing nested properties
- Short-circuit evaluation: `&&` stops at first falsy, `||` stops at first truthy

---

## 📝 Exercises

Open `index.js` and complete the exercises at the bottom.

1. What is `17 % 5`? Use modulus to check if a number is even or odd
2. Predict: `"5" + 5`, `"5" - 5`, `true + true + true`
3. Write a ternary that classifies a number as positive, negative, or zero
4. Explain the difference between `null ?? "fallback"` and `null || "fallback"`
5. Safely access `data.user.profile.avatar` using optional chaining

---



## ⏭️ Next Up

**[Day 03 — Strings →](../Day-03-Strings/)**
