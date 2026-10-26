const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");
const filters = document.querySelectorAll(".filter");
const clearCompletedButton = document.getElementById("clear-completed");
const formMessage = document.getElementById("form-message");
const emptyState = document.getElementById("empty-state");
const emptyTitle = document.getElementById("empty-title");
const emptyText = document.getElementById("empty-text");

let todos = [];
let currentFilter = "all";

function createId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createTodoElement(todo) {
    const item = document.createElement("li");
    item.className = "todo-item";
    item.dataset.id = todo.id;

    if (todo.completed) {
        item.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-check";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `Mark "${todo.text}" as ${todo.completed ? "active" : "completed"}`);

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;
    text.title = "Double-click to edit";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.dataset.action = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete "${todo.text}"`);

    item.append(checkbox, text, deleteButton);

    return item;
}

function getVisibleTodos() {
    if (currentFilter === "active") {
        return todos.filter(todo => !todo.completed);
    }

    if (currentFilter === "completed") {
        return todos.filter(todo => todo.completed);
    }

    return todos;
}

function renderTodos() {
    todoList.replaceChildren();

    const visibleTodos = getVisibleTodos();

    visibleTodos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });

    updateStats();
    updateEmptyState(visibleTodos.length);
}

function updateStats() {
    const remaining = todos.filter(todo => !todo.completed).length;
    taskCount.textContent = `${remaining} ${remaining === 1 ? "item" : "items"} left`;
    clearCompletedButton.disabled = !todos.some(todo => todo.completed);
}

function updateEmptyState(visibleCount) {
    emptyState.hidden = visibleCount !== 0;

    if (visibleCount !== 0) {
        return;
    }

    if (todos.length === 0) {
        emptyTitle.textContent = "Nothing here yet.";
        emptyText.textContent = "Add your first task above.";
        return;
    }

    if (currentFilter === "active") {
        emptyTitle.textContent = "All caught up.";
        emptyText.textContent = "There are no active tasks.";
        return;
    }

    if (currentFilter === "completed") {
        emptyTitle.textContent = "No completed tasks.";
        emptyText.textContent = "Complete a task and it will appear here.";
        return;
    }

    emptyTitle.textContent = "Nothing here yet.";
    emptyText.textContent = "Add your first task above.";
}

function showMessage(message = "") {
    formMessage.textContent = message;
}

function addTodo(text) {
    const cleanText = text.trim();

    if (!cleanText) {
        showMessage("Please enter a task.");
        input.focus();
        return;
    }

    todos.push({
        id: createId(),
        text: cleanText,
        completed: false
    });

    showMessage();
    input.value = "";
    renderTodos();
    input.focus();
}

function toggleTodo(id) {
    const todo = todos.find(item => item.id === id);

    if (!todo) {
        return;
    }

    todo.completed = !todo.completed;
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
}

function filterTodos(filter) {
    if (!["all", "active", "completed"].includes(filter)) {
        return;
    }

    currentFilter = filter;

    filters.forEach(button => {
        const isActive = button.dataset.filter === currentFilter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    renderTodos();
}

function startEditing(item, todo) {
    if (!item || !todo || item.querySelector(".edit-input")) {
        return;
    }

    const text = item.querySelector(".todo-text");
    const editInput = document.createElement("input");

    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = todo.text;
    editInput.maxLength = 200;
    editInput.setAttribute("aria-label", `Edit "${todo.text}"`);

    text.replaceWith(editInput);
    editInput.focus();
    editInput.select();

    let finished = false;

    function finish(save) {
        if (finished) {
            return;
        }

        finished = true;

        if (save) {
            const newText = editInput.value.trim();

            if (newText) {
                todo.text = newText;
            }
        }

        renderTodos();
    }

    editInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            finish(true);
        }

        if (event.key === "Escape") {
            event.preventDefault();
            finish(false);
        }
    });

    editInput.addEventListener("blur", () => finish(true));
}

form.addEventListener("submit", event => {
    event.preventDefault();
    addTodo(input.value);
});

input.addEventListener("input", () => {
    if (formMessage.textContent) {
        showMessage();
    }
});

filters.forEach(button => {
    button.addEventListener("click", () => {
        filterTodos(button.dataset.filter);
    });
});

todoList.addEventListener("click", event => {
    const item = event.target.closest(".todo-item");

    if (!item) {
        return;
    }

    const id = item.dataset.id;

    if (event.target.closest(".delete-button")) {
        deleteTodo(id);
        return;
    }

    if (event.target.classList.contains("todo-check")) {
        toggleTodo(id);
    }
});

todoList.addEventListener("dblclick", event => {
    const text = event.target.closest(".todo-text");

    if (!text) {
        return;
    }

    const item = text.closest(".todo-item");
    const todo = todos.find(entry => entry.id === item.dataset.id);

    startEditing(item, todo);
});

clearCompletedButton.addEventListener("click", clearCompleted);

renderTodos();
