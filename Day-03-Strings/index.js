// ============================================================
// 🚀 DAY 03 — Strings & String Methods
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================

// ─────────────────────────────────────────────
// 1. CREATING STRINGS
// ─────────────────────────────────────────────

let single   = 'Hello';          // Single quotes
let double   = "World";          // Double quotes
let backtick = `Template Literal`; // Backtick — most powerful!

// Escaping special characters
let quote = "He said \"Hello!\"";       // \" inside double quotes
let path  = 'C:\\Users\\Alice\\file';   // \\ for backslash
let newLine = "Line 1\nLine 2";         // \n for new line
let tab     = "Column1\tColumn2";       // \t for tab

console.log(newLine);
// Line 1
// Line 2


// ─────────────────────────────────────────────
// 2. TEMPLATE LITERALS (backticks)
// The modern and preferred way to work with strings
// ─────────────────────────────────────────────

let name = "Alice";
let age  = 25;

// String interpolation — embed expressions with ${}
let message = `My name is ${name} and I am ${age} years old.`;
console.log(message); // "My name is Alice and I am 25 years old."

// Any expression works inside ${}
console.log(`2 + 2 = ${2 + 2}`);         // "2 + 2 = 4"
console.log(`Uppercase: ${name.toUpperCase()}`); // "Uppercase: ALICE"

// Multi-line strings — backticks preserve line breaks
let poem = `
  Roses are red,
  Violets are blue,
  JavaScript is awesome,
  And so are you!
`;
console.log(poem);


// ─────────────────────────────────────────────
// 3. STRING PROPERTIES & INDEXING
// ─────────────────────────────────────────────

let str = "JavaScript";

// .length — number of characters
console.log(str.length); // 10

// Indexing — access individual characters (0-based)
console.log(str[0]);    // "J"
console.log(str[4]);    // "S"
console.log(str[str.length - 1]); // "t" — last character

// Strings are immutable — you can't change individual characters
str[0] = "j"; // No error, but does nothing!
console.log(str); // Still "JavaScript"


// ─────────────────────────────────────────────
// 4. STRING METHODS
// Strings have many built-in methods — here are the most important ones
// ─────────────────────────────────────────────

let text = "  Hello, World!  ";

// ── Case Methods ──────────────────────────────
console.log(text.toUpperCase()); // "  HELLO, WORLD!  "
console.log(text.toLowerCase()); // "  hello, world!  "

// ── Trimming Whitespace ──────────────────────
console.log(text.trim());        // "Hello, World!" — removes both ends
console.log(text.trimStart());   // "Hello, World!  " — removes left only
console.log(text.trimEnd());     // "  Hello, World!" — removes right only

// ── Searching ────────────────────────────────
let sentence = "The quick brown fox jumps over the lazy dog";

// indexOf — returns index of first occurrence (-1 if not found)
console.log(sentence.indexOf("fox"));    // 16
console.log(sentence.indexOf("cat"));    // -1

// lastIndexOf — returns index of last occurrence
console.log(sentence.lastIndexOf("the")); // 31

// includes — returns true/false (most readable)
console.log(sentence.includes("fox"));  // true
console.log(sentence.includes("cat"));  // false

// startsWith / endsWith
console.log(sentence.startsWith("The")); // true
console.log(sentence.endsWith("dog"));   // true
console.log(sentence.startsWith("fox")); // false

// ── Extracting Parts ─────────────────────────
let lang = "JavaScript";

// slice(start, end) — end is exclusive, supports negatives
console.log(lang.slice(0, 4));    // "Java"
console.log(lang.slice(4));       // "Script" — to end
console.log(lang.slice(-6));      // "Script" — negative counts from end
console.log(lang.slice(0, -6));   // "Java"

// substring(start, end) — similar to slice, no negatives
console.log(lang.substring(0, 4));  // "Java"
console.log(lang.substring(4, 10)); // "Script"

// charAt(index) — returns character at index
console.log(lang.charAt(0));  // "J"
console.log(lang.charAt(4));  // "S"

// ── Replacing ────────────────────────────────
let phrase = "I love cats. Cats are great!";

// replace — replaces FIRST match only
console.log(phrase.replace("Cats", "Dogs")); 
// "I love cats. Dogs are great!"

// replaceAll — replaces ALL matches (ES2021)
console.log(phrase.replaceAll("cats", "dogs"));
// "I love dogs. Cats are great!" (case-sensitive!)

// With regex for case-insensitive replace
console.log(phrase.replace(/cats/gi, "dogs"));
// "I love dogs. dogs are great!"

// ── Splitting & Joining ───────────────────────
let csv = "Alice,Bob,Charlie,Diana";

// split — converts string to array
let names = csv.split(",");
console.log(names); // ["Alice", "Bob", "Charlie", "Diana"]

// split with empty string — splits every character
let chars = "hello".split("");
console.log(chars); // ["h", "e", "l", "l", "o"]

// join — converts array back to string (see Day 04 for more)
console.log(names.join(" | ")); // "Alice | Bob | Charlie | Diana"

// ── Repeating & Padding ───────────────────────
console.log("ha".repeat(3));         // "hahaha"
console.log("5".padStart(3, "0"));   // "005" — pad to length 3 with "0"
console.log("5".padEnd(3, "0"));     // "500"
console.log("42".padStart(5, "0"));  // "00042"

// ── Converting to Array of Characters ─────────
// (Modern method using spread, covered in Day 11)
let word = "hello";
let arr = [...word];
console.log(arr); // ["h", "e", "l", "l", "o"]


// ─────────────────────────────────────────────
// 5. STRING COMPARISONS
// ─────────────────────────────────────────────

// Strings are compared character by character (lexicographic order)
console.log("apple" < "banana");  // true
console.log("banana" > "apple");  // true
console.log("abc" === "abc");     // true

// Uppercase letters are "less than" lowercase (ASCII order)
console.log("Z" < "a");  // true (Z = 90, a = 97 in ASCII)

// Use localeCompare for proper language-aware sorting
console.log("a".localeCompare("b")); // -1 (a comes before b)
console.log("b".localeCompare("a")); // 1  (b comes after a)
console.log("a".localeCompare("a")); // 0  (equal)


// ─────────────────────────────────────────────
// 6. PRACTICAL EXAMPLES
// ─────────────────────────────────────────────

// Example 1: Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
console.log(capitalize("jAVASCRIPT")); // "Javascript"

// Example 2: Count occurrences of a character
function countChar(str, char) {
  return str.split(char).length - 1;
}
console.log(countChar("hello world", "l")); // 3

// Example 3: Check if a string is a palindrome
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
}
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
console.log(isPalindrome("A man a plan a canal Panama")); // true

// Example 4: Truncate a long string
function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}
console.log(truncate("Hello, World!", 8));   // "Hello, W..."
console.log(truncate("Hi", 8));              // "Hi"


// ─────────────────────────────────────────────
// 📝 EXERCISES — Try these yourself!
// ─────────────────────────────────────────────

// Exercise 1:
// Extract first name and last name from "John Doe" using split and destructuring.

// Exercise 2:
// Write a function that checks if a string contains only digits.
// Hint: use a loop or a regex like /^\d+$/

// Exercise 3:
// Write a function that converts "hello_world_foo" to "helloWorldFoo" (camelCase).

// Exercise 4:
// Count how many vowels (a, e, i, o, u) are in a given string.

// Exercise 5:
// Reverse a string without using .reverse() directly on the string.
