// ============================================================
// 🚀 DAY 24 — Closures
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. WHAT IS A CLOSURE?
// A closure is a function that "remembers" variables from its
// outer scope even after that outer scope has finished executing
// ─────────────────────────────────────────────

function outer() {
  let count = 0; // this variable is "enclosed"

  function inner() {
    count++; // inner function accesses outer variable
    console.log(count);
  }

  return inner; // return the function (not called yet!)
}

const counter = outer(); // outer() runs, returns inner
// outer() is done, but count still exists in memory!
counter(); // 1
counter(); // 2
counter(); // 3
console.log(typeof count); // "undefined" — count is private!

// ─────────────────────────────────────────────
// 2. CLOSURES FOR PRIVATE STATE
// ─────────────────────────────────────────────

function createBankAccount(initialBalance) {
  let balance = initialBalance; // private — only accessible via returned methods

  return {
    deposit(amount) {
      if (amount <= 0) throw new Error("Amount must be positive");
      balance += amount;
      console.log(`Deposited ${amount}. Balance: ${balance}`);
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      console.log(`Withdrawn ${amount}. Balance: ${balance}`);
    },
    getBalance() {
      return balance; // read-only access
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);      // "Deposited 50. Balance: 150"
account.withdraw(30);     // "Withdrawn 30. Balance: 120"
console.log(account.getBalance()); // 120
// account.balance; // undefined — truly private!

// ─────────────────────────────────────────────
// 3. FUNCTION FACTORIES
// Closures are great for creating specialized functions
// ─────────────────────────────────────────────

function multiplier(factor) {
  return (number) => number * factor; // 'factor' is closed over
}

const double = multiplier(2);
const triple = multiplier(3);
const times10 = multiplier(10);

console.log(double(5));  // 10
console.log(triple(5));  // 15
console.log(times10(5)); // 50

// Power function factory
function power(exponent) {
  return (base) => base ** exponent;
}
const square = power(2);
const cube   = power(3);
console.log(square(4)); // 16
console.log(cube(3));   // 27

// ─────────────────────────────────────────────
// 4. MEMOIZATION — Cache results using closures
// ─────────────────────────────────────────────

function memoize(fn) {
  const cache = {}; // cache is closed over — persists between calls

  return function(...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log("Cache hit for", key);
      return cache[key];
    }

    console.log("Computing for", key);
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

function slowSquare(n) {
  // Simulate expensive computation
  return n * n;
}

const fastSquare = memoize(slowSquare);
console.log(fastSquare(10)); // Computing... 100
console.log(fastSquare(10)); // Cache hit! 100
console.log(fastSquare(10)); // Cache hit! 100
console.log(fastSquare(5));  // Computing... 25

// ─────────────────────────────────────────────
// 5. THE FAMOUS LOOP BUG — Solved with closures
// ─────────────────────────────────────────────

// ❌ Problem with var in loops:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // prints 3, 3, 3 ← WRONG
}
// Why? 'var i' is shared — all callbacks see same 'i' (which becomes 3)

// ✅ Solution 1: Use 'let' (block-scoped, new binding each iteration)
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100); // 0, 1, 2 ✅
}

// ✅ Solution 2: IIFE creates a new closure per iteration
for (var k = 0; k < 3; k++) {
  (function(copy) {
    setTimeout(() => console.log(copy), 100); // 0, 1, 2 ✅
  })(k); // immediately passes current value of k
}

// ─────────────────────────────────────────────
// 6. PARTIAL APPLICATION
// Pre-fill some arguments of a function
// ─────────────────────────────────────────────

function add(a, b, c) {
  return a + b + c;
}

function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

const add5 = partial(add, 5);          // preset a=5
const add5and10 = partial(add, 5, 10); // preset a=5, b=10

console.log(add5(3, 2));    // 10  (5 + 3 + 2)
console.log(add5and10(7));  // 22  (5 + 10 + 7)

// ─────────────────────────────────────────────
// 7. MODULE PATTERN — Classic use of closures
// ─────────────────────────────────────────────

const TodoModule = (function() {
  // Private state
  let todos = [];
  let nextId = 1;

  // Private functions
  function findById(id) {
    return todos.find(t => t.id === id);
  }

  // Public API
  return {
    add(text) {
      const todo = { id: nextId++, text, done: false };
      todos.push(todo);
      return todo;
    },
    complete(id) {
      const todo = findById(id);
      if (todo) todo.done = true;
    },
    getAll() {
      return [...todos]; // return copy, not reference!
    },
    getPending() {
      return todos.filter(t => !t.done);
    }
  };
})(); // IIFE — runs immediately

TodoModule.add("Learn closures");
TodoModule.add("Build something");
TodoModule.complete(1);
console.log(TodoModule.getAll());    // both todos
console.log(TodoModule.getPending()); // only "Build something"

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1: Create a makeLogger(prefix) that creates a logging function
// makeLogger("INFO")("Server started") → logs "[INFO] Server started"

// Exercise 2: Create an "once" function — ensures fn only runs once
// function once(fn) { ... }
// const initialize = once(setup);
// initialize(); // runs setup
// initialize(); // does nothing

// Exercise 3: Implement a rate limiter using closures
// function rateLimit(fn, limit, interval) { ... }
// Only allows 'limit' calls per 'interval' milliseconds
