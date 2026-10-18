// ============================================
// LESSON 9 — CLASSWORK EXERCISE: dom.js (Tasks 9.1–9.4)
// Copy dom-practice.html AND this file into the root of iyf-s12-week-05-{username}.
// Live Server → open dom-practice.html → F12 → Console.
//
// RULES: querySelector by default · textContent for text · classList for looks
//        (no element.style) · const/let only
// ============================================

// small helper: logs ✓ or ✗ so you can check yourself
const check = (label, ok) => console.log(`${ok ? "✓" : "✗"} ${label}`);


// ============================================
// STEP 1 — Task 9.1: select TEN ways. Store each in a const, then log it.
// ============================================

// TODO 1  the h1
const header = document.querySelector('h1');

// TODO 2  all elements with class "content"
const content = document.querySelectorAll('.content');

// TODO 3  the form with id "contact-form" (use getElementById — no #)
const form = document.getElementById('contact-form');

// TODO 4  the email input INSIDE the form (one querySelector with a descendant selector)
const input = form.querySelector('input[type="email"]');

// TODO 5  all list items in the nav
const nav = document.querySelector('nav');
const items = nav.querySelectorAll('li');

// TODO 6  the first .nav-link
const firstLink = document.querySelector('nav .nav-link');

// TODO 7  the last paragraph in the article   (hint: p:last-of-type)
const lastParagraph = document.querySelector('article p:last-of-type');

// TODO 8–10  three more of your own
const unsafe = document.getElementById('unsafe');
const safe = document.getElementById('safe');
const footer = document.querySelector('footer');

// Then: what does document.querySelector(".does-not-exist") return? Log it.
const doesNotExist = document.querySelector('.does-not-exist');

console.log(header);
console.log(content);
console.log(form);
console.log(input);
console.log(items);
console.log(firstLink);
console.log(lastParagraph);
console.log(unsafe);
console.log(safe);
console.log(footer);
console.log(doesNotExist);

// And: turn your nav items NodeList into an array of their text with [...list].map()
const itemsNav = nav.querySelectorAll('li');
const texts = [...itemsNav].map(item => item.textContent);

console.log(texts);


// ============================================
// STEP 2 — Task 9.2: traverse. Say the route out loud before you write it.
// ============================================

// TODO 1  from the header, find the nav inside it
const headerNav = header.querySelector('nav');

// TODO 2  from the first .nav-link, get its parent li
const firstNavItem = firstLink.parentElement;

// TODO 3  from the article, get its next sibling (should be a section)
const article = document.querySelector('article');
const nextSection = article.nextElementSibling;

// TODO 4  from the ul, get all its child li elements
const navList = document.querySelector('.nav-list');
const navItems = navList.children;

// TODO 5  from the footer, go up to the body
const body = footer.parentElement;

// TODO 6  from the first .nav-link, use closest() to reach the header
const mainHeader = firstLink.closest('header');

console.log(headerNav);
console.log(firstNavItem);
console.log(nextSection);
console.log(navItems);
console.log(body);
console.log(mainHeader);


// ============================================
// STEP 3 — Task 9.3: change things
// ============================================

// TODO 1  change the h1 text to something of yours
header.textContent = 'This is a header';

// TODO 2  point the first .nav-link at https://developer.mozilla.org, open in a new tab
//         (target="_blank" and rel="noopener")
firstLink.setAttribute('href', 'https://developer.mozilla.org');
firstLink.setAttribute('target', '_blank');
firstLink.setAttribute('rel', 'noopener');

// TODO 3  read the article's data-id and data-category with dataset;
//         add data-status="reviewed"
const articleId = article.dataset.id;
const articleCategory = article.dataset.category;

article.dataset.status = 'reviewed';

console.log(articleId);
console.log(articleCategory);
console.log(article.dataset.status);

// TODO 4  add the class "highlight" to the first .content paragraph,
//         toggle "accent" on the second — NO element.style
const paras = document.querySelectorAll('.content');

paras[0].classList.add('highlight');
paras[1].classList.toggle('accent');

// TODO 5  THE INJECTION DEMO — run these two lines and watch:
//   const userInput = `<img src="x" onerror="alert('hacked!')">`;
//   document.getElementById("unsafe").innerHTML = userInput;   // what happens?
//   document.getElementById("safe").textContent = userInput;   // and now?
//
//   I would use textContent for a user's comment because the browser treats
//   the input as text rather than HTML, so it doesn't interpret the input as HTML.

// Injection demonstration
const userInput = `<img src="x" onerror="alert('Got you good Bro!!')">`;

unsafe.innerHTML = userInput;
safe.textContent = userInput;


// ============================================
// STEP 4 — Task 9.4: create, remove, clone
// ============================================

// TODO 1  write addNavItem(text, href): creates <li><a class="nav-link" href=>text</a></li>
//         and appends it to .nav-list. Use textContent for the text.

function addNavItem(text, href) {
    const navList = document.querySelector('.nav-list');

    const li = document.createElement('li');
    const a = document.createElement('a');

    a.classList.add('nav-link');
    a.setAttribute('href', href);
    a.textContent = text;

    li.appendChild(a);
    navList.appendChild(li);
}

addNavItem('Blog', '#blog');
addNavItem('Portfolio', '#portfolio');


// TODO 2  create a paragraph and insert it BEFORE the article's first paragraph

const newParagraph = document.createElement('p');

newParagraph.textContent = 'This is my new paragraph, intended to be first.';

const firstParagraph = article.querySelector('p');

if (firstParagraph) {
    article.insertBefore(newParagraph, firstParagraph);
} else {
    article.appendChild(newParagraph);
}


// TODO 3  clone the first nav li (deep), change its text to "Cloned", prepend it to the list

const firstLi = navList.querySelector('li');
const clonedLi = firstLi.cloneNode(true);

clonedLi.querySelector('a').textContent = 'Cloned';

navList.prepend(clonedLi);


// TODO 4  remove the footer

footer.remove();


// ============================================
// STEP 5 — COMMIT as you go
//   git add dom-practice.html dom.js
//   git commit -m "Add: element selection practice"
//   git commit -m "Add: content, attribute and class changes"
//   git commit -m "Add: create and remove elements"
//   git push