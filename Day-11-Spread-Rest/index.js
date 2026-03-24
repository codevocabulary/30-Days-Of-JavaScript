// ============================================================
// 🚀 DAY 11 — Spread & Rest Operators (...)
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// Both use the same syntax "..." but do OPPOSITE things:
// REST  — collects multiple values INTO an array/object
// SPREAD — expands an array/object INTO individual values

// ─────────────────────────────────────────────
// 1. SPREAD OPERATOR — Expanding values
// ─────────────────────────────────────────────

// ── Spread with arrays ────────────────────────
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine arrays
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Insert in middle
const withMiddle = [...arr1, 99, 100, ...arr2];
console.log(withMiddle); // [1, 2, 3, 99, 100, 4, 5, 6]

// Copy an array (shallow copy)
const copy = [...arr1];
copy.push(4);
console.log(arr1);  // [1, 2, 3] — unchanged
console.log(copy);  // [1, 2, 3, 4]

// Pass array as function arguments
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(Math.max(...numbers));  // 9
console.log(Math.min(...numbers));  // 1

// Convert string to array of characters
const chars = [..."hello"];
console.log(chars); // ["h", "e", "l", "l", "o"]

// ── Spread with objects ───────────────────────
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// Merge objects
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// Later properties overwrite earlier ones
const merged2 = { ...obj1, b: 99, ...obj2 };
console.log(merged2); // { a: 1, b: 99, c: 3, d: 4 }

// Copy and update object (immutable update pattern)
const user = { name: "Alice", age: 25, role: "user" };
const updatedUser = { ...user, age: 26, role: "admin" };
console.log(user);        // { name: "Alice", age: 25, role: "user" }
console.log(updatedUser); // { name: "Alice", age: 26, role: "admin" }

// Adding a property immutably
const withEmail = { ...user, email: "alice@example.com" };
// Removing a property immutably (destructuring + spread)
const { role, ...withoutRole } = user;
console.log(withoutRole); // { name: "Alice", age: 25 }

// ─────────────────────────────────────────────
// 2. REST OPERATOR — Collecting values
// ─────────────────────────────────────────────

// ── Rest in function parameters ──────────────
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// Mixed: regular params + rest
function logMessage(level, timestamp, ...messages) {
  console.log(`[${level}] [${timestamp}]`, ...messages);
}
logMessage("INFO", "10:30", "Server started", "Port: 3000");

// ── Rest in destructuring ────────────────────
const [first, second, ...remaining] = [1, 2, 3, 4, 5];
console.log(first);     // 1
console.log(second);    // 2
console.log(remaining); // [3, 4, 5]

const { name, ...otherProps } = { name: "Alice", age: 30, city: "NY" };
console.log(name);       // "Alice"
console.log(otherProps); // { age: 30, city: "NY" }

// ─────────────────────────────────────────────
// 3. PRACTICAL PATTERNS
// ─────────────────────────────────────────────

// Clone & update (React state pattern)
function updateItem(items, id, updates) {
  return items.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );
}

const todos = [
  { id: 1, text: "Learn JS", done: false },
  { id: 2, text: "Build app", done: false },
];
const updated = updateItem(todos, 1, { done: true });
console.log(updated[0]); // { id: 1, text: "Learn JS", done: true }
console.log(todos[0]);   // { id: 1, text: "Learn JS", done: false } — unchanged!

// Function composition with spread
function pipe(...fns) {
  return (value) => fns.reduce((acc, fn) => fn(acc), value);
}
const process = pipe(
  x => x * 2,
  x => x + 10,
  x => x / 2
);
console.log(process(5)); // (5*2+10)/2 = 10

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1: Merge these configs, with userConfig overriding defaults:
const defaultConfig = { host:"localhost", port:3000, debug:false, ssl:false };
const userConfig    = { port:8080, debug:true };
// Expected: { host:"localhost", port:8080, debug:true, ssl:false }

// Exercise 2: Write a function that accepts any number of arrays and returns merged+unique:
// mergeUnique([1,2,3], [2,3,4], [3,4,5]) → [1,2,3,4,5]

// Exercise 3: Implement a simple curry function using rest/spread:
// curry(add)(1)(2)(3) === 6
