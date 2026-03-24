// ============================================================
// 🚀 DAY 23 — Regular Expressions (RegEx)
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. CREATING REGEX
// ─────────────────────────────────────────────
const regex1 = /hello/;           // literal syntax (preferred)
const regex2 = new RegExp("hello"); // constructor (use for dynamic patterns)
const dynamic = "world";
const regex3  = new RegExp(dynamic, "i"); // case-insensitive

// ─────────────────────────────────────────────
// 2. FLAGS
// ─────────────────────────────────────────────
// i — case Insensitive
// g — Global (find ALL matches, not just first)
// m — Multiline (^ and $ match line starts/ends)
// s — dotAll (. matches newlines too)
// u — Unicode
// d — hasIndices (include start/end indices)

/hello/i.test("HELLO");  // true — case insensitive
/a/g;                    // find all 'a's in string
/^start/m;               // match 'start' at beginning of each line

// ─────────────────────────────────────────────
// 3. BASIC CHARACTER CLASSES
// ─────────────────────────────────────────────
// .      — any character except newline
// \d     — digit [0-9]
// \D     — NOT digit
// \w     — word character [a-zA-Z0-9_]
// \W     — NOT word character
// \s     — whitespace (space, tab, newline)
// \S     — NOT whitespace
// \b     — word boundary
// \B     — NOT word boundary
// [abc]  — character set (a, b, or c)
// [^abc] — negated set (NOT a, b, or c)
// [a-z]  — range (a through z)
// [a-zA-Z0-9] — letters and digits

console.log(/\d+/.test("abc123"));    // true — has digits
console.log(/^\d+$/.test("12345"));  // true — ONLY digits
console.log(/^\d+$/.test("123a5"));  // false — has non-digit

// ─────────────────────────────────────────────
// 4. QUANTIFIERS
// ─────────────────────────────────────────────
// *      — 0 or more
// +      — 1 or more
// ?      — 0 or 1 (optional)
// {n}    — exactly n times
// {n,}   — at least n times
// {n,m}  — between n and m times
// Adding ? after makes it lazy (match as few as possible)

/\d*/.test("abc");    // true — 0 digits is valid
/\d+/.test("abc");    // false — needs at least 1
/colou?r/.test("color");   // true — u is optional
/colou?r/.test("colour");  // true

/\d{3}/.test("123");   // true — exactly 3 digits
/\d{3,5}/.test("12345"); // true — 3 to 5 digits

// Greedy vs Lazy
const html = "<b>bold</b> and <i>italic</i>";
console.log(html.match(/<.+>/));    // ["<b>bold</b> and <i>italic</i>"] — GREEDY
console.log(html.match(/<.+?>/));   // ["<b>"] — LAZY (stops as soon as possible)

// ─────────────────────────────────────────────
// 5. ANCHORS
// ─────────────────────────────────────────────
// ^  — start of string (or line with /m)
// $  — end of string (or line with /m)
// \b — word boundary

/^Hello/.test("Hello World");  // true — starts with Hello
/^Hello/.test("Say Hello");    // false — doesn't start with Hello
/World$/.test("Hello World");  // true — ends with World

/\bcat\b/.test("cat");         // true
/\bcat\b/.test("concatenate"); // false — 'cat' is inside a word

// ─────────────────────────────────────────────
// 6. GROUPS & ALTERNATION
// ─────────────────────────────────────────────
// (abc)    — capturing group
// (?:abc)  — non-capturing group
// (?<name>abc) — named capturing group
// a|b      — alternation (a OR b)

// Capturing groups
const dateStr = "2024-03-15";
const dateMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(dateMatch[0]); // "2024-03-15" — full match
console.log(dateMatch[1]); // "2024" — group 1
console.log(dateMatch[2]); // "03"   — group 2
console.log(dateMatch[3]); // "15"   — group 3

// Named capturing groups (cleaner!)
const namedMatch = dateStr.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
const { year, month, day } = namedMatch.groups;
console.log(year, month, day); // "2024" "03" "15"

