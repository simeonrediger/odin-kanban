import '@/shared/styles/icon-button.css';
import '../styles/workspace.css';

import assert from '@/shared/validation/assert.js';
import boardView from '@/domains/board/components/board-view.js';

let workspace;
let workspaceContainer;
let addBoardButton;
let boardList;
let boardContainer;

function render(
    workspaceEntity,
    workspaceContainerSelector,
    addBoardButtonSelector,
    boardListSelector,
    boardContainerSelector,
) {
    workspace = workspaceEntity;
    workspaceContainer = document.querySelector(workspaceContainerSelector);
    addBoardButton = document.querySelector(addBoardButtonSelector);
    boardList = document.querySelector(boardListSelector);
    boardContainer = document.querySelector(boardContainerSelector);

    assert.true(workspace.isWorkspace, "'workspace.isWorkspace'");
    assert.instanceOf(Element, workspaceContainer, "'workspaceContainer'");
    assert.instanceOf(Element, addBoardButton, "'addBoardButton'");
    assert.instanceOf(Element, boardList, "'boardList'");
    assert.instanceOf(Element, boardContainer, "'boardContainer'");

    renderBoardList();

    if (workspace.activeBoard) {
        boardView.render(workspace.activeBoard, boardContainer);
    } else {
        renderBoardPlaceholder();
    }
}

function renderBoardList() {

    for (const board of workspace.boards) {
        const boardListItem = createBoardListItem(board);
        boardList.append(boardListItem);
    }
}

function renderBoardPlaceholder() {
    const boardPlaceholderText = document.createElement('p');
    boardPlaceholderText.classList.add('board-placeholder-text');
    boardPlaceholderText.textContent = "You don't have any boards";
    boardContainer.append(boardPlaceholderText);
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
