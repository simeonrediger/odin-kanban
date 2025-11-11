import '../styles/editor.css';

import assert from '@/shared/validation/assert.js';
import autoSizeTextarea from '@/shared/utilities/auto-size-textarea.js';
import eventBus, { events } from '@/domains/workspace/event-bus.js';

let container;
let nameInput;
let cancelButton;
let submitButton;

let isOpen = false;
let isEditMode = false;
let activeEditListId;

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
    eventBus.on(events.LIST_CREATED, handleListCreation);
    eventBus.on(events.LIST_NAME_UPDATED, handleNameUpdated);

    nameInput.addEventListener('keydown', handleNameInputKeyDown);
    cancelButton.addEventListener('click', handleCancelClick);
    submitButton.addEventListener('click', submit);
}

function enterCreateMode() {
    nameInput.value = '';
    open();
    nameInput.focus();
}

function enterEditMode(listId, listName) {
    nameInput.value = listName;
    open();
    nameInput.focus();
    nameInput.setSelectionRange(listName.length, listName.length);
    isEditMode = true;
    activeEditListId = listId;
}

function open() {
    show();
    isOpen = true;
}

function close() {
    hide();
    isOpen = false;
}

function handleListCreation() {
    const submitted = true;
    exit(submitted);
}

function handleNameUpdated() {
    const submitted = true;
    exit(submitted);
}

function handleNameInputKeyDown(event) {

    switch (event.key) {
        case 'Enter':
            submit();
            break;
        case 'Escape':
            const submitted = false;
            exit(submitted);
            break;
    }
}

function handleCancelClick() {
    const submitted = false;
    exit(submitted);
}

function submit() {
    const listName = nameInput.value.trim() || nameInput.placeholder;

    if (isEditMode) {
        const listId = activeEditListId;
        eventBus.emit(events.LIST_NAME_UPDATE_REQUESTED, { listId, listName });
    } else {
        eventBus.emit(events.LIST_CREATION_REQUESTED, { listName });
    }
}

function exit(submitted) {
    close();
    const wasEditMode = isEditMode;
    isEditMode = false;
    activeEditListId = null;
    handlers.onExit(wasEditMode, submitted);
}

function show() {
    container.classList.remove('hidden');
    autoSizeTextarea(nameInput);
}

function hide() {
    container.classList.add('hidden');
}

const listEditor = {
    init,
    enterCreateMode,
    enterEditMode,
    exit,

    get isOpen() {
        return isOpen;
    },
};

export default listEditor;
