// ============================================================
// 🚀 DAY 05 — Objects
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. WHAT IS AN OBJECT?
// An object is a collection of KEY-VALUE pairs (properties)
// Keys are strings (or Symbols), values can be anything
// ─────────────────────────────────────────────

// Object literal syntax — most common way to create objects
let person = {
  name: "Alice",             // key: "name", value: "Alice"
  age: 30,                   // key: "age", value: 30
  isStudent: false,          // key: "isStudent", value: false
  hobbies: ["reading", "coding"], // value can be an array
  address: {                 // value can be another object (nested)
    city: "Wonderland",
    zip: "12345"
  },
  greet: function() {        // value can be a function (method)
    return `Hello, I'm ${this.name}`;
  }
};

console.log(person);
console.log(person.name);    // "Alice"
console.log(person.address.city); // "Wonderland"
console.log(person.greet()); // "Hello, I'm Alice"


// ─────────────────────────────────────────────
// 2. ACCESSING PROPERTIES
// ─────────────────────────────────────────────

let car = { make: "Toyota", model: "Camry", year: 2022 };

// Dot notation — cleaner, use when key is a valid identifier
console.log(car.make);  // "Toyota"
console.log(car.year);  // 2022

// Bracket notation — use when key is dynamic or has special characters
console.log(car["model"]); // "Camry"

let key = "make";
console.log(car[key]);  // "Toyota" — dynamic key access!

// Accessing non-existent property returns undefined
console.log(car.color); // undefined (no error)

// Bracket notation is necessary for:
let weirdObj = {
  "first name": "Alice",    // key with space
  "123": "number key",       // key starting with number
  "class": "special keyword" // reserved word
};
console.log(weirdObj["first name"]);  // "Alice"
console.log(weirdObj["123"]);         // "number key"


// ─────────────────────────────────────────────
// 3. ADDING, UPDATING & DELETING PROPERTIES
// ─────────────────────────────────────────────

let obj = { a: 1, b: 2 };

// Add a new property
obj.c = 3;
obj["d"] = 4;
console.log(obj); // { a: 1, b: 2, c: 3, d: 4 }

// Update existing property
obj.a = 100;
console.log(obj.a); // 100

// Delete a property
delete obj.d;
console.log(obj); // { a: 100, b: 2, c: 3 }

// Check if a property exists
console.log("a" in obj);      // true
console.log("d" in obj);      // false
console.log(obj.hasOwnProperty("b")); // true


// ─────────────────────────────────────────────
// 4. METHODS — Functions Inside Objects
// ─────────────────────────────────────────────

let calculator = {
  value: 0,

  // Old way: function keyword
  add: function(n) {
    this.value += n;
    return this; // returning 'this' allows method chaining!
  },

  // Modern shorthand (ES6) — preferred
  subtract(n) {
    this.value -= n;
    return this;
  },

  multiply(n) {
    this.value *= n;
    return this;
  },

  getResult() {
    return this.value;
  }
};

// Method chaining — each method returns 'this' (the object itself)
let result = calculator.add(10).multiply(3).subtract(5).getResult();
console.log(result); // 25  (10 * 3 - 5 = 25)


// ─────────────────────────────────────────────
// 5. THE 'this' KEYWORD
// 'this' refers to the object that called the method
// ─────────────────────────────────────────────

let user = {
  name: "Bob",
  age: 28,

  introduce() {
    // 'this' refers to the 'user' object here
    console.log(`I'm ${this.name}, age ${this.age}`);
  },

  // ⚠️ Arrow functions do NOT have their own 'this'
  arrowIntroduce: () => {
    // 'this' here is NOT the user object — it's the outer scope!
    console.log(this); // Window (browser) or {} (Node.js)
  }
};

user.introduce();       // "I'm Bob, age 28"
user.arrowIntroduce();  // {} or Window — not what we want!

// Rule of thumb: Use regular functions for object methods,
//               arrow functions for callbacks (Day 08 covers this in depth)


// ─────────────────────────────────────────────
// 6. OBJECT ITERATION
// ─────────────────────────────────────────────

let student = {
  name: "Charlie",
  grade: "A",
  score: 95
};

// for...in — iterates over keys
for (let key in student) {
  console.log(`${key}: ${student[key]}`);
}
// name: Charlie
// grade: A
// score: 95

// Object.keys() — returns array of keys
let keys = Object.keys(student);
console.log(keys); // ["name", "grade", "score"]

// Object.values() — returns array of values
let values = Object.values(student);
console.log(values); // ["Charlie", "A", 95]

// Object.entries() — returns array of [key, value] pairs
let entries = Object.entries(student);
console.log(entries);
// [["name", "Charlie"], ["grade", "A"], ["score", 95]]

