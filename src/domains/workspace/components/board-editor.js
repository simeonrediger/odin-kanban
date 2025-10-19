import '../styles/board-editor.css';

import assert from '@/shared/validation/assert.js';

let container;
let nameInput;
let cancelButton;
let submitButton;

let isOpen = false;
let isEditMode = false;

let handlers = {
    onSubmit: undefined,
    onExitEditMode: undefined,
};

function init(containerElement, { onSubmit, onExitEditMode } = {}) {
    container = containerElement;
    cacheElements();
    bindEvents();
    handlers.onSubmit = onSubmit;
    handlers.onExitEditMode = onExitEditMode;
}

function cacheElements() {
    nameInput = container.querySelector("[data-input='board-name']");
    cancelButton = container.querySelector(
        "[data-action='cancel-board-editor']"
    );
    submitButton = container.querySelector(
        "[data-action='submit-board-editor']"
    );

    assert.notNull(nameInput, "'nameInput'");
    assert.notNull(cancelButton, "'cancelButton'");
    assert.notNull(submitButton, "'submitButton'");
}

function bindEvents() {
    cancelButton.addEventListener('click', exit);
    submitButton.addEventListener('click', submit);
    container.addEventListener('focusout', handleFocusOut);
}

function enterCreateMode() {
    nameInput.value = '';
    open();
    nameInput.focus();
}

function enterEditMode(boardName) {
    nameInput.value = boardName;
    isEditMode = true;
    open();
    nameInput.focus();
}

function submit() {
    const boardName = nameInput.value.trim() || nameInput.placeholder;
    exit();
    handlers.onSubmit?.(boardName);
}

function exit() {

    if (isEditMode) {
        exitEditMode();
    } else {
        close();
    }
}

function exitEditMode() {
    isEditMode = false;
    close();
    handlers.onExitEditMode?.();
}

function open() {
    isOpen = true;
    container.classList.remove('hidden');
}

function close() {
    isOpen = false;
    container.classList.add('hidden');
}

function handleFocusOut(event) {
    const noChildFocused = !container.contains(event.relatedTarget);
    const isVisible = !container.classList.contains('hidden');

    if (noChildFocused && isVisible) {
        exit();
    }
}

const boardEditor = {
    init,
    enterCreateMode,
    enterEditMode,
};

export default boardEditor;
