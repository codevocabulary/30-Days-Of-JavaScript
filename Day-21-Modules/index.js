// ============================================================
// 🚀 DAY 21 — ES Modules (import / export)
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================
// Modules let you split code into files and share functionality.
// Use in browser: <script type="module" src="app.js">
// Use in Node.js: package.json → "type": "module" OR .mjs extension

// ─────────────────────────────────────────────
// 1. NAMED EXPORTS
// Export multiple things from a file
// ─────────────────────────────────────────────

// math.js (imagine this is a separate file)
export const PI = 3.14159;

export function add(a, b)      { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }
export function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

// Or export all at once at the bottom:
// export { PI, add, subtract, multiply, divide };

// ─────────────────────────────────────────────
// 2. DEFAULT EXPORT
// Each module can have ONE default export
// ─────────────────────────────────────────────

// calculator.js
class Calculator {
  constructor() { this.result = 0; }
  add(n)      { this.result += n; return this; }
  subtract(n) { this.result -= n; return this; }
  reset()     { this.result = 0; return this; }
  getValue()  { return this.result; }
}

export default Calculator; // no name needed on import side

// ─────────────────────────────────────────────
// 3. IMPORT SYNTAX
// ─────────────────────────────────────────────

// Named imports — must match exact export names
import { add, subtract, PI } from "./math.js";

// Rename on import
import { multiply as times, divide as div } from "./math.js";

// Import all into a namespace object
import * as Math2 from "./math.js";
// Math2.add(1, 2); Math2.PI;

// Default import — you choose the name
import Calculator from "./calculator.js";

// Mixed: default + named
import Calculator2, { add as addNum } from "./calculator.js";

// Dynamic import — loads lazily at runtime
async function loadModule() {
  const module = await import("./math.js");
  console.log(module.add(1, 2)); // 3
}

// ─────────────────────────────────────────────
// 4. RE-EXPORTING (Barrel files)
// index.js that re-exports everything from a module folder
// ─────────────────────────────────────────────

// utils/index.js — re-export from multiple files:
// export { add, subtract } from "./math.js";
// export { default as Calculator } from "./calculator.js";
// export * from "./strings.js";
// export * as arrays from "./arrays.js"; // namespace re-export

// Consumer:
// import { add, Calculator, formatString } from "./utils/index.js";
// Instead of:
// import { add } from "./utils/math.js";
// import Calculator from "./utils/calculator.js";

// ─────────────────────────────────────────────
// 5. PRACTICAL MODULE EXAMPLES
// ─────────────────────────────────────────────

// api.js — API service module
const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchUser(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createUser(data) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

// constants.js
export const APP_NAME     = "MyApp";
export const API_VERSION  = "v2";
export const MAX_RETRIES  = 3;
export const THEMES       = Object.freeze({ LIGHT: "light", DARK: "dark" });

// helpers.js
export const formatDate = (date, locale = "en-US") =>
  new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(date));

export const formatCurrency = (amount, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ─────────────────────────────────────────────
// 6. MODULE PATTERNS
// ─────────────────────────────────────────────

// Singleton module — state shared across all importers
let _instance = null;
let _config   = {};

export function configure(options) {
  _config = { ..._config, ...options };
}

export function getInstance() {
  if (!_instance) _instance = { ..._config, id: Date.now() };
  return _instance;
}

// State module — encapsulated state
let state = { count: 0, user: null };

export const getState  = ()      => ({ ...state }); // return copy
export const setState  = (patch) => { state = { ...state, ...patch }; };
export const resetState = ()     => { state = { count: 0, user: null }; };

// ─────────────────────────────────────────────
// 7. DIFFERENCES: CommonJS vs ES Modules
// ─────────────────────────────────────────────

// CommonJS (Node.js traditional — .js with type:"commonjs"):
// const fs = require("fs");
// module.exports = { myFunction };
// exports.myFunction = function() {};

// ES Modules (modern standard):
// import fs from "fs";
// export function myFunction() {}
// export default myFunction;

// Key differences:
// - CJS: synchronous, dynamic (require anywhere)
// - ESM: asynchronous, static (imports analyzed at parse time)
// - ESM: tree-shakeable (bundlers can remove unused exports)
// - ESM: live bindings (imported values reflect changes)
// - Both: can coexist in Node.js with .cjs and .mjs extensions

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────
// Exercise 1: Create a utils/ folder with math.js, strings.js, arrays.js
//             and an index.js barrel file that re-exports everything.
//
// Exercise 2: Create a store.js module that manages application state
//             with subscribe/unsubscribe for changes (Observer pattern).
//
// Exercise 3: Use dynamic import() to lazy-load a heavy module
//             only when a specific button is clicked.
