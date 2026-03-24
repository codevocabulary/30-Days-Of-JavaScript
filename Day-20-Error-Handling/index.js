// ============================================================
// 🚀 DAY 20 — Error Handling
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. TRY / CATCH / FINALLY
// ─────────────────────────────────────────────

try {
  // Code that might throw an error
  const result = JSON.parse("invalid json {{");
  console.log(result);
} catch (error) {
  // Runs only if an error was thrown
  console.log("Error caught:", error.message); // "Unexpected token i..."
  console.log("Error type:", error.name);       // "SyntaxError"
} finally {
  // ALWAYS runs — cleanup code goes here
  console.log("This always runs");
}

// ─────────────────────────────────────────────
// 2. BUILT-IN ERROR TYPES
// ─────────────────────────────────────────────

// JavaScript has several built-in error classes:
try { undefinedVariable; } catch(e) { console.log(e instanceof ReferenceError); } // true — var not declared
try { null.property; }     catch(e) { console.log(e instanceof TypeError); }      // true — wrong type
try { eval("{"); }         catch(e) { console.log(e instanceof SyntaxError); }    // true — bad syntax
try { decodeURI("%"); }    catch(e) { console.log(e instanceof URIError); }       // true — bad URI
try { new Array(-1); }     catch(e) { console.log(e instanceof RangeError); }     // true — out of range

// All errors have: name, message, stack
const err = new TypeError("Expected a string");
console.log(err.name);    // "TypeError"
console.log(err.message); // "Expected a string"
console.log(err.stack);   // stack trace

// ─────────────────────────────────────────────
// 3. CUSTOM ERROR CLASSES
// ─────────────────────────────────────────────

class AppError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);            // sets this.message
    this.name = "AppError";    // override default "Error"
    this.code = code;
    this.statusCode = statusCode;
    // Fix stack trace to point to where AppError was thrown, not here
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

class ValidationError extends AppError {
  constructor(field, message) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`, "NOT_FOUND", 404);
    this.name = "NotFoundError";
    this.resource = resource;
  }
}

class AuthError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, "AUTH_ERROR", 401);
    this.name = "AuthError";
  }
}

// Using custom errors
function getUserById(id) {
  if (typeof id !== "number") throw new ValidationError("id", "ID must be a number");
  if (id <= 0) throw new ValidationError("id", "ID must be positive");
  if (id > 100) throw new NotFoundError("User", id);
  return { id, name: `User ${id}` };
}

try {
  const user = getUserById(999);
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log(`404: ${error.message}`); // "User with id 999 not found"
  } else if (error instanceof ValidationError) {
    console.log(`400: ${error.field} — ${error.message}`);
  } else if (error instanceof AppError) {
    console.log(`App error ${error.statusCode}: ${error.message}`);
  } else {
    console.error("Unexpected error:", error);
    throw error; // re-throw unexpected errors!
  }
}

// ─────────────────────────────────────────────
// 4. ERROR HANDLING IN ASYNC CODE
// ─────────────────────────────────────────────

// ── Promises ─────────────────────────────────
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (!id) return reject(new ValidationError("id", "ID required"));
    setTimeout(() => resolve({ id, name: "Alice" }), 100);
  });
}

fetchUser(null)
  .then(user => console.log(user))
  .catch(err => {
    if (err instanceof ValidationError) {
      console.log(`Validation: ${err.field} → ${err.message}`);
    }
  });

// ── Async/Await ───────────────────────────────
async function loadUser(id) {
  try {
    const user = await fetchUser(id);
    return user;
  } catch (error) {
    console.error("Failed to load user:", error.message);
    return null; // return default on error
  }
}

// ─────────────────────────────────────────────
// 5. GLOBAL ERROR HANDLERS
// ─────────────────────────────────────────────

// Catch synchronous errors not caught by try/catch (browser)
window.addEventListener?.("error", (event) => {
  console.error("Uncaught error:", event.error);
  // Report to error tracking service (e.g. Sentry)
});

// Catch unhandled promise rejections (browser + Node.js)
window.addEventListener?.("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  event.preventDefault(); // prevent default browser logging
});

// Node.js equivalents:
// process.on("uncaughtException", (err) => { ... });
// process.on("unhandledRejection", (reason) => { ... });

// ─────────────────────────────────────────────
// 6. ERROR BOUNDARY PATTERN
// Wrap operations to prevent one error from crashing everything
// ─────────────────────────────────────────────

function safeExecute(fn, fallback = null) {
  try {
    return { ok: true, data: fn() };
  } catch (error) {
    return { ok: false, error, data: fallback };
  }
}

async function safeExecuteAsync(fn, fallback = null) {
  try {
    return { ok: true, data: await fn() };
  } catch (error) {
    return { ok: false, error, data: fallback };
  }
}

const result1 = safeExecute(() => JSON.parse("bad json"));
const result2 = safeExecute(() => JSON.parse('{"a": 1}'));
console.log(result1); // { ok: false, error: SyntaxError, data: null }
console.log(result2); // { ok: true, data: { a: 1 } }

// ─────────────────────────────────────────────
// 7. RETRY WITH EXPONENTIAL BACKOFF
// ─────────────────────────────────────────────

async function withRetry(fn, { maxRetries = 3, baseDelay = 1000, factor = 2 } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        const delay = baseDelay * (factor ** attempt);
        console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  throw lastError; // all retries exhausted
}

// Usage:
// await withRetry(() => fetch("https://api.example.com/data"), { maxRetries: 3 });

// ─────────────────────────────────────────────
// 8. BEST PRACTICES
// ─────────────────────────────────────────────

// ✅ Always catch async errors
// ✅ Use custom error classes for different error types
// ✅ Include relevant context in error messages
// ✅ Re-throw unexpected errors (don't swallow everything)
// ✅ Log errors with enough detail to debug
// ✅ Use finally for cleanup (close connections, hide spinners)
// ❌ Don't catch errors just to suppress them
// ❌ Don't use generic catch-all without re-throwing
// ❌ Don't use strings as errors (throw "error") — use Error objects

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────
// Exercise 1: Write a safeJSON.parse() and safeJSON.stringify() that never throw
// Exercise 2: Create a Circuit Breaker pattern that stops calling a failing service
// Exercise 3: Write a global error handler that formats and logs errors consistently
