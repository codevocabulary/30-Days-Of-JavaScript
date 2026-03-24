// ============================================================
// 🚀 DAY 15 — ES6 Classes
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. CLASS BASICS
// ─────────────────────────────────────────────

class Animal {
  constructor(name, sound) {
    this.name  = name;
    this.sound = sound;
  }
  speak() { return `${this.name} says ${this.sound}!`; }
  get info() { return `Animal: ${this.name}`; }
  set nickname(value) {
    if (value.length < 2) throw new Error("Too short");
    this._nickname = value;
  }
  get nickname() { return this._nickname || this.name; }
  toString() { return `[Animal: ${this.name}]`; }
}

const dog = new Animal("Rex", "Woof");
console.log(dog.speak());   // "Rex says Woof!"
console.log(dog.info);      // "Animal: Rex"
dog.nickname = "Rocky";
console.log(dog.nickname);  // "Rocky"

// ─────────────────────────────────────────────
// 2. INHERITANCE — extends & super
// ─────────────────────────────────────────────

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Woof"); // MUST call super() before 'this'
    this.breed = breed;
  }
  speak() {
    return `${super.speak()} (I'm a ${this.breed})`;
  }
  fetch(item) { return `${this.name} fetches the ${item}!`; }
}

class Cat extends Animal {
  constructor(name, indoor = true) {
    super(name, "Meow");
    this.indoor = indoor;
  }
  speak() {
    return `${super.speak()} (${this.indoor ? "inside" : "outside"} cat)`;
  }
}

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.speak());       // "Rex says Woof! (I'm a German Shepherd)"
console.log(rex.fetch("ball")); // "Rex fetches the ball!"
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true

// ─────────────────────────────────────────────
// 3. STATIC METHODS & PROPERTIES
// Belong to the CLASS, not instances
// ─────────────────────────────────────────────

class MathHelper {
  static PI = 3.14159265;
  static add(a, b) { return a + b; }
  static circleArea(r) { return MathHelper.PI * r ** 2; }
  static fromExpression(expr) {
    const [a, op, b] = expr.split(" ");
    const ops = { "+": (x,y)=>x+y, "-": (x,y)=>x-y, "*": (x,y)=>x*y };
    return ops[op]?.(+a, +b) ?? null;
  }
}

console.log(MathHelper.add(5, 3));              // 8
console.log(MathHelper.circleArea(10).toFixed(2)); // 314.16
console.log(MathHelper.fromExpression("10 * 5")); // 50

// ─────────────────────────────────────────────
// 4. PRIVATE FIELDS & METHODS (#) — ES2022
// Truly private — NOT accessible outside class
// ─────────────────────────────────────────────

class BankAccount {
  #balance;
  #owner;
  #log = [];

  constructor(owner, balance) {
    this.#owner   = owner;
    this.#balance = balance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Must be positive");
    this.#balance += amount;
    this.#record("deposit", amount);
    return this; // enable chaining
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
    this.#record("withdrawal", amount);
    return this;
  }

  #record(type, amount) { // private method
    this.#log.push({ type, amount, balance: this.#balance });
  }

  get balance() { return this.#balance; }

  printStatement() {
    console.log(`--- ${this.#owner}'s Account ---`);
    console.log(`Balance: $${this.#balance}`);
    this.#log.forEach(t =>
      console.log(`  ${t.type}: $${t.amount} → $${t.balance}`)
    );
  }
}

const account = new BankAccount("Alice", 1000);
account.deposit(500).withdraw(200).deposit(100);
account.printStatement();
// console.log(account.#balance); // ❌ SyntaxError

// ─────────────────────────────────────────────
// 5. MIXINS — Compose behavior from multiple sources
// JS doesn't have multiple inheritance, but mixins solve this
// ─────────────────────────────────────────────

const Serializable = (Base) => class extends Base {
  serialize()               { return JSON.stringify(this); }
  static deserialize(json)  { return Object.assign(new this(), JSON.parse(json)); }
};

const Timestamped = (Base) => class extends Base {
  constructor(...args) {
    super(...args);
    this.createdAt = new Date().toISOString();
  }
};

const Validatable = (Base) => class extends Base {
  validate(rules) {
    return Object.entries(rules)
      .map(([f, fn]) => fn(this[f]) ? `${f}: ${fn(this[f])}` : null)
      .filter(Boolean);
  }
};

class BaseEntity {
  constructor(data) { Object.assign(this, data); }
}

class User extends Serializable(Timestamped(Validatable(BaseEntity))) {
  validateAll() {
    return this.validate({
      name:  v => !v || v.length < 2 ? "Name too short" : null,
      email: v => !v?.includes("@") ? "Invalid email" : null,
    });
  }
}

const user = new User({ name: "Alice", email: "alice@example.com" });
console.log(user.serialize());      // JSON
console.log(user.validateAll());    // []
console.log(user.createdAt);        // timestamp

// ─────────────────────────────────────────────
// 6. ABSTRACT CLASS PATTERN
// JS has no 'abstract' keyword, but we can simulate it
// ─────────────────────────────────────────────

class Shape {
  constructor(color = "black") {
    if (new.target === Shape) {
      throw new Error("Shape is abstract — cannot instantiate directly");
    }
    this.color = color;
  }

  // Abstract methods — subclasses MUST override these
  area()      { throw new Error("area() must be implemented"); }
  perimeter() { throw new Error("perimeter() must be implemented"); }

  // Concrete method — shared by all subclasses
  describe() {
    return `A ${this.color} ${this.constructor.name} with area ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(radius, color) {
    super(color);
    this.radius = radius;
  }
  area()      { return Math.PI * this.radius ** 2; }
  perimeter() { return 2 * Math.PI * this.radius; }
}

class Rectangle extends Shape {
  constructor(w, h, color) {
    super(color);
    this.width = w; this.height = h;
  }
  area()      { return this.width * this.height; }
  perimeter() { return 2 * (this.width + this.height); }
}

const shapes = [new Circle(5, "red"), new Rectangle(10, 4, "blue")];
shapes.forEach(s => console.log(s.describe()));
// "A red Circle with area 78.54"
// "A blue Rectangle with area 40.00"

// try { new Shape(); } // ❌ "Shape is abstract"

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────
// Exercise 1: Create a Stack<T> class with push, pop, peek, isEmpty, size.
//             Make internal array private.
// Exercise 2: Build a Vehicle → Car → ElectricCar class hierarchy.
//             Add relevant properties and methods at each level.
// Exercise 3: Create a Logger class (Singleton) with log levels:
//             DEBUG, INFO, WARN, ERROR — only logs at or above set level.
