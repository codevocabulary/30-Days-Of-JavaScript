// ===============================
// Day 01 - Variables & Data Types
// ===============================

// -------------------------------
// VARIABLES
// -------------------------------

// Using let (value can change)
let name = "Aman";
name = "Rahul"; // updated

// Using const (cannot change)
const age = 21;

// Using var (not recommended)
var city = "Delhi";

// -------------------------------
// DATA TYPES
// -------------------------------

// String (text)
let firstName = "John";

// Number
let number = 100;

// Boolean
let isLoggedIn = true;

// Undefined (no value assigned)
let x;

// Null (intentional empty)
let y = null;

// BigInt (large numbers)
let bigNumber = 1234567890123456789n;

// Symbol (unique value)
let uniqueId = Symbol("id");

// -------------------------------
// OBJECT (non-primitive)
// -------------------------------

let user = {
  name: "Aman",
  age: 21,
  isStudent: true
};

// -------------------------------
// ARRAY (list of values)
// -------------------------------

let fruits = ["apple", "banana", "mango"];

// -------------------------------
// TYPE CHECKING
// -------------------------------

console.log(typeof firstName); // string
console.log(typeof number); // number
console.log(typeof isLoggedIn); // boolean
console.log(typeof x); // undefined
console.log(typeof y); // object (bug)
console.log(typeof user); // object

// -------------------------------
// FUNCTION (for button click)
// -------------------------------

function showData() {
  // Displaying values in alert
  alert("Name: " + name);

  // Logging full data
  console.log("User:", user);
  console.log("Fruits:", fruits);
}

// -------------------------------
// IMPORTANT CONCEPT
// -------------------------------

// JavaScript is dynamically typed
let value = 10;
value = "Now I am a string";

console.log(value);

// -------------------------------
// BEST PRACTICE
// -------------------------------

// Use const by default
// Use let if value changes
// Avoid var