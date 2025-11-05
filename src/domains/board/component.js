import './style.css';

import assert from '@/shared/validation/assert.js';
import boardViewStore from './store.js';
import eventBus, { events } from '@/domains/workspace/event-bus.js';
import listEditor from '@/domains/list/components/editor.js';
import ListView from '@/domains/list/component.js';
import listOptionsMenu from '@/domains/list/components/options-menu.js';

let container;
let boardTitle;
let createNewListButton;
let listsContainer;
let listEditorContainer;

const listViews = new Map();
let activeEditListView;

const roles = {
    listContainer: 'list-container',
};

const actions = {
    createNewList: 'create-new-list',
    openListOptionsMenu: 'open-list-options-menu',
};

function init(containerElement) {
    container = containerElement;
    cacheElements();
    bindEvents();

    listEditor.init(listEditorContainer, { onExit: handleEditorExit });

    listOptionsMenu.init({
        optionsMenuButtonSelector: (
            `[data-action='${actions.openListOptionsMenu}']`
        ),
    });

    container.append(listOptionsMenu.container);
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
    createNewListButton = container.querySelector(
        "[data-action='create-new-list']"
    );
    listsContainer = container.querySelector("[data-role='lists-container']");
    listEditorContainer = container.querySelector("[data-role='list-editor']");

    assert.notNull(boardTitle, "'boardTitle'");
    assert.notNull(createNewListButton, "'createNewListButton'");
    assert.notNull(listsContainer, "'listsContainer'");
    assert.notNull(listEditorContainer, "'listEditorContainer'");
}

function bindEvents() {
    eventBus.on(events.BOARD_NAME_UPDATED, updateTitleOnNameChange);
    eventBus.on(events.LIST_CREATED, handleListCreation);

    document.addEventListener('click', handleClick);
    listsContainer.addEventListener('click', handleListsClick);
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
}

function handleClick(event) {
    const action = event.target.closest('button')?.dataset.action;

    if (listOptionsMenu.container.contains(event.target)) {
        return;

    } else if (listEditor.isOpen) {
        handleClickForListEditor(event.target);

    } else if (action === actions.createNewList) {
        handleCreateNewListClick();
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
            onRenameClick: () => handleRenameClick(listName, listContainer),
        });
    }
}

function handleCreateNewListClick() {
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

function handleEditorExit(submitted) {

    if (submitted) {
        listViews.set(activeEditListView.id, activeEditListView);
        activeEditListView.showLabel();

    } else {
        activeEditListView.container.remove();
    }

    activeEditListView = null;
}

function handleRenameClick(listName, listContainer) {
    const listId = listContainer.dataset.id;
    activeEditListView = listViews.get(listId);
    activeEditListView.replaceLabelWithEditor(listEditorContainer);
    listEditor.enterEditMode(listId, listName);
}

const boardView = {
    init,
    render,
    show,
    hide,
};

export default boardView;
