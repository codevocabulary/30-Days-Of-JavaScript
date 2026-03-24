// ============================================================
// 🚀 DAY 02 — Operators
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. ARITHMETIC OPERATORS
// Used to perform math operations
// ─────────────────────────────────────────────

let a = 10;
let b = 3;

console.log(a + b);  // 13  — Addition
console.log(a - b);  // 7   — Subtraction
console.log(a * b);  // 30  — Multiplication
console.log(a / b);  // 3.333... — Division
console.log(a % b);  // 1   — Modulus (remainder after division)
console.log(a ** b); // 1000 — Exponentiation (10 to the power of 3)

// Increment & Decrement
let x = 5;
console.log(x++); // 5 — POST-increment: returns THEN increments
console.log(x);   // 6
console.log(++x); // 7 — PRE-increment: increments THEN returns
console.log(x--); // 7 — POST-decrement
console.log(x);   // 6
console.log(--x); // 5 — PRE-decrement


// ─────────────────────────────────────────────
// 2. ASSIGNMENT OPERATORS
// ─────────────────────────────────────────────

let num = 10;

num += 5;   // same as: num = num + 5  → 15
num -= 3;   // same as: num = num - 3  → 12
num *= 2;   // same as: num = num * 2  → 24
num /= 4;   // same as: num = num / 4  → 6
num %= 4;   // same as: num = num % 4  → 2
num **= 3;  // same as: num = num ** 3 → 8

console.log(num); // 8

// Logical assignment (ES2021)
let count = null;
count ??= 10;  // Nullish assignment: assigns only if null or undefined
console.log(count); // 10

let score = 5;
score ||= 100; // OR assignment: assigns if score is falsy
console.log(score); // 5 (already truthy, so no change)

let flag = true;
flag &&= false; // AND assignment: assigns if flag is truthy
console.log(flag); // false


// ─────────────────────────────────────────────
// 3. COMPARISON OPERATORS
// Always return true or false
// ─────────────────────────────────────────────

console.log(5 == "5");   // true  — loose equality (ignores type)
console.log(5 === "5");  // false — strict equality (checks type too)
console.log(5 != "5");   // false — loose inequality
console.log(5 !== "5");  // true  — strict inequality

console.log(10 > 5);   // true
console.log(10 < 5);   // false
console.log(10 >= 10); // true
console.log(10 <= 9);  // false

// ⚠️ Always prefer === over == to avoid unexpected type coercion
console.log(0 == false);   // true  ← confusing!
console.log(0 === false);  // false ← correct behavior
console.log("" == false);  // true  ← confusing!
console.log("" === false); // false ← correct behavior
console.log(null == undefined);  // true  ← special case
console.log(null === undefined); // false


// ─────────────────────────────────────────────
// 4. LOGICAL OPERATORS
// Used to combine conditions
// ─────────────────────────────────────────────

// AND (&&) — true only if BOTH sides are true
console.log(true && true);   // true
console.log(true && false);  // false
console.log(false && true);  // false

// OR (||) — true if AT LEAST ONE side is true
console.log(true || false);  // true
console.log(false || false); // false

// NOT (!) — flips true to false and vice versa
console.log(!true);  // false
console.log(!false); // true

// Short-circuit evaluation — JS stops early when result is determined
let user = null;
let username = user && user.name; // user is falsy, so stops at user
console.log(username); // null (doesn't try user.name, no error!)

let displayName = username || "Guest"; // username is null (falsy), so uses "Guest"
console.log(displayName); // "Guest"

// Practical use: default values with ||
function greet(name) {
  name = name || "stranger"; // if name is falsy, use "stranger"
  console.log("Hello, " + name + "!");
}
greet("Alice"); // "Hello, Alice!"
greet();        // "Hello, stranger!"
greet("");      // "Hello, stranger!" ← "" is falsy


// ─────────────────────────────────────────────
// 5. NULLISH COALESCING OPERATOR (??)
// Like ||, but only uses the right side if left is null or undefined
// ─────────────────────────────────────────────

let val1 = null ?? "default";       // "default" (null triggers ??)
let val2 = undefined ?? "default";  // "default"
let val3 = 0 ?? "default";          // 0 (0 is NOT null/undefined!)
let val4 = "" ?? "default";         // "" (empty string is NOT null/undefined)
let val5 = false ?? "default";      // false

console.log(val1, val2, val3, val4, val5);
// Difference: 0 || "default" → "default" (because 0 is falsy)
//             0 ?? "default" → 0 (because 0 is not null/undefined)


// ─────────────────────────────────────────────
// 6. TERNARY OPERATOR ( ? : )
// A compact if/else in one line: condition ? valueIfTrue : valueIfFalse
// ─────────────────────────────────────────────

let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Can be chained (but avoid long chains — gets hard to read)
let score2 = 75;
let grade = score2 >= 90 ? "A"
          : score2 >= 80 ? "B"
          : score2 >= 70 ? "C"
          : score2 >= 60 ? "D"
          : "F";
console.log(grade); // "C"


// ─────────────────────────────────────────────
// 7. OPTIONAL CHAINING (?.)
// Safely access deeply nested properties without errors
// ─────────────────────────────────────────────

let userObj = {
  name: "Alice",
  address: {
    city: "Wonderland"
  }
};

// Without optional chaining — crashes if address is undefined:
// console.log(userObj.phone.number); // ❌ TypeError!

// With optional chaining — returns undefined instead of crashing:
console.log(userObj?.address?.city);   // "Wonderland"
console.log(userObj?.phone?.number);   // undefined (no error!)
console.log(userObj?.getName?.());     // undefined (method call too!)


// ─────────────────────────────────────────────
// 8. BITWISE OPERATORS (Brief Overview)
// Operate on binary representations of numbers
// Rarely used in everyday JS but good to know
// ─────────────────────────────────────────────

console.log(5 & 3);   // 1  — AND
console.log(5 | 3);   // 7  — OR
console.log(5 ^ 3);   // 6  — XOR (exclusive or)
console.log(~5);       // -6 — NOT
console.log(5 << 1);  // 10 — Left shift (multiply by 2)
console.log(5 >> 1);  // 2  — Right shift (divide by 2)


// ─────────────────────────────────────────────
// 9. OPERATOR PRECEDENCE
// Some operators run before others (like * before +)
// ─────────────────────────────────────────────

// Higher precedence runs first — just like in math
let result = 2 + 3 * 4;   // 14 (not 20) — * runs before +
let result2 = (2 + 3) * 4; // 20 — parentheses override precedence

// Full precedence table: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence


// ─────────────────────────────────────────────
// 📝 EXERCISES — Try these yourself!
// ─────────────────────────────────────────────

// Exercise 1:
// What is the result of: 17 % 5 ? Use it to check if a number is even or odd.

// Exercise 2:
// Without running it, predict the output:
// console.log(5 + "5");
// console.log(5 - "5");
// console.log(true + true + true);

// Exercise 3:
// Use the ternary operator to check if a number is positive, negative, or zero.

// Exercise 4:
// What's the difference between:
// null ?? "fallback"
// null || "fallback"
// 0 ?? "fallback"
// 0 || "fallback"

// Exercise 5:
// Given: let data = { user: { profile: null } }
// Safely access data.user.profile.avatar using optional chaining.
