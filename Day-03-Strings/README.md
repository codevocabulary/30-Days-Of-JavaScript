# 📘 Day 03 — Strings & String Methods

> **Level:** 🟢 Beginner | **Estimated Time:** 1.5–2 hours

---

## 🎯 What You'll Learn

- Three ways to create strings (single, double, backtick)
- Template literals with `${}` interpolation and multi-line support
- String indexing and the `.length` property
- The most important string methods: search, slice, replace, split, and more
- String comparison and sorting

---

## 📖 Concepts Covered

### 1. Creating Strings

```js
let single   = 'Hello';          // single quotes
let double   = "World";          // double quotes (same as single)
let backtick = `Template`;       // backtick — most powerful!

// Escape characters
let quote   = "He said \"Hi\"";  // \" inside double quotes
let newline = "Line1\nLine2";    // \n = new line
let tab     = "Col1\tCol2";      // \t = tab
```

---

### 2. Template Literals `` ` ` ``

```js
const name = "Alice";
const age  = 25;

// Interpolation — embed any expression with ${}
`My name is ${name} and I am ${age} years old.`
`2 + 2 = ${2 + 2}`
`UPPER: ${name.toUpperCase()}`

// Multi-line — backticks preserve line breaks
const html = `
  <div>
    <h1>${name}</h1>
  </div>
`;
```

---

### 3. String Properties & Indexing

```js
const str = "JavaScript";
str.length   // 10
str[0]       // "J"  — first character
str[4]       // "S"
str[str.length - 1]  // "t" — last character
// Strings are IMMUTABLE — you can't change individual characters
```

---

### 4. Key String Methods

| Method | What it does | Example |
|--------|-------------|---------|
| `.toUpperCase()` | Convert to uppercase | `"hi".toUpperCase()` → `"HI"` |
| `.toLowerCase()` | Convert to lowercase | `"HI".toLowerCase()` → `"hi"` |
| `.trim()` | Remove whitespace from both ends | `"  hi  ".trim()` → `"hi"` |
| `.includes(str)` | Check if contains substring | `"hello".includes("ell")` → `true` |
| `.startsWith(str)` | Check beginning | `"hello".startsWith("he")` → `true` |
| `.endsWith(str)` | Check ending | `"hello".endsWith("lo")` → `true` |
| `.indexOf(str)` | Find first position (-1 if missing) | `"hello".indexOf("l")` → `2` |
| `.slice(start, end)` | Extract substring | `"hello".slice(1, 3)` → `"el"` |
| `.replace(a, b)` | Replace first match | `"aabbcc".replace("b","x")` → `"axbcc"` |
| `.replaceAll(a, b)` | Replace all matches | `"aabbcc".replaceAll("b","x")` → `"aaxxcc"` |
| `.split(sep)` | String → array | `"a,b,c".split(",")` → `["a","b","c"]` |
| `.repeat(n)` | Repeat n times | `"ha".repeat(3)` → `"hahaha"` |
| `.padStart(n, char)` | Pad from left | `"5".padStart(3,"0")` → `"005"` |

---

### 5. slice() vs substring()

```js
const str = "JavaScript";

str.slice(0, 4)     // "Java"     — supports negative indices
str.slice(-6)       // "Script"   — last 6 characters
str.slice(4)        // "Script"   — from index 4 to end

str.substring(0, 4) // "Java"     — same but NO negative indices
```

---

### 6. split() and join()

```js
// String → Array
"Alice,Bob,Charlie".split(",")  // ["Alice", "Bob", "Charlie"]
"hello".split("")               // ["h","e","l","l","o"]

// Array → String
["Alice","Bob"].join(" | ")     // "Alice | Bob"
["Alice","Bob"].join("")        // "AliceBob"
```

---

## 💡 Key Takeaways

- Use template literals (backticks) for any string that includes variables or spans multiple lines
- Strings are **immutable** — methods return new strings, never modify the original
- `slice()` is more versatile than `substring()` because it supports negative indices
- `includes()` is the cleanest way to check if a string contains a substring
- Always use `split()` + `join()` to split then rebuild strings

---

## 📝 Exercises

Open `index.js` and complete the exercises at the bottom.

1. Extract first and last name from `"John Doe"` using `split()`
2. Check if a string contains only digits
3. Convert `"hello_world_foo"` → `"helloWorldFoo"` (snake_case to camelCase)
4. Count the vowels in a string
5. Reverse a string without using `.reverse()` directly on the string

---


## ⏭️ Next Up

**[Day 04 — Arrays →](../Day-04-Arrays/)**
