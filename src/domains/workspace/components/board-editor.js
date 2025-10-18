import assert from '@/shared/validation/assert.js';

let container;
let nameInput;
let cancelButton;
let submitButton;

let isShown = false;

let handlers = {
    onSubmit: undefined,
};

function init(containerElement, { onSubmit } = {}) {
    container = containerElement;
    cacheElements();
    bindEvents();
    handlers.onSubmit = onSubmit;
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
    container.addEventListener('focusout', handleFocusOut);
    cancelButton.addEventListener('click', exit);
    submitButton.addEventListener('click', submit);
}

function enterCreateMode() {
    nameInput.value = '';
    show();
    nameInput.focus();
}

function submit() {
    const boardName = nameInput.value.trim() || nameInput.placeholder;
    exit();
    handlers.onSubmit?.(boardName);
}

function exit() {
    hide();
}

function show() {
    isShown = true;
    container.classList.remove('hidden');
}

function hide() {
    isShown = false;
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
};

export default boardEditor;
