# 📘 Day 16 — Prototypes & Prototype Inheritance

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- Every object has a prototype — how the chain works
- How property lookup walks the chain
- Constructor functions — the pre-ES6 way to create classes
- How `class` syntax maps to prototypes under the hood
- `Object.create()` for direct prototype control
- Property descriptors (`writable`, `enumerable`, `configurable`)

---

## 📖 Concepts Covered

### 1. Prototype Chain

```
myObject → Object.prototype → null
myArray  → Array.prototype  → Object.prototype → null
myFunc   → Function.prototype → Object.prototype → null
```

```js
const obj = { name: "Alice" };
Object.getPrototypeOf(obj) === Object.prototype; // true
obj.hasOwnProperty("name"); // true — inherited from Object.prototype!
```

---

### 2. How Property Lookup Works

```js
const animal = { describe() { return `I am ${this.name}`; } };
const dog = Object.create(animal); // dog's [[Prototype]] = animal
dog.name = "Rex";

dog.describe(); // "I am Rex" — 'describe' found on animal (prototype)
dog.hasOwnProperty("describe"); // false — it's inherited
dog.hasOwnProperty("name");     // true  — own property
```

---

### 3. Constructor Functions (Pre-ES6)

```js
function Person(name, age) {
  this.name = name;  // own properties per instance
  this.age  = age;
}

// Methods on prototype — shared by ALL instances (memory efficient!)
Person.prototype.greet = function() {
  return `Hi, I'm ${this.name}`;
};

const alice = new Person("Alice", 30);
const bob   = new Person("Bob", 25);

alice.greet === bob.greet; // true — same function reference!
```

**What `new` does:**
1. Creates `{}`
2. Sets `__proto__` to `Constructor.prototype`
3. Calls constructor with `this` = new object
4. Returns `this`

---

### 4. Prototype Chain Inheritance (Old Way)

```js
function Employee(name, age, company) {
  Person.call(this, name, age);  // inherit own properties
  this.company = company;
}

// Set up chain: Employee.prototype → Person.prototype
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee; // fix constructor reference!

Employee.prototype.introduce = function() {
  return `${this.greet()} I work at ${this.company}`;
};
```

---

### 5. Classes == Prototypes

```js
class Dog extends Animal { ... }
// Is exactly equivalent to:
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
// + method assignments on Dog.prototype
```

---

### 6. Property Descriptors

```js
Object.defineProperty(obj, "id", {
  value:        42,
  writable:     false,  // can't change value
  enumerable:   false,  // hidden from for...in / Object.keys()
  configurable: false   // can't delete or redefine
});
```

---

## 💡 Key Takeaways

- Classes are syntactic sugar — the prototype chain is the true mechanism
- Methods on the prototype are shared; properties on `this` are per-instance
- `Object.getPrototypeOf(obj)` is the correct way to get the prototype (not `__proto__`)
- Understanding prototypes is essential for debugging and performance optimization
- Never modify built-in prototypes (`Array.prototype.myMethod = ...`) in production

---

## 📝 Exercises

1. Implement a `Vector` class using **only** prototype functions (no `class` syntax)
2. Write an `inherits(Child, Parent)` utility function that sets up the full chain
3. Create a reactive object using `defineProperty` that logs every get/set

---


## ⏭️ Next Up

**[Day 17 — Promises →](../Day-17-Promises/)**
