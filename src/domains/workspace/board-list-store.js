import eventBus, { events } from './event-bus.js';

let selectedBoardId;
let boards;

function init(boardListData) {
    ({ selectedBoardId, boards } = boardListData);
    bindEvents();
}

function bindEvents() {
    eventBus.on(events.BOARD_CREATED, addBoard);
    eventBus.on(events.BOARD_NAME_UPDATED, updateBoardName);
    eventBus.on(events.BOARD_DELETED, removeBoard);
}

function getSelectedBoardId() {
    return selectedBoardId;
}

function setSelectedBoardId(id) {
    selectedBoardId = id;
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
    getSelectedBoardId,
    setSelectedBoardId,
    getBoardIds,
    getBoardName,
};

export default boardListStore;
