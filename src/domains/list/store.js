export default class ListViewStore {
    #name;
    #tasks;

    constructor(name, taskViewStores) {
        this.#name = name;
        this.#tasks = taskViewStores;
    }

    getListName() {
        return this.#name;
    }

    getTaskIds() {
        return Object.freeze(Object.keys(this.#tasks));
    }

    getTaskViewStore(taskId) {
        return this.#tasks[taskId];
    }
}
