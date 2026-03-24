// ============================================================
// 🚀 DAY 29 — Design Patterns in JavaScript
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// Design patterns are proven solutions to common problems.
// They're templates — not copy-paste code, but mental models.

// ─────────────────────────────────────────────
// 1. SINGLETON PATTERN
// Ensures only ONE instance of a class exists
// ─────────────────────────────────────────────

class Database {
  static instance = null; // class-level variable

  constructor(config) {
    if (Database.instance) {
      return Database.instance; // return existing instance
    }
    this.config = config;
    this.connected = false;
    Database.instance = this;
  }

  connect() {
    this.connected = true;
    console.log(`Connected to ${this.config.host}`);
  }
}

const db1 = new Database({ host: "localhost" });
const db2 = new Database({ host: "different-host" });
console.log(db1 === db2); // true — same instance!
console.log(db2.config.host); // "localhost" — first config wins

// ─────────────────────────────────────────────
// 2. OBSERVER PATTERN
// Objects subscribe to events and get notified
// (Used in DOM events, Vue/React, EventEmitter)
// ─────────────────────────────────────────────

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
    return () => this.off(event, listener); // return unsubscribe fn
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(l => l !== listener);
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

const emitter = new EventEmitter();
const unsubscribe = emitter.on("data", d => console.log("Got:", d));
emitter.once("connect", () => console.log("Connected once!"));

emitter.emit("data", { id: 1, name: "Alice" }); // "Got: {id:1, name:'Alice'}"
emitter.emit("connect"); // "Connected once!"
emitter.emit("connect"); // nothing — 'once' auto-removed

unsubscribe(); // remove the listener

// ─────────────────────────────────────────────
// 3. FACTORY PATTERN
// Create objects without specifying the exact class
// ─────────────────────────────────────────────

class Rectangle {
  constructor(w, h) { this.width = w; this.height = h; }
  area() { return this.width * this.height; }
  toString() { return `Rectangle(${this.width}x${this.height})`; }
}

class Circle {
  constructor(r) { this.radius = r; }
  area() { return Math.PI * this.radius ** 2; }
  toString() { return `Circle(r=${this.radius})`; }
}

class Triangle {
  constructor(b, h) { this.base = b; this.height = h; }
  area() { return 0.5 * this.base * this.height; }
  toString() { return `Triangle(${this.base}x${this.height})`; }
}

// Factory — create shapes by type string
function createShape(type, ...args) {
  const shapes = { rectangle: Rectangle, circle: Circle, triangle: Triangle };
  const ShapeClass = shapes[type.toLowerCase()];
  if (!ShapeClass) throw new Error(`Unknown shape: ${type}`);
  return new ShapeClass(...args);
}

const shapes = [
  createShape("circle", 5),
  createShape("rectangle", 10, 4),
  createShape("triangle", 6, 8)
];
shapes.forEach(s => console.log(`${s.toString()} → area: ${s.area().toFixed(2)}`));

// ─────────────────────────────────────────────
// 4. DECORATOR PATTERN
// Add functionality to objects dynamically
// ─────────────────────────────────────────────

// Function decorators
function withLogging(fn) {
  return function(...args) {
    console.log(`Calling ${fn.name} with`, args);
    const result = fn.apply(this, args);
    console.log(`${fn.name} returned`, result);
    return result;
  };
}

function withTiming(fn) {
  return function(...args) {
    const start = performance.now();
    const result = fn.apply(this, args);
    console.log(`${fn.name} took ${(performance.now() - start).toFixed(2)}ms`);
    return result;
  };
}

function expensiveCalculation(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) sum += i;
  return sum;
}

const decoratedCalc = withTiming(withLogging(expensiveCalculation));
decoratedCalc(1000000);

// ─────────────────────────────────────────────
// 5. STRATEGY PATTERN
// Swap algorithms/behaviors at runtime
// ─────────────────────────────────────────────

// Different sorting strategies
const sortStrategies = {
  bubble(arr) {
    const a = [...arr];
    for (let i = 0; i < a.length; i++)
      for (let j = 0; j < a.length - i - 1; j++)
        if (a[j] > a[j+1]) [a[j], a[j+1]] = [a[j+1], a[j]];
    return a;
  },
  quick(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length/2)];
    const left  = arr.filter(x => x < pivot);
    const mid   = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return [...sortStrategies.quick(left), ...mid, ...sortStrategies.quick(right)];
  },
  builtin(arr) {
    return [...arr].sort((a, b) => a - b);
  }
};

class Sorter {
  setStrategy(strategy) { this.strategy = strategy; }
  sort(arr) { return this.strategy(arr); }
}

const sorter = new Sorter();
const data = [64, 34, 25, 12, 22, 11, 90];

sorter.setStrategy(sortStrategies.bubble);
console.log("Bubble:", sorter.sort(data));

sorter.setStrategy(sortStrategies.quick);
console.log("Quick:", sorter.sort(data));

// ─────────────────────────────────────────────
// 6. PROXY PATTERN
// Intercept object operations
// ─────────────────────────────────────────────

function createValidatedObject(target, validators) {
  return new Proxy(target, {
    set(obj, prop, value) {
      if (validators[prop]) {
        const error = validators[prop](value);
        if (error) throw new TypeError(`${prop}: ${error}`);
      }
      obj[prop] = value;
      return true;
    },
    get(obj, prop) {
      if (!(prop in obj)) console.warn(`Accessing undefined property: ${prop}`);
      return obj[prop];
    }
  });
}

const user = createValidatedObject({}, {
  age:   v => v < 0 || v > 150 ? "Must be 0-150" : null,
  email: v => !v.includes("@") ? "Must be valid email" : null,
  name:  v => v.length < 2 ? "Must be at least 2 chars" : null
});

user.name = "Alice"; // ✅
user.age = 30;       // ✅
user.email = "alice@example.com"; // ✅
try { user.age = -5; } catch(e) { console.error(e.message); } // validation!

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1: Implement a simple pub/sub (publish-subscribe) system
// Exercise 2: Create a Command pattern for an undo/redo text editor
// Exercise 3: Implement the Builder pattern for complex object construction
// Exercise 4: Create a Middleware pattern (like Express.js) from scratch
