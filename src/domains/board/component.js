import './style.css';

import assert from '@/shared/validation/assert.js';
import boardViewStore from './store.js';
import eventBus, { events } from '@/domains/workspace/event-bus.js';
import listEditor from '@/domains/list/components/editor.js';
import ListView from '@/domains/list/component.js';
import listOptionsMenu from '@/domains/list/components/options-menu.js';
import taskEditor from '@/domains/task/components/editor.js';
import taskOptionsMenu from '@/domains/task/components/options-menu.js';
import TaskView from '@/domains/task/component.js';

let container;
let boardTitle;
let createListButton;
let listsContainer;
let listEditorContainer;
let taskEditorContainer;

const listViews = new Map();
let activeEditListView;
let activeEditTaskView;

const roles = {
    listContainer: 'list-container',
};

const actions = {
    createList: 'create-list',
    createTask: ListView.createTaskAction,
    openListOptionsMenu: ListView.openOptionsMenuAction,
    openTaskOptionsMenu: TaskView.openOptionsMenuAction,
};

function init(containerElement) {
    container = containerElement;
    cacheElements();
    bindEvents();

    listEditor.init(listEditorContainer, { onExit: handleListEditorExit });
    taskEditor.init(taskEditorContainer, {
        onExit: handleTaskEditorExit,
        getActiveEditListId,
    });

    listOptionsMenu.init({
        optionsMenuButtonSelector: (
            `[data-action='${actions.openListOptionsMenu}']`
        ),
    });

    listsContainer.append(listOptionsMenu.container);

    taskOptionsMenu.init({
        optionsMenuButtonSelector: (
            `[data-action='${actions.openTaskOptionsMenu}']`
        ),
    });

    listsContainer.append(taskOptionsMenu.container);
}

function render() {
    removeAllListViews();
    listViews.clear();
    boardTitle.textContent = boardViewStore.getBoardName();

    for (const listId of boardViewStore.getListIds()) {
        const listViewStore = boardViewStore.getListViewStore(listId);

        const listView = new ListView(
            listId,
            listViewStore,
            roles.listContainer,
        );

        listViews.set(listId, listView);
        listsContainer.append(listView.container);
    }
}

function cacheElements() {
    boardTitle = container.querySelector("[data-role='board-title']");
    createListButton = container.querySelector(
        `[data-action='${actions.createList}']`
    );
    listsContainer = container.querySelector("[data-role='lists-container']");
    listEditorContainer = container.querySelector("[data-role='list-editor']");
    taskEditorContainer = container.querySelector("[data-role='task-editor']");

    assert.notNull(boardTitle, "'boardTitle'");
    assert.notNull(createListButton, "'createListButton'");
    assert.notNull(listsContainer, "'listsContainer'");
    assert.notNull(listEditorContainer, "'listEditorContainer'");
    assert.notNull(taskEditorContainer, "'taskEditorContainer'");
}

function bindEvents() {
    eventBus.on(events.BOARD_NAME_UPDATED, updateTitleOnNameChange);
    eventBus.on(events.LIST_CREATED, handleListCreation);
    eventBus.on(events.LIST_DELETED, handleListDeletion);
    eventBus.on(events.TASK_CREATED, handleTaskCreation);

    document.addEventListener('click', handleClick);
}

function removeAllListViews() {
    const listViewContainers = container.querySelectorAll(
        `[data-role='${roles.listContainer}']`
    );

    for (const listViewContainer of listViewContainers) {
        listViewContainer.remove();
    }
}

function show() {
    container.classList.remove('hidden');
}

function hide() {
    container.classList.add('hidden');
}

function updateTitleOnNameChange({ boardId, boardName }) {

    if (boardViewStore.getBoardId() === boardId) {
        boardTitle.textContent = boardName;
    }
}

function handleListCreation({ listId }) {
    const listViewStore = boardViewStore.getListViewStore(listId);
    activeEditListView.init(listId, listViewStore, roles.listContainer);
    listViews.set(listId, activeEditListView);
}

function handleListDeletion({ listId }) {
    const listViewContainer = listViews.get(listId).container;
    listViewContainer.remove();
    listViews.delete(listId);
}

function handleTaskCreation({ listId, taskId }) {
    const listViewStore = boardViewStore.getListViewStore(listId);
    const taskViewStore = listViewStore.getTaskViewStore(taskId);
    const listView = listViews.get(listId);
    listView.initTaskView(activeEditTaskView, taskId, taskViewStore);
}

function handleClick(event) {
    const action = event.target.closest('button')?.dataset.action;

    if (listOptionsMenu.container.contains(event.target)) {
        return;

    } else if (taskOptionsMenu.container.contains(event.target)) {
        return;

    } else if (listEditor.isOpen) {
        handleClickForListEditor(event.target);

    } else if (taskEditor.isOpen) {
        handleClickForTaskEditor(event.target);

    } else if (action === actions.createList) {
        handleCreateListClick();

    } else if (listsContainer.contains(event.target)) {
        handleListsClick(event);
    }
}

