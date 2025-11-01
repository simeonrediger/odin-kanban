import './style.css';

import assert from '@/shared/validation/assert.js';
import boardViewStore from './store.js';
import eventBus, { events } from '@/domains/workspace/event-bus.js';
import ListView from '@/domains/list/component.js';

let container;
let boardTitle;
let createNewListButton;
let listsContainer;

const roles = {
    listContainer: 'list-container',
};

function init(containerElement) {
    container = containerElement;
    cacheElements();
    bindEvents();
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

    assert.notNull(boardTitle, "'boardTitle'");
    assert.notNull(createNewListButton, "'createNewListButton'");
    assert.notNull(listsContainer, "'listsContainer'");
}

function bindEvents() {
    eventBus.on(events.BOARD_NAME_UPDATED, updateTitleOnNameChange);
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

const boardView = {
    init,
    render,
    show,
    hide,
};

export default boardView;
