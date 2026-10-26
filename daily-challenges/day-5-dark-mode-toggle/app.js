const body = document.body;
const themeButton = document.getElementById("theme-button");
const savedTheme = localStorage.getItem("theme");

function updateThemeButton() {
    const darkMode = body.classList.contains("dark");
    themeButton.textContent = darkMode ? "Disable Dark Mode" : "Enable Dark Mode";
    themeButton.setAttribute("aria-pressed", String(darkMode));
}

if (savedTheme === "dark") {
    body.classList.add("dark");
}

updateThemeButton();

themeButton.addEventListener("click", () => {
    const darkMode = body.classList.toggle("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    updateThemeButton();
});
