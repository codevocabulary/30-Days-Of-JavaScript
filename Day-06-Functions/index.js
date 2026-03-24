// ============================================================
// 🚀 DAY 06 — Functions
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. WHAT IS A FUNCTION?
// A function is a reusable block of code that performs a task.
// Define once, call many times.
// ─────────────────────────────────────────────

// ── Function Declaration ──────────────────────
// Hoisted — can be called BEFORE it's defined in the file
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Bob"));   // "Hello, Bob!"


// ── Function Expression ───────────────────────
// NOT hoisted — must be defined before calling
const sayBye = function(name) {
  return `Goodbye, ${name}!`;
};
console.log(sayBye("Alice")); // "Goodbye, Alice!"


// ── Arrow Function (ES6) ──────────────────────
// Modern syntax, covered in depth on Day 08
const add = (a, b) => a + b;
console.log(add(3, 5)); // 8


// ─────────────────────────────────────────────
// 2. PARAMETERS & ARGUMENTS
// Parameters = names in function definition
// Arguments  = actual values passed when calling
// ─────────────────────────────────────────────

function multiply(a, b) {
  // a and b are parameters
  return a * b;
}
console.log(multiply(4, 5)); // 20 — 4 and 5 are arguments

// Too few arguments → missing params become undefined
function info(name, age) {
  console.log(`${name} is ${age} years old`);
}
info("Alice");       // "Alice is undefined years old"

// Too many arguments → extras are ignored
info("Bob", 25, "extra"); // "Bob is 25 years old"


// ─────────────────────────────────────────────
// 3. DEFAULT PARAMETERS (ES6)
// Provide fallback values if arguments are missing
// ─────────────────────────────────────────────

function greet2(name = "stranger", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}
console.log(greet2());              // "Hello, stranger!"
console.log(greet2("Alice"));       // "Hello, Alice!"
console.log(greet2("Bob", "Hi"));   // "Hi, Bob!"

// Default can reference earlier parameters
function createUser(name, role = "user", id = `${name}_${role}`) {
  return { name, role, id };
}
console.log(createUser("alice"));
// { name: "alice", role: "user", id: "alice_user" }


// ─────────────────────────────────────────────
// 4. RETURN VALUES
// ─────────────────────────────────────────────

function square(n) {
  return n * n; // function ends here, returns value
  console.log("This never runs!"); // unreachable code
}

let sq = square(5);
console.log(sq); // 25

// Functions without return → return undefined
function doNothing() {}
console.log(doNothing()); // undefined

// Return multiple values using an array or object
function minMax(arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr)
  };
}
let { min, max } = minMax([3, 1, 5, 2, 4]);
console.log(min, max); // 1 5


// ─────────────────────────────────────────────
// 5. REST PARAMETERS (...args)
// Capture unlimited arguments into an array
// ─────────────────────────────────────────────

function sum(...numbers) {
  // 'numbers' is an array of all passed arguments
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3));          // 6
console.log(sum(1, 2, 3, 4, 5));    // 15
console.log(sum(10));               // 10
console.log(sum());                 // 0

// Rest must be the LAST parameter
function logMessage(level, ...messages) {
  messages.forEach(msg => console.log(`[${level}] ${msg}`));
}
logMessage("INFO", "Server started", "Listening on port 3000");
// [INFO] Server started
// [INFO] Listening on port 3000


// ─────────────────────────────────────────────
// 6. THE ARGUMENTS OBJECT
// Available in regular functions (NOT arrow functions)
// Contains all passed arguments as an array-like object
// ─────────────────────────────────────────────

function showArgs() {
  console.log(arguments);        // Arguments object
  console.log(arguments.length); // number of arguments
  console.log(arguments[0]);     // first argument

  // Convert to real array (arguments is NOT a true array)
  let argsArray = Array.from(arguments);
  console.log(argsArray);
}
showArgs(1, "hello", true); // Arguments {0:1, 1:"hello", 2:true}

// Modern code: prefer rest parameters (...args) over arguments object


// ─────────────────────────────────────────────
// 7. FUNCTION SCOPE
// Variables declared inside a function are local to that function
// ─────────────────────────────────────────────

