const button = document.getElementById("color-button");
const headings = document.querySelectorAll("h1, h2, h3");

function randomHexColor() {
    const characters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += characters[Math.floor(Math.random() * characters.length)];
    }

    return color;
}

button.addEventListener("click", () => {
    headings.forEach(heading => {
        heading.style.color = randomHexColor();
    });
});
