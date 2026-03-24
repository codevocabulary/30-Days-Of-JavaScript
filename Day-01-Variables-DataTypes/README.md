# 📘 Day 01 — Variables & Data Types

> **Level:** 🟢 Beginner | **Estimated Time:** 1–2 hours

---

## 🎯 What You'll Learn

- The difference between `var`, `let`, and `const`
- All 8 JavaScript data types (7 primitive + 1 object)
- How to use `typeof` to inspect types
- Implicit vs explicit type conversion
- Truthy and falsy values
- Variable naming rules and conventions

---

## 📖 Concepts Covered

### 1. Declaring Variables

JavaScript has three ways to declare a variable:

```js
var  oldWay  = "avoid this";   // function-scoped, hoisted
let  mutable = "can change";   // block-scoped ✅
const fixed  = "cannot change"; // block-scoped, read-only ✅
```

> 🔑 **Rule of thumb:** Always use `const` by default. Switch to `let` only when you need to reassign. Never use `var`.

---

### 2. The 8 Data Types

| Type | Example | Notes |
|------|---------|-------|
| `string` | `"hello"` | Text, always in quotes |
| `number` | `42`, `3.14` | Integers AND decimals |
| `bigint` | `9007199254740991n` | Very large integers |
| `boolean` | `true`, `false` | Logic values only |
| `undefined` | `let x;` | Declared but not assigned |
| `null` | `let x = null;` | Intentional absence of value |
| `symbol` | `Symbol("id")` | Unique identifier |
| `object` | `{}`, `[]`, functions | Everything else |

---

### 3. `typeof` Operator

```js
typeof "hello"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object"  ← famous JS bug!
typeof {}         // "object"
typeof []         // "object"
typeof function(){} // "function"
```

---

### 4. Type Conversion

**Implicit (automatic):**
```js
"5" + 3    // "53" — number coerced to string
"5" - 3    // 2    — string coerced to number
true + 1   // 2    — boolean coerced to number
```

**Explicit (manual):**
```js
Number("42")      // 42
String(100)       // "100"
Boolean(0)        // false
Boolean("hello")  // true
parseInt("42px")  // 42
parseFloat("3.14") // 3.14
```

---

### 5. Truthy & Falsy

**Falsy values** (become `false` in boolean context):
```js
false, 0, "", '', ``, null, undefined, NaN
```

**Everything else is truthy**, including:
```js
"0", "false", [], {}, -1, Infinity
```

---

## 💡 Key Takeaways

- Use `const` unless reassignment is needed → use `let`
- `null` and `undefined` both mean "no value" but differ: `undefined` is automatic, `null` is intentional
- `typeof null === "object"` is a historical bug in JavaScript — always use `=== null` to check for null
- Type coercion is automatic but can cause bugs — be explicit when converting types

---

## 📝 Exercises

Open `index.js` and complete the exercises at the bottom of the file.

1. Declare a `const` for your name and a `let` for your age
2. Find the `typeof` of: `"hello"`, `42`, `true`, `null`, `undefined`, `{}`, `[]`
3. Predict and verify: `"10" + 5`, `"10" - 5`
4. Convert the string `"3.99"` to a number and add `1`
5. Which of these are truthy/falsy: `0`, `"0"`, `""`, `" "`, `[]`, `null`, `-1`, `NaN`

---


## ⏭️ Next Up

**[Day 02 — Operators →](../Day-02-Operators/)**
