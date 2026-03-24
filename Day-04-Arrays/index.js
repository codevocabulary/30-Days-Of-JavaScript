// ============================================================
// 🚀 DAY 04 — Arrays
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. CREATING ARRAYS
// An array is an ordered list of values (any type)
// ─────────────────────────────────────────────

// Literal syntax — the standard way
let fruits = ["apple", "banana", "cherry"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [42, "hello", true, null, { name: "Alice" }]; // any types!
let empty = []; // empty array

// Array constructor (less common)
let arr = new Array(3);       // [empty × 3] — creates 3 empty slots
let arr2 = new Array(1, 2, 3); // [1, 2, 3]

console.log(fruits);  // ["apple", "banana", "cherry"]
console.log(fruits.length); // 3 — number of elements


// ─────────────────────────────────────────────
// 2. ACCESSING & MODIFYING ELEMENTS
// ─────────────────────────────────────────────

let colors = ["red", "green", "blue"];

// Access by index (0-based)
console.log(colors[0]); // "red"
console.log(colors[2]); // "blue"
console.log(colors[colors.length - 1]); // "blue" — last element

// Modify an element
colors[1] = "yellow";
console.log(colors); // ["red", "yellow", "blue"]

// Access beyond bounds returns undefined (no error!)
console.log(colors[10]); // undefined


// ─────────────────────────────────────────────
// 3. ADDING & REMOVING ELEMENTS
// ─────────────────────────────────────────────

let animals = ["cat", "dog"];

// push — add to END (returns new length)
animals.push("bird");
console.log(animals); // ["cat", "dog", "bird"]

// pop — remove from END (returns removed element)
let removed = animals.pop();
console.log(removed); // "bird"
console.log(animals); // ["cat", "dog"]

// unshift — add to BEGINNING (returns new length, SLOW on large arrays)
animals.unshift("fish");
console.log(animals); // ["fish", "cat", "dog"]

// shift — remove from BEGINNING (returns removed element, SLOW on large arrays)
let first = animals.shift();
console.log(first);   // "fish"
console.log(animals); // ["cat", "dog"]

// push/pop are FASTER than unshift/shift (no re-indexing needed)

// Adding multiple elements at once
animals.push("bird", "rabbit", "hamster");
console.log(animals); // ["cat", "dog", "bird", "rabbit", "hamster"]


// ─────────────────────────────────────────────
// 4. SPLICE — The All-in-One Method
// splice(startIndex, deleteCount, ...itemsToInsert)
// Modifies the array IN PLACE and returns removed elements
// ─────────────────────────────────────────────

let nums = [1, 2, 3, 4, 5];

// Delete elements
let deleted = nums.splice(1, 2); // start at index 1, remove 2 items
console.log(deleted); // [2, 3]
console.log(nums);    // [1, 4, 5]

// Insert elements (without deleting)
nums.splice(1, 0, 10, 20); // at index 1, delete 0, insert 10 and 20
console.log(nums); // [1, 10, 20, 4, 5]

// Replace elements
nums.splice(2, 1, 99); // at index 2, delete 1, insert 99
console.log(nums); // [1, 10, 99, 4, 5]


// ─────────────────────────────────────────────
// 5. SLICE — Non-Destructive Extraction
// slice(start, end) — returns new array, original unchanged
// ─────────────────────────────────────────────

let letters = ["a", "b", "c", "d", "e"];

let slice1 = letters.slice(1, 3);  // ["b", "c"] — end is exclusive
let slice2 = letters.slice(2);     // ["c", "d", "e"] — to end
let slice3 = letters.slice(-2);    // ["d", "e"] — last 2 elements
let copy   = letters.slice();      // full shallow copy

console.log(slice1);   // ["b", "c"]
console.log(letters);  // ["a", "b", "c", "d", "e"] — unchanged!


// ─────────────────────────────────────────────
// 6. SEARCHING ARRAYS
// ─────────────────────────────────────────────

let scores = [85, 92, 78, 92, 65, 92];

// indexOf — returns index of first match (-1 if not found)
console.log(scores.indexOf(92));     // 1
console.log(scores.indexOf(100));    // -1

// lastIndexOf — returns index of last match
console.log(scores.lastIndexOf(92)); // 5

// includes — true/false check (most readable)
console.log(scores.includes(78));    // true
console.log(scores.includes(100));   // false

// find — returns FIRST element matching a condition
let found = scores.find(score => score > 90);
console.log(found); // 92

// findIndex — returns INDEX of first matching element
let foundIndex = scores.findIndex(score => score > 90);
console.log(foundIndex); // 1

// findLast / findLastIndex (ES2023)
let lastFound = scores.findLast(score => score > 90);
console.log(lastFound); // 92 (last occurrence)


// ─────────────────────────────────────────────
// 7. SORTING ARRAYS
// ─────────────────────────────────────────────

// sort() — sorts IN PLACE, mutates original array!
let fruits2 = ["banana", "apple", "cherry", "avocado"];
fruits2.sort();
console.log(fruits2); // ["apple", "avocado", "banana", "cherry"]

// ⚠️ Default sort converts to strings — WRONG for numbers!
let numArr = [100, 20, 3, 1000, 50];
numArr.sort();
console.log(numArr); // [100, 1000, 20, 3, 50] ← WRONG!

// Correct: provide a compare function
numArr.sort((a, b) => a - b); // ascending
console.log(numArr); // [3, 20, 50, 100, 1000] ✅

numArr.sort((a, b) => b - a); // descending
console.log(numArr); // [1000, 100, 50, 20, 3] ✅

// How the compare function works:
// if return < 0: a comes before b
// if return > 0: b comes before a
// if return = 0: order unchanged

// reverse() — reverses the array IN PLACE
let arr3 = [1, 2, 3, 4, 5];
arr3.reverse();
console.log(arr3); // [5, 4, 3, 2, 1]


// ─────────────────────────────────────────────
// 8. JOINING & CONVERTING
// ─────────────────────────────────────────────

let words = ["Hello", "World", "JavaScript"];

// join — array to string
console.log(words.join(" "));   // "Hello World JavaScript"
console.log(words.join(", "));  // "Hello, World, JavaScript"
console.log(words.join(""));    // "HelloWorldJavaScript"

// toString — simple comma-separated
console.log(words.toString());  // "Hello,World,JavaScript"

// from a string to an array:
let str = "a,b,c";
let arr4 = str.split(",");
console.log(arr4); // ["a", "b", "c"]


// ─────────────────────────────────────────────
// 9. COMBINING ARRAYS
// ─────────────────────────────────────────────

let arr5 = [1, 2, 3];
let arr6 = [4, 5, 6];
let arr7 = [7, 8, 9];

// concat — returns new combined array
let combined = arr5.concat(arr6, arr7);
console.log(combined); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Spread operator (modern, preferred)
let combined2 = [...arr5, ...arr6, ...arr7];
console.log(combined2); // [1, 2, 3, 4, 5, 6, 7, 8, 9]


// ─────────────────────────────────────────────
// 10. CHECKING IF SOMETHING IS AN ARRAY
// ─────────────────────────────────────────────

console.log(Array.isArray([1, 2, 3]));  // true
console.log(Array.isArray("hello"));    // false
console.log(Array.isArray({ a: 1 }));   // false
// Note: typeof [] returns "object" — not useful!
console.log(typeof []);   // "object" ← that's why we use Array.isArray


// ─────────────────────────────────────────────
// 11. ITERATING OVER ARRAYS
// ─────────────────────────────────────────────

let nums2 = [10, 20, 30, 40, 50];

// for loop — classic way
for (let i = 0; i < nums2.length; i++) {
  console.log(`Index ${i}: ${nums2[i]}`);
}

// for...of — modern, clean, no index needed
for (let num of nums2) {
  console.log(num);
}

// forEach — runs a function for each element (no return value)
nums2.forEach((num, index) => {
  console.log(`${index}: ${num}`);
});

// NOTE: forEach cannot be stopped with break/continue
// Use a for loop if you need to break early


// ─────────────────────────────────────────────
// 12. USEFUL ARRAY METHODS (map, filter, reduce covered in Day 09)
// ─────────────────────────────────────────────

// flat — flattens nested arrays
let nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]] — 1 level deep
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]   — 2 levels deep
console.log(nested.flat(Infinity)); // all levels

