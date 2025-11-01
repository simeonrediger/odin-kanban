import eventBus, { events } from '@/domains/workspace/event-bus.js';

let id;
let name;
let lists;

function init(boardId, boardName, listViewStores) {
    id = boardId;
    name = boardName;
    lists = listViewStores
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
    getBoardId,
    getBoardName,
    getListIds,
    getListViewStore,
};

export default boardViewStore;
