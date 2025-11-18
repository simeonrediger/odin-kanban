export default class TaskViewStore {
    #name;
    #description;
    #priorityLevel;
    #dueDate;

    constructor(name, description, priorityLevel, dueDate) {
        this.#name = name;
        this.#description = description;
        this.#priorityLevel = priorityLevel;
        this.#dueDate = dueDate;
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

    getTaskDueDate() {
        return this.#dueDate;
    }

    setTaskDueDate(dueDate) {
        this.#dueDate = dueDate;
    }
}
