// ============================================================
// 🚀 DAY 27 — Map & Set
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. SET — Collection of UNIQUE values
// ─────────────────────────────────────────────

// Create
const set = new Set([1, 2, 3, 2, 1]); // duplicates removed
console.log(set); // Set {1, 2, 3}
console.log(set.size); // 3 — use .size, not .length

// Add / Delete / Has
set.add(4);
set.add(2);          // already exists — no change
set.delete(1);
console.log(set.has(2)); // true
console.log(set.has(1)); // false

// Iterate
for (const val of set) console.log(val); // 2, 3, 4
set.forEach(val => console.log(val));     // same

// Convert to array
const arr = [...set];               // spread
const arr2 = Array.from(set);       // Array.from

// Clear
// set.clear();

// ── Use Cases ────────────────────────────────

// Remove duplicates from array
const numbers = [1,2,2,3,3,3,4,5,5];
const unique  = [...new Set(numbers)];
console.log(unique); // [1,2,3,4,5]

// Set operations
const setA = new Set([1,2,3,4]);
const setB = new Set([3,4,5,6]);

// Union (all elements from both)
const union = new Set([...setA, ...setB]);
console.log([...union]); // [1,2,3,4,5,6]

// Intersection (only elements in BOTH)
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log([...intersection]); // [3,4]

// Difference (in A but NOT in B)
const difference = new Set([...setA].filter(x => !setB.has(x)));
console.log([...difference]); // [1,2]

// Check if A is a subset of B
const isSubset = (a, b) => [...a].every(x => b.has(x));
const setC = new Set([3,4]);
console.log(isSubset(setC, setA)); // true (3,4 both in A)

// ─────────────────────────────────────────────
// 2. MAP — Key-Value pairs with ANY key type
// Unlike objects, Map keys can be ANYTHING (objects, functions, etc.)
// ─────────────────────────────────────────────

// Create
const map = new Map();
map.set("name", "Alice");   // string key
map.set(1, "one");           // number key
map.set(true, "yes");        // boolean key

const objKey = { id: 1 };
map.set(objKey, "object as key!"); // object key!

// Get / Has / Delete
console.log(map.get("name"));    // "Alice"
console.log(map.get(objKey));    // "object as key!"
console.log(map.has(1));         // true
console.log(map.size);           // 4
map.delete(true);

// Initialize from array of [key, value] pairs
const map2 = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3]
]);

// Iterate
for (const [key, value] of map2) {
  console.log(`${key} → ${value}`);
}

map2.forEach((value, key) => console.log(`${key}: ${value}`));

// Get all keys / values / entries
console.log([...map2.keys()]);   // ["a","b","c"]
console.log([...map2.values()]); // [1,2,3]
console.log([...map2.entries()]); // [["a",1],["b",2],["c",3]]

// Convert to/from Object
const obj  = Object.fromEntries(map2); // Map → Object
const map3 = new Map(Object.entries(obj)); // Object → Map

// ─────────────────────────────────────────────
// 3. MAP vs OBJECT — When to use which
// ─────────────────────────────────────────────

// Use MAP when:
// ✅ Keys are not strings (numbers, objects, functions)
// ✅ Keys are added/removed dynamically
// ✅ Need to know size easily (map.size vs Object.keys(obj).length)
// ✅ Iteration order matters (Map preserves insertion order)
// ✅ Frequent additions/deletions

// Use OBJECT when:
// ✅ Working with JSON
// ✅ Keys are known strings/identifiers
// ✅ Need prototype-based methods
// ✅ Destructuring / rest properties

// ─────────────────────────────────────────────
// 4. PRACTICAL MAP PATTERNS
// ─────────────────────────────────────────────

// Word frequency counter
function wordFrequency(text) {
  const freq = new Map();
  text.toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/\s+/)
      .forEach(word => {
        freq.set(word, (freq.get(word) || 0) + 1);
      });
  return freq;
}

const freq = wordFrequency("the quick brown fox jumps over the lazy dog the");
console.log([...freq.entries()].sort((a,b) => b[1]-a[1]).slice(0,3));
// [["the", 3], ["quick",1], ...] top 3 words

// Cache/Memoize with Map
function createMemoized(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const memoFib = createMemoized(function fib(n) {
  if (n <= 1) return n;
  return memoFib(n-1) + memoFib(n-2);
});
console.log(memoFib(40)); // instant!

// Graph adjacency list using Map
class Graph {
  #adj = new Map();

  addVertex(v) {
    if (!this.#adj.has(v)) this.#adj.set(v, new Set());
  }

  addEdge(u, v) {
    this.addVertex(u); this.addVertex(v);
    this.#adj.get(u).add(v);
    this.#adj.get(v).add(u);
  }

  neighbors(v) { return [...(this.#adj.get(v) || [])]; }

  bfs(start) {
    const visited = new Set([start]);
    const queue   = [start];
    const result  = [];
    while (queue.length) {
      const node = queue.shift();
      result.push(node);
      for (const neighbor of this.neighbors(node)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }
}

const g = new Graph();
g.addEdge(1, 2); g.addEdge(1, 3); g.addEdge(2, 4); g.addEdge(3, 4);
console.log(g.bfs(1)); // [1,2,3,4] — breadth-first order

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────
// Exercise 1: Implement an LRU (Least Recently Used) cache using Map.
// Exercise 2: Find the first non-repeating character in a string using Map.
// Exercise 3: Group anagrams together: ["eat","tea","tan","ate","nat","bat"]
//   → [["eat","tea","ate"],["tan","nat"],["bat"]]
// Exercise 4: Two Sum: find indices of two numbers that add up to target using Map.
