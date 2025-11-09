import eventBus, { events } from '@/domains/workspace/event-bus.js';

let id;
let name;
let lists;

function init(boardId, boardName, listViewStores) {
    id = boardId;
    name = boardName;
    lists = listViewStores;

    bindEvents();
}

function bindEvents() {
    eventBus.on(events.BOARD_NAME_UPDATED, setBoardName);
    eventBus.on(events.LIST_DELETED, removeList);
    eventBus.on(events.TASK_DELETED, removeTask);
}

function setBoardName({ boardId, boardName }) {

    if (boardId === id) {
        name = boardName;
    }
}

function addList(listId, listViewStore) {
    lists[listId] = listViewStore;
}

function removeList({ listId }) {
    lists[listId] = undefined;
}

function removeTask({ listId, taskId }) {
    const listViewStore = getListViewStore(listId);
    listViewStore.removeTask(taskId);
}

function getBoardId() {
    return id;
}

function getBoardName() {
    return name;
}

function getListIds() {
    return Object.freeze(Object.keys(lists));
}

function getListViewStore(listId) {
    return lists[listId];
}

const boardViewStore = {
    init,
    addList,

    getBoardId,
    getBoardName,
    getListIds,
    getListViewStore,
};

export default boardViewStore;
