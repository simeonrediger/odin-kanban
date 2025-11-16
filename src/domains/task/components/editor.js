import '../styles/editor.css';

import assert from '@/shared/validation/assert.js';
import autoSizeTextarea from '@/shared/utilities/auto-size-textarea.js';
import eventBus, { events } from '@/domains/workspace/event-bus.js';

let container;
let nameInput;
let descriptionInput;
let priorityLevelInput;
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
    descriptionInput = container.querySelector(
        "[data-input='task-description']"
    );
    priorityLevelInput = container.querySelector(
        "[data-input='task-priority-level']"
    );
    cancelButton = container.querySelector(
        "[data-action='cancel-task-editor']"
    );
    submitButton = container.querySelector(
        "[data-action='submit-task-editor']"
    );

    assert.notNull(nameInput, "'nameInput'");
    assert.notNull(descriptionInput, "'descriptionInput'");
    assert.notNull(priorityLevelInput, "'priorityLevelInput'");
    assert.notNull(cancelButton, "'cancelButton'");
    assert.notNull(submitButton, "'submitButton'");
}

function bindEvents() {
    eventBus.on(events.TASK_CREATED, handleTaskCreation);
    eventBus.on(events.TASK_UPDATED, handleTaskUpdated);

    nameInput.addEventListener('keydown', handleNameInputKeyDown);
    cancelButton.addEventListener('click', handleCancelClick);
    submitButton.addEventListener('click', submit);
}

function enterCreateMode() {
    nameInput.value = '';
    descriptionInput.value = '';
    priorityLevelInput.value = '';
    open();
    nameInput.focus();
}

function enterEditMode(id, name, description = '', priorityLevel = '') {
    nameInput.value = name;
    descriptionInput.value = description;
    priorityLevelInput.value = priorityLevel;
    open();

    descriptionInput.focus();
    descriptionInput.setSelectionRange(description.length, description.length);

    isEditMode = true;
    activeEditTaskId = id;
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

function handleTaskUpdated() {
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
    const taskDescription = descriptionInput.value.trim() || undefined;
    const taskPriorityLevel = priorityLevelInput.value || undefined;
    const listId = handlers.getActiveEditListId();

    if (isEditMode) {
        eventBus.emit(events.TASK_UPDATE_REQUESTED, {
            listId,
            taskId: activeEditTaskId,
            taskName,
            taskDescription,
            taskPriorityLevel,
        });

    } else {
        const listId = handlers.getActiveEditListId();
        eventBus.emit(events.TASK_CREATION_REQUESTED, {
            listId,
            taskName,
            taskDescription,
            taskPriorityLevel,
        });
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
    autoSizeTextarea(nameInput);
    autoSizeTextarea(descriptionInput);
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
