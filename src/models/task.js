import assert from '../utils/assert.js';

export default class Task {

    static #PRIORITY = Object.freeze({
        OPTIONAL: 10,
        LOW: 20,
        MEDIUM: 30,
        HIGH: 40,
        CRITICAL: 50,
    });

    #name;
    #description;
    #dueDate;
    #priorityLevel;
    #isDone;

    constructor(name) {
        this.name = name;
        Object.freeze(this);
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        assert.string(name);
        this.#name = name;
    }

    get description() {
        return this.#description;
    }

    set description(description) {
        assert.string(description);
        this.#description = description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(dueDate) {
        assert.validDate(dueDate);
        this.#dueDate = dueDate;
    }

    get priorityLevel() {
        return this.#priorityLevel;
    }

    set priorityLevel(priorityLevel) {
        assert.inValues(priorityLevel, Task.#PRIORITY, "'priorityLevel'");
        this.#priorityLevel = priorityLevel;
    }

    get isDone() {
        return this.#isDone;
    }

    markAsDone() {
        this.#isDone = true;
    }

    unmarkAsDone() {
        this.#isDone = false;
    }
}
