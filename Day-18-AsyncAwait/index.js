// ============================================================
// 🚀 DAY 18 — Async / Await
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// Async/Await is "syntactic sugar" over Promises — cleaner syntax
// async function always returns a Promise
// await pauses execution until the Promise resolves

// ─────────────────────────────────────────────
// 1. BASIC SYNTAX
// ─────────────────────────────────────────────

// Without async/await (Promise chain):
function getDataOld() {
  return fetch("https://api.example.com/data")
    .then(res => res.json())
    .then(data => { console.log(data); return data; })
    .catch(err => console.error(err));
}

// With async/await (much cleaner!):
async function getData() {
  try {
    const res  = await fetch("https://api.example.com/data");
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

// ─────────────────────────────────────────────
// 2. ASYNC FUNCTIONS RETURN PROMISES
// ─────────────────────────────────────────────

async function greet() {
  return "Hello!"; // automatically wrapped in Promise.resolve
}

greet().then(msg => console.log(msg)); // "Hello!"
// async/await and .then() are interchangeable

// ─────────────────────────────────────────────
// 3. ERROR HANDLING WITH TRY/CATCH
// ─────────────────────────────────────────────

async function fetchUser(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    // Catches BOTH network errors AND thrown errors
    console.error("Failed to fetch user:", error.message);
    throw error; // re-throw if caller needs to handle
  } finally {
    console.log("fetchUser completed"); // always runs
  }
}

// ─────────────────────────────────────────────
// 4. SEQUENTIAL vs PARALLEL EXECUTION
// ─────────────────────────────────────────────

// ❌ SEQUENTIAL — waits for each before starting next (slow!)
async function sequential() {
  const user1 = await fetchUser(1); // waits 1s
  const user2 = await fetchUser(2); // waits another 1s
  const user3 = await fetchUser(3); // waits another 1s
  // Total: ~3 seconds
  return [user1, user2, user3];
}

// ✅ PARALLEL — start all at once, wait for all (fast!)
async function parallel() {
  const [user1, user2, user3] = await Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ]);
  // Total: ~1 second (longest one)
  return [user1, user2, user3];
}

// ─────────────────────────────────────────────
// 5. ASYNC IN LOOPS
// ─────────────────────────────────────────────

const userIds = [1, 2, 3, 4, 5];

// ❌ forEach doesn't await properly
async function badLoop() {
  userIds.forEach(async id => {
    const user = await fetchUser(id); // these don't actually wait!
    console.log(user.name);
  });
  console.log("Done"); // runs BEFORE fetches complete!
}

// ✅ for...of with await — sequential
async function goodLoopSequential() {
  for (const id of userIds) {
    const user = await fetchUser(id);
    console.log(user.name);
  }
}

// ✅ Parallel with Promise.all + map
async function goodLoopParallel() {
  const users = await Promise.all(userIds.map(id => fetchUser(id)));
  users.forEach(user => console.log(user.name));
}

// ─────────────────────────────────────────────
// 6. TOP-LEVEL AWAIT (ES2022)
// Can use await at the top level of modules
// ─────────────────────────────────────────────

// In a module (.mjs or type="module"):
// const data = await fetch("...").then(r => r.json());
// console.log(data); // works at top level in modules!

// In regular scripts, wrap in async IIFE:
(async () => {
  const user = await fetchUser(1);
  console.log(user);
})();

// ─────────────────────────────────────────────
// 7. PRACTICAL EXAMPLE: API Service
// ─────────────────────────────────────────────

class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) throw new Error(`GET ${endpoint} failed: ${response.status}`);
    return response.json();
  }

  async post(endpoint, data) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`POST ${endpoint} failed: ${response.status}`);
    return response.json();
  }
}

const api = new ApiService("https://jsonplaceholder.typicode.com");

async function main() {
  try {
    const users = await api.get("/users");
    console.log("Users:", users.length);

    const newPost = await api.post("/posts", {
      title: "My Post",
      body: "Content here",
      userId: 1
    });
    console.log("Created post:", newPost.id);
  } catch (err) {
    console.error("API Error:", err.message);
  }
}

main();

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1: Write an async function that fetches and displays 5 random users
// Exercise 2: Write a function with timeout — if fetch takes >2s, reject with "Timeout"
// Exercise 3: Write sequential vs parallel fetches, measure and log the time difference
// Exercise 4: Create an async retry function with exponential backoff
