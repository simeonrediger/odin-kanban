import '@/shared/styles/utilities.css';
import '../styles/sidebar.css';

import assert from '@/shared/validation/assert.js';

import {
    createThreeDotsHorizontalIcon,
} from '@/shared/components/icons/create-icons.js';

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
    boardList = container.querySelector("[data-role='board-list']");

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

    const boardOptionsButtonPrompt = 'Open board options menu';
    boardOptionsButton.title = boardOptionsButtonPrompt;
    boardOptionsButton.ariaLabel = boardOptionsButtonPrompt;

    const boardOptionsIcon = createThreeDotsHorizontalIcon();
    boardOptionsIcon.classList.add('board-options-icon');
    boardOptionsButton.append(boardOptionsIcon);

    return boardOptionsButton;
}

const sidebar = {
    render,
};

export default sidebar;
