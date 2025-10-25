import assert from '@/shared/validation/assert.js';
import boardView from '@/domains/board/component.js';
import workspaceView from './component.js';

let workspace;
let workspaceContainer;

let activeBoard;

function init(workspaceModel) {
    workspace = workspaceModel;
    cacheElements();
    workspaceView.init(workspaceContainer, workspace, {
        onBoardSelect: handleBoardSelect,
        onBoardRename: handleBoardRename,
    });
    initActiveBoard();
    boardView.render(activeBoard);
    workspaceView.render(Boolean(activeBoard));
}

function cacheElements() {
    workspaceContainer = document.querySelector("[data-role='workspace']");
    assert.notNull(workspaceContainer);
}

function initActiveBoard() {
    const workspaceHasBoards = workspace.boards.length !== 0;

    if (workspaceHasBoards) {
        activeBoard = workspace.boards[0];
    }
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

const workspaceController = {
    init,
};

export default workspaceController;
