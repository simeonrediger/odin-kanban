import '@/shared/styles/utilities.css';
import '@/shared/styles/icon-button.css';
import '../styles/workspace.css';
import '../styles/sidebar.css';

import assert from '@/shared/validation/assert.js';
import boardView from '@/domains/board/components/board-view.js';

let workspace;
let container;
let createNewBoardButton;
let boardList;
let boardContainer;
let boardPlaceholder;

function render(workspaceEntity, containerElement) {
    workspace = workspaceEntity;
    container = containerElement;

    assert.true(workspace.isWorkspace, "'workspace.isWorkspace'");
    assert.instanceOf(Element, container, "'container'");

    setUpElementReferences();
    renderBoardList();

    if (workspace.activeBoard) {
        boardPlaceholder.classList.add('hidden');
        boardView.render(workspace.activeBoard, boardContainer);
        boardContainer.classList.remove('hidden');
    } else {
        renderBoardPlaceholder();
    }
}

function setUpElementReferences() {
    createNewBoardButton = container.querySelector(
        "[data-action='create-new-board']"
    );
    boardList = container.querySelector('.board-list');
    boardContainer = container.querySelector('.board-container');
    boardPlaceholder = container.querySelector('.board-placeholder');

    assert.notNull(createNewBoardButton, "'createNewBoardButton'");
    assert.notNull(boardList, "'boardList'");
    assert.notNull(boardContainer, "'boardContainer'");
    assert.notNull(boardPlaceholder, "'boardPlaceholder'");
}

function renderBoardList() {
    boardList.innerHTML = '';

    for (const board of workspace.boards) {
        const boardListItem = createBoardListItem(board);
        boardList.append(boardListItem);
    }
}

function renderBoardPlaceholder() {
    boardContainer.classList.add('hidden');
    boardPlaceholder.classList.remove('hidden');
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
        .querySelector('svg')
        .cloneNode(true);

    return boardOptionsIcon;
}

const workspaceView = {
    render,
};

export default workspaceView;
