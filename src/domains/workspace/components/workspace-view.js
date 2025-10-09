import '@/shared/styles/utilities.css';
import '@/shared/styles/icon-button.css';
import '../styles/workspace.css';
import '../styles/sidebar.css';

import assert from '@/shared/validation/assert.js';
import boardView from '@/domains/board/components/board-view.js';

let workspace;
let container;
let addBoardButton;
let boardList;
let boardContainer;
let boardPlaceholder;

function render(workspaceEntity, containerSelector) {
    workspace = workspaceEntity;
    container = document.querySelector(containerSelector);

    assert.true(workspace.isWorkspace, "'workspace.isWorkspace'");
    assert.instanceOf(Element, container, "'container'");

    addBoardButton = container.querySelector('#create-new-board-button');
    boardList = container.querySelector('.board-list');
    boardContainer = container.querySelector('.board-container');
    boardPlaceholder = container.querySelector('.board-placeholder');

    assert.notNull(addBoardButton, "'addBoardButton'");
    assert.notNull(boardList, "'boardList'");
    assert.notNull(boardContainer, "'boardContainer'");
    assert.notNull(boardPlaceholder, "'boardPlaceholder'");

    renderBoardList();

    if (workspace.activeBoard) {
        boardPlaceholder.classList.add('hidden');
        boardView.render(workspace.activeBoard, boardContainer);
        boardContainer.classList.remove('hidden');
    } else {
        renderBoardPlaceholder();
    }
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
    const boardOptionsIcon = document
        .getElementById('three-dots-horizontal-icon')
        .content
        .querySelector('svg')
        .cloneNode(true);

    boardOptionsIcon.classList.add('board-options-icon');

    return boardOptionsIcon;
}

const workspaceView = {
    render,
};

export default workspaceView;
