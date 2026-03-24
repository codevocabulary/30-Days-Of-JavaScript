# 📘 Day 13 — DOM Events

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours | **Open:** `index.html` in browser

---

## 🎯 What You'll Learn

- Adding and removing event listeners
- The Event object and its key properties
- All major event types: mouse, keyboard, form, window
- Event bubbling and capturing
- Event delegation — one listener for many elements
- Custom events

---

## 📖 Concepts Covered

### 1. addEventListener

```js
// addEventListener(type, handler, options)
btn.addEventListener("click", function(event) {
  console.log("Clicked!", event.target);
});

// Arrow function
btn.addEventListener("click", (e) => console.log(e.type));

// Remove with named function
function handler(e) { console.log("once?"); }
btn.addEventListener("click", handler);
btn.removeEventListener("click", handler);  // must be same reference!
```

---

### 2. The Event Object

```js
el.addEventListener("click", (e) => {
  e.preventDefault();    // stop default action (link navigation, form submit)
  e.stopPropagation();   // stop event from bubbling up

  e.type          // "click"
  e.target        // element that was actually clicked
  e.currentTarget // element with the listener attached
  e.clientX / e.clientY  // mouse position relative to viewport
  e.key / e.code  // keyboard key
  e.ctrlKey / e.shiftKey / e.altKey  // modifier keys
});
```

---

### 3. Common Event Types

```js
// Mouse
"click", "dblclick", "mousedown", "mouseup"
"mousemove", "mouseenter", "mouseleave"

// Keyboard
"keydown", "keyup", "keypress" (deprecated)
if (e.key === "Enter") { ... }
if (e.ctrlKey && e.key === "s") { e.preventDefault(); save(); }

// Form
"input"   // fires on every keystroke
"change"  // fires when focus leaves + value changed
"focus", "blur"
"submit"  // on <form> — always use e.preventDefault()!

// Window / Document
"DOMContentLoaded"  // DOM ready, before images load
"load"              // everything loaded (images, CSS)
"resize"            // window resized
"scroll"            // page scrolled
```

---

### 4. Event Bubbling

Events bubble from the target element UP to the document root:

```
click on <button> → <div> listeners fire → <body> → <html> → document
```

```js
document.querySelector("#outer").addEventListener("click", () => {
  console.log("Outer fired");     // fires 2nd
});
document.querySelector("#inner").addEventListener("click", (e) => {
  console.log("Inner fired");     // fires 1st
  e.stopPropagation();            // prevent outer from firing
});
```

---

### 5. Event Delegation ⭐

Attach ONE listener on a parent to handle ALL children (even future ones):

```js
// ❌ Adding to each item — doesn't work for dynamically added items
items.forEach(item => item.addEventListener("click", handler));

// ✅ Delegate to parent — handles current AND future items
list.addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    e.target.classList.toggle("done");
  }
  if (e.target.matches(".delete-btn")) {
    e.target.closest("li").remove();
  }
});
```

---

### 6. Listener Options

```js
btn.addEventListener("click", handler, {
  once: true,     // auto-removes after one firing
  passive: true,  // tells browser you won't preventDefault (scroll perf)
  capture: true   // fire during capture phase (top-down) instead of bubble
});
```

---

### 7. Custom Events

```js
const event = new CustomEvent("user:login", {
  detail: { username: "Alice" },
  bubbles: true
});
document.dispatchEvent(event);

document.addEventListener("user:login", (e) => {
  console.log(e.detail.username); // "Alice"
});
```

---

## 💡 Key Takeaways

- Always call `e.preventDefault()` in form submit handlers
- `e.target` is what was clicked; `e.currentTarget` is where the listener is
- Event delegation is a performance win for lists with many items
- `DOMContentLoaded` fires before images load — better than `window.load` for most cases
- Use `once: true` option instead of manually removing one-time listeners

---

## 📝 Exercises

1. Build a click counter — button shows how many times it's been clicked
2. Build a live character counter for a `<textarea>` (max 280 chars)
3. Build a keyboard event logger that shows the last 10 keys pressed
4. Use event delegation for a todo list — add items AND delete with one listener

---


## ⏭️ Next Up

**[Day 14 — Forms & Validation →](../Day-14-Forms-Validation/)**
