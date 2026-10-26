// Lesson 9.1 — Selecting Elements
const header = document.getElementById("main-header");
const contents = document.getElementsByClassName("content");
const paragraphs = document.getElementsByTagName("p");
const firstLink = document.querySelector(".nav-link");
const allLinks = document.querySelectorAll(".nav-link");

console.log("getElementById:", header);
console.log("getElementsByClassName:", contents);
console.log("getElementsByTagName:", paragraphs);
console.log("querySelector:", firstLink);
console.log("querySelectorAll:", allLinks);

const h1 = document.querySelector("h1");
const form = document.getElementById("contact-form");
const emailInput = document.getElementById("email");
const navItems = document.querySelectorAll(".nav-list li");
const lastParagraph = document.querySelector("footer p");

console.log("h1:", h1);
console.log("content elements:", contents);
console.log("contact form:", form);
console.log("email input:", emailInput);
console.log("nav items:", navItems);
console.log("last paragraph:", lastParagraph);

// Lesson 9.2 — Traversing the DOM
const nav = document.querySelector("nav");
const firstNavLink = document.querySelector(".nav-link");
const article = document.querySelector("article");
const ul = document.querySelector(".nav-list");
const footer = document.querySelector("footer");

console.log("header → nav:", header.querySelector("nav"));
console.log("nav-link → parent li:", firstNavLink.parentElement);
console.log("article → next sibling:", article.nextElementSibling);
console.log("ul → child li elements:", ul.children);
console.log("footer → body:", footer.parentElement);

// Lesson 9.3 — Modifying Content
console.log("h1 textContent:", h1.textContent);
console.log("h1 innerText:", h1.innerText);

const practiceHeading = document.querySelector(".title");
practiceHeading.textContent = "DOM Practice Article";

console.log("article HTML:", article.innerHTML);

const link = document.querySelector(".nav-link");
console.log("href attribute:", link.getAttribute("href"));
console.log("href property:", link.href);
console.log("has target:", link.hasAttribute("target"));

link.setAttribute("data-category", "practice");
console.log("data-category:", link.dataset.category);
link.dataset.lesson = "9";
console.log("data-lesson:", link.dataset.lesson);

const container = document.querySelector(".container");
container.style.backgroundColor = "#f8fafc";
container.style.padding = "30px";
container.style.borderRadius = "12px";

// Lesson 9.4 — Adding, Removing & Cloning
function addNavItem(text, href) {
    const li = document.createElement("li");
    const anchor = document.createElement("a");

    anchor.className = "nav-link";
    anchor.textContent = text;
    anchor.href = href;

    li.appendChild(anchor);
    ul.appendChild(li);
}

addNavItem("Blog", "/blog");
addNavItem("Portfolio", "/portfolio");

const clonedItem = firstNavLink.parentElement.cloneNode(true);
clonedItem.querySelector("a").textContent = "Cloned Link";
ul.appendChild(clonedItem);

// Lesson 10.1 — Event Listeners
const demoButton = document.createElement("button");
demoButton.type = "button";
demoButton.textContent = "Click Me";
document.body.appendChild(demoButton);

function handleClick() {
    console.log("Handled!");
}

demoButton.addEventListener("click", () => {
    console.log("Button clicked!");
});

demoButton.addEventListener("click", handleClick);
demoButton.removeEventListener("click", handleClick);

// Lesson 10.2 — Event Object
document.addEventListener("click", event => {
    console.log("Target:", event.target);
    console.log("Current Target:", event.currentTarget);
    console.log("Type:", event.type);
});

document.addEventListener("keydown", event => {
    console.log("Key:", event.key);
    console.log("Code:", event.code);
    console.log("Shift:", event.shiftKey);
    console.log("Ctrl:", event.ctrlKey);
    console.log("Alt:", event.altKey);
});

// Lesson 10.3 — Event Delegation
ul.addEventListener("click", event => {
    const item = event.target.closest("li");

    if (!item || !ul.contains(item)) {
        return;
    }

    item.classList.toggle("highlight");
});

// Lesson 10.4 — Form Handling
function showError(inputElement, message) {
    inputElement.setAttribute("aria-invalid", "true");
    inputElement.title = message;
}

function clearError(inputElement) {
    inputElement.removeAttribute("aria-invalid");
    inputElement.removeAttribute("title");
}

function validateForm() {
    const nameValue = document.getElementById("name").value.trim();
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (nameValue.length < 2) {
        showError(document.getElementById("name"), "Name must be at least 2 characters");
        valid = false;
    } else {
        clearError(document.getElementById("name"));
    }

    if (!emailRegex.test(emailValue)) {
        showError(emailInput, "Please enter a valid email");
        valid = false;
    } else {
        clearError(emailInput);
    }

    return valid;
}

document.getElementById("name").addEventListener("input", validateForm);
emailInput.addEventListener("input", validateForm);

form.addEventListener("submit", event => {
    event.preventDefault();

    if (validateForm()) {
        console.log("Form submitted successfully!");
        form.reset();
        clearError(document.getElementById("name"));
        clearError(emailInput);
    }
});
