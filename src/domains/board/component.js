import './style.css';

import assert from '@/shared/validation/assert.js';
import ListView from '@/domains/list/component.js';

let board;
let container;
let boardTitle;

function render(boardEntity, containerElement) {
    board = boardEntity;

    if (containerElement) {
        container = containerElement;
    }

    setUpElementReferences();
    removeAllListViews();
    boardTitle.textContent = board.name;

    for (const list of board.lists) {
        const listView = new ListView(list);
        container.querySelector("[data-role='lists-container']")
            .append(listView.container);
    }
}

function setUpElementReferences() {
    boardTitle = container.querySelector("[data-role='board-title']");
    assert.notNull(boardTitle, "'boardTitle'");
}

function removeAllListViews() {
    const listViewContainers = container.querySelectorAll(
        "[data-role='list-container']"
    );

    for (const listViewContainer of listViewContainers) {
        listViewContainer.remove();
    }
}

const boardView = {
    render,
};

export default boardView;