// fill — fills array with a value
let filled = new Array(5).fill(0);
console.log(filled); // [0, 0, 0, 0, 0]

let arr8 = [1, 2, 3, 4, 5];
arr8.fill(9, 2, 4); // fill with 9 from index 2 to 4 (exclusive)
console.log(arr8); // [1, 2, 9, 9, 5]

// every — returns true if ALL elements pass the test
let allPositive = [1, 2, 3, 4].every(n => n > 0);
console.log(allPositive); // true

// some — returns true if AT LEAST ONE element passes the test
let hasNegative = [1, -2, 3].some(n => n < 0);
console.log(hasNegative); // true


// ─────────────────────────────────────────────
// 📝 EXERCISES — Try these yourself!
// ─────────────────────────────────────────────

// Exercise 1:
// Create an array of 5 numbers. Add a number to the front and back.
// Remove one from the front and one from the back.

// Exercise 2:
// Given: let arr = [1, 2, 3, 4, 5]
// Remove the middle element (3) using splice.

// Exercise 3:
// Sort this array of people by age (ascending):
// [{name:"Alice", age:30}, {name:"Bob", age:25}, {name:"Charlie", age:35}]

// Exercise 4:
// Write a function that removes all duplicate values from an array.
// Input: [1, 2, 2, 3, 4, 4, 5] → Output: [1, 2, 3, 4, 5]

// Exercise 5:
// Flatten this completely: [1, [2, [3, [4, [5]]]]]