// Destructuring in entries loop (covered in Day 10)
for (let [key, value] of Object.entries(student)) {
  console.log(`${key} = ${value}`);
}


// ─────────────────────────────────────────────
// 7. COPYING OBJECTS
// ─────────────────────────────────────────────

let original = { name: "Alice", age: 25 };

// ❌ Direct assignment — same reference! Not a copy!
let same = original;
same.age = 99;
console.log(original.age); // 99 — BOTH changed!

// ✅ Shallow copy — Object.assign
let copy1 = Object.assign({}, original);
copy1.age = 30;
console.log(original.age); // 99 — original unchanged

// ✅ Shallow copy — Spread operator (modern, preferred)
let copy2 = { ...original };
copy2.name = "Bob";
console.log(original.name); // "Alice" — original unchanged

// ⚠️ Both are SHALLOW copies — nested objects are still shared!
let deepObj = { name: "Alice", address: { city: "NY" } };
let shallowCopy = { ...deepObj };
shallowCopy.address.city = "LA"; // Modifies original too!
console.log(deepObj.address.city); // "LA" — oops!

// ✅ Deep copy — JSON method (simple but has limitations)
let deepCopy = JSON.parse(JSON.stringify(deepObj));
deepCopy.address.city = "Chicago";
console.log(deepObj.address.city); // "LA" — original safe!
// Limitations: doesn't copy functions, undefined, Date, etc.

// ✅ Deep copy — structuredClone (modern, ES2022)
let deepCopy2 = structuredClone(deepObj);
deepCopy2.address.city = "Boston";
console.log(deepObj.address.city); // "LA" — original safe!


// ─────────────────────────────────────────────
// 8. OBJECT METHODS (Static)
// ─────────────────────────────────────────────

// Object.assign — merge objects into target
let defaults = { color: "blue", size: "medium", weight: 1 };
let custom   = { color: "red", size: "large" };
let merged = Object.assign({}, defaults, custom);
console.log(merged); // { color: "red", size: "large", weight: 1 }
// custom overwrites defaults where keys match

// Object.freeze — makes object immutable
let config = Object.freeze({ apiKey: "abc123", version: 2 });
config.apiKey = "xyz"; // silently fails (or throws in strict mode)
console.log(config.apiKey); // "abc123" — unchanged

// Object.isFrozen
console.log(Object.isFrozen(config)); // true

// Object.fromEntries — converts array of [key, value] pairs to object
let entries2 = [["name", "Alice"], ["age", 25]];
let fromEntries = Object.fromEntries(entries2);
console.log(fromEntries); // { name: "Alice", age: 25 }

// Useful: transform an object's values
let prices = { apple: 1.5, banana: 0.99, cherry: 2.0 };
let doubled = Object.fromEntries(
  Object.entries(prices).map(([fruit, price]) => [fruit, price * 2])
);
console.log(doubled); // { apple: 3, banana: 1.98, cherry: 4 }


// ─────────────────────────────────────────────
// 9. SHORTHAND PROPERTY NAMES (ES6)
// ─────────────────────────────────────────────

let firstName = "Alice";
let lastName  = "Smith";
let age2      = 30;

// Old way
let person2 = { firstName: firstName, lastName: lastName, age: age2 };

// ES6 shorthand — if variable name matches key name
let person3 = { firstName, lastName, age: age2 };
console.log(person3); // { firstName: "Alice", lastName: "Smith", age: 30 }


// ─────────────────────────────────────────────
// 10. COMPUTED PROPERTY NAMES (ES6)
// ─────────────────────────────────────────────

let propName = "color";
let dynamicObj = {
  [propName]: "blue",            // computed key from variable
  [`${propName}Code`]: "#0000ff" // computed key with template literal
};
console.log(dynamicObj);
// { color: "blue", colorCode: "#0000ff" }


// ─────────────────────────────────────────────
// 📝 EXERCISES — Try these yourself!
// ─────────────────────────────────────────────

// Exercise 1:
// Create an object representing a book with title, author, year, and pages.
// Add a method 'getSummary()' that returns a description string.

// Exercise 2:
// Given an array of objects, find the person with the highest score:
// [{name:"Alice", score:85}, {name:"Bob", score:92}, {name:"Charlie", score:78}]

// Exercise 3:
// Merge these objects: {a:1, b:2}, {b:3, c:4}, {c:5, d:6}
// Expected: {a:1, b:3, c:5, d:6} (later values overwrite earlier)

// Exercise 4:
// Write a function that counts the occurrences of each character in a string.
// Input: "hello" → Output: {h:1, e:1, l:2, o:1}

// Exercise 5:
// Deep clone this object without using JSON.parse/JSON.stringify:
// {name:"Alice", scores:[1,2,3], address:{city:"NY"}}