// Alternation
/cat|dog/.test("I have a cat"); // true
/^(yes|no|maybe)$/i.test("Yes"); // true

// ─────────────────────────────────────────────
// 7. KEY METHODS
// ─────────────────────────────────────────────

const text = "The price is $25.00 and $13.50";

// test() — returns true/false
console.log(/\$\d+/.test(text)); // true

// match() — returns array of matches (or null)
const prices = text.match(/\$[\d.]+/g); // g flag = all matches
console.log(prices); // ["$25.00", "$13.50"]

const firstPrice = text.match(/\$([\d.]+)/); // no g = first match + groups
console.log(firstPrice[1]); // "25.00"

// matchAll() — iterator of all matches with groups
const allMatches = [...text.matchAll(/\$([\d.]+)/g)];
allMatches.forEach(m => console.log(`Found: $${m[1]}`));

// replace() / replaceAll()
const censored = "bad word and another bad word".replace(/bad word/g, "***");
console.log(censored); // "*** and another ***"

// Replace with function
const doubled = "price: $10, tax: $2".replace(/\$(\d+)/g, (match, num) => {
  return `$${Number(num) * 2}`;
});
console.log(doubled); // "price: $20, tax: $4"

// split() with regex
const parts = "one   two\tthree\nfour".split(/\s+/); // any whitespace
console.log(parts); // ["one", "two", "three", "four"]

// search() — returns index of first match (-1 if none)
console.log("hello world".search(/world/)); // 6

// ─────────────────────────────────────────────
// 8. COMMON VALIDATION PATTERNS
// ─────────────────────────────────────────────

const patterns = {
  email:    /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
  phone:    /^\+?[\d\s\-().]{10,15}$/,
  url:      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&/=]*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
  zipUS:    /^\d{5}(-\d{4})?$/,
  ipv4:     /^(\d{1,3}\.){3}\d{1,3}$/,
  hex:      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  date:     /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
};

function validate(pattern, value) {
  return pattern.test(value);
}

console.log(validate(patterns.email, "user@example.com")); // true
console.log(validate(patterns.email, "not-an-email"));     // false
console.log(validate(patterns.hex, "#FF5733"));             // true
console.log(validate(patterns.date, "2024-03-15"));         // true
console.log(validate(patterns.date, "2024-13-01"));         // false — month 13!

// ─────────────────────────────────────────────
// 9. LOOKAHEAD & LOOKBEHIND
// ─────────────────────────────────────────────
// (?=...)  — positive lookahead (must be followed by...)
// (?!...)  — negative lookahead (must NOT be followed by...)
// (?<=...) — positive lookbehind (must be preceded by...)
// (?<!...) — negative lookbehind (must NOT be preceded by...)

// Find digits followed by "px"
"10px 20em 30px".match(/\d+(?=px)/g); // ["10", "30"] — not "20"

// Find digits NOT followed by "px"
"10px 20em 30px".match(/\d+(?!px)/g); // ["20"] (plus partial matches)

// Find amount after "$"
"$100 €200 $300".match(/(?<=\$)\d+/g); // ["100", "300"]

// Password strength: at least 1 digit (lookahead)
/^(?=.*\d).{8,}$/.test("password1"); // true
/^(?=.*\d).{8,}$/.test("password");  // false — no digit

// ─────────────────────────────────────────────
// 📝 EXERCISES
// ─────────────────────────────────────────────
// Exercise 1: Write a regex to extract all hashtags from a tweet string.
//   "#hello world #javascript is #awesome" → ["#hello", "#javascript", "#awesome"]
//
// Exercise 2: Write a function to mask a credit card number:
//   "4532 1234 5678 9012" → "4532 **** **** 9012"
//
// Exercise 3: Parse a query string into an object:
//   "name=Alice&age=30&city=NY" → { name:"Alice", age:"30", city:"NY" }
//
// Exercise 4: Write a template engine that replaces {{variable}} placeholders.
