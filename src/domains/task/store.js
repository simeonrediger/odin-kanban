export default class TaskViewStore {
    #name;

    constructor(name) {
        this.#name = name;
    }

    getTaskName() {
        return this.#name;
    }

    setTaskName(name) {
        this.#name = name;
    }
}
