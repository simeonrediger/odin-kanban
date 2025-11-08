import assert from '@/shared/validation/assert.js';
import boardList from './components/board-list.js';
import boardListStore from './board-list-store.js';
import boardView from '@/domains/board/component.js';
import boardViewStore from '@/domains/board/store.js';
import eventBus, { events } from './event-bus.js';
import ListViewStore from '@/domains/list/store.js';
import TaskViewStore from '@/domains/task/store.js';
import workspaceView from './component.js';

let workspace;
let workspaceContainer;

let activeBoard;

function init(workspaceModel) {
    workspace = workspaceModel;
    cacheElements();
    bindEvents();

    workspaceView.init(workspaceContainer);
    initBoardListStore(workspace);
    boardList.render();
    initActiveBoard(workspace);
}

function cacheElements() {
    workspaceContainer = document.querySelector("[data-role='workspace']");
    assert.notNull(workspaceContainer);
}

function bindEvents() {
    eventBus.on(events.BOARD_SELECTION_REQUESTED, handleBoardSelection);
    eventBus.on(events.BOARD_CREATION_REQUESTED, createBoard);
    eventBus.on(events.BOARD_NAME_UPDATE_REQUESTED, updateBoardName);
    eventBus.on(events.BOARD_DELETION_REQUESTED, handleBoardDeletionRequest);

    eventBus.on(events.LIST_CREATION_REQUESTED, createList);
    eventBus.on(events.LIST_NAME_UPDATE_REQUESTED, updateListName);
    eventBus.on(events.LIST_DELETION_REQUESTED, handleListDeletionRequest);

    eventBus.on(events.TASK_CREATION_REQUESTED, createTask);
}

function renderWorkspaceView(activeBoard) {
    workspaceView.render({
        activeBoardExists: Boolean(activeBoard),
        boardsAvailable: workspace.boards.length !== 0,
    });
}

function initBoardListStore(workspace) {
    const boardListData = {};

    for (const board of workspace.boards) {
        boardListData[board.id] = { name: board.name };
    }

    boardListStore.init(boardListData);
}

function initActiveBoard() {
    setActiveBoard(workspace.boards[0] ?? null);
}

function setActiveBoard(board) {
    activeBoard = board;
    setBoardViewStore(activeBoard);

    if (activeBoard) {
        boardView.render(activeBoard);
        eventBus.emit(events.BOARD_SELECTED, { boardId: activeBoard.id });
    }

    renderWorkspaceView(activeBoard);
}

function setBoardViewStore(board) {
    const listViewStores = {};

    for (const list of board?.lists ?? []) {
        const taskViewStores = {};

        for (const task of list.tasks) {
            taskViewStores[task.id] = new TaskViewStore(task.name);
        }

        listViewStores[list.id] = new ListViewStore(list.name, taskViewStores);
    }

    boardViewStore.init(board?.id, board?.name, listViewStores);
}

function handleBoardSelection({ boardId }) {
    setActiveBoard(workspace.getBoard(boardId));
}

function createBoard({ boardName }) {
    const board = workspace.addEmptyBoard(boardName);

    eventBus.emit(events.BOARD_CREATED, {
        boardId: board.id,
        boardName: board.name,
    });

    setActiveBoard(board);
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

function createList({ listName }) {
    const list = activeBoard.addEmptyList(listName);
    const listViewStore = new ListViewStore(list.name, {});
    boardViewStore.addList(list.id, listViewStore);

    eventBus.emit(events.LIST_CREATED, {
        listId: list.id,
        listName: list.name,
    });
}

function updateListName({ listId, listName }) {
    const list = activeBoard.getList(listId);
    list.name = listName;
    const listViewStore = boardViewStore.getListViewStore(listId);
    listViewStore.setListName(listName);
    eventBus.emit(events.LIST_NAME_UPDATED, { listId, listName });
}

function handleListDeletionRequest({ listId }) {
    const list = activeBoard.getList(listId);
    activeBoard.removeList(list);
    eventBus.emit(events.LIST_DELETED, { listId });
}

function createTask({ listId, taskName }) {
    const list = activeBoard.getList(listId);
    const task = list.addEmptyTask(taskName);
    const taskViewStore = new TaskViewStore(task.name, {});
    const listViewStore = boardViewStore.getListViewStore(listId);
    listViewStore.addTask(task.id, taskViewStore);
}

const workspaceController = {
    init,
};

export default workspaceController;
