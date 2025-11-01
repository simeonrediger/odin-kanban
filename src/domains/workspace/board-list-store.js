import eventBus, { events } from './event-bus.js';

let store;

function init(boardListData) {
    store = boardListData;
    bindEvents();
}

function bindEvents() {
    eventBus.on(events.BOARD_CREATED, addBoard);
    eventBus.on(events.BOARD_NAME_UPDATED, updateBoardName);
    eventBus.on(events.BOARD_DELETED, removeBoard);
}

function addBoard({ boardId, boardName }) {
    store[boardId] = { name: boardName };
}

function updateBoardName({ boardId, boardName }) {
    store[boardId].name = boardName;
}

function removeBoard({ boardId }) {
    store[boardId] = undefined;
}

function getBoardIds() {
    return Object.freeze(Object.keys(store));
}

function getBoardName(boardId) {
    return store[boardId].name;
}

const boardListStore = {
    init,
    getBoardIds,
    getBoardName,
};

export default boardListStore;
