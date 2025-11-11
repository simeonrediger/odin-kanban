export default class TaskViewStore {
    #name;
    #description;

    constructor(name, description) {
        this.#name = name;
        this.#description = description;
    }

    getTaskName() {
        return this.#name;
    }

    setTaskName(name) {
        this.#name = name;
    }

    getTaskDescription() {
        return this.#description;
    }

    setTaskDescription(description) {
        this.#description = description;
    }
}
