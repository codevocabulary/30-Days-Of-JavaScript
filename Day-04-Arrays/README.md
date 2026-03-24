# 📘 Day 04 — Arrays

> **Level:** 🟢 Beginner | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Creating, accessing, and modifying arrays
- Adding and removing elements with push/pop/shift/unshift
- splice() for in-place editing vs slice() for non-destructive extraction
- Searching arrays with indexOf, find, includes
- Sorting, reversing, joining, and combining arrays
- Iterating with for, for...of, and forEach

---

## 📖 Concepts Covered

### 1. Creating Arrays

```js
const fruits  = ["apple", "banana", "cherry"]; // array literal ✅
const mixed   = [42, "hello", true, null, {}];  // any types allowed
const empty   = [];
const matrix  = [[1,2],[3,4],[5,6]];            // nested arrays
```

---

### 2. Accessing Elements

```js
const arr = ["a", "b", "c", "d"];
arr[0]                  // "a" — first element
arr[arr.length - 1]     // "d" — last element
arr[99]                 // undefined (no error)
arr.length              // 4
```

---

### 3. Adding & Removing

| Method | Action | Returns | Mutates? |
|--------|--------|---------|---------|
| `push(...items)` | Add to END | new length | ✅ |
| `pop()` | Remove from END | removed item | ✅ |
| `unshift(...items)` | Add to START | new length | ✅ |
| `shift()` | Remove from START | removed item | ✅ |

```js
const arr = [1, 2, 3];
arr.push(4);      // [1, 2, 3, 4]
arr.pop();        // [1, 2, 3]
arr.unshift(0);   // [0, 1, 2, 3]
arr.shift();      // [1, 2, 3]
```

> ⚡ `push`/`pop` are faster than `unshift`/`shift` (no re-indexing needed).

---

### 4. splice() — The All-in-One Method

```js
// splice(startIndex, deleteCount, ...itemsToInsert)
const arr = [1, 2, 3, 4, 5];

arr.splice(1, 2)         // removes 2 items at index 1 → returns [2,3]
arr.splice(1, 0, 10, 20) // insert 10,20 at index 1 without removing
arr.splice(2, 1, 99)     // replace item at index 2 with 99
```

⚠️ `splice()` **mutates** the original array!

---

### 5. slice() — Non-Destructive Extraction

```js
const arr = ["a", "b", "c", "d", "e"];

arr.slice(1, 3)   // ["b", "c"] — from index 1 up to (not including) 3
arr.slice(2)      // ["c", "d", "e"] — from index 2 to end
arr.slice(-2)     // ["d", "e"] — last 2 elements
arr.slice()       // full shallow copy — original unchanged!
```

✅ `slice()` always returns a **new array** — original is never modified.

---

### 6. Searching

```js
const nums = [10, 20, 30, 20, 40];

nums.indexOf(20)              // 1 — index of first match (-1 if not found)
nums.lastIndexOf(20)          // 3 — index of last match
nums.includes(30)             // true
nums.find(n => n > 25)        // 30 — first element matching condition
nums.findIndex(n => n > 25)   // 2 — index of first match
nums.every(n => n > 0)        // true — all pass?
nums.some(n => n > 35)        // true — any pass?
```

---

### 7. Sorting

```js
// String sort (default)
["banana","apple","cherry"].sort() // ["apple","banana","cherry"]

// ⚠️ Number sort — default is WRONG:
[100, 20, 3].sort()            // [100, 20, 3] ← sorted as strings!

// ✅ Correct number sort with compare function:
[100, 20, 3].sort((a,b) => a - b)  // [3, 20, 100] ascending
[100, 20, 3].sort((a,b) => b - a)  // [100, 20, 3] descending
```

---

### 8. Iterating

```js
const arr = [10, 20, 30];

// for loop — when you need index control
for (let i = 0; i < arr.length; i++) console.log(arr[i]);

// for...of — cleanest for simple iteration
for (const item of arr) console.log(item);

// forEach — runs callback for each item (no return value)
arr.forEach((item, index) => console.log(index, item));
```

---

### 9. Useful Methods

```js
[1,[2,[3]]].flat(Infinity)     // [1,2,3] — fully flatten
new Array(5).fill(0)           // [0,0,0,0,0]
Array.isArray([1,2,3])         // true
Array.from("hello")            // ["h","e","l","l","o"]
Array.from({length:5},(_,i)=>i)// [0,1,2,3,4]
[1,2].concat([3,4],[5,6])      // [1,2,3,4,5,6]
[...arr1, ...arr2]             // same, with spread (preferred)
```

---

## 💡 Key Takeaways

- `splice()` mutates; `slice()` does not — know which one to use
- Always provide a compare function when sorting numbers
- `push`/`pop` (end) are faster than `shift`/`unshift` (beginning)
- Use `Array.isArray()` to check for arrays — `typeof []` returns `"object"`
- `find()` returns the value; `findIndex()` returns the index

---

## 📝 Exercises

1. Create an array of 5 numbers, add to front and back, then remove from both ends
2. Remove the middle element from `[1, 2, 3, 4, 5]` using `splice`
3. Sort `[{name:"Alice",age:30},{name:"Bob",age:25}]` by age ascending
4. Write a function to remove all duplicate values from an array
5. Fully flatten `[1, [2, [3, [4, [5]]]]]`

---


## ⏭️ Next Up

**[Day 05 — Objects →](../Day-05-Objects/)**
