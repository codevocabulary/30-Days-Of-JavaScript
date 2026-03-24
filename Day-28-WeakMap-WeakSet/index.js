// ============================================================
// 🚀 DAY 28 — WeakMap & WeakSet
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================
// WeakMap and WeakSet hold WEAK references to objects.
// If no other reference exists, the object can be garbage collected.
// This prevents memory leaks!

// ─────────────────────────────────────────────
// 1. WEAKMAP
// ─────────────────────────────────────────────
// Keys MUST be objects (not primitives)
// Keys are weakly held — GC can collect them
// NOT iterable — no forEach, no size, no keys()/values()

const weakMap = new WeakMap();

let user1 = { name: "Alice" };
let user2 = { name: "Bob" };

weakMap.set(user1, { role: "admin", lastLogin: new Date() });
weakMap.set(user2, { role: "user",  lastLogin: new Date() });

console.log(weakMap.get(user1));    // { role: "admin", ... }
console.log(weakMap.has(user2));    // true
weakMap.delete(user1);

// When user1 object is no longer referenced, it CAN be garbage collected
// AND its WeakMap entry is automatically cleaned up!
user1 = null; // user1 eligible for GC now

// ── Practical: Private class data ─────────────
// Store private data per instance without exposing it
const _private = new WeakMap();

class Person {
  constructor(name, age, ssn) {
    // Store private data in WeakMap (keyed by 'this' instance)
    _private.set(this, { ssn, age });
    this.name = name; // public
  }

  getAge()  { return _private.get(this).age; }
  checkSSN(ssn) { return _private.get(this).ssn === ssn; }
  birthday() { _private.get(this).age++; }
}

const alice = new Person("Alice", 30, "123-45-6789");
console.log(alice.name);          // "Alice" — public
console.log(alice.getAge());      // 30
console.log(alice.checkSSN("123-45-6789")); // true
// _private.get(alice).ssn        // SSN accessible only via WeakMap

// When alice is GC'd, the private data is also cleaned up — no leak!

// ── Practical: DOM element metadata ───────────
const elementMeta = new WeakMap();

function annotate(el, data) {
  elementMeta.set(el, { ...elementMeta.get(el), ...data });
}

function getMeta(el) {
  return elementMeta.get(el) || {};
}

// In a real app:
// const btn = document.querySelector("#btn");
// annotate(btn, { clickCount: 0, lastClicked: null });
// btn.addEventListener("click", () => {
//   const meta = getMeta(btn);
//   annotate(btn, { clickCount: meta.clickCount + 1, lastClicked: Date.now() });
// });
// When btn is removed from DOM and all refs drop, metadata is GC'd too!

// ── Practical: Memoize for objects ────────────
const resultCache = new WeakMap();

function memoizeForObject(fn) {
  return function(obj, ...args) {
    if (!resultCache.has(obj)) resultCache.set(obj, new Map());
    const objCache = resultCache.get(obj);
    const key = JSON.stringify(args);
    if (!objCache.has(key)) objCache.set(key, fn(obj, ...args));
    return objCache.get(key);
  };
}

// ─────────────────────────────────────────────
// 2. WEAKSET
// ─────────────────────────────────────────────
// Values MUST be objects
// Weakly holds objects — GC can collect them
// NOT iterable — no size, no forEach, no iteration

const weakSet = new WeakSet();

let obj1 = { id: 1 };
let obj2 = { id: 2 };
let obj3 = { id: 3 };

weakSet.add(obj1);
weakSet.add(obj2);
weakSet.add(obj1); // duplicate — still only one entry

console.log(weakSet.has(obj1)); // true
console.log(weakSet.has(obj3)); // false
weakSet.delete(obj2);

obj1 = null; // obj1 eligible for GC — auto-cleaned from WeakSet

// ── Practical: Visited tracking without leaks ─
const visited = new WeakSet();

function processNode(node) {
  if (visited.has(node)) {
    console.log("Already processed:", node.id);
    return;
  }
  visited.add(node);
  console.log("Processing:", node.id);
  // ... do work
}

// ── Practical: Circular reference detection ───
function detectCircular(obj, seen = new WeakSet()) {
  if (typeof obj !== "object" || obj === null) return false;
  if (seen.has(obj)) return true; // circular!
  seen.add(obj);
  return Object.values(obj).some(val => detectCircular(val, seen));
}

const normal = { a: 1, b: { c: 2 } };
const circular = { a: 1 };
circular.self = circular; // circular reference!

console.log(detectCircular(normal));   // false
console.log(detectCircular(circular)); // true

// ── Practical: Processed set for DOM nodes ────
const rendered = new WeakSet();

function renderOnce(component) {
  if (rendered.has(component)) return; // skip if already rendered
  rendered.add(component);
  console.log("Rendering:", component.id);
  // ... render logic
  // When component is removed, it's auto-cleaned from WeakSet
}

// ─────────────────────────────────────────────
// 3. MAP vs WEAKMAP vs OBJECT COMPARISON
// ─────────────────────────────────────────────

//                    Map        WeakMap      Object
// Key types:         any        objects only  strings/symbols
// Iterable:          ✅         ❌            ✅
// .size:             ✅         ❌            ❌ (Object.keys)
// GC-safe:           ❌         ✅            ❌
// Use case:          general    private data  config/data

// ─────────────────────────────────────────────
// 4. WHEN TO USE WEAKMAP/WEAKSET
// ─────────────────────────────────────────────

// ✅ Private data for class instances
// ✅ Metadata for DOM elements or objects you don't own
// ✅ Caches where entries should disappear when object is gone
// ✅ Marking/tagging objects without preventing GC
// ✅ Circular reference detection

// ❌ When you need to iterate all entries
// ❌ When keys are primitives
// ❌ When you need the count of stored items

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────
// Exercise 1: Use WeakMap to add private #balance and #pin to a BankCard class
//             without using actual private fields (#).
//
// Exercise 2: Build a cache using WeakMap that stores computed properties
//             of objects, auto-cleaning when objects are GC'd.
//
// Exercise 3: Use WeakSet to implement a "sealed" object system —
//             prevent adding properties to sealed objects.
