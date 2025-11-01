import '../styles/editor.css';

import assert from '@/shared/validation/assert.js';

let container;
let nameInput;
let cancelButton;
let submitButton;

let isEditMode = false;

const handlers = {
    onExit: undefined,
};

function init(containerElement, { onExit } = {}) {
    container = containerElement;
    cacheElements();
    bindEvents();
    handlers.onExit = onExit;
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

function bindEvents() {
    cancelButton.addEventListener('click', handleCancelClick);
}

function enterCreateMode() {
    nameInput.value = '';
    show();
    nameInput.focus();
}

function handleCancelClick() {
    const submitted = false;
    exit(submitted);
}

function exit(submitted) {

    if (isEditMode) {

    } else {
        hide();
    }

    handlers.onExit(submitted);
}

function show() {
    container.classList.remove('hidden');
}

function hide() {
    container.classList.add('hidden');
}

const listEditor = {
    init,
    enterCreateMode,
    exit,
};

export default listEditor;
