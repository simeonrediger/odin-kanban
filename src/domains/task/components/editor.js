import '../styles/editor.css';

import assert from '@/shared/validation/assert.js';

let container;
let nameInput;
let cancelButton;
let submitButton;

let isOpen = false;

function init(containerElement) {
    container = containerElement;
    cacheElements();
}

function cacheElements() {
    nameInput = container.querySelector("[data-input='task-name']");
    cancelButton = container.querySelector(
        "[data-action='cancel-task-editor']"
    );
    submitButton = container.querySelector(
        "[data-action='submit-task-editor']"
    );

    assert.notNull(nameInput, "'nameInput'");
    assert.notNull(cancelButton, "'cancelButton'");
    assert.notNull(submitButton, "'submitButton'");
}

function enterCreateMode() {
    nameInput.value = '';
    open();
    nameInput.focus();
}

function open() {
    show();
    isOpen = true;
}

function show() {
    container.classList.remove('hidden');
}

const taskEditor = {
    init,
    enterCreateMode,
};

export default taskEditor;
