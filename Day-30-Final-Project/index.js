// ============================================================
// 🚀 DAY 30 — FINAL PROJECT: Full JavaScript Todo App
// 30 Days of JavaScript: Beginner to Advanced
// ============================================================
// This project combines EVERYTHING from the course:
// ✅ Classes & Prototypes (Day 15-16)
// ✅ Async/Await + Fetch (Day 18-19)
// ✅ DOM Manipulation + Events (Day 12-13)
// ✅ Local Storage (Day 22)
// ✅ Closures & HOFs (Day 24-25)
// ✅ Modules pattern (Day 21)
// ✅ Error Handling (Day 20)
// ✅ Regex (Day 23)
// ✅ Map & Set (Day 27)
// ✅ Design Patterns (Day 29)

// ─────────────────────────────────────────────
// 1. DATA MODELS
// ─────────────────────────────────────────────

class Todo {
  static #nextId = 1;

  constructor({ text, priority = "medium", tags = [], dueDate = null }) {
    this.id        = Todo.#nextId++;
    this.text      = text.trim();
    this.done      = false;
    this.priority  = priority;    // "low" | "medium" | "high"
    this.tags      = new Set(tags);
    this.dueDate   = dueDate ? new Date(dueDate) : null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  toggle() {
    this.done      = !this.done;
    this.updatedAt = new Date();
    return this;
  }

  update(fields) {
    const allowed = ["text", "priority", "dueDate"];
    allowed.forEach(f => {
      if (f in fields) this[f] = f === "dueDate" ? new Date(fields[f]) : fields[f];
    });
    if (fields.tags) this.tags = new Set(fields.tags);
    this.updatedAt = new Date();
    return this;
  }

  addTag(tag)    { this.tags.add(tag.toLowerCase()); return this; }
  removeTag(tag) { this.tags.delete(tag.toLowerCase()); return this; }

  get isOverdue() {
    return this.dueDate && !this.done && new Date() > this.dueDate;
  }

  get tagsArray() { return [...this.tags]; }

  toJSON() {
    return {
      id: this.id, text: this.text, done: this.done,
      priority: this.priority, tags: [...this.tags],
      dueDate: this.dueDate?.toISOString() || null,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }

  static fromJSON(data) {
    const todo = new Todo(data);
    todo.id        = data.id;
    todo.done      = data.done;
    todo.createdAt = new Date(data.createdAt);
    todo.updatedAt = new Date(data.updatedAt);
    Todo.#nextId   = Math.max(Todo.#nextId, data.id + 1);
    return todo;
  }
}

// ─────────────────────────────────────────────
// 2. STORE — State management using Observer pattern
// ─────────────────────────────────────────────

class TodoStore {
  #todos     = new Map();   // id → Todo
  #listeners = new Map();   // event → Set of callbacks

  constructor() {
    this.#loadFromStorage();
  }

  // ── Observer / Event system ──────────────────
  on(event, callback) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, new Set());
    this.#listeners.get(event).add(callback);
    return () => this.#listeners.get(event).delete(callback); // unsubscribe fn
  }

  #emit(event, data) {
    this.#listeners.get(event)?.forEach(cb => cb(data));
    this.#listeners.get("*")?.forEach(cb => cb({ event, data })); // wildcard
    this.#saveToStorage();
  }

  // ── CRUD ─────────────────────────────────────
  add(data) {
    const todo = new Todo(data);
    this.#todos.set(todo.id, todo);
    this.#emit("add", todo);
    return todo;
  }

  toggle(id) {
    const todo = this.#getOrThrow(id);
    todo.toggle();
    this.#emit("update", todo);
    return todo;
  }

  update(id, fields) {
    const todo = this.#getOrThrow(id);
    todo.update(fields);
    this.#emit("update", todo);
    return todo;
  }

  remove(id) {
    const todo = this.#getOrThrow(id);
    this.#todos.delete(id);
    this.#emit("remove", todo);
    return todo;
  }

  clearCompleted() {
    const removed = [];
    for (const [id, todo] of this.#todos) {
      if (todo.done) { removed.push(todo); this.#todos.delete(id); }
    }
    this.#emit("clearCompleted", removed);
    return removed;
  }

  // ── Queries ──────────────────────────────────
  getAll()       { return [...this.#todos.values()]; }
  getById(id)    { return this.#todos.get(id) || null; }
  getPending()   { return this.getAll().filter(t => !t.done); }
  getCompleted() { return this.getAll().filter(t =>  t.done); }
  getOverdue()   { return this.getAll().filter(t => t.isOverdue); }

  getByTag(tag) {
    return this.getAll().filter(t => t.tags.has(tag.toLowerCase()));
  }

  search(query) {
    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    return this.getAll().filter(t => regex.test(t.text));
  }

  getSortedBy(field, direction = "asc") {
    const todos = this.getAll();
    const priorityOrder = { high: 0, medium: 1, low: 2 };

    todos.sort((a, b) => {
      let aVal = field === "priority" ? priorityOrder[a.priority] : a[field];
      let bVal = field === "priority" ? priorityOrder[b.priority] : b[field];
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ?  1 : -1;
      return 0;
    });
    return todos;
  }

  getStats() {
    const all       = this.getAll();
    const done      = this.getCompleted();
    const tags      = new Map();
    all.forEach(t => t.tags.forEach(tag => tags.set(tag, (tags.get(tag)||0)+1)));

    return {
      total:     all.length,
      completed: done.length,
      pending:   all.length - done.length,
      overdue:   this.getOverdue().length,
      completionRate: all.length ? Math.round(done.length/all.length*100) : 0,
      byPriority: {
        high:   all.filter(t => t.priority==="high").length,
        medium: all.filter(t => t.priority==="medium").length,
        low:    all.filter(t => t.priority==="low").length
      },
      popularTags: [...tags.entries()].sort((a,b)=>b[1]-a[1]).slice(0,5)
    };
  }

  // ── Private helpers ───────────────────────────
  #getOrThrow(id) {
    const todo = this.#todos.get(id);
    if (!todo) throw new Error(`Todo with id ${id} not found`);
    return todo;
  }

  #saveToStorage() {
    try {
      const data = this.getAll().map(t => t.toJSON());
      localStorage.setItem("todos", JSON.stringify(data));
    } catch (e) { console.warn("Failed to save:", e); }
  }

  #loadFromStorage() {
    try {
      const raw = localStorage.getItem("todos");
      if (!raw) return;
      JSON.parse(raw).forEach(data => {
        const todo = Todo.fromJSON(data);
        this.#todos.set(todo.id, todo);
      });
    } catch (e) { console.warn("Failed to load:", e); }
  }
}

