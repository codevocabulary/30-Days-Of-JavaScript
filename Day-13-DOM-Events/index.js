// ============================================================
// 🚀 DAY 13 — DOM Events
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. ADDING EVENT LISTENERS
// ─────────────────────────────────────────────

const btn = document.querySelector("#myButton");

// addEventListener(event, handler, options)
// Preferred method — can add multiple listeners
btn.addEventListener("click", function(event) {
  console.log("Button clicked!", event);
});

// Using arrow function
btn.addEventListener("click", (e) => {
  console.log("Clicked again!");
});

// Named function (can be removed later)
function handleClick(e) {
  console.log("Named handler");
}
btn.addEventListener("click", handleClick);
btn.removeEventListener("click", handleClick); // remove it

// ─────────────────────────────────────────────
// 2. THE EVENT OBJECT
// ─────────────────────────────────────────────

document.querySelector("a").addEventListener("click", function(e) {
  e.preventDefault();  // prevent default action (navigation)
  e.stopPropagation(); // stop event from bubbling up

  console.log(e.type);   // "click"
  console.log(e.target); // element that was clicked
  console.log(e.currentTarget); // element with listener
  console.log(e.clientX, e.clientY); // mouse position
  console.log(e.timeStamp); // when event occurred
});

// ─────────────────────────────────────────────
// 3. COMMON EVENT TYPES
// ─────────────────────────────────────────────

const input = document.querySelector("input");

// Mouse events
document.addEventListener("click", e => {});
document.addEventListener("dblclick", e => {});
document.addEventListener("mousedown", e => {});
document.addEventListener("mouseup", e => {});
document.addEventListener("mousemove", e => console.log(e.clientX, e.clientY));
document.addEventListener("mouseenter", e => {}); // doesn't bubble
document.addEventListener("mouseleave", e => {}); // doesn't bubble
document.addEventListener("mouseover", e => {});  // bubbles
document.addEventListener("mouseout", e => {});   // bubbles

// Keyboard events
document.addEventListener("keydown", e => {
  console.log(e.key, e.code); // "a", "KeyA"
  if (e.key === "Enter") console.log("Enter pressed!");
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    console.log("Save shortcut!");
  }
});
document.addEventListener("keyup", e => {});

// Form events
input.addEventListener("input", e => {
  console.log("Value changed to:", e.target.value); // fires on every keystroke
});
input.addEventListener("change", e => {
  console.log("Committed:", e.target.value); // fires when focus leaves
});
input.addEventListener("focus", e => console.log("Input focused"));
input.addEventListener("blur",  e => console.log("Input lost focus"));

const form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault(); // ALWAYS prevent default to handle manually
  const data = new FormData(form);
  console.log(Object.fromEntries(data));
});

// Window/Document events
window.addEventListener("load", () => console.log("Page fully loaded"));
document.addEventListener("DOMContentLoaded", () => console.log("DOM ready"));
window.addEventListener("resize", () => console.log(window.innerWidth));
window.addEventListener("scroll", () => console.log(window.scrollY));

// ─────────────────────────────────────────────
// 4. EVENT BUBBLING & CAPTURING
// ─────────────────────────────────────────────

// Events bubble UP from target to document (by default)
// Example: click on button → button's listeners fire → parent → body → document

// <div id="outer">        ← listener fires 3rd
//   <div id="inner">      ← listener fires 2nd
//     <button>Click me</button>  ← listener fires 1st
//   </div>
// </div>

document.querySelector("#outer").addEventListener("click", e => {
  console.log("Outer div clicked", e.target);
});
document.querySelector("#inner").addEventListener("click", e => {
  console.log("Inner div clicked");
  // e.stopPropagation(); // uncomment to prevent outer from firing
});

// Capturing: fires top-down (add 'true' as 3rd argument)
document.addEventListener("click", e => {}, true); // capture phase

// ─────────────────────────────────────────────
// 5. EVENT DELEGATION
// Attach ONE listener to a parent instead of many to children
// Works because of event bubbling!
// ─────────────────────────────────────────────

const todoList = document.querySelector("#todo-list");

// Instead of adding listeners to each <li>:
// ❌ todoList.querySelectorAll("li").forEach(li => li.addEventListener(...))

// ✅ One listener on parent handles ALL current AND future children
todoList.addEventListener("click", function(e) {
  // e.target is the actual clicked element
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done");
    console.log("Toggled:", e.target.textContent);
  }

  if (e.target.classList.contains("delete-btn")) {
    e.target.closest("li").remove();
  }
});

// ─────────────────────────────────────────────
// 6. ONCE, PASSIVE & CAPTURE OPTIONS
// ─────────────────────────────────────────────

btn.addEventListener("click", handler, {
  once: true,    // auto-removes after firing once
  passive: true, // tells browser handler won't call preventDefault (perf boost for scroll)
  capture: false // use capturing phase (default: false = bubbling)
});

function handler() { console.log("Fired once!"); }

// ─────────────────────────────────────────────
// 7. CUSTOM EVENTS
// ─────────────────────────────────────────────

// Dispatch custom events between components
const customEvent = new CustomEvent("user:login", {
  detail: { username: "Alice", timestamp: Date.now() },
  bubbles: true
});

document.dispatchEvent(customEvent);
document.addEventListener("user:login", e => {
  console.log("User logged in:", e.detail.username);
});

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1: Build a click counter — button shows how many times clicked
// Exercise 2: Build a live character counter for a textarea
// Exercise 3: Build a keyboard logger that shows last 10 key presses
// Exercise 4: Use event delegation for a dynamic todo list (add & delete items)
