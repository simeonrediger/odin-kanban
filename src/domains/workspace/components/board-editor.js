import assert from '@/shared/validation/assert.js';

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

    assert.notNull(nameInput, "'nameInput'");
    assert.notNull(cancelButton, "'cancelButton'");
    assert.notNull(confirmButton, "'confirmButton'");
}

const boardEditor = {
    init,
};

export default boardEditor;
