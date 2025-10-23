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
        onBoardRename: handleBoardRename,
    });
    boardPlaceholder.init(boardPlaceholderContainer);
    boardView.init(boardContainer);
}

function render() {
    sidebar.render();
    const workspaceIsEmpty = workspace.boards.length === 0;

    if (workspaceIsEmpty) {
        boardPlaceholder.setNoBoardsMessage();
        boardView.hide();
        boardPlaceholder.show();
    } else {
        activeBoard = workspace.boards[0];
        boardView.render(activeBoard);
        boardPlaceholder.hide();
        boardView.show();
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

function handleBoardSelect(board) {
    activeBoard = board;
    boardView.render(board);
}

function handleBoardRename(board) {

    if (board === activeBoard) {
        boardView.renderTitle(board.name);
    }
}

const workspaceView = {
    init,
    render,
};

export default workspaceView;
