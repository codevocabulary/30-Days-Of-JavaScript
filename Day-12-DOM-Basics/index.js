// ============================================================
// 🚀 DAY 12 — DOM Manipulation Basics
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================
// NOTE: Open index.html in a browser to see this in action!

// ─────────────────────────────────────────────
// 1. WHAT IS THE DOM?
// DOM = Document Object Model
// It's a tree of objects that represent the HTML document
// JS can read and change ANY part of the page via the DOM
// ─────────────────────────────────────────────

// The 'document' object is the entry point to the DOM
console.log(document);               // the whole HTML document
console.log(document.title);        // page title
console.log(document.URL);          // current URL
console.log(document.body);         // <body> element

// ─────────────────────────────────────────────
// 2. SELECTING ELEMENTS
// ─────────────────────────────────────────────

// getElementById — select by ID (returns single element or null)
const header = document.getElementById("header");

// querySelector — select first match using CSS selectors
const firstParagraph = document.querySelector("p");
const navLink = document.querySelector(".nav a");
const submitBtn = document.querySelector("#submit-btn");
const firstInput = document.querySelector("input[type='text']");

// querySelectorAll — select ALL matches (returns NodeList, like an array)
const allParagraphs = document.querySelectorAll("p");
const allButtons    = document.querySelectorAll("button");
const allItems      = document.querySelectorAll("ul li");

// Loop over NodeList
allParagraphs.forEach(p => console.log(p.textContent));

// Convert NodeList to Array (to use all array methods)
const itemsArray = Array.from(allItems);

// Other selectors (older, less flexible)
const elements = document.getElementsByClassName("card"); // HTMLCollection
const tags     = document.getElementsByTagName("div");   // HTMLCollection

// ─────────────────────────────────────────────
// 3. READING & CHANGING CONTENT
// ─────────────────────────────────────────────

const el = document.querySelector("#my-element");

// textContent — raw text (no HTML parsing, SAFE from XSS)
console.log(el.textContent);
el.textContent = "New text content";

// innerHTML — parses HTML (DANGEROUS with user input — XSS risk!)
el.innerHTML = "<strong>Bold text</strong>"; // renders as bold
el.innerHTML = "<script>alert('XSS')</script>"; // ⚠️ dangerous!

// innerText — visible text (respects CSS styling)
el.innerText = "Text";

// Safe way to add HTML:
const strong = document.createElement("strong");
strong.textContent = "Bold text";
el.appendChild(strong);

// ─────────────────────────────────────────────
// 4. WORKING WITH ATTRIBUTES
// ─────────────────────────────────────────────

const link = document.querySelector("a");

// getAttribute / setAttribute / removeAttribute / hasAttribute
console.log(link.getAttribute("href"));      // get href value
link.setAttribute("href", "https://google.com");
link.setAttribute("target", "_blank");
link.removeAttribute("title");
console.log(link.hasAttribute("href"));      // true

// Property shorthand for common attributes
link.href   = "https://example.com"; // same as setAttribute
link.id     = "main-link";
link.className = "active";

// data-* attributes (custom data attributes)
// <div data-user-id="123" data-role="admin">
const userEl = document.querySelector("[data-user-id]");
// userEl.dataset.userId; // "123" (camelCase for hyphens)
// userEl.dataset.role;   // "admin"

// ─────────────────────────────────────────────
// 5. CSS CLASSES
// ─────────────────────────────────────────────

const box = document.querySelector(".box");

// classList API — better than className string manipulation
box.classList.add("active");          // add class
box.classList.remove("hidden");       // remove class
box.classList.toggle("open");         // add if absent, remove if present
box.classList.toggle("dark", true);   // force add (won't remove)
box.classList.toggle("dark", false);  // force remove
console.log(box.classList.contains("active")); // true/false
console.log(box.classList);           // DOMTokenList ["box", "active"]

// ─────────────────────────────────────────────
// 6. INLINE STYLES
// ─────────────────────────────────────────────

const div = document.querySelector("div");

div.style.color = "red";
div.style.backgroundColor = "#f0f0f0"; // camelCase for CSS properties
div.style.fontSize = "18px";
div.style.marginTop = "20px";

// Better: add/remove CSS classes instead of inline styles!
// Inline styles have the highest specificity and are hard to override.

// ─────────────────────────────────────────────
// 7. CREATING & INSERTING ELEMENTS
// ─────────────────────────────────────────────

// Create element
const newPara = document.createElement("p");
newPara.textContent = "I was created with JavaScript!";
newPara.className = "js-created";

// Insert methods
document.body.appendChild(newPara);       // add at end of body
document.body.prepend(newPara);           // add at start

// insertAdjacentElement — precise positioning
const heading = document.querySelector("h1");
// heading.insertAdjacentElement("afterbegin", newPara);  // inside, at start
// heading.insertAdjacentElement("beforeend", newPara);   // inside, at end
// heading.insertAdjacentElement("beforebegin", newPara); // before the element
// heading.insertAdjacentElement("afterend", newPara);    // after the element

// Modern: append, prepend (multiple elements + strings)
document.body.append("Some text", newPara, document.createElement("hr"));

// ─────────────────────────────────────────────
// 8. REMOVING ELEMENTS
// ─────────────────────────────────────────────

const toRemove = document.querySelector(".remove-me");
// toRemove.remove(); // modern way
// toRemove.parentNode.removeChild(toRemove); // old way

// ─────────────────────────────────────────────
// 9. TRAVERSING THE DOM
// ─────────────────────────────────────────────

const parent = document.querySelector(".parent");

// Children
parent.children;           // HTMLCollection of child elements
parent.firstElementChild;  // first child element
parent.lastElementChild;   // last child element

// Parent
parent.parentElement;      // parent element
parent.closest(".ancestor"); // first ancestor matching selector

// Siblings
parent.nextElementSibling;     // next sibling
parent.previousElementSibling; // previous sibling

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────

// Exercise 1: Create a function that adds a new list item to a <ul>
// Exercise 2: Create a function that changes the background color of all divs
// Exercise 3: Create an element counter - display how many of each tag exist
