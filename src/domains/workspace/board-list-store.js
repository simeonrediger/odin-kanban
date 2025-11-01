import eventBus, { events } from './event-bus.js';

let boards;

function init(boardListData) {
    boards = boardListData;
    bindEvents();
}

function bindEvents() {
    eventBus.on(events.BOARD_CREATED, addBoard);
    eventBus.on(events.BOARD_NAME_UPDATED, updateBoardName);
    eventBus.on(events.BOARD_DELETED, removeBoard);
}

function addBoard({ boardId, boardName }) {
    boards[boardId] = { name: boardName };
}

function updateBoardName({ boardId, boardName }) {
    boards[boardId].name = boardName;
}

function removeBoard({ boardId }) {
    boards[boardId] = undefined;
}

function getBoardIds() {
    return Object.freeze(Object.keys(boards));
}

function getBoardName(boardId) {
    return boards[boardId].name;
}

const boardListStore = {
    init,
    getBoardIds,
    getBoardName,
};

export default boardListStore;
