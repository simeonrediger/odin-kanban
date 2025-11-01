import '../styles/editor.css';

import assert from '@/shared/validation/assert.js';

let container;
let nameInput;
let cancelButton;
let submitButton;

function init(containerElement) {
    container = containerElement;
    cacheElements();
}

function cacheElements() {
    nameInput = container.querySelector("[data-input='list-name']");
    cancelButton = container.querySelector(
        "[data-action='cancel-list-editor']"
    );
    submitButton = container.querySelector(
        "[data-action='submit-list-editor']"
    );

    assert.notNull(nameInput, "'nameInput'");
    assert.notNull(cancelButton, "'cancelButton'");
    assert.notNull(submitButton, "'submitButton'");
}

function enterCreateMode() {
    nameInput.value = '';
    show();
    nameInput.focus();
}

function show() {
    container.classList.remove('hidden');
}

const listEditor = {
    init,
    enterCreateMode,
};

export default listEditor;
