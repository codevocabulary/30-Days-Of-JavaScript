# 📘 Day 20 — Error Handling

> **Level:** 🟠 Advanced | **Estimated Time:** 2 hours

---

## 🎯 What You'll Learn

- `try` / `catch` / `finally` structure
- Built-in error types: `TypeError`, `ReferenceError`, `SyntaxError`, etc.
- Creating custom error classes with meaningful context
- Error handling in async code (promises + async/await)
- Global error handlers and unhandled rejections
- Retry with exponential backoff

---

## 📖 Concepts Covered

### 1. try / catch / finally

```js
try {
  const data = JSON.parse(userInput);  // might throw
  processData(data);
} catch (error) {
  console.error(error.name);    // "SyntaxError"
  console.error(error.message); // what went wrong
  console.error(error.stack);   // full stack trace
} finally {
  hideLoadingSpinner(); // ALWAYS runs — cleanup here
}
```

---

### 2. Built-in Error Types

| Type | Cause |
|------|-------|
| `ReferenceError` | Using undeclared variable |
| `TypeError` | Wrong type (`null.property`) |
| `SyntaxError` | Invalid code/JSON |
| `RangeError` | Out-of-range value (`new Array(-1)`) |
| `URIError` | Bad URI encoding |

---

### 3. Custom Error Classes

```js
class AppError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

class ValidationError extends AppError {
  constructor(field, message) {
    super(message, "VALIDATION_ERROR", 400);
    this.field = field;
  }
}
```

---

### 4. Handling by Type

```js
try {
  const user = await getUser(id);
} catch (error) {
  if (error instanceof NotFoundError) {
    res.status(404).json({ message: error.message });
  } else if (error instanceof ValidationError) {
    res.status(400).json({ field: error.field, message: error.message });
  } else {
    throw error; // ← re-throw unexpected errors!
  }
}
```

---

### 5. Global Error Handlers

```js
// Catch all uncaught errors
window.addEventListener("error", e => {
  reportToSentry(e.error);
});

// Catch unhandled promise rejections
window.addEventListener("unhandledrejection", e => {
  reportToSentry(e.reason);
  e.preventDefault();
});
```

---

### 6. Retry with Backoff

```js
async function withRetry(fn, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await sleep(baseDelay * (2 ** attempt)); // 1s, 2s, 4s...
    }
  }
}
```

---

## 💡 Key Takeaways

- Always use `Error` objects — never `throw "string"` (loses stack trace)
- Re-throw unexpected errors — don't silently swallow them
- Custom error classes let you handle errors semantically by type
- `finally` runs even if there's a `return` in `try` — ideal for cleanup
- Use global handlers as a safety net, not as the primary error handling strategy

---

## 📝 Exercises

1. Write `safeJSON.parse()` and `safeJSON.stringify()` that never throw
2. Implement a Circuit Breaker that stops calling a failing service after N errors
3. Write a global error handler that formats and logs errors consistently with context

---


## ⏭️ Next Up

**[Day 21 — ES Modules →](../Day-21-Modules/)**
