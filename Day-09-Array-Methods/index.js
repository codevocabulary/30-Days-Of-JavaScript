// ============================================================
// 🚀 DAY 09 — Array Methods (map, filter, reduce & more)
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

const products = [
  { name: "Laptop",  price: 999,  category: "Electronics", inStock: true  },
  { name: "Phone",   price: 599,  category: "Electronics", inStock: false },
  { name: "Desk",    price: 299,  category: "Furniture",   inStock: true  },
  { name: "Chair",   price: 149,  category: "Furniture",   inStock: true  },
  { name: "Monitor", price: 399,  category: "Electronics", inStock: true  },
];

// ─────────────────────────────────────────────
// 1. map() — Transform every element
// Returns a NEW array of the same length
// Does NOT modify original
// ─────────────────────────────────────────────
const names = products.map(p => p.name);
console.log(names); // ["Laptop", "Phone", "Desk", "Chair", "Monitor"]

const pricesWithTax = products.map(p => ({
  name: p.name,
  priceWithTax: (p.price * 1.1).toFixed(2)
}));
console.log(pricesWithTax);

// map receives: (element, index, array)
const indexed = ["a", "b", "c"].map((item, index) => `${index}: ${item}`);
console.log(indexed); // ["0: a", "1: b", "2: c"]

// ─────────────────────────────────────────────
// 2. filter() — Keep elements matching a condition
// Returns a NEW array (could be shorter)
// ─────────────────────────────────────────────
const inStock    = products.filter(p => p.inStock);
const electronics = products.filter(p => p.category === "Electronics");
const affordable  = products.filter(p => p.price < 400);

console.log(inStock.length);     // 4
console.log(electronics.length); // 3
console.log(affordable.map(p => p.name)); // ["Desk", "Chair"]

// ─────────────────────────────────────────────
// 3. reduce() — Reduce array to a single value
// reduce(callback, initialValue)
// callback receives: (accumulator, current, index, array)
// ─────────────────────────────────────────────

// Sum all prices
const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
console.log(totalPrice); // 2445

// Find most expensive
const mostExpensive = products.reduce((max, p) => 
  p.price > max.price ? p : max
);
console.log(mostExpensive.name); // "Laptop"

// Group by category (reduce to an object)
const grouped = products.reduce((groups, product) => {
  const key = product.category;
  if (!groups[key]) groups[key] = [];
  groups[key].push(product.name);
  return groups;
}, {});
console.log(grouped);
// { Electronics: ["Laptop","Phone","Monitor"], Furniture: ["Desk","Chair"] }

// Count items per category
const counts = products.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] || 0) + 1;
  return acc;
}, {});
console.log(counts); // { Electronics: 3, Furniture: 2 }

// ─────────────────────────────────────────────
// 4. CHAINING METHODS
// Methods can be chained since each returns a new array
// ─────────────────────────────────────────────

// Total price of in-stock electronics over $400
const result = products
  .filter(p => p.inStock)
  .filter(p => p.category === "Electronics")
  .filter(p => p.price > 400)
  .reduce((sum, p) => sum + p.price, 0);
console.log(result); // 1398 (Laptop 999 + Monitor 399)

// Get sorted names of affordable in-stock items
const names2 = products
  .filter(p => p.inStock && p.price < 500)
  .map(p => p.name)
  .sort();
console.log(names2); // ["Chair", "Desk", "Monitor"]

// ─────────────────────────────────────────────
// 5. forEach() — Execute for each element, no return value
// Use when you don't need a new array (side effects)
// ─────────────────────────────────────────────
products.forEach((product, index) => {
  console.log(`${index + 1}. ${product.name} - $${product.price}`);
});
// Note: forEach cannot be chained (returns undefined)
// Note: forEach cannot be stopped with break

// ─────────────────────────────────────────────
// 6. find() & findIndex()
// ─────────────────────────────────────────────
const laptop = products.find(p => p.name === "Laptop");
console.log(laptop); // full laptop object

const phoneIndex = products.findIndex(p => p.name === "Phone");
console.log(phoneIndex); // 1

// ─────────────────────────────────────────────
// 7. some() & every()
// ─────────────────────────────────────────────
const anyOutOfStock  = products.some(p => !p.inStock);
const allAffordable  = products.every(p => p.price < 1000);
console.log(anyOutOfStock); // true
console.log(allAffordable); // true

// ─────────────────────────────────────────────
// 8. flatMap() — map + flat in one step
// ─────────────────────────────────────────────
const sentences = ["Hello World", "Foo Bar"];
const words = sentences.flatMap(s => s.split(" "));
console.log(words); // ["Hello", "World", "Foo", "Bar"]

// ─────────────────────────────────────────────
// 9. Array.from() — Create array from iterable or array-like
// ─────────────────────────────────────────────
console.log(Array.from("hello")); // ["h","e","l","l","o"]
console.log(Array.from({length: 5}, (_, i) => i + 1)); // [1,2,3,4,5]
console.log(Array.from(new Set([1,1,2,2,3]))); // [1,2,3]

// ─────────────────────────────────────────────
// 10. Array.of() & Array.fill()
// ─────────────────────────────────────────────
console.log(Array.of(1, 2, 3)); // [1, 2, 3]
console.log(new Array(5).fill(0)); // [0, 0, 0, 0, 0]

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1: Given students array, get names of students who passed (score >= 60)
const students = [
  {name:"Alice", score:92}, {name:"Bob", score:45}, 
  {name:"Carol", score:78}, {name:"Dave", score:55}
];
// Expected: ["Alice", "Carol"]

// Exercise 2: Using reduce, implement your own map() function.

// Exercise 3: Flatten [[1,2],[3,4],[5,6]] to [1,2,3,4,5,6] using reduce.

// Exercise 4: Find the second largest number in an array without sorting.

// Exercise 5: Group these words by their first letter:
// ["apple","ant","banana","bear","cherry","cat"]
// Expected: {a:["apple","ant"], b:["banana","bear"], c:["cherry","cat"]}
