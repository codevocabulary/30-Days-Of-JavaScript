// ============================================================
// 🚀 DAY 16 — Prototypes & Prototype Inheritance
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================
// Understanding prototypes is KEY to truly understanding JS.
// Classes (Day 15) are just a cleaner syntax over prototypes!

// ─────────────────────────────────────────────
// 1. EVERY OBJECT HAS A PROTOTYPE
// ─────────────────────────────────────────────

const obj = { name: "Alice" };

// __proto__ points to the prototype (don't use in production, for learning)
console.log(obj.__proto__ === Object.prototype); // true
console.log(Object.getPrototypeOf(obj));         // Object.prototype (correct way)

// obj doesn't have 'hasOwnProperty' — it's on Object.prototype
console.log(obj.hasOwnProperty("name")); // true — inherited from Object.prototype!

// Prototype chain: obj → Object.prototype → null
console.log(Object.getPrototypeOf(Object.prototype)); // null (end of chain)

// ─────────────────────────────────────────────
// 2. HOW PROPERTY LOOKUP WORKS
// JS looks up the chain until it finds the property or hits null
// ─────────────────────────────────────────────

const animal = {
  type: "Animal",
  describe() {
    return `I am a ${this.type} named ${this.name}`;
  }
};

const dog = Object.create(animal); // dog's prototype = animal
dog.name = "Rex";
dog.type = "Dog"; // shadows animal.type

console.log(dog.describe()); // "I am a Dog named Rex"
// 'describe' not on dog → found on animal prototype

console.log(dog.hasOwnProperty("name")); // true  — own property
console.log(dog.hasOwnProperty("describe")); // false — inherited

// ─────────────────────────────────────────────
// 3. CONSTRUCTOR FUNCTIONS (Pre-ES6 classes)
// The OLD way to create "classes" — still important to know!
// ─────────────────────────────────────────────

function Person(name, age) {
  // 'this' refers to the new object being created
  this.name = name;
  this.age  = age;
}

// Methods go on the prototype — shared by ALL instances (memory efficient!)
Person.prototype.greet = function() {
  return `Hi, I'm ${this.name}!`;
};

Person.prototype.isAdult = function() {
  return this.age >= 18;
};

// Create instances with 'new' keyword:
// 1. Creates a new empty object {}
// 2. Sets prototype to Person.prototype
// 3. Runs function with 'this' = new object
// 4. Returns 'this' (unless function explicitly returns an object)
const alice = new Person("Alice", 30);
const bob   = new Person("Bob", 15);

console.log(alice.greet());   // "Hi, I'm Alice!"
console.log(bob.isAdult());   // false

// Both instances share the SAME method reference (memory efficient)
console.log(alice.greet === bob.greet); // true — same function!

// ─────────────────────────────────────────────
// 4. PROTOTYPE CHAIN INHERITANCE (old way)
// ─────────────────────────────────────────────

function Employee(name, age, company) {
  Person.call(this, name, age); // borrow Person's constructor
  this.company = company;
}

// Set up prototype chain: Employee.prototype → Person.prototype
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee; // fix constructor reference!

Employee.prototype.introduce = function() {
  return `${this.greet()} I work at ${this.company}.`;
};

const emp = new Employee("Charlie", 28, "Acme Corp");
console.log(emp.introduce()); // "Hi, I'm Charlie! I work at Acme Corp."
console.log(emp instanceof Employee); // true
console.log(emp instanceof Person);   // true — prototype chain!

// ─────────────────────────────────────────────
// 5. HOW ES6 CLASSES MAP TO PROTOTYPES
// Class syntax is 100% equivalent to prototype syntax
// ─────────────────────────────────────────────

class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} speaks`; }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() { return `${super.speak()} (woof!)`; }
}

// Under the hood, this is what JS actually creates:
// Dog.prototype = Object.create(Animal.prototype)
// Dog.prototype.constructor = Dog
// Dog.prototype.speak = function() { ... }

const d = new Dog("Rex", "Lab");
console.log(Object.getPrototypeOf(d) === Dog.prototype);    // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true

// ─────────────────────────────────────────────
// 6. Object.create() — Direct prototype setting
// ─────────────────────────────────────────────

const vehicleProto = {
  start()   { return `${this.model} engine started`; },
  stop()    { return `${this.model} engine stopped`; },
  toString(){ return `[${this.type}: ${this.model}]`; }
};

function createVehicle(model, type) {
  const vehicle = Object.create(vehicleProto); // set prototype
  vehicle.model = model;
  vehicle.type  = type;
  return vehicle;
}

const car  = createVehicle("Tesla Model 3", "Car");
const bike = createVehicle("Yamaha R1", "Bike");

console.log(car.start());  // "Tesla Model 3 engine started"
console.log(bike.stop());  // "Yamaha R1 engine stopped"
console.log(Object.getPrototypeOf(car) === vehicleProto); // true

// ─────────────────────────────────────────────
// 7. PROTOTYPE POLLUTION WARNING
// Never modify built-in prototypes in production code!
// ─────────────────────────────────────────────

// ❌ BAD — modifying built-in prototypes
// Array.prototype.sum = function() { return this.reduce((a,b)=>a+b,0); }
// [1,2,3].sum(); // works but pollutes all arrays globally!

// ✅ GOOD — use standalone utility functions instead
function arraySum(arr) { return arr.reduce((a, b) => a + b, 0); }
console.log(arraySum([1, 2, 3])); // 6

// ─────────────────────────────────────────────
// 8. PROPERTY DESCRIPTORS
// Properties have hidden attributes beyond just value
// ─────────────────────────────────────────────

const person = {};
Object.defineProperty(person, "name", {
  value:        "Alice",
  writable:     false,   // can't change the value
  enumerable:   true,    // shows in for...in / Object.keys()
  configurable: false    // can't delete or redefine
});

person.name = "Bob"; // silently fails (or throws in strict mode)
console.log(person.name); // "Alice"

// Define multiple properties at once
Object.defineProperties(person, {
  age: { value: 30, writable: true, enumerable: true, configurable: true },
  id:  { value: 1,  writable: false, enumerable: false } // non-enumerable = hidden
});

console.log(Object.keys(person));          // ["name", "age"] — id is hidden!
console.log(Object.getOwnPropertyNames(person)); // ["name", "age", "id"]

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────
// Exercise 1: Implement a Vector class using prototype functions (no class syntax).
//   Support: add, subtract, magnitude, normalize, dot product.
//
// Exercise 2: Write a function 'inherits(Child, Parent)' that sets up inheritance.
//   It should fix the constructor and copy static methods too.
//
// Exercise 3: Create an observable object using defineProperty getters/setters
//   that logs every time a property is read or written.