function handleListsClick(event) {
    const button = event.target.closest('button');

    if (!button) {
        return;
    }

    const action = button.dataset.action;

    if (!Object.values(actions).includes(action)) {
        return;
    }

    const listContainer = button.closest(
        `[data-role='${roles.listContainer}']`
    );

    const listId = listContainer.dataset.id;
    const listViewStore = boardViewStore.getListViewStore(listId);
    const listName = listViewStore.getListName(listId);

    if (action === actions.openListOptionsMenu) {

        listOptionsMenu.toggle({
            anchorElement: listContainer,
            clientX: event.clientX,
            clientY: event.clientY,
            onRenameClick: () => handleListRenameClick(listName, listContainer),
            onConfirmDeletionClick: () => handleListDeleteClick(listId),
        });

    } else if (action === actions.openTaskOptionsMenu) {

        const taskContainer = button.closest(`
            [data-role='${ListView.taskContainerRole}']`
        );

        const taskId = taskContainer.dataset.id;
        const listViewStore = boardViewStore.getListViewStore(listId);
        const taskViewStore = listViewStore.getTaskViewStore(taskId);
        const taskName = taskViewStore.getTaskName();

        taskOptionsMenu.toggle({
            anchorElement: taskContainer,
            clientX: event.clientX,
            clientY: event.clientY,
            onRenameClick: () => handleTaskRenameClick(taskName, taskContainer),
        });

    } else if (action === actions.createTask) {
        handleCreateTaskClick(event.target);
    }
}

function handleCreateListClick() {
    activeEditListView = new ListView();
    activeEditListView.replaceLabelWithEditor(listEditorContainer);
    listsContainer.append(activeEditListView.container);
    listEditor.enterCreateMode();
}

function handleClickForListEditor(target) {
    const noChildFocused = !activeEditListView.container.contains(target);

    if (noChildFocused) {
        const submitted = false;
        listEditor.exit(submitted);
    }
}

function handleListEditorExit(isEditMode, submitted) {

    if (isEditMode) {

        if (submitted) {
            const listId = activeEditListView.id;
            const listViewStore = boardViewStore.getListViewStore(listId);
            activeEditListView.updateLabel(listViewStore.getListName());
            activeEditListView.showLabel();

        } else {
            activeEditListView.showLabel();
        }

    } else {

        if (submitted) {
            activeEditListView.showLabel();

        } else {
            activeEditListView.container.remove();
        }
    }

    activeEditListView = null;
}

function handleListRenameClick(listName, listContainer) {
    const listId = listContainer.dataset.id;
    activeEditListView = listViews.get(listId);
    activeEditListView.replaceLabelWithEditor(listEditorContainer);
    listEditor.enterEditMode(listId, listName);
}

function handleListDeleteClick(listId) {
    eventBus.emit(events.LIST_DELETION_REQUESTED, { listId });
}

function handleCreateTaskClick(target) {
    const listContainer = target.closest(
        `[data-role='${roles.listContainer}']`
    );
    const listId = listContainer.dataset.id;
    activeEditListView = listViews.get(listId);

    activeEditTaskView = activeEditListView.createTaskView();
    activeEditTaskView.replaceLabelWithEditor(taskEditorContainer);
    taskEditor.enterCreateMode();
}

function handleClickForTaskEditor(target) {
    const noChildFocused = !activeEditTaskView.container.contains(target);

    if (noChildFocused) {
        const submitted = false;
        taskEditor.exit(submitted);
    }
}

function handleTaskEditorExit(isEditMode, submitted) {

    if (isEditMode) {

        if (submitted) {
            // TODO
        } else {
            // TODO
        }

    } else {

        if (submitted) {
            activeEditTaskView.showLabel();

        } else {
            activeEditTaskView.container.remove();
        }
    }

    activeEditListView = null;
    activeEditTaskView = null;
}

function handleTaskRenameClick(taskName, taskContainer) {
    const listContainer = taskContainer.closest(
        `[data-role='${roles.listContainer}']`
    );

    const listId = listContainer.dataset.id;
    activeEditListView = listViews.get(listId);

    const taskId = taskContainer.dataset.id;
    activeEditTaskView = activeEditListView.getTaskView(taskId);

    activeEditTaskView.replaceLabelWithEditor(taskEditorContainer);
    taskEditor.enterEditMode(taskId, taskName);
}

function getActiveEditListId() {
    return activeEditListView.id;
}

const boardView = {
    init,
    render,
    show,
    hide,
};

export default boardView;
