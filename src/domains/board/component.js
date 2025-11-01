import './style.css';

import assert from '@/shared/validation/assert.js';
import boardViewStore from './store.js';
import eventBus, { events } from '@/domains/workspace/event-bus.js';
import listEditor from '@/domains/list/components/editor.js';
import ListView from '@/domains/list/component.js';

let container;
let boardTitle;
let createNewListButton;
let listsContainer;
let listEditorContainer;

let activeEditListView;

const roles = {
    listContainer: 'list-container',
};

const actions = {
    createNewList: 'create-new-list',
};

function init(containerElement) {
    container = containerElement;
    cacheElements();
    bindEvents();

    listEditor.init(listEditorContainer, { onExit: handleEditorExit });
}

function render() {
    removeAllListViews();
    boardTitle.textContent = boardViewStore.getBoardName();

    for (const listId of boardViewStore.getListIds()) {
        const listViewStore = boardViewStore.getListViewStore(listId);
        const listView = new ListView(
            listId,
            listViewStore,
            roles.listContainer,
        );

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

function handleClick(event) {
    const listEditorIsOpen = Boolean(activeEditListView);
    const action = event.target.closest('button')?.dataset.action;

    if (listEditorIsOpen) {
        handleClickForListEditor(event.target);

    } else if (action === actions.createNewList) {
        handleCreateNewListClick();
    }
}

function handleCreateNewListClick() {
    activeEditListView = new ListView(
        null,
        null,
        roles.listContainer
    );

    activeEditListView.placeEditor(listEditorContainer);
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

    } else {
        activeEditListView.container.remove();
    }

    activeEditListView = null;
}

const boardView = {
    init,
    render,
    show,
    hide,
};

export default boardView;
