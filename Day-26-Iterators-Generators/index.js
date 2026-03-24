// ============================================================
// 🚀 DAY 26 — Iterators & Generators
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. THE ITERATOR PROTOCOL
// An iterator is any object with a next() method that returns
// { value: any, done: boolean }
// ─────────────────────────────────────────────

// Manual iterator
function createRange(start, end, step = 1) {
  let current = start;
  return {
    next() {
      if (current <= end) {
        const value = current;
        current += step;
        return { value, done: false };
      }
      return { value: undefined, done: true };
    }
  };
}

const range = createRange(1, 5);
console.log(range.next()); // { value: 1, done: false }
console.log(range.next()); // { value: 2, done: false }
console.log(range.next()); // { value: 3, done: false }
// ...
console.log(range.next()); // { value: 5, done: false }
console.log(range.next()); // { value: undefined, done: true }

// ─────────────────────────────────────────────
// 2. THE ITERABLE PROTOCOL
// An object is iterable if it has [Symbol.iterator]()
// that returns an iterator.
// for...of, spread, destructuring all use iterables!
// ─────────────────────────────────────────────

class Range {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end   = end;
    this.step  = step;
  }

  // Makes Range iterable — returns an iterator
  [Symbol.iterator]() {
    let current = this.start;
    const end   = this.end;
    const step  = this.step;
    return {
      next() {
        if (current <= end) {
          const value = current;
          current += step;
          return { value, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
}

const r = new Range(1, 10, 2);

// Now works with for...of
for (const n of r) process.stdout.write(n + " "); // 1 3 5 7 9
console.log();

// And spread
console.log([...r]); // [1, 3, 5, 7, 9]

// And destructuring
const [first, second, third] = new Range(10, 50, 10);
console.log(first, second, third); // 10 20 30

// ─────────────────────────────────────────────
// 3. GENERATORS — function* syntax
// Generators can PAUSE and RESUME execution!
// yield pauses, next() resumes
// ─────────────────────────────────────────────

function* simpleGenerator() {
  console.log("Start");
  yield 1;           // pause, return 1
  console.log("After 1");
  yield 2;           // pause, return 2
  console.log("After 2");
  yield 3;           // pause, return 3
  console.log("End");
  // implicit return { value: undefined, done: true }
}

const gen = simpleGenerator();
console.log(gen.next()); // "Start" { value: 1, done: false }
console.log(gen.next()); // "After 1" { value: 2, done: false }
console.log(gen.next()); // "After 2" { value: 3, done: false }
console.log(gen.next()); // "End" { value: undefined, done: true }

// Generator returns an iterator AND is iterable
const gen2 = simpleGenerator();
for (const val of gen2) console.log(val); // 1, 2, 3

// ─────────────────────────────────────────────
// 4. INFINITE GENERATORS
// Generators can generate values forever — only compute when asked!
// ─────────────────────────────────────────────

function* infiniteCounter(start = 0, step = 1) {
  let n = start;
  while (true) { // infinite loop is OK in generators!
    yield n;
    n += step;
  }
}

const counter = infiniteCounter(0, 2); // even numbers
console.log(counter.next().value); // 0
console.log(counter.next().value); // 2
console.log(counter.next().value); // 4

// Fibonacci generator
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
const first10 = Array.from({ length: 10 }, () => fib.next().value);
console.log(first10); // [0,1,1,2,3,5,8,13,21,34]

// take() utility for infinite iterables
function take(n, iterable) {
  const result = [];
  for (const val of iterable) {
    result.push(val);
    if (result.length >= n) break;
  }
  return result;
}

console.log(take(7, fibonacci())); // [0,1,1,2,3,5,8]

// ─────────────────────────────────────────────
// 5. PASSING VALUES INTO GENERATORS
// next(value) sends a value BACK to the generator at the yield point
// ─────────────────────────────────────────────

function* calculator() {
  let result = 0;
  while (true) {
    const input = yield result; // receive value from next()
    if (input === null) break;
    result += input;
  }
  return result;
}

const calc = calculator();
calc.next();       // start (first next always returns initial yield)
console.log(calc.next(10).value); // 10
console.log(calc.next(20).value); // 30
console.log(calc.next(5).value);  // 35
console.log(calc.next(null));     // { value: 35, done: true }

// ─────────────────────────────────────────────
// 6. yield* — Delegate to another iterable
// ─────────────────────────────────────────────

function* concat(...iterables) {
  for (const iterable of iterables) {
    yield* iterable; // delegate to each iterable
  }
}

const combined = concat([1,2,3], "abc", new Range(10, 12));
console.log([...combined]); // [1, 2, 3, "a", "b", "c", 10, 11, 12]

// Recursive generator (e.g., flatten)
function* flatten(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) yield* flatten(item); // recurse
    else yield item;
  }
}

console.log([...flatten([1,[2,[3,[4]]],5])]); // [1,2,3,4,5]

// ─────────────────────────────────────────────
// 7. ASYNC GENERATORS
// ─────────────────────────────────────────────

async function* fetchPages(baseUrl, totalPages) {
  for (let page = 1; page <= totalPages; page++) {
    const res  = await fetch(`${baseUrl}?page=${page}&_limit=3`);
    const data = await res.json();
    yield data;
  }
}

// Usage:
async function processAllPages() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  for await (const page of fetchPages(url, 3)) {
    console.log(`Page with ${page.length} items`);
  }
}

// ─────────────────────────────────────────────
// 8. PRACTICAL: Lazy Pipeline
// ─────────────────────────────────────────────

function* mapGen(fn, iterable) {
  for (const val of iterable) yield fn(val);
}
function* filterGen(fn, iterable) {
  for (const val of iterable) if (fn(val)) yield val;
}
function* takeGen(n, iterable) {
  let count = 0;
  for (const val of iterable) {
    yield val;
    if (++count >= n) return;
  }
}

// Lazy: only processes items that reach the end!
const lazPipeline = takeGen(5,
  filterGen(x => x % 2 === 0,
    mapGen(x => x * x,
      new Range(1, Infinity) // infinite range!
    )
  )
);
console.log([...lazPipeline]); // first 5 even squares: [4,16,36,64,100]

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────
// Exercise 1: Create an iterable LinkedList class.
// Exercise 2: Write a generator that yields prime numbers infinitely.
// Exercise 3: Implement async generator that polls an API every second.
// Exercise 4: Build a lazy range with map, filter, take as chainable methods.
