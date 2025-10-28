import assert from '@/shared/validation/assert.js';
import boardView from '@/domains/board/component.js';
import eventBus, { events } from './event-bus.js';
import workspaceView from './component.js';

let workspace;
let workspaceContainer;

let activeBoard;

function init(workspaceModel) {
    workspace = workspaceModel;
    cacheElements();
    bindEvents();

    workspaceView.init(workspaceContainer, workspace);
    initActiveBoard();
    boardView.render(activeBoard);
    workspaceView.render(Boolean(activeBoard));
}

function cacheElements() {
    workspaceContainer = document.querySelector("[data-role='workspace']");
    assert.notNull(workspaceContainer);
}

function bindEvents() {
    eventBus.on(events.BOARD_SELECTION_REQUESTED, handleBoardSelection);
}

function initActiveBoard() {
    const workspaceHasBoards = workspace.boards.length !== 0;

    if (workspaceHasBoards) {
        activeBoard = workspace.boards[0];
    }
}

function handleBoardSelection({ boardId }) {
    activeBoard = workspace.getBoard(boardId);
    boardView.render(activeBoard);
}

// function handleBoardRename(board) {

//     if (board === activeBoard) {
//         // boardView.renderTitle(board.name);
//     }
// }

const workspaceController = {
    init,
};

export default workspaceController;
