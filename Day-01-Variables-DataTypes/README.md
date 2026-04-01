# 📘 Day 01 — Variables & Data Types

> **Level:** 🟢 Beginner | **Estimated Time:** 1–2 hours  
> Welcome to Day 01 of your JavaScript journey! Today we’ll explore the foundation of JavaScript: **variables** and **data types**. Understanding these is essential because every program revolves around storing, manipulating, and using data. By the end of this lesson, you will know how to declare variables, identify different data types, perform type conversions, and work with truthy/falsy values.  

---

## 🎯 What You'll Learn

- The difference between `var`, `let`, and `const`
- All 8 JavaScript data types (7 primitive + 1 object)
- How to check types using `typeof`
- Implicit vs explicit type conversion
- Truthy and falsy values in conditional statements
- Variable naming rules and best practices

---

## 🧠 Introduction

Everything in JavaScript is data. Whether you’re displaying a message, storing a user’s input, calculating numbers, or fetching API results, you are working with data. Variables are like **labeled containers** that hold this data. By giving each piece of data a name, you can reference it, manipulate it, and use it throughout your program.  

Think of a variable as a box:

- The **label** identifies the box (`name`, `age`, `isStudent`)  
- The **value** is what’s stored inside (`"Aman"`, `21`, `true`)  

```javascript
// Example of a simple variable
let name = "Aman"; // "name" is the variable, "Aman" is the value
```

Variables allow programs to be flexible and maintainable. Without them, you would have to rewrite the same values over and over again.

---

## 🛠 Declaring Variables

JavaScript allows three ways to declare variables: `var`, `let`, and `const`. Each has different behavior.

### 1. var (Old Way)
```javascript
// Declaring a variable using var
var oldWay = "This is old JavaScript";

// var is function-scoped
function exampleVar() {
  var message = "Hello!";
  console.log(message); // works inside the function
}
// console.log(message); // ❌ would give an error because message is not visible here

// var can be redeclared in the same scope
var oldWay = "Redeclared"; // ✅ allowed
```

**Why avoid var?**  
- It is function-scoped, not block-scoped  
- Can be redeclared accidentally  
- Hoisting can cause confusing bugs  

---

### 2. let (Modern Variable)
```javascript
// Declaring a variable using let
let mutable = "I can change";

// let is block-scoped
if (true) {
  let insideBlock = "Visible only inside this block";
  console.log(insideBlock); // works
}
// console.log(insideBlock); // ❌ error

// let can be updated but not redeclared in the same scope
mutable = "I changed"; // ✅ allowed
// let mutable = "Trying to redeclare"; // ❌ error
```

---

### 3. const (Constant Variable)
```javascript
// Declaring a constant
const pi = 3.14;

// Cannot reassign a const
// pi = 3.1415; // ❌ error

// const objects can have their properties changed
const user = {
  name: "Aman",
  age: 21
};
user.age = 22; // ✅ allowed
user.city = "Delhi"; // ✅ allowed
```

**Rule of Thumb:**  
- Always use `const` unless you need to reassign.  
- Use `let` when the value will change.  
- Avoid `var`.

---

## 📦 Data Types in JavaScript

A **data type** defines what kind of value a variable can hold. JavaScript has **7 primitive types** and **1 non-primitive type**.

### 1. String
Represents text, enclosed in quotes.

```javascript
let firstName = "Aman";  // double quotes
let lastName = 'Sharma'; // single quotes
let fullName = `Full Name: ${firstName} ${lastName}`; // template literals
console.log(fullName); // Full Name: Aman Sharma
```

### 2. Number
Represents both integers and floating-point numbers.

```javascript
let age = 21;
let price = 99.99;

console.log("Age:", age);
console.log("Price:", price);

// Mathematical operations
let sum = age + 5;
console.log("Age plus 5:", sum);

let product = age * 2;
console.log("Age times 2:", product);
```

### 3. Boolean
Represents logical values: `true` or `false`.

```javascript
let isStudent = true;
let hasGraduated = false;

if (isStudent) {
  console.log("The person is studying.");
} else {
  console.log("The person has graduated.");
}
```

### 4. Undefined
Represents a variable declared but not assigned a value.

```javascript
let unknown;
console.log("Value of unknown:", unknown); // undefined

if (unknown === undefined) {
  console.log("This variable has no value yet.");
}
```