let globalVar = "I'm global";

function testScope() {
  let localVar = "I'm local";
  console.log(globalVar); // ✅ can access global
  console.log(localVar);  // ✅ can access local
}

testScope();
console.log(globalVar); // ✅ still accessible
// console.log(localVar); // ❌ ReferenceError: localVar is not defined


// ─────────────────────────────────────────────
// 8. IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
// A function that runs immediately after being defined
// Used to create a private scope (avoid polluting global scope)
// ─────────────────────────────────────────────

(function() {
  let privateVar = "I only exist here";
  console.log(privateVar); // "I only exist here"
})(); // ← the () at end immediately calls it

// console.log(privateVar); // ❌ ReferenceError

// IIFE with parameters
(function(name) {
  console.log(`Hello from IIFE, ${name}!`);
})("Alice");

// Arrow function IIFE
(() => {
  console.log("Arrow IIFE!");
})();


// ─────────────────────────────────────────────
// 9. FUNCTIONS AS FIRST-CLASS CITIZENS
// In JS, functions are values — you can:
// - store them in variables
// - pass them as arguments
// - return them from other functions
// ─────────────────────────────────────────────

// Storing functions in variables
const double = n => n * 2;
const triple = n => n * 3;

// Storing in objects/arrays
const operations = {
  double,
  triple,
  square: n => n ** 2
};
console.log(operations.double(5));  // 10
console.log(operations.square(4));  // 16

// Passing functions as arguments (callbacks)
function applyOperation(value, operation) {
  return operation(value);
}
console.log(applyOperation(5, double)); // 10
console.log(applyOperation(5, triple)); // 15
console.log(applyOperation(5, n => n + 100)); // 105

// Returning functions from functions (factory pattern)
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}
const times5  = createMultiplier(5);
const times10 = createMultiplier(10);
console.log(times5(3));   // 15
console.log(times10(3));  // 30


// ─────────────────────────────────────────────
// 10. RECURSIVE FUNCTIONS
// A function that calls itself
// Always needs a base case to avoid infinite loop!
// ─────────────────────────────────────────────

// Factorial: n! = n × (n-1) × (n-2) × ... × 1
function factorial(n) {
  if (n <= 1) return 1; // base case — stop here
  return n * factorial(n - 1); // recursive case
}
console.log(factorial(5)); // 120 (5 × 4 × 3 × 2 × 1)
console.log(factorial(0)); // 1

// Fibonacci: each number = sum of previous two
function fibonacci(n) {
  if (n <= 1) return n; // base cases: fib(0)=0, fib(1)=1
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(10)); // 55

// Countdown
function countdown(n) {
  if (n <= 0) {
    console.log("Go!");
    return;
  }
  console.log(n);
  countdown(n - 1); // call itself with smaller value
}
countdown(5); // 5, 4, 3, 2, 1, Go!


// ─────────────────────────────────────────────
// 11. PURE vs IMPURE FUNCTIONS
// ─────────────────────────────────────────────

// PURE function — same input always gives same output, no side effects
function pureAdd(a, b) {
  return a + b; // always same result, no external changes
}

// IMPURE function — depends on or changes external state
let total = 0;
function impureAdd(n) {
  total += n; // side effect: changes external variable!
  return total;
}
// impureAdd(5) first call → 5
// impureAdd(5) second call → 10 (different result, same input!)

// Prefer pure functions — easier to test and reason about


// ─────────────────────────────────────────────
// 📝 EXERCISES — Try these yourself!
// ─────────────────────────────────────────────

// Exercise 1:
// Write a function isPrime(n) that returns true if n is prime.

// Exercise 2:
// Write a function flatten(arr) that flattens a nested array
// without using Array.flat(). Use recursion!

// Exercise 3:
// Write a function memoize(fn) that caches function results.
// If called again with same args, return cached result.

// Exercise 4:
// Write a function curry(fn) that converts f(a,b,c) to f(a)(b)(c).
// Example: add(1,2,3) → curriedAdd(1)(2)(3) → 6

// Exercise 5:
// Write a function that debounces another function.
// It should only run after it hasn't been called for X milliseconds.
