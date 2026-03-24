// ============================================================
// 🚀 DAY 08 — Arrow Functions
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. ARROW FUNCTION SYNTAX
// ─────────────────────────────────────────────

// Regular function
function add(a, b) { return a + b; }

// Arrow function — different ways to write them:
const add2 = (a, b) => { return a + b; }; // explicit return
const add3 = (a, b) => a + b;             // implicit return (1 expression)
const add4 = (a, b) => (a + b);           // parens around expression

// Single parameter — can omit parentheses
const double = n => n * 2;
const double2 = (n) => n * 2; // with parens — also fine

// No parameters — must have empty parens
const greet = () => "Hello!";
const greet2 = () => { return "Hello!"; };

// Returning an object — wrap in parens (else {} is mistaken as body)
const makeObj = (name, age) => ({ name, age }); // ✅
// const makeObj2 = (name, age) => { name, age }; // ❌ parsed as block!
console.log(makeObj("Alice", 30)); // { name: "Alice", age: 30 }

// ─────────────────────────────────────────────
// 2. KEY DIFFERENCE: 'this' BINDING
// Arrow functions DON'T have their own 'this'
// They inherit 'this' from the surrounding scope (lexical 'this')
// ─────────────────────────────────────────────

// Problem with regular functions in methods:
const timer = {
  name: "My Timer",
  start: function() {
    console.log(this.name); // ✅ "My Timer"

    setTimeout(function() {
      // 'this' here is NOT the timer object!
      // It's the global object (or undefined in strict mode)
      console.log(this); // Window or undefined
    }, 100);
  }
};

// Old workaround: save 'this' to a variable
const timer2 = {
  name: "My Timer",
  start: function() {
    const self = this; // save reference to outer this
    setTimeout(function() {
      console.log(self.name); // ✅ "My Timer"
    }, 100);
  }
};

// Modern solution: arrow function inherits 'this' from outer scope
const timer3 = {
  name: "My Timer",
  start: function() {
    setTimeout(() => {
      console.log(this.name); // ✅ "My Timer" — inherits from start()
    }, 100);
  }
};

// ─────────────────────────────────────────────
// 3. WHEN TO USE ARROW vs REGULAR FUNCTIONS
// ─────────────────────────────────────────────

// ✅ USE ARROW FUNCTIONS for:
// - Array methods (map, filter, reduce)
[1, 2, 3].map(n => n * 2);            // clean callbacks
[1, 2, 3].filter(n => n > 1);         // inline conditions
[1, 2, 3].reduce((acc, n) => acc + n, 0); // reducers

// - Short, concise utility functions
const isEven = n => n % 2 === 0;
const clamp  = (val, min, max) => Math.min(Math.max(val, min), max);

// - Callbacks that need outer 'this'
class Button {
  constructor(label) {
    this.label = label;
    this.count = 0;
  }
  
  handleClick() {
    // Arrow keeps 'this' as the Button instance
    document.addEventListener("click", () => {
      this.count++; // ✅ 'this' is the Button
      console.log(`${this.label} clicked ${this.count} times`);
    });
  }
}

// ❌ DON'T USE ARROW FUNCTIONS for:
// - Object methods (this won't be the object)
const obj = {
  value: 42,
  getValue: () => {
    return this.value; // ❌ 'this' is not obj!
  },
  getValue2() {
    return this.value; // ✅ regular method syntax
  }
};
console.log(obj.getValue());  // undefined
console.log(obj.getValue2()); // 42

// - Constructor functions (arrow functions can't be constructors)
// const Person = (name) => { this.name = name; }
// const alice = new Person("Alice"); // ❌ TypeError: Person is not a constructor

// - Methods that need 'arguments' object
function withArgs() {
  console.log(arguments); // ✅ works
}
const arrowWithArgs = () => {
  // console.log(arguments); // ❌ not defined in arrow functions
};

// ─────────────────────────────────────────────
// 4. ARROW FUNCTIONS WITH ARRAY METHODS
// This is where arrow functions shine!
// ─────────────────────────────────────────────

const students = [
  { name: "Alice", grade: 92, subject: "Math" },
  { name: "Bob",   grade: 78, subject: "Science" },
  { name: "Carol", grade: 88, subject: "Math" },
  { name: "Dave",  grade: 65, subject: "Science" },
];

// Filter math students with grade > 85
const topMathStudents = students
  .filter(s => s.subject === "Math" && s.grade > 85)
  .map(s => s.name);
console.log(topMathStudents); // ["Alice", "Carol"]

// Average grade
const avg = students.reduce((sum, s) => sum + s.grade, 0) / students.length;
console.log(avg); // 80.75

// ─────────────────────────────────────────────
// 📝 EXERCISES — Try these yourself!
// ─────────────────────────────────────────────

// Exercise 1: Convert these to arrow functions:
function square(x) { return x * x; }
function greetUser(name) { return "Hello, " + name + "!"; }
function isPositive(n) { if (n > 0) { return true; } return false; }

// Exercise 2: What does this log and why?
const obj2 = {
  count: 0,
  increment: () => { this.count++; },
  getCount() { return this.count; }
};
obj2.increment();
console.log(obj2.getCount()); // What and why?

// Exercise 3: Rewrite this using arrow function so 'this' works:
function Timer() {
  this.seconds = 0;
  setInterval(function() {
    this.seconds++; // 'this' is broken here
    console.log(this.seconds);
  }, 1000);
}
