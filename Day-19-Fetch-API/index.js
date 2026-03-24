// ============================================================
// 🚀 DAY 19 — Fetch API & HTTP
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. WHAT IS THE FETCH API?
// Modern way to make HTTP requests (replaces XMLHttpRequest)
// Returns a Promise
// ─────────────────────────────────────────────

// Basic GET request
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => {
    console.log(response.status);    // 200
    console.log(response.ok);        // true (200-299 range)
    console.log(response.headers.get("content-type"));
    return response.json();          // parse JSON body (returns Promise)
  })
  .then(data => console.log(data))
  .catch(err => console.error("Network error:", err));
// ⚠️ fetch only rejects on NETWORK errors, NOT HTTP errors (404, 500)!
// Always check response.ok!

// ─────────────────────────────────────────────
// 2. FULL CRUD — GET, POST, PUT, PATCH, DELETE
// ─────────────────────────────────────────────

const BASE_URL = "https://jsonplaceholder.typicode.com";

// GET — retrieve data
async function getPost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// POST — create new resource
async function createPost(data) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer your-token-here"
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

// PUT — replace entire resource
async function updatePost(id, data) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

// PATCH — update partial resource
async function patchPost(id, updates) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  });
  return res.json();
}

// DELETE — remove resource
async function deletePost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE"
  });
  return res.ok; // returns true on success
}

// ─────────────────────────────────────────────
// 3. QUERY PARAMETERS
// ─────────────────────────────────────────────

async function searchUsers(params = {}) {
  // Build query string: ?name=Alice&age=25
  const queryString = new URLSearchParams(params).toString();
  const url = `${BASE_URL}/users${queryString ? "?" + queryString : ""}`;
  const res = await fetch(url);
  return res.json();
}

searchUsers({ _limit: 5, _page: 1 }).then(users => console.log(users));

// ─────────────────────────────────────────────
// 4. HANDLING DIFFERENT RESPONSE TYPES
// ─────────────────────────────────────────────

async function downloadFile(url) {
  const res = await fetch(url);
  const blob    = await res.blob();    // binary data (images, files)
  const text    = await res.text();    // plain text
  const json    = await res.json();    // parsed JSON
  const buffer  = await res.arrayBuffer(); // raw binary buffer
  // Note: you can only consume the body ONCE — call one of these methods
}

// ─────────────────────────────────────────────
// 5. UPLOADING FILES
// ─────────────────────────────────────────────

async function uploadFile(fileInput) {
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  formData.append("name", "My File");

  const res = await fetch("/upload", {
    method: "POST",
    body: formData
    // DON'T set Content-Type — browser sets it with boundary automatically
  });
  return res.json();
}

// ─────────────────────────────────────────────
// 6. ABORT CONTROLLER — Cancel requests
// ─────────────────────────────────────────────

async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const signal = controller.signal;

  // Cancel after timeout
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal });
    clearTimeout(timeoutId);
    return await res.json();
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw err;
  }
}

// ─────────────────────────────────────────────
// 7. WRAPPER FUNCTION (Best Practice)
// ─────────────────────────────────────────────

async function request(url, options = {}) {
  const defaults = {
    headers: { "Content-Type": "application/json" }
  };
  const config = { ...defaults, ...options,
    headers: { ...defaults.headers, ...(options.headers || {}) }
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) return response.json();
  return response.text();
}

// Usage:
async function demo() {
  const posts = await request(`${BASE_URL}/posts?_limit=3`);
  console.log(posts);

  const newPost = await request(`${BASE_URL}/posts`, {
    method: "POST",
    body: { title: "Test", body: "Content", userId: 1 }
  });
  console.log("Created:", newPost.id);
}

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1: Build a function to fetch paginated data (?_page=N&_limit=10)
// Exercise 2: Add request/response interceptors to the wrapper function
// Exercise 3: Implement request caching (don't re-fetch same URL within 1 minute)
// Exercise 4: Create a retry wrapper (retry up to 3 times on network failure)
