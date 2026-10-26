const button = document.getElementById("image-button");

button.addEventListener("click", () => {
    const images = document.querySelectorAll("img");

    images.forEach(image => image.remove());
});
