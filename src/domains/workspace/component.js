import './style.css';

import assert from '@/shared/validation/assert.js';
import boardView from '@/domains/board/component.js';
import sidebar from './components/sidebar.js';

let workspace;
let container;
let sidebarContainer;
let boardContainer;
let boardPlaceholder;

function init(containerElement, workspaceModel) {
    workspace = workspaceModel;
    container = containerElement;
    setUpElementReferences();
    sidebar.init(sidebarContainer, workspace, {
        onBoardSelect: handleBoardSelect,
        onBoardNameChange: handleBoardNameChange,
    });
    boardView.init(boardContainer);
}

function render() {
    sidebar.render();

    if (workspace.activeBoard) {
        boardView.render(workspace.activeBoard);
        hideBoardPlaceholder();
        showBoardContainer();
    } else {
        hideBoardContainer();
        showBoardPlaceholder();
    }
}

function setUpElementReferences() {
    sidebarContainer = container.querySelector("[data-role='sidebar']");
    boardContainer = container.querySelector("[data-role='board-container']");
    boardPlaceholder = container.querySelector(
        "[data-role='board-placeholder']"
    );

    assert.notNull(sidebarContainer, "'sidebarContainer'");
    assert.notNull(boardContainer, "'boardContainer'");
    assert.notNull(boardPlaceholder, "'boardPlaceholder'");
}

function showBoardPlaceholder() {
    boardPlaceholder.classList.remove('hidden');
}

function hideBoardPlaceholder() {
    boardPlaceholder.classList.add('hidden');
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
