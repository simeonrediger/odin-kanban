import '../styles/board-editor.css';

import assert from '@/shared/validation/assert.js';

let container;
let nameInput;
let cancelButton;
let submitButton;

let isEditMode = false;

let handlers = {
    onSubmit: undefined,
    onSubmitEdit: undefined,
    onExitEditMode: undefined,
};

function init(containerElement, {
    onSubmit,
    onSubmitEdit,
    onExitEditMode,
} = {}) {
    container = containerElement;
    cacheElements();
    bindEvents();
    handlers.onSubmit = onSubmit;
    handlers.onSubmitEdit = onSubmitEdit;
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
    nameInput.addEventListener('keydown', handleNameInputKeyDown);
    container.addEventListener('focusout', handleFocusOut);
}

function enterCreateMode() {
    nameInput.value = '';
    show();
    nameInput.focus();
}

function enterEditMode(boardName) {
    nameInput.value = boardName;
    isEditMode = true;
    show();
    nameInput.focus();
}

function submit() {
    const boardName = nameInput.value.trim() || nameInput.placeholder;
    close();

    if (isEditMode) {
        isEditMode = false;
        handlers.onSubmitEdit?.(boardName);
    } else {
        handlers.onSubmit?.(boardName);
    }
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

function show() {
    container.classList.remove('hidden');
}

function close() {
    container.classList.add('hidden');
}

function handleNameInputKeyDown(event) {

    switch (event.key) {
        case 'Enter':
            submit();
            break;
        case 'Escape':
            exit();
            break;
    }
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
