import '../styles/editor.css';
import '@/shared/utilities/auto-size-textarea.js';

import assert from '@/shared/validation/assert.js';
import eventBus, { events } from '@/domains/workspace/event-bus.js';

let container;
let nameInput;
let cancelButton;
let submitButton;

let isOpen = false;
let isEditMode = false;
let activeEditTaskId;

const handlers = {
    onExit: undefined,
    getActiveEditListId: undefined,
};

function init(containerElement, { onExit, getActiveEditListId } = {}) {
    container = containerElement;
    cacheElements();
    bindEvents();
    handlers.onExit = onExit;
    handlers.getActiveEditListId = getActiveEditListId;
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

function bindEvents() {
    eventBus.on(events.TASK_CREATED, handleTaskCreation);
    eventBus.on(events.TASK_NAME_UPDATED, handleNameUpdated);

    nameInput.addEventListener('keydown', handleNameInputKeyDown);
    cancelButton.addEventListener('click', handleCancelClick);
    submitButton.addEventListener('click', submit);
}

function enterCreateMode() {
    nameInput.value = '';
    open();
    nameInput.focus();
}

function enterEditMode(taskId, taskName) {
    nameInput.value = taskName;
    open();
    nameInput.focus();
    nameInput.setSelectionRange(taskName.length, taskName.length);
    isEditMode = true;
    activeEditTaskId = taskId;
}

function open() {
    show();
    isOpen = true;
}

function close() {
    hide();
    isOpen = false;
}

function handleTaskCreation() {
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
    const taskName = nameInput.value.trim() || nameInput.placeholder;
    const listId = handlers.getActiveEditListId();

    if (isEditMode) {
        eventBus.emit(events.TASK_NAME_UPDATE_REQUESTED, {
            listId,
            taskId: activeEditTaskId,
            taskName,
        });

    } else {
        const listId = handlers.getActiveEditListId();
        eventBus.emit(events.TASK_CREATION_REQUESTED, { listId, taskName });
    }
}

function exit(submitted) {
    close();
    const wasEditMode = isEditMode;
    isEditMode = false;
    activeEditTaskId = null;
    handlers.onExit(wasEditMode, submitted);
}

function show() {
    container.classList.remove('hidden');
}

function hide() {
    container.classList.add('hidden');
}

const taskEditor = {
    init,
    enterCreateMode,
    enterEditMode,
    exit,

    get isOpen() {
        return isOpen;
    },
};

export default taskEditor;
