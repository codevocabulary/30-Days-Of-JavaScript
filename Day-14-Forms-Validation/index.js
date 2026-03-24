// ============================================================
// 🚀 DAY 14 — Forms & Validation
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================
// Open index.html in a browser to see the form in action!

// ─────────────────────────────────────────────
// 1. ACCESSING FORM DATA
// ─────────────────────────────────────────────

const form = document.querySelector("#registration-form");

form?.addEventListener("submit", function(e) {
  e.preventDefault(); // ALWAYS prevent default for JS forms!

  // Method 1: Access individual fields by name
  const name  = form.elements["name"].value;
  const email = form.elements["email"].value;

  // Method 2: Access by querySelector
  const password = form.querySelector("#password").value;

  // Method 3: FormData API (cleanest for large forms)
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log(data); // { name:"Alice", email:"alice@...", password:"..." }

  // FormData handles checkboxes and multi-values too
  const interests = formData.getAll("interests"); // array for multi-select
});

// ─────────────────────────────────────────────
// 2. INPUT TYPES AND VALUES
// ─────────────────────────────────────────────

const textInput    = document.querySelector("input[type='text']");
const numberInput  = document.querySelector("input[type='number']");
const checkBox     = document.querySelector("input[type='checkbox']");
const radioInputs  = document.querySelectorAll("input[type='radio']");
const selectEl     = document.querySelector("select");
const textArea     = document.querySelector("textarea");

// Reading values
if (textInput)   console.log(textInput.value);           // string
if (numberInput) console.log(numberInput.valueAsNumber); // number (not string!)
if (checkBox)    console.log(checkBox.checked);          // boolean
if (selectEl)    console.log(selectEl.value);            // selected option value

// Get selected radio
const selectedRadio = [...radioInputs].find(r => r.checked);
if (selectedRadio) console.log(selectedRadio.value);

// ─────────────────────────────────────────────
// 3. VALIDATION LIBRARY — Build your own
// ─────────────────────────────────────────────

const Validators = {
  required: (value) =>
    value.trim() ? null : "This field is required",

  minLength: (min) => (value) =>
    value.length >= min ? null : `Minimum ${min} characters required`,

  maxLength: (max) => (value) =>
    value.length <= max ? null : `Maximum ${max} characters allowed`,

  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Enter a valid email",

  phone: (value) =>
    /^\+?[\d\s\-()]{10,}$/.test(value) ? null : "Enter a valid phone number",

  url: (value) => {
    try { new URL(value); return null; }
    catch { return "Enter a valid URL"; }
  },

  matches: (otherValue, label) => (value) =>
    value === otherValue ? null : `Must match ${label}`,

  pattern: (regex, message) => (value) =>
    regex.test(value) ? null : message,

  number: (value) =>
    isNaN(+value) ? "Must be a number" : null,

  min: (minimum) => (value) =>
    +value >= minimum ? null : `Minimum value is ${minimum}`,

  max: (maximum) => (value) =>
    +value <= maximum ? null : `Maximum value is ${maximum}`,

  password: (value) => {
    const errors = [];
    if (value.length < 8) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(value)) errors.push("one uppercase letter");
    if (!/[a-z]/.test(value)) errors.push("one lowercase letter");
    if (!/\d/.test(value)) errors.push("one number");
    return errors.length ? `Password needs: ${errors.join(", ")}` : null;
  },

  custom: (validateFn) => (value) => validateFn(value)
};

// ─────────────────────────────────────────────
// 4. FORM VALIDATOR CLASS
// ─────────────────────────────────────────────

class FormValidator {
  constructor(formEl) {
    this.form   = formEl;
    this.rules  = {};
    this.errors = {};
  }

  addField(name, ...validators) {
    this.rules[name] = validators;
    return this; // enable chaining
  }

  validate() {
    this.errors = {};
    let isValid = true;

    for (const [name, validators] of Object.entries(this.rules)) {
      const field = this.form.elements[name];
      if (!field) continue;
      const value = field.value;

      for (const validator of validators) {
        const error = validator(value);
        if (error) {
          this.errors[name] = error;
          isValid = false;
          break; // stop at first error for this field
        }
      }
    }

    this.displayErrors();
    return isValid;
  }

  displayErrors() {
    // Clear all previous errors
    this.form.querySelectorAll(".error-msg").forEach(el => el.remove());
    this.form.querySelectorAll(".input-error").forEach(el =>
      el.classList.remove("input-error")
    );

    for (const [name, error] of Object.entries(this.errors)) {
      const field = this.form.elements[name];
      if (!field) continue;

      field.classList.add("input-error");

      const errorEl = document.createElement("span");
      errorEl.className = "error-msg";
      errorEl.textContent = error;
      errorEl.style.cssText = "color:red;font-size:0.85em;display:block;margin-top:2px";

      field.insertAdjacentElement("afterend", errorEl);
    }
  }

  isValid() { return Object.keys(this.errors).length === 0; }
}

// ─────────────────────────────────────────────
// 5. USAGE
// ─────────────────────────────────────────────

const registrationForm = document.querySelector("#registration-form");

if (registrationForm) {
  const validator = new FormValidator(registrationForm);
  const passwordField = registrationForm.elements["password"];

  validator
    .addField("name",
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    )
    .addField("email",
      Validators.required,
      Validators.email
    )
    .addField("password",
      Validators.required,
      Validators.password
    )
    .addField("confirmPassword",
      Validators.required,
      Validators.matches(passwordField?.value, "password")
    )
    .addField("age",
      Validators.required,
      Validators.number,
      Validators.min(18),
      Validators.max(120)
    );

  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validator.validate()) {
      console.log("Form is valid! Submitting...");
      const data = Object.fromEntries(new FormData(registrationForm));
      console.log("Form data:", data);
      // submitToServer(data);
    } else {
      console.log("Validation errors:", validator.errors);
    }
  });

  // Real-time validation on blur
  registrationForm.querySelectorAll("input").forEach(input => {
    input.addEventListener("blur", () => validator.validate());
  });
}

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────
// Exercise 1: Add a "strength meter" for the password field
//             showing weak/medium/strong as the user types.
// Exercise 2: Add async validation (check if username is taken via fetch).
// Exercise 3: Implement a multi-step form with progress indicator.
