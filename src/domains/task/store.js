export default class TaskViewStore {
    #name;

    constructor(name) {
        this.#name = name;
    }

    getTaskName() {
        return this.#name;
    }
}
