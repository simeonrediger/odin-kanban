import '../styles/board-editor.css';

import assert from '@/shared/validation/assert.js';
import eventBus, { events } from '../event-bus.js';

let container;
let nameInput;
let cancelButton;
let submitButton;

let activeEditBoardId;
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
    eventBus.on(events.BOARD_CREATED, exit);
    eventBus.on(events.BOARD_NAME_UPDATED, exit);

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

function enterEditMode(boardId, boardName) {
    activeEditBoardId = boardId;
    nameInput.value = boardName;
    isEditMode = true;
    show();
    nameInput.focus();
}

function submit() {
    const boardName = nameInput.value.trim() || nameInput.placeholder;

    if (isEditMode) {
        isEditMode = false;
        eventBus.emit(events.BOARD_NAME_UPDATE_REQUESTED, {
            boardId: activeEditBoardId,
            boardName,
        });

    } else {
        eventBus.emit(events.BOARD_CREATION_REQUESTED, { boardName });
    }
}

function exit() {

    if (isEditMode) {
        exitEditMode();
    } else {
        hide();
    }

    handlers.onExit();
}

function exitEditMode() {
    isEditMode = false;
    hide();
}

function show() {
    container.classList.remove('hidden');
}

function hide() {
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
