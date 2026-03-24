# 📘 Day 12 — DOM Manipulation Basics

> **Level:** 🟡 Intermediate | **Estimated Time:** 2 hours | **Open:** `index.html` in browser

---

## 🎯 What You'll Learn

- What the DOM is and how it works
- Selecting elements with `querySelector`, `getElementById`, and more
- Reading and changing text, HTML, and attributes
- Working with CSS classes via `classList`
- Creating, inserting, and removing elements
- Traversing the DOM tree (parent, children, siblings)

---

## 📖 Concepts Covered

### 1. Selecting Elements

```js
// Single element selectors
document.getElementById("header")          // by ID
document.querySelector("p")                // first CSS match
document.querySelector(".nav a")           // CSS selector
document.querySelector("input[type=text]") // attribute selector

// Multiple element selectors
document.querySelectorAll("p")             // NodeList of all <p>
document.querySelectorAll(".card")         // all with class "card"

// Convert NodeList to Array (to use all array methods)
Array.from(document.querySelectorAll("li"))
[...document.querySelectorAll("li")]
```

---

### 2. Reading & Changing Content

```js
const el = document.querySelector("#title");

el.textContent = "New text";           // safe — no HTML parsing
el.innerHTML   = "<b>Bold</b>";        // renders HTML ⚠️ XSS risk with user input!
el.innerText   = "Visible text";       // respects CSS visibility

// Safe way to add HTML:
const strong = document.createElement("strong");
strong.textContent = "Bold";
el.appendChild(strong);
```

---

### 3. Working with Attributes

```js
el.getAttribute("href")           // get
el.setAttribute("href", "/home")  // set
el.removeAttribute("title")       // delete
el.hasAttribute("class")          // boolean check

// Shorthand for common attributes
el.id    = "main";
el.className = "active";
el.href  = "https://...";

// data-* attributes
// <div data-user-id="42">
el.dataset.userId  // "42" (camelCase for hyphens)
```

---

### 4. CSS Classes

```js
el.classList.add("active")         // add class
el.classList.remove("hidden")      // remove class
el.classList.toggle("open")        // add if absent, remove if present
el.classList.toggle("dark", true)  // force-add
el.classList.contains("active")    // check → boolean
```

---

### 5. Creating & Inserting Elements

```js
const p = document.createElement("p");
p.textContent = "I was created by JS!";
p.className = "new-para";

document.body.appendChild(p);   // add at end of body
document.body.prepend(p);       // add at start

// Precise insertion:
el.insertAdjacentElement("beforebegin", p); // before el
el.insertAdjacentElement("afterend", p);    // after el
el.insertAdjacentElement("afterbegin", p);  // inside, first
el.insertAdjacentElement("beforeend", p);   // inside, last
```

---

### 6. Removing Elements

```js
el.remove();                           // modern
el.parentNode.removeChild(el);         // old way
```

---

### 7. Traversal

```js
el.parentElement              // parent
el.children                   // child elements (HTMLCollection)
el.firstElementChild          // first child
el.lastElementChild           // last child
el.nextElementSibling         // next sibling
el.previousElementSibling     // previous sibling
el.closest(".ancestor")       // first ancestor matching selector
```

---

## 💡 Key Takeaways

- `querySelector` is the most versatile — use CSS selectors you already know
- `textContent` is safer than `innerHTML` — avoid `innerHTML` with user-supplied data
- `classList` is always better than manipulating `className` as a string
- Creating elements then `append`ing is safer than `innerHTML` for dynamic content
- The DOM is live — changes are reflected immediately in the browser

---

## 📝 Exercises

1. Write a function that adds a new `<li>` to a `<ul>` with given text
2. Write a function that changes background color of all `<div>` elements
3. Count and display how many elements of each tag type exist on the page

---


## ⏭️ Next Up

**[Day 13 — DOM Events →](../Day-13-DOM-Events/)**
