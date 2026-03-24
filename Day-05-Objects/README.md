# 📘 Day 05 — Objects

> **Level:** 🟢 Beginner | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Creating objects with the literal syntax
- Dot notation vs bracket notation for property access
- Adding, updating, and deleting properties
- Methods and the `this` keyword
- Iterating over objects with `for...in`, `Object.keys()`, `Object.values()`, `Object.entries()`
- Shallow copying, deep copying, and merging objects
- Shorthand property names and computed keys (ES6)

---

## 📖 Concepts Covered

### 1. Creating an Object

```js
const person = {
  name: "Alice",               // string value
  age: 30,                     // number value
  hobbies: ["reading","coding"], // array value
  address: { city: "NY" },    // nested object
  greet() {                    // method (shorthand)
    return `Hi, I'm ${this.name}`;
  }
};
```

---

### 2. Accessing Properties

```js
// Dot notation — clean, use when key is a valid identifier
person.name        // "Alice"
person.address.city // "NY"

// Bracket notation — use for dynamic keys or special characters
person["name"]     // "Alice"
const key = "age";
person[key]        // 30 — dynamic access!
person["first name"] // keys with spaces need brackets
```

---

### 3. Modifying Objects

```js
// Add
obj.newProp = "value";
obj["another"] = 42;

// Update
obj.name = "Bob";

// Delete
delete obj.age;

// Check existence
"name" in obj              // true
obj.hasOwnProperty("name") // true
```

---

### 4. Methods & `this`

```js
const counter = {
  value: 0,
  increment() {     // shorthand method syntax (ES6)
    this.value++;   // 'this' = the object
    return this;    // return this for chaining!
  },
  reset() { this.value = 0; return this; },
  get() { return this.value; }
};

counter.increment().increment().increment().reset();
```

> ⚠️ Arrow functions do **NOT** have their own `this` — don't use them as object methods!

---

### 5. Iterating Over Objects

```js
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj)     // ["a", "b", "c"]
Object.values(obj)   // [1, 2, 3]
Object.entries(obj)  // [["a",1], ["b",2], ["c",3]]

// Loop with destructuring
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} = ${value}`);
}
```

---

### 6. Copying Objects

```js
const original = { name: "Alice", score: 99 };

// ❌ Reference copy — NOT a real copy
const same = original;
same.name = "Bob";
console.log(original.name); // "Bob" — oops!

// ✅ Shallow copy — Object.assign or spread
const copy1 = Object.assign({}, original);
const copy2 = { ...original };

// ✅ Deep copy — handles nested objects
const deep1 = JSON.parse(JSON.stringify(original)); // simple
const deep2 = structuredClone(original);            // modern (ES2022)
```

> ⚠️ **Shallow copies** still share nested objects. Use deep copy for nested data.

---

### 7. Merging Objects

```js
const defaults = { color: "blue", size: "medium", weight: 1 };
const custom   = { color: "red", size: "large" };

const merged = { ...defaults, ...custom };
// { color: "red", size: "large", weight: 1 }
// Later keys overwrite earlier ones
```

---

### 8. ES6 Shorthand Features

```js
// Shorthand property names
const name = "Alice";
const age  = 30;
const user = { name, age }; // same as { name: name, age: age }

// Computed property names
const prop = "color";
const obj  = { [prop]: "blue" }; // { color: "blue" }
```

---

### 9. Static Object Methods

```js
Object.freeze(obj)          // make object immutable
Object.isFrozen(obj)        // check if frozen
Object.assign(target, src)  // merge into target
Object.fromEntries(entries) // array of [k,v] pairs → object
```

---

## 💡 Key Takeaways

- Objects are **reference types** — assigning doesn't copy, it creates a second reference to the same object
- Use `{ ...obj }` for shallow copies and `structuredClone()` for deep copies
- `Object.entries()` is the best way to loop over both keys and values simultaneously
- Always use regular function syntax for object methods (not arrow functions)
- Shorthand property syntax `{ name }` is cleaner than `{ name: name }`

---

## 📝 Exercises

1. Create a `book` object with `title`, `author`, `year`, `pages`, and a `getSummary()` method
2. Find the person with the highest score from an array of `{name, score}` objects
3. Merge `{a:1,b:2}`, `{b:3,c:4}`, `{c:5,d:6}` — later values should win
4. Count character occurrences: `"hello"` → `{h:1, e:1, l:2, o:1}`
5. Deep-clone `{name:"Alice", scores:[1,2,3], address:{city:"NY"}}` without JSON methods

---

## ⏭️ Next Up

**[Day 06 — Functions →](../Day-06-Functions/)**
