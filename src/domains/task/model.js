import assert from '@/shared/validation/assert.js';

export default class Task {

    static #PRIORITY = Object.freeze({
        OPTIONAL: 10,
        LOW: 20,
        MEDIUM: 30,
        HIGH: 40,
        CRITICAL: 50,
    });

    #id;
    #name;
    #description;
    #dueDate;
    #priorityLevel;
    #isDone;

    constructor(name, description, priorityLevel, id) {
        this.#id = id ?? crypto.randomUUID();
        this.name = name;
        this.#description = description;
        this.#priorityLevel = priorityLevel;
        Object.freeze(this);
    }

    get id() {
        return this.#id;
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

        if (description !== undefined) {
            assert.string(description);
        }

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

    toObject() {

        return Object.freeze({
            name: this.name,
            description: this.description,
            dueDate: this.dueDate,
            priorityLevel: this.priorityLevel,
            isDone: this.isDone,
        });
    }

    toJson(replacer, space) {
        return JSON.stringify(this.toObject(), replacer, space);
    }
}
