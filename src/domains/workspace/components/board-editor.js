import assert from '@/shared/validation/assert.js';

let container;
let nameInput;
let cancelButton;
let confirmButton;

let isShown = false;

function init(containerElement) {
    container = containerElement;
    cacheElements();
}

function cacheElements() {
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

function enterCreateMode() {
    nameInput.value = '';
    show();
    nameInput.focus();
}

function show() {
    isShown = true;
    container.classList.remove('hidden');
}

const boardEditor = {
    init,
    enterCreateMode,
};

export default boardEditor;
