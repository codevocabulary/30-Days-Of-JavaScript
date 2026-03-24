// ============================================================
// 🚀 DAY 22 — LocalStorage & SessionStorage
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. WEB STORAGE OVERVIEW
// ─────────────────────────────────────────────
// localStorage   — persists forever (until cleared), per origin
// sessionStorage — clears when tab/window closes, per tab
// Both store key-value pairs as STRINGS only
// Both have ~5MB limit per origin

// ─────────────────────────────────────────────
// 2. BASIC API
// ─────────────────────────────────────────────

// setItem — store a value
localStorage.setItem("username", "Alice");
localStorage.setItem("theme", "dark");

// getItem — retrieve a value (returns null if not found)
const username = localStorage.getItem("username");
console.log(username); // "Alice"

const missing = localStorage.getItem("nonexistent");
console.log(missing); // null

// removeItem — delete one item
localStorage.removeItem("theme");

// clear — delete ALL items
// localStorage.clear(); // careful!

// length — number of stored items
console.log(localStorage.length); // number

// key(index) — get key by index
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(`${key}: ${localStorage.getItem(key)}`);
}

// ─────────────────────────────────────────────
// 3. STORING OBJECTS (must serialize to JSON)
// ─────────────────────────────────────────────

// ❌ This stores "[object Object]" — WRONG!
const user = { name: "Alice", age: 30 };
localStorage.setItem("user", user); // wrong!

// ✅ Serialize to JSON string first
localStorage.setItem("user", JSON.stringify(user));

// ✅ Deserialize when reading
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.name); // "Alice"

// ─────────────────────────────────────────────
// 4. A ROBUST STORAGE WRAPPER
// Handles JSON, errors, expiry, and more
// ─────────────────────────────────────────────

const Storage = {
  set(key, value, expiryMinutes = null) {
    const item = {
      value,
      timestamp: Date.now(),
      expiry: expiryMinutes ? Date.now() + expiryMinutes * 60 * 1000 : null
    };
    try {
      localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (e) {
      console.error("Storage error:", e);
      return false;
    }
  },

  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return defaultValue;
      const item = JSON.parse(raw);
      // Check expiry
      if (item.expiry && Date.now() > item.expiry) {
        this.remove(key);
        return defaultValue;
      }
      return item.value;
    } catch (e) {
      console.error("Storage parse error:", e);
      return defaultValue;
    }
  },

  remove(key) { localStorage.removeItem(key); },

  has(key) { return this.get(key) !== null; },

  clear(prefix = null) {
    if (prefix) {
      const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix));
      keys.forEach(k => localStorage.removeItem(k));
    } else {
      localStorage.clear();
    }
  },

  getAll(prefix = null) {
    const result = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!prefix || key.startsWith(prefix)) {
        result[key] = this.get(key);
      }
    }
    return result;
  }
};

// Usage
Storage.set("token", "abc123xyz", 60);   // expires in 60 minutes
Storage.set("prefs", { theme: "dark", lang: "en" });

console.log(Storage.get("token"));       // "abc123xyz"
console.log(Storage.get("prefs"));       // { theme: "dark", lang: "en" }
console.log(Storage.get("missing", "default")); // "default"
console.log(Storage.has("token"));       // true

// ─────────────────────────────────────────────
// 5. REAL-WORLD PATTERNS
// ─────────────────────────────────────────────

// ── Theme Toggle ────────────────────────────
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  return savedTheme;
}

function toggleTheme() {
  const current = localStorage.getItem("theme") || "light";
  const next    = current === "light" ? "dark" : "light";
  localStorage.setItem("theme", next);
  document.documentElement.setAttribute("data-theme", next);
}

// ── Shopping Cart ────────────────────────────
const Cart = {
  getItems() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  },
  addItem(product) {
    const items = this.getItems();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      items.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(items));
  },
  removeItem(productId) {
    const items = this.getItems().filter(i => i.id !== productId);
    localStorage.setItem("cart", JSON.stringify(items));
  },
  clear() { localStorage.removeItem("cart"); },
  get total() {
    return this.getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  }
};

Cart.addItem({ id: 1, name: "Laptop", price: 999 });
Cart.addItem({ id: 2, name: "Mouse",  price: 29  });
Cart.addItem({ id: 1, name: "Laptop", price: 999 }); // qty becomes 2
console.log(Cart.getItems()); // [{id:1, qty:2,...}, {id:2, qty:1,...}]
console.log(Cart.total);      // 2027

// ─────────────────────────────────────────────
// 6. STORAGE EVENT — Listen for changes in OTHER tabs
// ─────────────────────────────────────────────

window.addEventListener("storage", (event) => {
  console.log("Storage changed from another tab:");
  console.log("Key:", event.key);
  console.log("Old value:", event.oldValue);
  console.log("New value:", event.newValue);
  console.log("Storage area:", event.storageArea === localStorage ? "local" : "session");
});

// ─────────────────────────────────────────────
// 7. SESSION STORAGE — Same API, different scope
// ─────────────────────────────────────────────

// Use sessionStorage for temporary data (form drafts, search state)
sessionStorage.setItem("searchQuery", "javascript tutorial");
sessionStorage.setItem("currentPage", "3");

// Auto-save form draft
const form = document.querySelector("form");
const inputs = form?.querySelectorAll("input, textarea");
inputs?.forEach(input => {
  // Restore saved draft
  const saved = sessionStorage.getItem(`draft_${input.name}`);
  if (saved) input.value = saved;

  // Save on every keystroke
  input.addEventListener("input", () => {
    sessionStorage.setItem(`draft_${input.name}`, input.value);
  });
});

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────
// Exercise 1: Build a "notes" app that persists notes to localStorage.
//             Support: add, edit, delete, list notes.
//
// Exercise 2: Create a localStorage-backed user preferences system.
//             On load: read settings. On save: write settings.
//
// Exercise 3: Implement a "recently viewed" list that keeps the last 10 items.
