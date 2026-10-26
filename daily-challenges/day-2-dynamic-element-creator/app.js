const addButton = document.getElementById("add-button");
const paragraphList = document.getElementById("paragraph-list");

let paragraphNumber = 0;

addButton.addEventListener("click", () => {
    paragraphNumber++;

    const item = document.createElement("div");
    item.className = "item";

    const paragraph = document.createElement("p");
    paragraph.textContent = `Paragraph ${paragraphNumber}`;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        item.remove();
    });

    item.append(paragraph, deleteButton);
    paragraphList.appendChild(item);
});
