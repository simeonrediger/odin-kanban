import './style.css';

import assert from '@/shared/validation/assert.js';
import boardPlaceholder from './components/board-placeholder.js'
import boardView from '@/domains/board/component.js';
import sidebar from './components/sidebar.js';

let workspace;
let container;
let sidebarContainer;
let boardContainer;
let boardPlaceholderContainer;

let activeBoard;

function init(containerElement, workspaceModel) {
    workspace = workspaceModel;
    container = containerElement;
    setUpElementReferences();
    sidebar.init(sidebarContainer, workspace, {
        onBoardSelect: handleBoardSelect,
        onBoardNameChange: handleBoardNameChange,
    });
    boardPlaceholder.init(boardPlaceholderContainer);
    boardView.init(boardContainer);
}

function render() {
    sidebar.render();

    if (workspace.boards.length === 0) {
        boardPlaceholder.setNoBoardsMessage();
        hideBoardContainer();
        boardPlaceholder.show();
    } else {
        activeBoard = workspace.boards[0];
        boardView.render(activeBoard);
        boardPlaceholder.hide();
        showBoardContainer();
    }
}

function setUpElementReferences() {
    sidebarContainer = container.querySelector("[data-role='sidebar']");
    boardContainer = container.querySelector("[data-role='board-container']");
    boardPlaceholderContainer = container.querySelector(
        "[data-role='board-placeholder']"
    );

    assert.notNull(sidebarContainer, "'sidebarContainer'");
    assert.notNull(boardContainer, "'boardContainer'");
    assert.notNull(boardPlaceholderContainer, "'boardPlaceholderContainer'");
}

function showBoardContainer() {
    boardContainer.classList.remove('hidden');
}

function hideBoardContainer() {
    boardContainer.classList.add('hidden');
}

function handleBoardSelect(board) {
    workspace.activeBoard = board;
    boardView.render(board);
}

function handleBoardNameChange(board) {

    if (board === workspace.activeBoard) {
        boardView.renderTitle(board.name);
    }
}

const workspaceView = {
    init,
    render,
};

export default workspaceView;
