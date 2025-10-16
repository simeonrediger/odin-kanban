let container;
let nameInput;
let cancelButton;
let confirmButton;

function init(containerElement) {
    container = containerElement;

    nameInput = container.querySelector("[data-input='board-name']");
    cancelButton = container.querySelector(
        "[data-action='cancel-board-editor']"
    );
    confirmButton = container.querySelector(
        "[data-action='confirm-board-editor']"
    );
}

const boardEditor = {
    init,
};

export default boardEditor;
