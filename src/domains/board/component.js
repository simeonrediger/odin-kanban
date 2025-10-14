import './style.css';

import ListView from '@/domains/list/component.js';

let board;
let container;

function render(boardEntity, containerElement) {
    board = boardEntity;

    if (containerElement) {
        container = containerElement;
    }

    removeAllListViews();
    document.querySelector("[data-role='board-title']")
        .textContent = board.name;

    for (const list of board.lists) {
        const listView = new ListView(list);
        container.querySelector("[data-role='lists-container']")
            .append(listView.container);
    }
}

function removeAllListViews() {
    const listViewContainers = document.querySelectorAll(
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
