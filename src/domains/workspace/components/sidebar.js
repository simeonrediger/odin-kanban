import '@/shared/styles/utilities.css';
import '@/shared/styles/icon-button.css';
import '../styles/sidebar.css'; 

import assert from '@/shared/validation/assert.js';

let workspace;
let container;
let createNewBoardButton;
let boardList;

function render(workspaceEntity, containerElement) {
    workspace = workspaceEntity;
    container = containerElement;

    setUpElementReferences();
    renderBoardList();
}

function setUpElementReferences() {
    createNewBoardButton = container.querySelector(
        "[data-action='create-new-board']"
    );
    boardList = container.querySelector('.board-list');

    assert.notNull(createNewBoardButton, "'createNewBoardButton'");
    assert.notNull(boardList, "'boardList'");
}

function renderBoardList() {
    boardList.innerHTML = '';

    for (const board of workspace.boards) {
        const boardListItem = createBoardListItem(board);
        boardList.append(boardListItem);
    }
}

function createBoardListItem(board) {
    const boardListItem = document.createElement('li');
    boardListItem.classList.add('board-list-item');

    const boardSelectButton = createBoardSelectButton(board);
    const boardOptionsButton = createBoardOptionsButton();
    boardListItem.append(boardSelectButton, boardOptionsButton);

    return boardListItem;
}

function createBoardSelectButton(board) {
    const boardSelectButton = document.createElement('button');
    boardSelectButton.classList.add('board-select-button');
    boardSelectButton.textContent = board.name;

    return boardSelectButton;
}

function createBoardOptionsButton() {
    const boardOptionsButton = document.createElement('button');
    boardOptionsButton.classList.add('board-options-button');
    boardOptionsButton.title = 'Open board options menu';
    boardOptionsButton.ariaLabel = 'Open board options menu';

    const boardOptionsIcon = createBoardOptionsIcon();
    boardOptionsButton.append(boardOptionsIcon);

    return boardOptionsButton;
}

function createBoardOptionsIcon() {
    const boardOptionsIcon = container
        .querySelector("[data-template='three-dots-horizontal-icon']")
        .content
        .cloneNode(true);

    return boardOptionsIcon;
}

const sidebar = {
    render,
};

export default sidebar;
