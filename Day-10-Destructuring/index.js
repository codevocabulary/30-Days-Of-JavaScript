// ============================================================
// 🚀 DAY 10 — Destructuring (Arrays & Objects)
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. ARRAY DESTRUCTURING
// Extract values from arrays into variables
// ─────────────────────────────────────────────

// Basic
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Skip elements with commas
const [first, , third] = [10, 20, 30];
console.log(first, third); // 10 30

// Default values
const [x = 0, y = 0, z = 0] = [1, 2];
console.log(x, y, z); // 1 2 0

// Swap variables — classic trick!
let p = 1, q = 2;
[p, q] = [q, p];
console.log(p, q); // 2 1

// Rest elements
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Nested array destructuring
const [[r, g, b]] = [[255, 128, 0]];
console.log(r, g, b); // 255 128 0

// ─────────────────────────────────────────────
// 2. OBJECT DESTRUCTURING
// ─────────────────────────────────────────────

const person = { name: "Alice", age: 30, city: "NY", job: "Dev" };

// Basic
const { name, age } = person;
console.log(name, age); // "Alice" 30

// Rename while destructuring
const { name: personName, city: location } = person;
console.log(personName, location); // "Alice" "NY"

// Default values
const { job, salary = 50000 } = person;
console.log(job, salary); // "Dev" 50000

// Rename + default
const { nickname: alias = "Unknown" } = person;
console.log(alias); // "Unknown"

// Rest properties
const { name: n, ...rest } = person;
console.log(n);    // "Alice"
console.log(rest); // { age: 30, city: "NY", job: "Dev" }

// Nested object destructuring
const user = {
  id: 1,
  profile: {
    firstName: "John",
    lastName: "Doe",
    address: { city: "Boston", country: "US" }
  }
};

const { profile: { firstName, address: { city } } } = user;
console.log(firstName, city); // "John" "Boston"

// ─────────────────────────────────────────────
// 3. FUNCTION PARAMETER DESTRUCTURING
// Destructure objects directly in function parameters
// ─────────────────────────────────────────────

// Instead of: function display(person) { console.log(person.name) }
function display({ name, age, city = "Unknown" }) {
  console.log(`${name}, ${age}, from ${city}`);
}
display({ name: "Alice", age: 30, city: "NY" }); // "Alice, 30, from NY"
display({ name: "Bob", age: 25 });                 // "Bob, 25, from Unknown"

// With arrays
function sum([a, b, c = 0]) {
  return a + b + c;
}
console.log(sum([1, 2, 3])); // 6
console.log(sum([1, 2]));    // 3

// Real-world example: React component props
function UserCard({ name, avatar = "/default.png", bio = "No bio" }) {
  return `${name}: ${bio} | ${avatar}`;
}

// ─────────────────────────────────────────────
// 4. DESTRUCTURING IN LOOPS
// ─────────────────────────────────────────────

const users = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob",   role: "user"  },
];

for (const { id, name, role } of users) {
  console.log(`${id}: ${name} (${role})`);
}

// Entries loop
const obj = { a: 1, b: 2, c: 3 };
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} = ${value}`);
}

// ─────────────────────────────────────────────
// 5. COMMON PATTERNS
// ─────────────────────────────────────────────

// Return multiple values from a function
function getMinMax(arr) {
  return { min: Math.min(...arr), max: Math.max(...arr) };
}
const { min, max } = getMinMax([3, 1, 4, 1, 5, 9]);
console.log(min, max); // 1 9

// Swap array elements
const arr = [1, 2, 3, 4, 5];
[arr[0], arr[4]] = [arr[4], arr[0]];
console.log(arr); // [5, 2, 3, 4, 1]

// Import destructuring (ES modules — Day 21)
// const { useState, useEffect } = React; // React example

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1: Destructure the nested object to get the street:
const data = { location: { address: { street: "Main St", number: 42 } } };

// Exercise 2: Write a function that accepts a config object with defaults:
// { host = "localhost", port = 3000, ssl = false }
// and returns the connection string.

// Exercise 3: Using destructuring, swap elements at index 1 and 3 in:
const arr2 = [10, 20, 30, 40, 50];
