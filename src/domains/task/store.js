export default class TaskViewStore {
    #name;
    #priorityLevel;
    #description;

    constructor(name, priorityLevel, description) {
        this.#name = name;
        this.#priorityLevel = priorityLevel;
        this.#description = description;
    }

    getTaskName() {
        return this.#name;
    }

    setTaskName(name) {
        this.#name = name;
    }

    getTaskPriorityLevel() {
        return this.#priorityLevel;
    }

    setTaskPriorityLevel(priorityLevel) {
        this.#priorityLevel = priorityLevel;
    }

    getTaskDescription() {
        return this.#description;
    }

    setTaskDescription(description) {
        this.#description = description;
    }
}
