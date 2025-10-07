import '@/shared/styles/icon-button.css';
import '../styles/workspace.css';

import assert from '@/shared/validation/assert.js';

import threeDotsHorizontal from '../assets/three-dots-horizontal.svg';

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
}

function renderBoardList() {

    for (const board of workspace.boards) {
        const boardListItem = document.createElement('li');
        boardListItem.classList.add('board-list-item');

        const boardSelectButton = document.createElement('button');
        boardSelectButton.classList.add('board-select-button');
        boardSelectButton.textContent = board.name;

        const boardOptionsButton = document.createElement('button');
        boardOptionsButton.classList.add('board-options-button');
        const boardOptionsIcon = document.createElement('img');
        boardOptionsIcon.src = threeDotsHorizontal;
        boardOptionsButton.append(boardOptionsIcon);

        boardListItem.append(boardSelectButton, boardOptionsButton);
        boardList.append(boardListItem);
    }
}

const workspaceView = {
    render,
};

export default workspaceView;
