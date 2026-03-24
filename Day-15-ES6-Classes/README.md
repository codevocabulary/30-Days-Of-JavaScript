# 📘 Day 15 — ES6 Classes

> **Level:** 🟡 Intermediate | **Estimated Time:** 2.5 hours

---

## 🎯 What You'll Learn

- Class syntax: constructor, methods, getters, setters
- Inheritance with `extends` and `super`
- Static methods and properties
- Private fields and methods with `#` (ES2022)
- Mixins — composing behavior from multiple sources
- Abstract class pattern and the `new.target` trick

---

## 📖 Concepts Covered

### 1. Basic Class Syntax

```js
class Animal {
  constructor(name, sound) {  // runs on new Animal()
    this.name  = name;
    this.sound = sound;
  }

  speak() {                   // instance method
    return `${this.name} says ${this.sound}!`;
  }

  get info() {                // getter — access as property
    return `Animal: ${this.name}`;
  }

  set nickname(val) {         // setter — runs on assignment
    this._nickname = val;
  }

  toString() {                // override built-in
    return `[Animal: ${this.name}]`;
  }
}

const dog = new Animal("Rex", "Woof");
dog.speak();   // "Rex says Woof!"
dog.info;      // "Animal: Rex" (getter)
dog.nickname = "Rocky"; // (setter)
```

---

### 2. Inheritance

```js
class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Woof"); // MUST call super() before 'this'
    this.breed = breed;
  }

  speak() {
    return `${super.speak()} (I'm a ${this.breed})`; // call parent
  }
}

const rex = new Dog("Rex", "Labrador");
rex instanceof Dog;    // true
rex instanceof Animal; // true — prototype chain!
```

---

### 3. Static Methods & Properties

```js
class MathUtils {
  static PI = 3.14159;          // class-level property
  static add(a, b) { ... }      // called on class, not instance
}

MathUtils.add(1, 2);   // ✅
new MathUtils().add(); // ❌ TypeError
```

---

### 4. Private Fields (#)

```js
class BankAccount {
  #balance;           // private — only accessible inside class
  #log = [];

  constructor(amount) { this.#balance = amount; }

  deposit(n) { this.#balance += n; this.#log.push(n); }
  get balance() { return this.#balance; }  // read-only getter
}

const acc = new BankAccount(100);
acc.deposit(50);
acc.balance;       // 150 ✅
acc.#balance;      // ❌ SyntaxError
```

---

### 5. Mixins

```js
const Serializable = (Base) => class extends Base {
  serialize() { return JSON.stringify(this); }
};

const Timestamped = (Base) => class extends Base {
  constructor(...args) {
    super(...args);
    this.createdAt = new Date();
  }
};

class User extends Serializable(Timestamped(BaseModel)) { ... }
```

---

## 💡 Key Takeaways

- `super()` must be called first in a subclass constructor before using `this`
- Static methods belong to the class, not instances — good for utility/factory methods
- Private `#fields` are truly inaccessible outside the class (syntax error, not just convention)
- Classes are syntactic sugar over prototypes — the prototype chain is still there (Day 16)
- Mixins solve the "no multiple inheritance" limitation in JavaScript

---

## 📝 Exercises

1. Create a `Shape` base class with `area()` and `perimeter()`. Extend with `Circle`, `Rectangle`, `Triangle`
2. Create a `Stack` class with `push`, `pop`, `peek`, `isEmpty`, `size` — make internal array private with `#`
3. Create a `Logger` singleton class with log levels: DEBUG, INFO, WARN, ERROR

---


## ⏭️ Next Up

**[Day 16 — Prototypes & Inheritance →](../Day-16-Prototypes-Inheritance/)**
