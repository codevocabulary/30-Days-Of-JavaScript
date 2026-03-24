# 📘 Day 23 — Regular Expressions (RegEx)

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

See `index.js` for full coverage of:
Literal & constructor syntax, flags (g,i,m), character classes, quantifiers, groups, lookahead, common validators

---

## 📖 Quick Reference

Open `index.js` — every section is clearly marked with numbered headings and inline comments explaining each concept as you go.

### Regex Quick Reference

```js
/pattern/flags          // literal syntax
new RegExp(str, flags)  // dynamic pattern

// Flags: i=insensitive, g=global, m=multiline, s=dotAll

// Character classes
\d  [0-9]     \D  [^0-9]
\w  [a-zA-Z0-9_]  \W  [^\w]
\s  whitespace    \S  non-whitespace
.   any char (except \n)

// Quantifiers
*   0 or more    +   1 or more
?   0 or 1       {n,m} n to m times
*?  lazy (as few as possible)

// Anchors: ^  start   $  end   \b  word boundary

// Groups
(abc)       capturing group
(?:abc)     non-capturing group
(?<name>abc) named group
a|b         alternation
```

### Key Methods

```js
/pattern/.test(str)          // true/false
str.match(/pattern/)         // first match + groups
str.match(/pattern/g)        // all matches (array)
str.matchAll(/pattern/g)     // all matches with groups (iterator)
str.replace(/pattern/, val)  // replace first
str.replace(/pattern/g, val) // replace all
str.split(/pattern/)         // split by regex
```

---

## 💡 Key Takeaways

- `test()` for boolean checks; `match()` / `matchAll()` for extracting values
- Always use named groups `(?<year>\d{4})` for readable captures
- Escape special chars with `\` when matching literally: `\.` for a dot
- Lazy quantifiers (`*?`, `+?`) prevent over-matching in HTML parsing
- Build and test regex at [regex101.com](https://regex101.com)

---

## 📝 Exercises

1. Extract all hashtags from a tweet: `"#js is #awesome"` → `["#js", "#awesome"]`
2. Mask a credit card: `"4532 1234 5678 9012"` → `"4532 **** **** 9012"`
3. Parse query string `"name=Alice&age=30"` → `{ name: "Alice", age: "30" }`
4. Build a `{{variable}}` template engine using regex + replace

---

## ⏭️ Next Up

**[Day 24 — Closures →](../Day-24-Closures/)**
