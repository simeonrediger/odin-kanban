import assert from '@/shared/validation/assert.js';
import boardList from './components/board-list.js';
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
    workspaceView.render({ activeBoardExists: Boolean(activeBoard) });
    updateBoardList();
}

function cacheElements() {
    workspaceContainer = document.querySelector("[data-role='workspace']");
    assert.notNull(workspaceContainer);
}

function bindEvents() {
    eventBus.on(events.BOARD_SELECTION_REQUESTED, handleBoardSelection);
    eventBus.on(events.BOARD_CREATION_REQUESTED, createBoard);
    eventBus.on(events.BOARD_NAME_UPDATE_REQUESTED, updateBoardName);
    eventBus.on(events.BOARD_DELETION_REQUESTED, handleBoardDeletionRequest)
}

function initActiveBoard() {
    const workspaceHasBoards = workspace.boards.length !== 0;

    if (workspaceHasBoards) {
        activeBoard = workspace.boards[0];
    }
}

function updateBoardList() {
    const boardListData = workspace.boards.map(
        board => ({ boardId: board.id, boardName: board.name })
    );
    boardList.render(boardListData);
}

function handleBoardSelection({ boardId }) {
    activeBoard = workspace.getBoard(boardId);
    boardView.render(activeBoard);
}

function createBoard({ boardName }) {
    const board = workspace.addEmptyBoard(boardName);
    eventBus.emit(events.BOARD_CREATED, {
        boardId: board.id,
        boardName: board.name,
    });
}

function updateBoardName({ boardId, boardName }) {
    const board = workspace.getBoard(boardId);
    board.name = boardName;
    eventBus.emit(events.BOARD_NAME_UPDATED, { boardId, boardName });
}

function handleBoardDeletionRequest({ boardId }) {
    const board = workspace.getBoard(boardId);
    workspace.removeBoard(board);
    const activeBoardDeleted = board === activeBoard;
    eventBus.emit(events.BOARD_DELETED, { boardId });

    if (activeBoardDeleted) {
        activeBoard = null;
    }

    workspaceView.render({
        activeBoardExists: Boolean(activeBoard),
        boardsAvailable: workspace.boards.length !== 0,
    });
}

const workspaceController = {
    init,
};

export default workspaceController;