// ─────────────────────────────────────────────
// 3. UI CONTROLLER
// ─────────────────────────────────────────────

class TodoApp {
  #store;
  #filter  = "all";   // "all" | "pending" | "completed" | "overdue"
  #sort    = "createdAt";
  #search  = "";

  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.#store = new TodoStore();
    this.#buildUI();
    this.#bindEvents();
    this.#subscribeToStore();
    this.#render();
  }

  #buildUI() {
    this.container.innerHTML = `
      <div class="todo-app">
        <header>
          <h1>📝 My Todo App</h1>
          <div class="stats" id="stats"></div>
        </header>

        <section class="add-todo">
          <input type="text"    id="todo-input"    placeholder="What needs to be done?" />
          <select id="priority-select">
            <option value="low">Low</option>
            <option value="medium" selected>Medium</option>
            <option value="high">High</option>
          </select>
          <input type="date"    id="due-date" />
          <input type="text"    id="tags-input" placeholder="Tags (comma-separated)" />
          <button id="add-btn">Add Todo</button>
        </section>

        <section class="controls">
          <input type="search" id="search-input" placeholder="Search todos..." />
          <div class="filters">
            <button data-filter="all"       class="filter-btn active">All</button>
            <button data-filter="pending"   class="filter-btn">Pending</button>
            <button data-filter="completed" class="filter-btn">Done</button>
            <button data-filter="overdue"   class="filter-btn">Overdue</button>
          </div>
          <select id="sort-select">
            <option value="createdAt">Date Added</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="text">Alphabetical</option>
          </select>
          <button id="clear-btn">Clear Completed</button>
        </section>

        <ul id="todo-list"></ul>
        <div id="empty-state" class="hidden">Nothing here! Add a todo above 🎉</div>
      </div>
    `;
  }

  #bindEvents() {
    const input    = this.container.querySelector("#todo-input");
    const addBtn   = this.container.querySelector("#add-btn");
    const clearBtn = this.container.querySelector("#clear-btn");
    const searchEl = this.container.querySelector("#search-input");
    const sortEl   = this.container.querySelector("#sort-select");
    const list     = this.container.querySelector("#todo-list");

    // Add todo on button click or Enter key
    const addTodo = () => {
      const text = input.value.trim();
      if (!text) { input.focus(); return; }
      const priority = this.container.querySelector("#priority-select").value;
      const dueDate  = this.container.querySelector("#due-date").value || null;
      const tags     = this.container.querySelector("#tags-input").value
                        .split(",").map(t=>t.trim()).filter(Boolean);
      this.#store.add({ text, priority, dueDate, tags });
      input.value = "";
      this.container.querySelector("#tags-input").value = "";
      input.focus();
    };

    addBtn.addEventListener("click", addTodo);
    input.addEventListener("keydown", e => e.key === "Enter" && addTodo());
    clearBtn.addEventListener("click", () => this.#store.clearCompleted());

    // Search — debounced
    const debouncedSearch = this.#debounce((val) => {
      this.#search = val;
      this.#render();
    }, 250);
    searchEl.addEventListener("input", e => debouncedSearch(e.target.value));

    // Sort
    sortEl.addEventListener("change", e => { this.#sort = e.target.value; this.#render(); });

    // Filter buttons
    this.container.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        this.container.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        this.#filter = e.target.dataset.filter;
        this.#render();
      });
    });

    // Event delegation for list actions
    list.addEventListener("click", e => {
      const li = e.target.closest("li[data-id]");
      if (!li) return;
      const id = parseInt(li.dataset.id);

      if (e.target.classList.contains("toggle-btn"))  this.#store.toggle(id);
      if (e.target.classList.contains("delete-btn"))  this.#store.remove(id);
      if (e.target.classList.contains("edit-btn"))    this.#startEdit(li, id);
    });
  }

  #subscribeToStore() {
    this.#store.on("*", () => this.#render());
  }

  #getFilteredTodos() {
    let todos;
    switch (this.#filter) {
      case "pending":   todos = this.#store.getPending();   break;
      case "completed": todos = this.#store.getCompleted(); break;
      case "overdue":   todos = this.#store.getOverdue();   break;
      default:          todos = this.#store.getAll();
    }
    if (this.#search) {
      const rx = new RegExp(this.#search.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"), "i");
      todos = todos.filter(t => rx.test(t.text));
    }
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return todos.sort((a, b) => {
      const av = this.#sort === "priority" ? priorityOrder[a.priority] : a[this.#sort];
      const bv = this.#sort === "priority" ? priorityOrder[b.priority] : b[this.#sort];
      return av < bv ? -1 : av > bv ? 1 : 0;
    });
  }

  #render() {
    const todos   = this.#getFilteredTodos();
    const list    = this.container.querySelector("#todo-list");
    const empty   = this.container.querySelector("#empty-state");
    const stats   = this.container.querySelector("#stats");
    const s       = this.#store.getStats();

    stats.innerHTML = `
      ${s.total} total · ${s.completed} done · ${s.pending} pending
      ${s.overdue > 0 ? `· <span style="color:red">${s.overdue} overdue</span>` : ""}
      · ${s.completionRate}% complete
    `;

    if (todos.length === 0) {
      list.innerHTML = "";
      empty.classList.remove("hidden");
      return;
    }
    empty.classList.add("hidden");

    const priorityColors = { high:"#ff4444", medium:"#ff8800", low:"#22aa22" };

    list.innerHTML = todos.map(todo => `
      <li data-id="${todo.id}" class="${todo.done ? "done" : ""} ${todo.isOverdue ? "overdue" : ""}">
        <button class="toggle-btn" title="Toggle">${todo.done ? "✅" : "⬜"}</button>
        <span class="todo-text">${this.#escapeHtml(todo.text)}</span>
        <span class="priority-badge" style="color:${priorityColors[todo.priority]}">
          ${todo.priority}
        </span>
        ${todo.dueDate ? `<span class="due-date">📅 ${todo.dueDate.toLocaleDateString()}</span>` : ""}
        ${todo.tagsArray.map(t=>`<span class="tag">#${t}</span>`).join("")}
        <button class="edit-btn" title="Edit">✏️</button>
        <button class="delete-btn" title="Delete">🗑️</button>
      </li>
    `).join("");
  }

  #startEdit(li, id) {
    const todo    = this.#store.getById(id);
    const textEl  = li.querySelector(".todo-text");
    const current = textEl.textContent;
    const input   = document.createElement("input");
    input.type  = "text";
    input.value = current;
    input.className = "edit-input";
    textEl.replaceWith(input);
    input.focus(); input.select();

    const finish = () => {
      const newText = input.value.trim();
      if (newText && newText !== current) this.#store.update(id, { text: newText });
      else this.#render();
    };
    input.addEventListener("blur",   finish);
    input.addEventListener("keydown", e => {
      if (e.key === "Enter")  finish();
      if (e.key === "Escape") this.#render();
    });
  }

  #escapeHtml(str) {
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  #debounce(fn, delay) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(()=>fn(...args), delay); };
  }
}

// ─────────────────────────────────────────────
// 4. INITIALIZE
// ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const app = new TodoApp("#app");

  // Seed some example todos if store is empty
  if (app && app._store?.getAll().length === 0) {
    // Uncomment to add sample data:
    // app._store.add({ text: "Learn JavaScript", priority: "high", tags: ["learning"] });
    // app._store.add({ text: "Build a project",  priority: "medium", tags: ["coding"] });
    // app._store.add({ text: "Read a book",       priority: "low" });
  }
});

// ─────────────────────────────────────────────
// 🎓 CONGRATULATIONS! You've completed the course!
// ─────────────────────────────────────────────
// You now know:
// ✅ All core JavaScript concepts (variables to closures)
// ✅ Modern ES6+ syntax (arrow functions, classes, modules)
// ✅ Async programming (Promises, async/await, Fetch API)
// ✅ DOM manipulation and events
// ✅ Advanced patterns (design patterns, HOFs, generators)
// ✅ Data structures (Map, Set, WeakMap, WeakSet)
//
// WHAT TO BUILD NEXT:
// 🚀 A full-stack app with Node.js/Express + this frontend
// 🚀 Refactor this app using React or Vue
// 🚀 Add a backend with REST API and database
// 🚀 Add authentication and user accounts
// 🚀 Deploy to Vercel, Netlify, or GitHub Pages
