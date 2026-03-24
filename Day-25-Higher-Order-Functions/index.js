// ============================================================
// 🚀 DAY 25 — Higher-Order Functions (HOFs)
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================
// A Higher-Order Function is a function that:
// 1. Takes a function as an argument, AND/OR
// 2. Returns a function as its result

// ─────────────────────────────────────────────
// 1. FUNCTIONS AS ARGUMENTS
// ─────────────────────────────────────────────

// You already know these:
[1,2,3].map(x => x * 2);       // map takes a function
[1,2,3].filter(x => x > 1);    // filter takes a function
[1,2,3].reduce((a,b) => a+b);  // reduce takes a function

// Custom HOF
function transform(arr, transformFn) {
  const result = [];
  for (const item of arr) result.push(transformFn(item));
  return result;
}

const nums     = [1, 2, 3, 4, 5];
const doubled  = transform(nums, x => x * 2);
const squared  = transform(nums, x => x ** 2);
const asString = transform(nums, x => `Item ${x}`);

// ─────────────────────────────────────────────
// 2. FUNCTIONS AS RETURN VALUES
// ─────────────────────────────────────────────

// Multiplier factory
const multiply = factor => number => number * factor;
const double   = multiply(2);
const triple   = multiply(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15

// Comparison factory
const greaterThan = n => x => x > n;
const lessThan    = n => x => x < n;
const between     = (min, max) => x => x > min && x < max;

const isAdult    = greaterThan(17);
const isChild    = lessThan(13);
const isTeenager = between(12, 20);

console.log([5, 14, 18, 25, 10].filter(isAdult));    // [18, 25]
console.log([5, 14, 18, 25, 10].filter(isTeenager)); // [14]

// ─────────────────────────────────────────────
// 3. FUNCTION COMPOSITION
// Combine functions where output of one = input of next
// ─────────────────────────────────────────────

// compose: right-to-left (math style) f(g(h(x)))
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

// pipe: left-to-right (more readable)
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const trim       = str => str.trim();
const lower      = str => str.toLowerCase();
const removeSpaces = str => str.replace(/\s+/g, "-");
const addPrefix  = str => `slug-${str}`;

const toSlug = pipe(trim, lower, removeSpaces, addPrefix);
console.log(toSlug("  Hello World  ")); // "slug-hello-world"

// Real pipeline example
const processData = pipe(
  data => data.filter(x => x > 0),          // remove negatives
  data => data.map(x => Math.round(x)),      // round to int
  data => [...new Set(data)],                // remove duplicates
  data => data.sort((a, b) => a - b)         // sort ascending
);

console.log(processData([3.2, -1, 3.7, 2, 5.1, 2, -3, 5]));
// [2, 3, 4, 5] — wait: 3.2→3, 3.7→4, 5.1→5 after rounding

// ─────────────────────────────────────────────
// 4. CURRYING
// Transform f(a, b, c) into f(a)(b)(c)
// Each call returns a new function expecting the next argument
// ─────────────────────────────────────────────

// Manual curry
const add = a => b => c => a + b + c;
console.log(add(1)(2)(3)); // 6

// Auto-curry any function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

const sum3 = curry((a, b, c) => a + b + c);
console.log(sum3(1)(2)(3));   // 6
console.log(sum3(1, 2)(3));   // 6
console.log(sum3(1)(2, 3));   // 6
console.log(sum3(1, 2, 3));   // 6

// Practical curried utilities
const curriedMap    = curry((fn, arr) => arr.map(fn));
const curriedFilter = curry((fn, arr) => arr.filter(fn));

const doubleAll   = curriedMap(x => x * 2);
const filterEvens = curriedFilter(x => x % 2 === 0);

console.log(doubleAll([1, 2, 3]));     // [2, 4, 6]
console.log(filterEvens([1,2,3,4,5])); // [2, 4]

// ─────────────────────────────────────────────
// 5. PARTIAL APPLICATION
// Pre-fill some arguments, return function for the rest
// ─────────────────────────────────────────────

function partial(fn, ...presetArgs) {
  return (...laterArgs) => fn(...presetArgs, ...laterArgs);
}

const multiply3 = (a, b, c) => a * b * c;

const double2  = partial(multiply3, 2);        // preset a=2
const times6   = partial(multiply3, 2, 3);     // preset a=2, b=3

console.log(double2(3, 4));  // 2 * 3 * 4 = 24
console.log(times6(5));      // 2 * 3 * 5 = 30

// With built-in bind
const log = (level, message) => console.log(`[${level}] ${message}`);
const logInfo  = log.bind(null, "INFO");
const logError = log.bind(null, "ERROR");

logInfo("Server started");  // [INFO] Server started
logError("Crash!");         // [ERROR] Crash!

// ─────────────────────────────────────────────
// 6. TRANSDUCERS — Composable reducers (advanced)
// ─────────────────────────────────────────────

// Standard pipeline creates intermediate arrays:
[1,2,3,4,5]
  .filter(x => x % 2 === 0)  // creates [2, 4]
  .map(x => x * 10);          // creates [20, 40]

// Transducers combine map/filter into ONE reduce pass
const mapTransducer    = fn => reducer => (acc, val) => reducer(acc, fn(val));
const filterTransducer = fn => reducer => (acc, val) => fn(val) ? reducer(acc, val) : acc;

const append = (arr, val) => [...arr, val];

const xform = compose(
  filterTransducer(x => x % 2 === 0),  // keep evens
  mapTransducer(x => x * 10)            // multiply by 10
);

const result = [1,2,3,4,5].reduce(xform(append), []);
console.log(result); // [20, 40] — only one iteration!

// ─────────────────────────────────────────────
// 7. PRACTICAL HOF UTILITIES
// ─────────────────────────────────────────────

// Memoize
const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const val = fn(...args);
    cache.set(key, val);
    return val;
  };
};

// Debounce — wait N ms after last call
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Throttle — call at most once per N ms
const throttle = (fn, limit) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn(...args);
    }
  };
};

// Once — call only once, ignore subsequent calls
const once = fn => {
  let called = false, result;
  return (...args) => {
    if (!called) { called = true; result = fn(...args); }
    return result;
  };
};

// Flip — swap first two arguments
const flip = fn => (a, b, ...rest) => fn(b, a, ...rest);

const subtract = (a, b) => a - b;
const flippedSubtract = flip(subtract);
console.log(subtract(10, 3));        // 7
console.log(flippedSubtract(10, 3)); // -7 (3 - 10)

// Tap — for debugging in pipelines (runs side effect, returns value)
const tap = fn => value => { fn(value); return value; };

const processWithLog = pipe(
  x => x * 2,
  tap(x => console.log("After double:", x)), // debug
  x => x + 10,
  tap(x => console.log("After add:", x))      // debug
);
processWithLog(5); // logs 10, then 20

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────
// Exercise 1: Implement flatMap using reduce + map/flat.
// Exercise 2: Write a 'zipWith' function:
//   zipWith(add, [1,2,3], [4,5,6]) → [5,7,9]
// Exercise 3: Write a 'groupBy' function:
//   groupBy(x=>x%2, [1,2,3,4]) → {0:[2,4], 1:[1,3]}
// Exercise 4: Implement Function.prototype.compose using prototype extension.
