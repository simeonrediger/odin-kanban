import assert from '@/shared/validation/assert.js';
import boardList from './components/board-list.js';
import boardListStore from './board-list-store.js';
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

    workspaceView.init(workspaceContainer);
    initActiveBoard();

    initBoardListStore();
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
    setActiveBoard(workspace.boards[0] ?? null);
}

function setActiveBoard(board) {
    activeBoard = board;

    if (activeBoard) {
        boardView.render(activeBoard);
    }

    renderWorkspaceView();
}

function renderWorkspaceView() {
    workspaceView.render({
        activeBoardExists: Boolean(activeBoard),
        boardsAvailable: workspace.boards.length !== 0,
    });
}

function initBoardListStore() {
    const boardListData = {};

    for (const board of workspace.boards) {
        boardListData[board.id] = { name: board.name };
    }

    boardListStore.init(boardListData);
}

function updateBoardList() {
    const boardListData = workspace.boards.map(
        board => ({ boardId: board.id, boardName: board.name })
    );
    boardList.render(boardListData);
}

function handleBoardSelection({ boardId }) {
    setActiveBoard(workspace.getBoard(boardId));
}

function createBoard({ boardName }) {
    const board = workspace.addEmptyBoard(boardName);
    setActiveBoard(board);

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

    if (activeBoardDeleted) {
        setActiveBoard(null);
    } else if (workspace.boards.length === 0) {
        renderWorkspaceView();
    }

    eventBus.emit(events.BOARD_DELETED, { boardId });
}

const workspaceController = {
    init,
};

export default workspaceController;
