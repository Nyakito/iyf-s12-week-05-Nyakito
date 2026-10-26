const source = document.getElementById("source");
const target = document.getElementById("target");
const copyButton = document.getElementById("copy-button");
const status = document.getElementById("status");

function copyContent() {
    target.innerHTML = source.innerHTML;
    status.textContent = "Content copied.";
}

copyButton.addEventListener("click", copyContent);

source.addEventListener("dragstart", event => {
    event.dataTransfer.setData("text/plain", "copy-source");
});

target.addEventListener("dragover", event => {
    event.preventDefault();
});

target.addEventListener("drop", event => {
    event.preventDefault();

    if (event.dataTransfer.getData("text/plain") === "copy-source") {
        copyContent();
    }
});
