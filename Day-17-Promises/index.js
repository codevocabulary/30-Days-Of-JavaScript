// ============================================================
// 🚀 DAY 17 — Promises
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. THE PROBLEM: CALLBACK HELL
// ─────────────────────────────────────────────

// Before promises, async operations used callbacks:
getUser(1, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      // deeply nested = "callback hell" / "pyramid of doom"
      displayData(user, posts, comments);
    });
  });
});

// ─────────────────────────────────────────────
// 2. WHAT IS A PROMISE?
// A Promise is an object representing an eventual completion or failure
// 3 states: pending → fulfilled (resolved) OR rejected
// ─────────────────────────────────────────────

// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  // Async work happens here
  const success = true;

  if (success) {
    resolve("Operation succeeded!"); // fulfilled state
  } else {
    reject(new Error("Operation failed!")); // rejected state
  }
});

// Consuming a Promise
myPromise
  .then(value => {
    console.log("Success:", value); // "Success: Operation succeeded!"
    return value.toUpperCase();     // can return new value
  })
  .then(upper => {
    console.log("Chained:", upper); // "Chained: OPERATION SUCCEEDED!"
  })
  .catch(error => {
    console.error("Error:", error.message); // handles any rejection above
  })
  .finally(() => {
    console.log("Always runs — cleanup here"); // runs regardless
  });

// ─────────────────────────────────────────────
// 3. REAL-WORLD EXAMPLE: Simulating Fetch
// ─────────────────────────────────────────────

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // simulate network delay
      if (id > 0) {
        resolve({ id, name: "Alice", email: "alice@example.com" });
      } else {
        reject(new Error(`Invalid user ID: ${id}`));
      }
    }, 1000);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "First Post", userId },
        { id: 2, title: "Second Post", userId }
      ]);
    }, 500);
  });
}

// Chain promises
fetchUser(1)
  .then(user => {
    console.log("Got user:", user.name);
    return fetchPosts(user.id); // return promise for chaining
  })
  .then(posts => {
    console.log("Got posts:", posts.length);
  })
  .catch(err => console.error(err));

// ─────────────────────────────────────────────
// 4. Promise.all() — Run promises in PARALLEL
// Waits for ALL to complete. If ANY reject, it rejects.
// ─────────────────────────────────────────────

Promise.all([
  fetchUser(1),
  fetchUser(2),
  fetchUser(3)
])
  .then(([user1, user2, user3]) => {
    console.log(user1.name, user2.name, user3.name);
  })
  .catch(err => console.error("One failed:", err));

// ─────────────────────────────────────────────
// 5. Promise.allSettled() — Run ALL, get ALL results
// Never rejects — gives status of each promise
// ─────────────────────────────────────────────

Promise.allSettled([
  fetchUser(1),
  fetchUser(-1), // this will reject
  fetchUser(3)
]).then(results => {
  results.forEach(result => {
    if (result.status === "fulfilled") {
      console.log("Success:", result.value.name);
    } else {
      console.log("Failed:", result.reason.message);
    }
  });
});

// ─────────────────────────────────────────────
// 6. Promise.race() — First one wins
// Resolves/rejects with the FIRST settled promise
// ─────────────────────────────────────────────

// Useful for timeouts!
function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout!")), ms)
  );
}

Promise.race([fetchUser(1), timeout(500)])
  .then(user => console.log("Got user before timeout:", user.name))
  .catch(err => console.error(err.message)); // "Timeout!" if slow

// ─────────────────────────────────────────────
// 7. Promise.any() — First FULFILLED wins (ES2021)
// Resolves with first success, ignores rejections
// Rejects only if ALL reject (AggregateError)
// ─────────────────────────────────────────────

Promise.any([
  Promise.reject("Error 1"),
  fetchUser(2),
  fetchUser(3)
]).then(user => console.log("First success:", user.name));

// ─────────────────────────────────────────────
// 8. Static methods
// ─────────────────────────────────────────────

// Promise.resolve / Promise.reject — create immediately settled promises
const resolved = Promise.resolve(42);
resolved.then(v => console.log(v)); // 42

const rejected = Promise.reject(new Error("oops"));
rejected.catch(e => console.error(e.message)); // "oops"

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1: Create a promise that resolves after N milliseconds (sleep/delay)
function sleep(ms) { /* return a promise */ }

// Exercise 2: Write a function that retries a promise-returning function N times
function retry(fn, times) { /* ... */ }

// Exercise 3: Implement Promise.all from scratch
function myPromiseAll(promises) { /* ... */ }

// Exercise 4: Create a promisified version of setTimeout
function delay(ms) { /* ... */ }
