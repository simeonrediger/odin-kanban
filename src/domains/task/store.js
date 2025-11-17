export default class TaskViewStore {
    #name;
    #description;
    #priorityLevel;

    constructor(name, description, priorityLevel) {
        this.#name = name;
        this.#description = description;
        this.#priorityLevel = priorityLevel;
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

    getTaskPriorityLevel() {
        return this.#priorityLevel;
    }

    setTaskPriorityLevel(priorityLevel) {
        this.#priorityLevel = priorityLevel;
    }
}
