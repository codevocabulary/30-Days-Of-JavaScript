// ============================================================
// 🚀 DAY 07 — Scope & Hoisting
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. SCOPE — Where variables are accessible
// ─────────────────────────────────────────────

// ── Global Scope ──────────────────────────────
// Variables declared outside any function/block
let globalVar = "I'm global";
var globalVar2 = "Also global";

// ── Function (Local) Scope ────────────────────
function myFunction() {
  let functionVar = "I'm local to this function";
  console.log(globalVar);    // ✅ can access global
  console.log(functionVar);  // ✅ can access local
}
// console.log(functionVar); // ❌ ReferenceError

// ── Block Scope (ES6) ─────────────────────────
// let and const are block-scoped (inside {} blocks)
{
  let blockVar   = "I'm block-scoped";  // ✅ block scope
  const blockConst = "Also block";       // ✅ block scope
  var blockVar2  = "I'm NOT block-scoped"; // ⚠️ var ignores blocks!
}
// console.log(blockVar);  // ❌ ReferenceError
console.log(blockVar2);    // ✅ "I'm NOT block-scoped" — var leaks!

// Block scope with if/for/while:
if (true) {
  let x = 10;
  var y = 20;
}
// console.log(x); // ❌ ReferenceError
console.log(y);    // ✅ 20 — var leaks out of if block

// ─────────────────────────────────────────────
// 2. SCOPE CHAIN
// JS looks for variables starting from innermost scope outward
// ─────────────────────────────────────────────

let name = "Global Alice";

function outer() {
  let name = "Outer Alice"; // shadows global 'name'

  function inner() {
    let name = "Inner Alice"; // shadows outer 'name'
    console.log(name); // "Inner Alice" — closest scope wins
  }

  inner();
  console.log(name); // "Outer Alice"
}

outer();
console.log(name); // "Global Alice"

// Lexical scope — scope is determined at write time, not run time
function outer2() {
  let secret = "outer secret";
  return function inner() {
    console.log(secret); // inner can see outer's variables
  };
}
let fn = outer2();
fn(); // "outer secret" — even after outer2() finished!

// ─────────────────────────────────────────────
// 3. HOISTING
// JS moves declarations to the top of their scope before execution
// Only DECLARATIONS are hoisted, not initializations
// ─────────────────────────────────────────────

// ── var hoisting ──────────────────────────────
console.log(hoistedVar); // undefined (NOT an error!) — declaration hoisted
var hoistedVar = "I was hoisted";
console.log(hoistedVar); // "I was hoisted"

// What JS actually does internally:
// var hoistedVar;           // declaration moved to top
// console.log(hoistedVar); // undefined
// hoistedVar = "I was hoisted";

// ── let/const hoisting ────────────────────────
// let and const ARE hoisted, but NOT initialized
// Accessing them before declaration = Temporal Dead Zone (TDZ)
// console.log(notHoisted); // ❌ ReferenceError: Cannot access before init
let notHoisted = "I'm not accessible before declaration";

// ── Function Declaration hoisting ────────────
// Entire function body is hoisted!
sayHello(); // ✅ Works before declaration!
function sayHello() {
  console.log("Hello from hoisted function!");
}

// ── Function Expression hoisting ─────────────
// sayHi(); // ❌ ReferenceError — variable declared with let/const
const sayHi = function() {
  console.log("Hi!");
};
// var sayHi2 = function() {...}; // sayHi2 is hoisted as undefined
// sayHi2(); // ❌ TypeError: sayHi2 is not a function

// ─────────────────────────────────────────────
// 4. TEMPORAL DEAD ZONE (TDZ)
// ─────────────────────────────────────────────

// let/const variables exist from start of block but can't be accessed
// until the declaration is reached — this zone is the TDZ

function tdz() {
  // TDZ starts here for 'myLet'
  console.log("Before declaration");
  // console.log(myLet); // ❌ ReferenceError in TDZ
  let myLet = 5;         // TDZ ends here
  console.log(myLet);    // ✅ 5
}
tdz();

// ─────────────────────────────────────────────
// 5. CLOSURE (preview — full coverage Day 24)
// A function that "remembers" variables from its outer scope
// ─────────────────────────────────────────────

function makeCounter() {
  let count = 0; // this variable is "closed over"

  return {
    increment() { count++; },
    decrement() { count--; },
    getCount()  { return count; }
  };
}

let counter = makeCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getCount()); // 2
// count is private — can't access it directly!

// ─────────────────────────────────────────────
// 📝 EXERCISES — Try these yourself!
// ─────────────────────────────────────────────

// Exercise 1: What logs? (No running!)
var x = 1;
function test() {
  console.log(x);
  var x = 2;
  console.log(x);
}
test();
console.log(x);

// Exercise 2: Fix the classic loop bug
// This logs 5,5,5,5,5 instead of 0,1,2,3,4 — WHY? Fix it.
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
// Hint: replace var with let

// Exercise 3: Create a function that generates unique IDs using closure.
// Each call to getId() should return next number: 1, 2, 3...
