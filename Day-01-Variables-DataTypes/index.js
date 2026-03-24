// ============================================================
// 🚀 DAY 01 — Variables & Data Types
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. WHAT IS A VARIABLE?
// A variable is a named container that stores a value in memory.
// Think of it like a labeled box where you can put things.
// ─────────────────────────────────────────────

// There are 3 ways to declare variables in JavaScript:

// VAR — old way (avoid using it in modern code)
var oldSchool = "I am var";

// LET — use when the value will CHANGE
let age = 25;
age = 26; // ✅ allowed — we can reassign

// CONST — use when the value will NOT change
const name = "Alice";
// name = "Bob"; // ❌ Error! Cannot reassign a const

console.log(oldSchool); // "I am var"
console.log(age);       // 26
console.log(name);      // "Alice"


// ─────────────────────────────────────────────
// 2. DATA TYPES IN JAVASCRIPT
// JavaScript has 8 data types (7 primitive + 1 object)
// ─────────────────────────────────────────────

// ── PRIMITIVE TYPES ──────────────────────────

// 1. STRING — text, always in quotes
let firstName = "John";        // double quotes
let lastName  = 'Doe';         // single quotes — same thing
let greeting  = `Hello, ${firstName}!`; // template literal (backtick)
console.log(greeting);         // "Hello, John!"

// 2. NUMBER — integers and decimals (no int/float distinction in JS)
let intNum   = 42;
let floatNum = 3.14;
let negative = -100;
let bigNum   = 1_000_000; // underscore for readability (ES2021)
console.log(typeof intNum);   // "number"

// Special number values:
console.log(Infinity);   // Infinity (e.g. 1/0)
console.log(-Infinity);  // -Infinity
console.log(NaN);        // Not a Number (e.g. "abc" * 2)

// 3. BIGINT — for extremely large integers
let bigInteger = 9007199254740991n; // append 'n'
console.log(typeof bigInteger);     // "bigint"

// 4. BOOLEAN — true or false only
let isLoggedIn = true;
let hasAccount = false;
console.log(typeof isLoggedIn); // "boolean"

// 5. UNDEFINED — a variable declared but NOT assigned a value
let notAssigned;
console.log(notAssigned);        // undefined
console.log(typeof notAssigned); // "undefined"

// 6. NULL — intentional absence of a value (you set it yourself)
let emptyValue = null;
console.log(emptyValue);        // null
console.log(typeof emptyValue); // "object" ← famous JS quirk/bug!

// 7. SYMBOL — unique identifier (advanced, used in Day 27+)
let sym1 = Symbol("id");
let sym2 = Symbol("id");
console.log(sym1 === sym2); // false — every Symbol is unique!

// ── OBJECT TYPE ──────────────────────────────

// 8. OBJECT — a collection of key-value pairs
let person = {
  name: "Alice",
  age: 30,
  isStudent: false
};
console.log(person);        // { name: 'Alice', age: 30, isStudent: false }
console.log(person.name);   // "Alice"
console.log(typeof person); // "object"

// Arrays are also objects
let colors = ["red", "green", "blue"];
console.log(typeof colors); // "object"

// Functions are also objects (special callable objects)
function sayHi() { return "Hi!"; }
console.log(typeof sayHi); // "function"


// ─────────────────────────────────────────────
// 3. typeof OPERATOR
// Use typeof to check the type of a value
// ─────────────────────────────────────────────
console.log(typeof "hello");    // "string"
console.log(typeof 42);         // "number"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" ← JS bug (historical)
console.log(typeof {});         // "object"
console.log(typeof []);         // "object"
console.log(typeof function(){}); // "function"


// ─────────────────────────────────────────────
// 4. TYPE CONVERSION
// JavaScript can convert between types automatically or manually
// ─────────────────────────────────────────────

// ── IMPLICIT CONVERSION (Type Coercion) ──────
// JS automatically converts types in certain situations

console.log("5" + 3);   // "53" — number 3 is converted to string!
console.log("5" - 3);   // 2    — string "5" is converted to number!
console.log(true + 1);  // 2    — true becomes 1
console.log(false + 1); // 1    — false becomes 0
console.log("" + false); // "false" — boolean to string

// ── EXPLICIT CONVERSION (Type Casting) ───────
// You can manually convert types

// To Number:
let strNum = "42";
let converted = Number(strNum);   // 42 (number)
let parsed    = parseInt("42px"); // 42 (ignores non-numeric trailing chars)
let float     = parseFloat("3.14abc"); // 3.14

console.log(Number("abc"));  // NaN — can't convert
console.log(Number(true));   // 1
console.log(Number(false));  // 0
console.log(Number(null));   // 0
console.log(Number(undefined)); // NaN

// To String:
let num = 100;
let str1 = String(num);   // "100"
let str2 = num.toString(); // "100"
let str3 = num + "";       // "100" — implicit trick

// To Boolean:
// FALSY values (become false): 0, "", null, undefined, NaN, false
// TRUTHY values (become true): everything else!
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false
console.log(Boolean("hello"));   // true
console.log(Boolean(42));        // true
console.log(Boolean({}));        // true — empty object is truthy!
console.log(Boolean([]));        // true — empty array is truthy!


// ─────────────────────────────────────────────
// 5. VARIABLE NAMING RULES
// ─────────────────────────────────────────────

// ✅ Valid names:
let myVariable = 1;
let _private   = 2;
let $dollar    = 3;
let camelCase  = 4;   // ← standard JS convention
let PascalCase = 5;   // ← used for classes/constructors

// ❌ Invalid names (would cause errors):
// let 1number = 1;  // cannot start with a digit
// let my-var = 1;   // hyphens not allowed
// let let = 1;      // reserved keyword

// Best Practice: Use camelCase for variables and functions
let userFirstName = "Alice";
let totalItemCount = 100;


// ─────────────────────────────────────────────
// 6. CONSTANTS & BEST PRACTICES
// ─────────────────────────────────────────────

// Use UPPERCASE_SNAKE_CASE for true constants (like config values)
const MAX_RETRIES   = 3;
const API_BASE_URL  = "https://api.example.com";
const PI            = 3.14159;

// const with objects: the variable can't be reassigned,
// but the object's properties CAN be changed!
const user = { name: "Alice", age: 25 };
user.age = 26;          // ✅ This is allowed
// user = {};           // ❌ This would throw an error

console.log(user);      // { name: 'Alice', age: 26 }


// ─────────────────────────────────────────────
// 📝 EXERCISES — Try these yourself!
// ─────────────────────────────────────────────

// Exercise 1:
// Declare a const for your name, a let for your age, and log both.

// Exercise 2:
// What is the typeof each of these values?
// "hello", 42, true, null, undefined, {}, [], function(){}

// Exercise 3:
// What does this print and why?
// console.log("10" + 5);
// console.log("10" - 5);

// Exercise 4:
// Convert the string "3.99" to a number and add 1 to it.

// Exercise 5:
// Which of these are truthy and which are falsy?
// 0, "0", "", " ", [], null, -1, NaN
