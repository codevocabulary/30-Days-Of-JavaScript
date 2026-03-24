# 📘 Day 14 — Forms & Validation

> **Level:** 🟡 Intermediate | **Estimated Time:** 2.5 hours | **Open:** `index.html`

---

## 🎯 What You'll Learn

- Accessing form data with the `FormData` API and `form.elements`
- Handling all input types: text, number, checkbox, radio, select
- Building a reusable validation library from scratch
- Displaying inline error messages next to form fields
- Real-time validation on blur and submit

---

## 📖 Concepts Covered

### 1. Accessing Form Data

```js
form.addEventListener("submit", (e) => {
  e.preventDefault(); // ALWAYS prevent default!

  // Method 1: By field name
  const name = form.elements["name"].value;

  // Method 2: FormData (cleanest for many fields)
  const data = Object.fromEntries(new FormData(form));
  // → { name: "Alice", email: "...", password: "..." }
});
```

---

### 2. Input Types & Values

```js
input.value            // text, email, password → string
numInput.valueAsNumber // number input → actual number
checkbox.checked       // boolean
[...radios].find(r => r.checked)?.value // selected radio
select.value           // selected option value
textarea.value         // multi-line text
```

---

### 3. Validator Functions Pattern

```js
const Validators = {
  required:  v => v.trim() ? null : "This field is required",
  email:     v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Invalid email",
  minLength: min => v => v.length >= min ? null : `Min ${min} chars`,
  maxLength: max => v => v.length <= max ? null : `Max ${max} chars`,
  password:  v => /* complex check */ null
};

// Validators return null on success, error string on failure
```

---

### 4. FormValidator Class

```js
const validator = new FormValidator(form);
validator
  .addField("email",    Validators.required, Validators.email)
  .addField("password", Validators.required, Validators.password)
  .addField("age",      Validators.required, Validators.min(18));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validator.validate()) {
    // form is valid — submit!
  }
});
```

---

## 💡 Key Takeaways

- Always `e.preventDefault()` in submit handlers — handle submission yourself
- Validate on `submit` for simplicity; add `blur` validation for better UX
- Validators as pure functions (return `null` or an error string) are easy to compose
- `FormData` API handles all input types including file uploads and checkboxes

---

## 📝 Exercises

1. Add a password strength meter (weak/medium/strong) as the user types
2. Add an async validator that checks if a username is already taken
3. Build a multi-step form with a progress bar

---

## ⏭️ Next Up

**[Day 15 — ES6 Classes →](../Day-15-ES6-Classes/)**