### 5. Null
Represents intentional absence of a value.

```javascript
let emptyValue = null;
console.log("Empty value:", emptyValue);

if (emptyValue === null) {
  console.log("The variable is intentionally empty.");
}
```

### 6. BigInt
Used for very large integers beyond JavaScript’s Number limits.

```javascript
let bigNumber = 123456789012345678901234567890n;
console.log("BigInt value:", bigNumber);
```

### 7. Symbol
Used to create unique identifiers.

```javascript
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log("Are symbols equal?", id1 === id2); // false
```

### 8. Object (Non-Primitive)
Objects store collections of key-value pairs.

```javascript
let user = {
  name: "Aman",
  age: 21,
  city: "Delhi"
};

console.log("User Name:", user.name);
console.log("User Age:", user.age);

// Add a new property
user.isStudent = true;
console.log("Updated User:", user);
```

Arrays and functions are also objects.

```javascript
let colors = ["red", "green", "blue"];
console.log("Colors:", colors);

// Access elements
console.log("First color:", colors[0]);

// Loop through array
for (let i = 0; i < colors.length; i++) {
  console.log("Color " + (i + 1) + ": " + colors[i]);
}
```

---

## 🔍 Checking Types with typeof

```javascript
let name = "Aman";
let age = 21;
let isStudent = true;
let unknown;
let emptyValue = null;
let user = { name: "Aman" };
let colors = ["red", "green"];
let greet = function() { return "Hello"; };

console.log("Type of name:", typeof name); // string
console.log("Type of age:", typeof age); // number
console.log("Type of isStudent:", typeof isStudent); // boolean
console.log("Type of unknown:", typeof unknown); // undefined
console.log("Type of emptyValue:", typeof emptyValue); // object (JavaScript quirk)
console.log("Type of user:", typeof user); // object
console.log("Type of colors:", typeof colors); // object
console.log("Type of greet:", typeof greet); // function
```

---

## 🔄 Type Conversion

JavaScript sometimes converts types automatically or allows you to convert manually.

### Implicit Conversion
```javascript
let result1 = "5" + 3; // 53 (number converted to string)
console.log("Result1:", result1);

let result2 = "5" - 3; // 2 (string converted to number)
console.log("Result2:", result2);

let result3 = true + 1; // 2 (boolean converted to number)
console.log("Result3:", result3);
```

### Explicit Conversion
```javascript
let strNumber = "42";
let actualNumber = Number(strNumber);
console.log("Explicit conversion:", actualNumber);

let num = 100;
let convertedStr = String(num);
console.log("Number as string:", convertedStr);

let boolValue = Boolean(0);
console.log("Boolean of 0:", boolValue);
```

---

## ⚖️ Truthy and Falsy Values

### Falsy Values
These are considered false in a boolean context:  
`false`, `0`, `""`, `null`, `undefined`, `NaN`

```javascript
if (0) {
  console.log("This won't run");
} else {
  console.log("0 is falsy");
}
```

### Truthy Values
Everything else is truthy, including non-empty strings, non-zero numbers, arrays, and objects.

```javascript
if ("hello") {
  console.log("Non-empty string is truthy");
}

if ([]) {
  console.log("Empty array is truthy");
}

if ({}) {
  console.log("Empty object is truthy");
}
```

---

## 🧾 Variable Naming Rules

- Use meaningful names (`firstName`, `userAge`)  
- Must start with a letter, `$`, or `_`  
- Cannot start with a number  
- Use camelCase  
- Avoid reserved words like `let`, `function`, `if`  

```javascript
let userName = "Aman";
let $price = 99;
let _count = 10;
```

Invalid:

```javascript
// let 1name = "Aman"; // ❌
```

---

## 📝 Exercises

1. Declare your name, age, and city using appropriate variables.  
2. Create an object `user` with name, age, and city properties.  
3. Create an array of 5 colors and print each using a loop.  
4. Convert a string `"10"` to number and add 5.  
5. Predict whether these values are truthy or falsy: `0`, `"0"`, `""`, `" "`, `[]`, `null`, `-1`, `NaN`.  
6. Create a function that returns a greeting using a name variable.  
7. Add a new property to the `user` object and print it.  

---

## ⏭️ Next Up

**Day 02 — Operators**  
You’ll learn arithmetic, comparison, logical, and assignment operators and how to combine variables in meaningful expressions.

---