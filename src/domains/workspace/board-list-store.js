import eventBus, { events } from './event-bus.js';

let store;

function init(boardListData) {
    store = boardListData;
    bindEvents();
}

function bindEvents() {
    eventBus.on(events.BOARD_CREATED, addEntry);
    eventBus.on(events.BOARD_NAME_UPDATED, updateEntryName);
    eventBus.on(events.BOARD_DELETED, deleteEntry);
}

function addEntry({ boardId, boardName }) {
    store[boardId] = { name: boardName };
}

function updateEntryName({ boardId, boardName }) {
    store[boardId].name = boardName;
}

function deleteEntry({ boardId }) {
    store[boardId] = undefined;
}

function getEntryIds() {
    return Object.freeze(Object.keys(store));
}

function getEntryName(boardId) {
    return store[boardId].name;
}

const boardListStore = {
    init,
    getEntryIds,
    getEntryName,
};

export default boardListStore;
