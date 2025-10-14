import './style.css';

import assert from '@/shared/validation/assert.js';
import ListView from '@/domains/list/component.js';

let board;
let container;
let boardTitle;
let createNewListButton;
let listsContainer;

const roles = {
    listContainer: 'list-container',
};

function render(boardEntity, containerElement) {
    board = boardEntity;

    if (containerElement) {
        container = containerElement;
    }

    setUpElementReferences();
    removeAllListViews();
    boardTitle.textContent = board.name;

    for (const list of board.lists) {
        const listView = new ListView(list, roles.listContainer);
        listsContainer.append(listView.container);
    }
}

function setUpElementReferences() {
    boardTitle = container.querySelector("[data-role='board-title']");
    createNewListButton = container.querySelector(
        "[data-action='create-new-list']"
    );
    listsContainer = container.querySelector("[data-role='lists-container']");

    assert.notNull(boardTitle, "'boardTitle'");
    assert.notNull(createNewListButton, "'createNewListButton'");
    assert.notNull(listsContainer, "'listsContainer'");
}

function removeAllListViews() {
    const listViewContainers = container.querySelectorAll(
        `[data-role='${roles.listContainer}']`
    );

    for (const listViewContainer of listViewContainers) {
        listViewContainer.remove();
    }
}

const boardView = {
    render,
};

export default boardView;
